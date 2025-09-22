import { Grid } from '@mui/material'
import MessagesByAccount from './MessagesBy/MessageByAccount'
import MessagesByChannel from './MessagesBy/MessagesByChannel'
import MessagesBySentiment from './MessagesBy/MessagesBySentiment'
import MessagesByBullyLevel from './MessagesBy/MessageByBullyLevel'
import MessagesByBullyType from './MessagesBy/MessageByBullyType'
import MessagesByDays from './MessagesBy/MessageByDays'
import MessagesByTime from './MessagesBy/MessageByTime'

// import MessagesByDevices from './MessagesBy/MessageByDevice'
import { useTheme } from '@mui/material/styles'
import { GetMessagesByAll } from 'src/services/api/dashboards/voice/VoiceDashboardAPIs'
import { useEffect } from 'react'

const MessageByAll = ({
  params,
  highlight,
  resultReportPermission,
  keywordsColor,
  setIsLoading,
  apiParams,
  quickViewData,
  setQuickViewData
}: {
  params: any
  highlight: string
  resultReportPermission: any
  keywordsColor: any
  apiParams: any
  isLoading: boolean
  setIsLoading: any
  quickViewData: any
  setQuickViewData: any
}) => {
  const theme = useTheme()

  const whiteColor = '#fff'
  const lineChartYellow = '#d4e157'
  const lineChartPrimary = '#456FCA'
  const lineChartWarning = '#ff9800'
  const labelColor = theme.palette.text.primary
  const borderColor = theme.palette.action.focus
  const gridLineColor = theme.palette.action.focus

  const { resultMessagesByAll, loadingMessagesByAll } = GetMessagesByAll(apiParams)

  useEffect(() => {
    setQuickViewData({
      ...quickViewData,
      resultMessagesByAll: resultMessagesByAll,
      loadingMessagesByAll: loadingMessagesByAll
    })
  }, [resultMessagesByAll, loadingMessagesByAll])

  return (
    <>
      {resultReportPermission?.includes('22') ? (
        <Grid item xs={12} md={12} id='chart3'>
          <MessagesByDays
            white={whiteColor}
            labelColor={labelColor}
            success={lineChartYellow}
            borderColor={borderColor}
            primary={lineChartPrimary}
            warning={lineChartWarning}
            gridLineColor={gridLineColor}
            chartId='Chart 3'
            params={params}
            result={resultMessagesByAll?.messageByDay}
            loading={loadingMessagesByAll}
            highlight={highlight === 'chart3' ? true : false}
            keywordsColor={keywordsColor}
            apiParams={apiParams}
            setIsLoading={setIsLoading}
          />
        </Grid>
      ) : (
        ''
      )}
      {resultReportPermission?.includes('23') ? (
        <Grid item xs={12} md={12} id='chart4'>
          <MessagesByTime
            white={whiteColor}
            labelColor={labelColor}
            success={lineChartYellow}
            borderColor={borderColor}
            primary={lineChartPrimary}
            warning={lineChartWarning}
            gridLineColor={gridLineColor}
            chartId='Chart 4'
            params={params}
            result={resultMessagesByAll?.messageByTime}
            loading={loadingMessagesByAll}
            highlight={highlight === 'chart4' ? true : false}
            keywordsColor={keywordsColor}
            apiParams={apiParams}
            setIsLoading={setIsLoading}
          />
        </Grid>
      ) : (
        ''
      )}
      {/* {resultReportPermission?.includes('24') ? (
        <Grid item xs={12} md={12} id='chart5'>
          <MessagesByDevices
            white={whiteColor}
            labelColor={labelColor}
            success={lineChartYellow}
            borderColor={borderColor}
            primary={lineChartPrimary}
            warning={lineChartWarning}
            gridLineColor={gridLineColor}
            chartId='Chart 5'
            params={params}
            result={resultMessagesByAll?.messageByDevice}
            loading={loadingMessagesByAll}
            highlight={highlight === 'chart5' ? true : false}
            keywordsColor={keywordsColor}
            apiParams={apiParams}
            setIsLoading={setIsLoading}
          />
        </Grid>
      ) : (
        ''
      )} */}

      {resultReportPermission?.includes('25') ? (
        <Grid item xs={12} md={12} id='chart6'>
          <MessagesByAccount
            white={whiteColor}
            labelColor={labelColor}
            success={lineChartYellow}
            borderColor={borderColor}
            primary={lineChartPrimary}
            warning={lineChartWarning}
            gridLineColor={gridLineColor}
            chartId='Chart 6'
            params={params}
            result={resultMessagesByAll?.messageByAccount}
            loading={loadingMessagesByAll}
            highlight={highlight === 'chart6' ? true : false}
            keywordsColor={keywordsColor}
            apiParams={apiParams}
            setIsLoading={setIsLoading}
          />
        </Grid>
      ) : (
        ''
      )}

      {resultReportPermission?.includes('26') ? (
        <Grid item xs={12} md={12} id='chart7'>
          <MessagesByChannel
            white={whiteColor}
            labelColor={labelColor}
            success={lineChartYellow}
            borderColor={borderColor}
            primary={lineChartPrimary}
            warning={lineChartWarning}
            gridLineColor={gridLineColor}
            params={params}
            chartId='Chart 7'
            result={resultMessagesByAll?.messageByChannel}
            loading={loadingMessagesByAll}
            highlight={highlight === 'chart7' ? true : false}
            keywordsColor={keywordsColor}
            apiParams={apiParams}
            setIsLoading={setIsLoading}
          />
        </Grid>
      ) : (
        ''
      )}

      {resultReportPermission?.includes('27') ? (
        <Grid item xs={12} md={12} id='chart8'>
          <MessagesBySentiment
            white={whiteColor}
            labelColor={labelColor}
            success={lineChartYellow}
            borderColor={borderColor}
            primary={lineChartPrimary}
            warning={lineChartWarning}
            gridLineColor={gridLineColor}
            params={params}
            chartId='Chart 8'
            result={resultMessagesByAll?.messageBySentiment}
            loading={loadingMessagesByAll}
            highlight={highlight === 'chart8' ? true : false}
            keywordsColor={keywordsColor}
            apiParams={apiParams}
            setIsLoading={setIsLoading}
          />
        </Grid>
      ) : (
        ''
      )}

      {resultReportPermission?.includes('28') ? (
        <Grid item xs={12} md={12} id='chart9'>
          <MessagesByBullyLevel
            white={whiteColor}
            labelColor={labelColor}
            success={lineChartYellow}
            borderColor={borderColor}
            primary={lineChartPrimary}
            warning={lineChartWarning}
            gridLineColor={gridLineColor}
            params={params}
            chartId='Chart 9'
            result={resultMessagesByAll?.messageByLevel}
            loading={loadingMessagesByAll}
            highlight={highlight === 'chart9' ? true : false}
            keywordsColor={keywordsColor}
            apiParams={apiParams}
            setIsLoading={setIsLoading}
          />
        </Grid>
      ) : (
        ''
      )}

      {resultReportPermission?.includes('29') ? (
        <Grid item xs={12} md={12} id='chart10'>
          <MessagesByBullyType
            white={whiteColor}
            labelColor={labelColor}
            success={lineChartYellow}
            borderColor={borderColor}
            primary={lineChartPrimary}
            warning={lineChartWarning}
            gridLineColor={gridLineColor}
            params={params}
            chartId='Chart 10'
            result={resultMessagesByAll?.messageByType}
            loading={loadingMessagesByAll}
            highlight={highlight === 'chart10' ? true : false}
            keywordsColor={keywordsColor}
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

export default MessageByAll
