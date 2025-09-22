import { Grid } from '@mui/material'
import { useTheme } from '@mui/material/styles'
import { GetSentimentBy } from 'src/services/api/dashboards/channel/ChannelDashboardApi'
import SentimentScore from './SenitmentScore'
import SentimentLevelsByChannel from './SentimentLevelsByChannel'

interface Props {
  apiParams: any
  resultReportPermission: any
  highlight: string
  params: any
}

const SentimentByCharts = (props: Props) => {
  const { resultReportPermission, apiParams, highlight, params } = props

  const theme = useTheme()

  const whiteColor = '#fff'
  const lineChartYellow = '#d4e157'
  const lineChartPrimary = '#456FCA'
  const lineChartWarning = '#ff9800'
  const labelColor = theme.palette.text.primary
  const borderColor = theme.palette.action.focus
  const gridLineColor = theme.palette.action.focus

  const {
    resultChannelSentimentLevel,
    resultSentimentLevel,
    resultSentimentScore,
    resultSentimentScorePrevious,
    loadingSentimentBy
  } = GetSentimentBy(apiParams)

  return (
    <>
      {resultReportPermission?.includes('55') ? (
        <Grid item xs={12} md={6} id='chart12'>
          <SentimentScore
            white={whiteColor}
            labelColor={labelColor}
            success={lineChartYellow}
            borderColor={borderColor}
            primary={lineChartPrimary}
            warning={lineChartWarning}
            gridLineColor={gridLineColor}
            params={params}
            chartId='Chart 12'
            highlight={highlight === 'chart12' ? true : false}
            resultBy={resultSentimentScore}
            resultByPrevious={resultSentimentScorePrevious}
            loading={loadingSentimentBy}
          />
        </Grid>
      ) : (
        ''
      )}

      {resultReportPermission?.includes('56') ? (
        <Grid container spacing={3} pl={3} pt={3} id='chart13'>
          <Grid item xs={12}>
            <SentimentLevelsByChannel
              chartId='Chart 13'
              resultBy={resultChannelSentimentLevel}
              loading={loadingSentimentBy}
              resultSentimentLevel={resultSentimentLevel}
            />
          </Grid>
        </Grid>
      ) : (
        ''
      )}
    </>
  )
}

export default SentimentByCharts
