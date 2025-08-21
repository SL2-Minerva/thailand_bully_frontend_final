import { Grid } from '@mui/material'
import ChannelByDay from './ChannelBy/ChannelByDay'
import ChannelByTime from './ChannelBy/ChannelByTime'

// import ChannelByDevice from './ChannelBy/ChannelByDevice'
import ChannelByAccount from './ChannelBy/ChannelByAccount'
import ChannelBySentimentComparison from './ChannelBy/ChannelBySentimentComparison'
import ChannelByBullyLevel from './ChannelBy/ChannelByBullyLevel'
import ChannelByBullyType from './ChannelBy/ChannelByBullyType'
import { GetChannelBy } from 'src/services/api/dashboards/channel/ChannelDashboardApi'
import { useTheme } from '@mui/material/styles'
import { GraphicColors } from 'src/utils/const'
import { useEffect } from 'react'

interface Props {
  apiParams: any
  resultReportPermission: any
  params: any
  highlight: string
  setIsLoading: any
  quickViewData: any
  setQuickViewData: any
}

const ChannelByCharts = (props: Props) => {
  const { apiParams, resultReportPermission, params, highlight,  setIsLoading, quickViewData, setQuickViewData } = props
  const theme = useTheme()

  const whiteColor = '#fff'
  const lineChartYellow = '#d4e157'
  const lineChartPrimary = '#787EFF'
  const lineChartWarning = '#ff9800'
  const labelColor = theme.palette.text.primary
  const borderColor = theme.palette.action.focus
  const gridLineColor = theme.palette.action.focus

  const {
    resultChannelByDay,
    resultChannelByAccount,
    resultChannelByBullyLevel,
    resultChannelByBullyType,
    resultChannelByDevice,
    resultChannelBySentiment,
    resultChannelByTime,
    loadingChannelBy
  } = GetChannelBy(apiParams)

  useEffect(() => {
    setQuickViewData({
      ...quickViewData,
      resultChannelByDay: resultChannelByDay,
      resultChannelByAccount: resultChannelByAccount,
      resultChannelByBullyLevel: resultChannelByBullyLevel,
      resultChannelByBullyType: resultChannelByBullyType,
      resultChannelByDevice: resultChannelByDevice,
      resultChannelBySentiment: resultChannelBySentiment,
      resultChannelByTime: resultChannelByTime,
      loadingChannelBy: loadingChannelBy
    })
  }, [
    resultChannelByDay,
    resultChannelByAccount,
    resultChannelByBullyLevel,
    resultChannelByBullyType,
    resultChannelByDevice,
    resultChannelBySentiment,
    resultChannelByTime
  ])

  return (
    <>
      {resultReportPermission?.includes('46') ? (
        <Grid item xs={12} md={12} id='chart3'>
          <ChannelByDay
            white={whiteColor}
            labelColor={labelColor}
            success={lineChartYellow}
            borderColor={borderColor}
            primary={lineChartPrimary}
            warning={lineChartWarning}
            gridLineColor={gridLineColor}
            params={params}
            chartId='Chart 3'
            highlight={highlight === 'chart3' ? true : false}
            resultBy={resultChannelByDay}
            loading={loadingChannelBy}
            keywordsColor={GraphicColors}
            apiParams={apiParams}
            setIsLoading={setIsLoading}
          />
        </Grid>
      ) : (
        ''
      )}
      {resultReportPermission?.includes('47') ? (
        <Grid item xs={12} md={12} id='chart4'>
          <ChannelByTime
            white={whiteColor}
            labelColor={labelColor}
            success={lineChartYellow}
            borderColor={borderColor}
            primary={lineChartPrimary}
            warning={lineChartWarning}
            gridLineColor={gridLineColor}
            params={params}
            chartId='Chart 4'
            highlight={highlight === 'chart4' ? true : false}
            resultBy={resultChannelByTime}
            loading={loadingChannelBy}
            keywordsColor={GraphicColors}
            apiParams={apiParams}
            setIsLoading={setIsLoading}
          />
        </Grid>
      ) : (
        ''
      )}
      {/* {resultReportPermission?.includes('48') ? (
        <Grid item xs={12} md={12} id='chart5'>
          <ChannelByDevice
            white={whiteColor}
            labelColor={labelColor}
            success={lineChartYellow}
            borderColor={borderColor}
            primary={lineChartPrimary}
            warning={lineChartWarning}
            gridLineColor={gridLineColor}
            params={params}
            chartId='Chart 5'
            highlight={highlight === 'chart5' ? true : false}
            resultBy={resultChannelByDevice}
            loading={loadingChannelBy}
            keywordsColor={GraphicColors}
            apiParams={apiParams}
            setIsLoading={setIsLoading}
          />
        </Grid>
      ) : (
        ''
      )} */}
      {resultReportPermission?.includes('49') ? (
        <Grid item xs={12} md={12} id='chart6'>
          <ChannelByAccount
            white={whiteColor}
            labelColor={labelColor}
            success={lineChartYellow}
            borderColor={borderColor}
            primary={lineChartPrimary}
            warning={lineChartWarning}
            gridLineColor={gridLineColor}
            params={params}
            chartId='Chart 6'
            highlight={highlight === 'chart6' ? true : false}
            resultBy={resultChannelByAccount}
            loading={loadingChannelBy}
            keywordsColor={GraphicColors}
            apiParams={apiParams}
            setIsLoading={setIsLoading}
          />
        </Grid>
      ) : (
        ''
      )}
      {resultReportPermission?.includes('50') ? (
        <Grid item xs={12} md={12} id='chart7'>
          <ChannelBySentimentComparison
            white={whiteColor}
            labelColor={labelColor}
            success={lineChartYellow}
            borderColor={borderColor}
            primary={lineChartPrimary}
            warning={lineChartWarning}
            gridLineColor={gridLineColor}
            params={params}
            chartId='Chart 7'
            highlight={highlight === 'chart7' ? true : false}
            resultBy={resultChannelBySentiment}
            loading={loadingChannelBy}
            keywordsColor={GraphicColors}
            apiParams={apiParams}
            setIsLoading={setIsLoading}
          />
        </Grid>
      ) : (
        ''
      )}
      {resultReportPermission?.includes('51') ? (
        <Grid item xs={12} md={12} id='chart8'>
          <ChannelByBullyLevel
            white={whiteColor}
            labelColor={labelColor}
            success={lineChartYellow}
            borderColor={borderColor}
            primary={lineChartPrimary}
            warning={lineChartWarning}
            gridLineColor={gridLineColor}
            params={params}
            chartId='Chart 8'
            highlight={highlight === 'chart8' ? true : false}
            resultBy={resultChannelByBullyLevel}
            loading={loadingChannelBy}
            keywordsColor={GraphicColors}
            apiParams={apiParams}
            setIsLoading={setIsLoading}
          />
        </Grid>
      ) : (
        ''
      )}
      {resultReportPermission?.includes('52') ? (
        <Grid item xs={12} md={12} id='chart9'>
          <ChannelByBullyType
            white={whiteColor}
            labelColor={labelColor}
            success={lineChartYellow}
            borderColor={borderColor}
            primary={lineChartPrimary}
            warning={lineChartWarning}
            gridLineColor={gridLineColor}
            params={params}
            chartId='Chart 9'
            highlight={highlight === 'chart9' ? true : false}
            resultBy={resultChannelByBullyType}
            loading={loadingChannelBy}
            keywordsColor={GraphicColors}
            apiParams={apiParams}
            setIsLoading={setIsLoading}
          />
        </Grid>
      ) : (
        ''
      )}
    </>
  )
}

export default ChannelByCharts
