import { Grid } from '@mui/material'
import DailyMessagePieChart from './DailyMessagePieChart'
import { ChannelColorCode, GraphicColors } from 'src/utils/const'
import DailyMessageGraph from './DailyMessageGraph'
import { GetDailyBy } from 'src/services/api/dashboards/channel/ChannelDashboardApi'
import { useEffect } from 'react'

interface Props {
  resultReportPermission: any
  apiParams: any
  highlight: any
  isLoading: boolean
  setIsLoading: any
  params: any
  setQuickViewData: any
  quickViewData: any
}

const DailyBy = (props: Props) => {
  const {
    resultReportPermission,
    apiParams,
    highlight,
    isLoading,
    setIsLoading,
    params,
    setQuickViewData,
    quickViewData
  } = props
  const { resultDailyChannel, resultPercentageChannelCurrent, resultPercentageChannelPrevious, loadingDailyChannel } =
    GetDailyBy(apiParams)

  useEffect(() => {
    setQuickViewData({
      ...quickViewData,
      resultDailyChannel: resultDailyChannel,
      loadingDailyChannel: loadingDailyChannel
    })
  }, [resultDailyChannel])

  return (
    <>
      {resultReportPermission?.includes('44') && apiParams ? (
        <Grid item xs={12} md={4} id='chart1' mt={1}>
          <DailyMessagePieChart
            apiParams={apiParams}
            type='channel'
            chartId='Chart 1'
            highlight={highlight === 'chart1' ? true : false}
            resultPercentageChannelCurrent={resultPercentageChannelCurrent}
            resultPercentageChannelPrevious={resultPercentageChannelPrevious}
            loadingPercentageChannel={loadingDailyChannel}
            keywordsColor={ChannelColorCode}
          />
        </Grid>
      ) : (
        ''
      )}
      {resultReportPermission?.includes('45') && apiParams ? (
        <Grid item xs={12} md={8} id='chart2' mt={1}>
          <DailyMessageGraph
            params={params}
            type='channel'
            chartId='Chart 2'
            highlight={highlight === 'chart2' ? true : false}
            resultDailyChannel={resultDailyChannel}
            loadingDailyChannel={loadingDailyChannel}
            keywordsColor={GraphicColors}
            apiParams={apiParams}
            isLoading={isLoading}
            setIsLoading={setIsLoading}
          />
        </Grid>
      ) : (
        ''
      )}
    </>
  )
}

export default DailyBy
