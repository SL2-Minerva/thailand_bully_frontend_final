import { forwardRef, ReactElement, Ref } from 'react'
import Fade, { FadeProps } from '@mui/material/Fade'
import { Box, Card, Dialog, DialogContent, IconButton, Typography } from '@mui/material'
import Close from 'mdi-material-ui/Close'
import DailyMessageGraph from './DailyMessageGraph'
import { useTheme } from '@mui/material/styles'
import MessagesByDays from './MessagesBy/MessageByDays'
import MessagesByTime from './MessagesBy/MessageByTime'
import MessagesByDevices from './MessagesBy/MessageByDevice'
import MessagesByAccount from './MessagesBy/MessageByAccount'
import MessagesByChannel from './MessagesBy/MessagesByChannel'
import MessagesBySentiment from './MessagesBy/MessagesBySentiment'
import MessagesByBullyLevel from './MessagesBy/MessageByBullyLevel'
import MessagesByBullyType from './MessagesBy/MessageByBullyType'

const Transition = forwardRef(function Transition(
  props: FadeProps & { children?: ReactElement<any, any> },
  ref: Ref<unknown>
) {
  return <Fade ref={ref} {...props} />
})

interface DialogInfoProps {
  show: boolean
  setShow: any
  params?: any
  chartId?: string
  keywordsColor?: any
  quickViewData: any
  apiParams: any
  isLoading: boolean
  setIsLoading: any
  setQuickViewData: any
}

const QuickViewModal = (props: DialogInfoProps) => {
  const {
    show,
    setShow,
    params,
    chartId,
    keywordsColor,
    quickViewData,
    apiParams,
    isLoading,
    setIsLoading,
    setQuickViewData
  } = props

  const theme = useTheme()

  const whiteColor = '#fff'
  const lineChartYellow = '#d4e157'
  const lineChartPrimary = '#456FCA'
  const lineChartWarning = '#ff9800'
  const labelColor = theme.palette.text.primary
  const borderColor = theme.palette.action.focus
  const gridLineColor = theme.palette.action.focus

  const onCloseDialog = () => {
    setShow(false)
  }

  return (
    <Card>
      <Dialog
        fullWidth
        open={show}
        maxWidth='md'
        scroll='body'
        onClose={onCloseDialog}
        TransitionComponent={Transition}
      >
        <DialogContent sx={{ pb: 6, pt: { xs: 8, sm: 12.5 }, position: 'relative' }}>
          <IconButton size='small' onClick={onCloseDialog} sx={{ position: 'absolute', right: '1rem', top: '1rem' }}>
            <Close />
          </IconButton>
          <Box sx={{ mb: 8, textAlign: 'center' }}>
            <Typography variant='h5' sx={{ mb: 3, lineHeight: '2rem' }}>
              QuickView
            </Typography>
          </Box>
          {chartId === 'chart2' ? (
            <DailyMessageGraph
              type='message'
              params={params}
              chartId='Chart 2'
              keywordsColor={keywordsColor}
              apiParams={apiParams}
              isLoading={isLoading}
              setIsLoading={setIsLoading}
              quickViewData={quickViewData}
              setQuickViewData={setQuickViewData}
            />
          ) : chartId === 'chart3' ? (
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
              keywordsColor={keywordsColor}
              result={quickViewData?.resultMessagesByAll?.messageByDay}
              loading={quickViewData?.oadingMessagesByAll}
              apiParams={apiParams}
              setIsLoading={setIsLoading}
            />
          ) : chartId === 'chart4' ? (
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
              keywordsColor={keywordsColor}
              result={quickViewData?.resultMessagesByAll?.messageByTime}
              loading={quickViewData?.loadingMessagesByAll}
              apiParams={apiParams}
              setIsLoading={setIsLoading}
            />
          ) : chartId === 'chart5' ? (
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
              keywordsColor={keywordsColor}
              result={quickViewData?.resultMessagesByAll?.messageByDevice}
              loading={quickViewData?.loadingMessagesByAll}
              apiParams={apiParams}
              setIsLoading={setIsLoading}
            />
          ) : chartId === 'chart6' ? (
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
              keywordsColor={keywordsColor}
              result={quickViewData?.resultMessagesByAll?.messageByAccount}
              loading={quickViewData?.loadingMessagesByAll}
              apiParams={apiParams}
              setIsLoading={setIsLoading}
            />
          ) : chartId === 'chart7' ? (
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
              keywordsColor={keywordsColor}
              result={quickViewData?.resultMessagesByAll?.messageByChannel}
              loading={quickViewData?.loadingMessagesByAll}
              apiParams={apiParams}
              setIsLoading={setIsLoading}
            />
          ) : chartId === 'chart8' ? (
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
              keywordsColor={keywordsColor}
              result={quickViewData?.resultMessagesByAll?.messageBySentiment}
              loading={quickViewData?.loadingMessagesByAll}
              apiParams={apiParams}
              setIsLoading={setIsLoading}
            />
          ) : chartId === 'chart9' ? (
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
              keywordsColor={keywordsColor}
              result={quickViewData?.resultMessagesByAll?.messageByLevel}
              loading={quickViewData?.loadingMessagesByAll}
              apiParams={apiParams}
              setIsLoading={setIsLoading}
            />
          ) : chartId === 'chart10' ? (
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
              keywordsColor={keywordsColor}
              result={quickViewData?.resultMessagesByAll?.messageByType}
              loading={quickViewData?.loadingMessagesByAll}
              apiParams={apiParams}
              setIsLoading={setIsLoading}
            />
          ) : (
            ''
          )}
        </DialogContent>
      </Dialog>
    </Card>
  )
}

export default QuickViewModal
