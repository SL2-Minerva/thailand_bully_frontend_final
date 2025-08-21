import { Backdrop, CircularProgress, Grid } from '@mui/material'

import DailyMessageGraph from './DailyMessageGraph'
import DailyMessagePieChart from './DailyMessagesPieChart'

// import QuickViewModal from './QuickViewModal'
import KeywordBy from './KeywordBy'
import DayTimeBy from './DayTimeBy'
import MessageByAll from './MessageByAll'
import Comparison from './Comparision'

// import QuickView from './QuickView'
import { useEffect, useState } from 'react'
import NumberOfAccounts from './NumberOfAccounts'

interface Props {
  params: any
  resultReportPermission: any
  keywordGraphColors: any
}

const VoiceDashboardGraphs = (data: Props) => {
  const { params, resultReportPermission, keywordGraphColors } = data
  const [highlight] = useState<string>('')

  // const [highlight, setHighlight] = useState<string>('')
  // const [showQuickView, setShowQuickView] = useState<boolean>(false)
  const [apiParams, setApiParams] = useState<any>()
  const [isLoading, setIsLoading] = useState(false)
  const [quickViewData, setQuickViewData] = useState<any>({})

  useEffect(() => {
    if (params?.period !== 'customrange') {
      setApiParams({
        campaign_id: params?.campaign,
        source: params?.platformId,
        start_date: params?.date,
        end_date: params?.endDate,
        period: params?.period,
        fillter_keywords: params?.keywordIds
      })
    }
    if (
      params?.period === 'customrange' &&
      params?.endDate &&
      params?.previousEndDate &&
      params?.date !== params?.endDate &&
      params?.previousDate !== params?.previousEndDate
    ) {
      setApiParams({
        campaign_id: params?.campaign,
        source: params?.platformId,
        start_date: params?.date,
        end_date: params?.endDate,
        period: params?.period,
        start_date_period: params?.previousDate,
        end_date_period: params?.previousEndDate,
        fillter_keywords: params?.keywordIds
      })
    }
  }, [params])

  return (
    <>
      <Backdrop sx={{ color: '#fff', zIndex: theme => theme.zIndex.drawer + 1 }} open={isLoading}>
        <CircularProgress color='inherit' />
      </Backdrop>
      {apiParams ? (
        <>
          {resultReportPermission?.includes('20') ? (
            <Grid item xs={12} md={4} id='chart1' mt={1}>
              <DailyMessagePieChart
                keywordsColor={keywordGraphColors}
                apiParams={apiParams}
                type='message'
                chartId='Chart 1'
                highlight={highlight === 'chart1' ? true : false}
              />
            </Grid>
          ) : (
            ''
          )}
        </>
      ) : (
        ''
      )}

      {apiParams ? (
        <>
          {resultReportPermission?.includes('21') ? (
            <Grid item xs={12} md={8} id='chart2' mt={1}>
              <DailyMessageGraph
                keywordsColor={keywordGraphColors}
                type='message'
                params={params}
                chartId='Chart 2'
                highlight={highlight === 'chart2' ? true : false}
                apiParams={apiParams}
                isLoading={isLoading}
                setIsLoading={setIsLoading}
                quickViewData={quickViewData}
                setQuickViewData={setQuickViewData}
              />
            </Grid>
          ) : (
            ''
          )}
        </>
      ) : (
        ''
      )}

      {apiParams ? (
        <MessageByAll
          keywordsColor={keywordGraphColors}
          resultReportPermission={resultReportPermission}
          highlight={highlight}
          params={params}
          apiParams={apiParams}
          isLoading={isLoading}
          setIsLoading={setIsLoading}
          quickViewData={quickViewData}
          setQuickViewData={setQuickViewData}
        />
      ) : (
        ''
      )}

      {apiParams ? (
        <>
          <NumberOfAccounts
            resultReportPermission={resultReportPermission}
            highlight={highlight}
            apiParams={apiParams}
            keywordGraphColors={keywordGraphColors}
            params={params}
            setIsLoading={setIsLoading}
          />
          <DayTimeBy
            resultReportPermission={resultReportPermission}
            params={params}
            highlight={highlight}
            apiParams={apiParams}
          />
          <Comparison
            resultReportPermission={resultReportPermission}
            params={params}
            highlight={highlight}
            apiParams={apiParams}
          />

          <KeywordBy
            highlight={highlight}
            resultReportPermission={resultReportPermission}
            params={params}
            keywordsColor={keywordGraphColors}
            apiParams={apiParams}
          />
        </>
      ) : (
        ''
      )}

      {/* <QuickView setHighlight={setHighlight} setShowQuickView={setShowQuickView} /> */}

      {/* <QuickViewModal
        show={showQuickView}
        setShow={setShowQuickView}
        params={params}
        chartId={highlight}
        keywordsColor={keywordGraphColors}
        quickViewData={quickViewData}
        apiParams={apiParams}
        isLoading={isLoading}
        setIsLoading={setIsLoading}
        setQuickViewData={setQuickViewData}
      /> */}
    </>
  )
}

export default VoiceDashboardGraphs
