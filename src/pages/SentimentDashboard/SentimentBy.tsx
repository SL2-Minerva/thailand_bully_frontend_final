import { Grid } from '@mui/material'
import SentimentScore from './SentimentScore'
import SentimentScorePercentage from './SentimentScorePercentage'
import { GetSenitmemntBy } from 'src/services/api/dashboards/sentiment/sentimentDashboard'
import SentimentByDay from './SentimentByDay'
import SentimentByTime from './SentimentByTime'

// import SentimentByDevice from './SentimentByDevice'
import SentimentByBullyType from './SentimentByBullyType'
import SentimentByBullyLevel from './SentimentByBullyLevel'
import SentimentByChannel from './SentitmentByChannel'
import SentimentByAccount from './SentimentByAccount'
import { useEffect } from 'react'

interface Props {
  theme: any
  apiParams: any
  resultReportPermission: any
  params: any
  highlight: string
  setIsLoading: any
  quickViewData: any
  setQuickViewData: any
}

const SentimentBy = (props: Props) => {
  const { theme, apiParams, resultReportPermission, params, highlight, setIsLoading, quickViewData, setQuickViewData } =
    props

  const whiteColor = '#fff'
  const lineChartYellow = '#d4e157'
  const lineChartPrimary = '#787EFF'
  const lineChartWarning = '#ff9800'
  const labelColor = theme.palette.text.primary
  const borderColor = theme.palette.action.focus
  const gridLineColor = theme.palette.action.focus

  const {
    resultSenitmentScore,
    resultSentimentByAccount,
    resultSentimentByBullyLevel,
    resultSentimentByBullyType,
    resultSentimentByChannel,
    resultSentimentByDay,
    resultSentimentByDevice,
    resultSentimentByTime,
    loadingSentimentByDay
  } = GetSenitmemntBy(apiParams)

  useEffect(() => {
    setQuickViewData({
      ...quickViewData,
      resultSenitmentScore: resultSenitmentScore,
      resultSentimentByAccount: resultSentimentByAccount,
      resultSentimentByBullyLevel: resultSentimentByBullyLevel,
      resultSentimentByBullyType: resultSentimentByBullyType,
      resultSentimentByChannel: resultSentimentByChannel,
      resultSentimentByDay: resultSentimentByDay,
      resultSentimentByDevice: resultSentimentByDevice,
      resultSentimentByTime: resultSentimentByTime
    })
  }, [
    loadingSentimentByDay,
    resultSenitmentScore,
    resultSentimentByAccount,
    resultSentimentByBullyLevel,
    resultSentimentByBullyType,
    resultSentimentByChannel,
    resultSentimentByDay,
    resultSentimentByDevice,
    resultSentimentByTime
  ])

  return (
    <>
      {resultReportPermission?.includes('78') ? (
        <Grid item xs={12} md={12} id='chart3'>
          <SentimentByDay
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
            resultBy={resultSentimentByDay}
            loading={loadingSentimentByDay}
            apiParams={apiParams}
            setIsLoading={setIsLoading}
          />
        </Grid>
      ) : (
        ''
      )}
      {resultReportPermission?.includes('79') ? (
        <Grid item xs={12} md={12} id='chart4'>
          <SentimentByTime
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
            loading={loadingSentimentByDay}
            resultBy={resultSentimentByTime}
            apiParams={apiParams}
            setIsLoading={setIsLoading}
          />
        </Grid>
      ) : (
        ''
      )}
      {/* {resultReportPermission?.includes('80') ? (
        <Grid item xs={12} md={12} id='chart5'>
          <SentimentByDevice
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
            loading={loadingSentimentByDay}
            resultBy={resultSentimentByDevice}
            apiParams={apiParams}
            setIsLoading={setIsLoading}
          />
        </Grid>
      ) : (
        ''
      )} */}
      {resultReportPermission?.includes('81') ? (
        <Grid item xs={12} md={12} id='chart6'>
          <SentimentByAccount
            white={whiteColor}
            labelColor={labelColor}
            success={lineChartYellow}
            borderColor={borderColor}
            primary={lineChartPrimary}
            warning={lineChartWarning}
            gridLineColor={gridLineColor}
            chartId='Chart 6'
            params={params}
            highlight={highlight === 'chart6' ? true : false}
            loading={loadingSentimentByDay}
            resultBy={resultSentimentByAccount}
            apiParams={apiParams}
            setIsLoading={setIsLoading}
          />
        </Grid>
      ) : (
        ''
      )}
      {resultReportPermission?.includes('82') ? (
        <Grid item xs={12} md={12} id='chart7'>
          <SentimentByChannel
            white={whiteColor}
            labelColor={labelColor}
            success={lineChartYellow}
            borderColor={borderColor}
            primary={lineChartPrimary}
            warning={lineChartWarning}
            gridLineColor={gridLineColor}
            chartId='Chart 7'
            params={params}
            highlight={highlight === 'chart7' ? true : false}
            loading={loadingSentimentByDay}
            resultBy={resultSentimentByChannel}
            apiParams={apiParams}
            setIsLoading={setIsLoading}
          />
        </Grid>
      ) : (
        ''
      )}
      {resultReportPermission?.includes('83') ? (
        <Grid item xs={12} md={12} id='chart8'>
          <SentimentByBullyLevel
            white={whiteColor}
            labelColor={labelColor}
            success={lineChartYellow}
            borderColor={borderColor}
            primary={lineChartPrimary}
            warning={lineChartWarning}
            gridLineColor={gridLineColor}
            chartId='Chart 8'
            params={params}
            highlight={highlight === 'chart8' ? true : false}
            loading={loadingSentimentByDay}
            resultBy={resultSentimentByBullyLevel}
            apiParams={apiParams}
            setIsLoading={setIsLoading}
          />
        </Grid>
      ) : (
        ''
      )}
      {resultReportPermission?.includes('84') ? (
        <Grid item xs={12} md={12} id='chart9'>
          <SentimentByBullyType
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
            loading={loadingSentimentByDay}
            resultBy={resultSentimentByBullyType}
            apiParams={apiParams}
            setIsLoading={setIsLoading}
          />
        </Grid>
      ) : (
        ''
      )}

      {resultReportPermission?.includes('88') ? (
        <>
          <Grid item xs={12} md={6} id='chart13'>
            <SentimentScore
              params={params}
              chartId='Chart 13'
              highlight={highlight === 'chart13' ? true : false}
              resultSenitmentScore={resultSenitmentScore?.senitment_score_data}
              loadingSentimentScore={loadingSentimentByDay}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <SentimentScorePercentage
              params={params}
              highlight={highlight === 'chart13' ? true : false}
              resultSentimentScorePercentage={resultSenitmentScore?.senitment_score_percentage || []}
              loadingSentimentScore={loadingSentimentByDay}
            />
          </Grid>
        </>
      ) : (
        ''
      )}
    </>
  )
}

export default SentimentBy
