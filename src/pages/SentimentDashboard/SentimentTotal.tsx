import { StyledTooltip } from '../dashboard/overall'
import { CardHeader, Grid, Paper, Typography } from '@mui/material'
import TotalMessage from './TotalMessage'
import PeriodComparisonChart from '../EngagementDashboard/PeriodComparisonChart'
import { Information } from 'mdi-material-ui'
import PeriodComparisonChannelChart from './PeriodComparisonChannel'
import Translations from 'src/layouts/components/Translations'
import { GetPeriodComparison } from 'src/services/api/dashboards/sentiment/sentimentDashboard'

interface Props {
  theme: any
  apiParams: any
  resultReportPermission: any
  params: any
  highlight: string
}

const SentimentTotal = (props: Props) => {
  const { theme, apiParams, resultReportPermission, params, highlight } = props

  const whiteColor = '#fff'
  const lineChartYellow = '#d4e157'
  const lineChartPrimary = '#787EFF'
  const lineChartWarning = '#ff9800'
  const labelColor = theme.palette.text.primary
  const borderColor = theme.palette.action.focus
  const gridLineColor = theme.palette.action.focus

  const {
    resultSenitmentComparisonByChannel,
    resultSentimentComparisonByEngagement,
    resultTotalSentiment,
    loadingSentimentComparison
  } = GetPeriodComparison(apiParams)

  return (
    <>
      {resultReportPermission?.includes('85') ? (
        <>
          <Grid item xs={12}>
            <Paper id='chart10' sx={{ border: `3px solid #fff`, borderRadius: 1 }} >
              <span style={{ display: 'flex', justifyContent: 'flex-start' }}>
                <CardHeader
                  title={<Translations text='Total Messages by Sentiment Type' />}
                  titleTypographyProps={{ variant: 'h6'}}
                />
                <StyledTooltip
                  arrow
                  title={
                    <span>
                      <Typography variant='h6' sx={{ color: 'white' }}>
                        <Translations text='sentimentChart10Title' />
                      </Typography>
                      <Typography variant='body2' sx={{ color: 'white' }}>
                        <Translations text='sentimentChart10Description' />
                      </Typography>
                    </span>
                  }
                >
                  <Information
                    style={{
                      marginTop: '22px',
                      fontSize: '29px'
                    }}
                  />
                </StyledTooltip>
              </span>
            </Paper>
          </Grid>
          <Grid item xs={12} md={12}>
            <TotalMessage
              totalMessage={resultTotalSentiment}
              loadingTotalSentiment={loadingSentimentComparison}
              apiParams={apiParams}
            />
          </Grid>
        </>
      ) : (
        ''
      )}
      {resultReportPermission?.includes('86') ? (
        <Grid item xs={12} md={6} id='chart11'>
          <PeriodComparisonChannelChart
            white={whiteColor}
            labelColor={labelColor}
            success={lineChartYellow}
            borderColor={borderColor}
            primary={lineChartPrimary}
            warning={lineChartWarning}
            gridLineColor={gridLineColor}
            type='channel'
            chartTitle='Sentiment Comparison'
            colorType='engagementDefault'
            chartId='Chart 11'
            params={params}
            highlight={highlight === 'chart11' ? true : false}
            resultSenitmentComparisonByChannel={resultSenitmentComparisonByChannel}
            loadingSenitmentComparisonByChannel={loadingSentimentComparison}
          />
        </Grid>
      ) : (
        ''
      )}
      {resultReportPermission?.includes('87') ? (
        <Grid item xs={12} md={6} id='chart12'>
          <PeriodComparisonChart
            white={whiteColor}
            labelColor={labelColor}
            success={lineChartYellow}
            borderColor={borderColor}
            primary={lineChartPrimary}
            warning={lineChartWarning}
            gridLineColor={gridLineColor}
            params={params}
            type='engagementType'
            chartTitle='Sentiment Comparison'
            colorType='sentimentComparison'
            chartId='sentimentChart12Title' // chart 12
            highlight={highlight === 'chart12' ? true : false}
            reportNo='sentimentChart12Description' //5.2.014
            resultSentimentComparisonByEngagement={resultSentimentComparisonByEngagement}
            loadingSenitmentComparisonByEngagement={loadingSentimentComparison}
          />
        </Grid>
      ) : (
        ''
      )}
    </>
  )
}

export default SentimentTotal
