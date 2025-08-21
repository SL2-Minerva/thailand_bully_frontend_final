import { Backdrop, CircularProgress, Grid } from '@mui/material'

// import QuickView from './QuickView'
import { useTheme } from '@mui/material/styles'

import SentimentComparisonTable from './SentimentComparison'

// import QuickViewModal from './QuickViewModal'
import { useEffect, useState } from 'react'
import DailyBy from './DailyBy'
import SentimentBy from './SentimentBy'
import SentimentTotal from './SentimentTotal'
import SentimentComparisonCharts from './SentimentComparisonCharts'

interface Props {
  params: any
  resultReportPermission: any
}

const SentimentGraph = (data: Props) => {
  const { resultReportPermission, params } = data
  const theme = useTheme()

  // const [showQuickView, setShowQuickView] = useState<boolean>(false)
  // const [highlight, setHighlight] = useState<string>('')

  const [highlight] = useState<string>('')
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
      <Grid container spacing={3} pt={3}>
        {apiParams ? (
          <>
            <DailyBy
              theme={theme}
              apiParams={apiParams}
              resultReportPermission={resultReportPermission}
              params={params}
              highlight={highlight}
              isLoading={isLoading}
              setIsLoading={setIsLoading}
              quickViewData={quickViewData}
              setQuickViewData={setQuickViewData}
            />
            <SentimentBy
              theme={theme}
              apiParams={apiParams}
              resultReportPermission={resultReportPermission}
              params={params}
              highlight={highlight}
              setIsLoading={setIsLoading}
              quickViewData={quickViewData}
              setQuickViewData={setQuickViewData}
            />
            <SentimentTotal
              theme={theme}
              apiParams={apiParams}
              resultReportPermission={resultReportPermission}
              params={params}
              highlight={highlight}
            />

            {resultReportPermission?.includes('89') ? (
              <Grid item xs={12} md={12} id='chart14'>
                <SentimentComparisonTable
                  apiParams={apiParams}
                  chartId='Chart 14'
                  highlight={highlight === 'chart14' ? true : false}
                />
              </Grid>
            ) : (
              ''
            )}

            <SentimentComparisonCharts
              apiParams={apiParams}
              resultReportPermission={resultReportPermission}
              params={params}
              highlight={highlight}
            />
          </>
        ) : (
          ''
        )}
      </Grid>
      
      {/* <QuickView setHighlight={setHighlight} setShowQuickView={setShowQuickView} /> */}

      {/* <QuickViewModal
        show={showQuickView}
        setShow={setShowQuickView}
        params={params}
        chartId={highlight}
        quickViewData={quickViewData}
        apiParams={apiParams}
        isLoading={isLoading}
        setIsLoading={setIsLoading}
      /> */}
    </>
  )
}

export default SentimentGraph
