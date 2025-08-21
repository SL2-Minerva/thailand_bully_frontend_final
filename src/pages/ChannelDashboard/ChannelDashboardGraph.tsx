import { Backdrop, CircularProgress } from '@mui/material'

// import QuickView from './QuickView'

// import { GraphicColors } from 'src/utils/const'
// import QuickViewModal from './QuickViewModal'
import { useEffect, useState } from 'react'
import DailyBy from './DailyBy'
import ChannelByCharts from './ChannelByCharts'
import ComparisonCharts from './ComparisonCharts'
import SentimentByCharts from './SentimentByCharts'

interface Props {
  params: any
  resultReportPermission: any
}

const ChannelDashboardGraphs = (data: Props) => {
  const { params, resultReportPermission } = data
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
        <DailyBy
          resultReportPermission={resultReportPermission}
          apiParams={apiParams}
          highlight={highlight}
          isLoading={isLoading}
          setIsLoading={setIsLoading}
          params={params}
          setQuickViewData={setQuickViewData}
          quickViewData={quickViewData}
        />
      ) : (
        ''
      )}

      {apiParams ? (
        <ChannelByCharts
          apiParams={apiParams}
          resultReportPermission={resultReportPermission}
          params={params}
          highlight={highlight}
          setIsLoading={setIsLoading}
          quickViewData={quickViewData}
          setQuickViewData={setQuickViewData}
        />
      ) : (
        ''
      )}

      {apiParams ? (
        <ComparisonCharts
          apiParams={apiParams}
          resultReportPermission={resultReportPermission}
          highlight={highlight}
          params={params}
        />
      ) : (
        ''
      )}

      {apiParams ? (
        <SentimentByCharts
          apiParams={apiParams}
          params={params}
          resultReportPermission={resultReportPermission}
          highlight={highlight}
        />
      ) : (
        ''
      )}

      {/* <QuickView setHighlight={setHighlight} setShowQuickView={setShowQuickView} /> */}

      {/* <QuickViewModal
        show={showQuickView}
        setShow={setShowQuickView}
        params={params}
        chartId={highlight}
        quickViewData={quickViewData}
        keywordsColor={GraphicColors}
        apiParams={apiParams}
        isLoading={isLoading}
        setIsLoading={setIsLoading}
      /> */}
    </>
  )
}

export default ChannelDashboardGraphs
