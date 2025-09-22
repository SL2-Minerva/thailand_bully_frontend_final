import { forwardRef, ReactElement, Ref } from 'react'
import Fade, { FadeProps } from '@mui/material/Fade'
import { Box, Card, Dialog, DialogContent, IconButton, Typography } from '@mui/material'
import Close from 'mdi-material-ui/Close'
import { useTheme } from '@mui/material/styles'
import DailyMessageGraph from './DailyMessageGraph'
import ChannelByDay from './ChannelBy/ChannelByDay'
import ChannelByTime from './ChannelBy/ChannelByTime'
import ChannelByDevice from './ChannelBy/ChannelByDevice'
import ChannelByAccount from './ChannelBy/ChannelByAccount'
import ChannelBySentimentComparison from './ChannelBy/ChannelBySentimentComparison'
import ChannelByBullyLevel from './ChannelBy/ChannelByBullyLevel'
import ChannelByBullyType from './ChannelBy/ChannelByBullyType'

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
  quickViewData: any
  keywordsColor: any
  apiParams: any
  isLoading: boolean
  setIsLoading: any
}

const QuickViewModal = (props: DialogInfoProps) => {
  const { show, setShow, params, chartId, quickViewData, keywordsColor, apiParams, isLoading, setIsLoading } = props

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
              params={params}
              type='channel'
              chartId='Chart 2'
              resultDailyChannel={quickViewData?.resultDailyChannel}
              loadingDailyChannel={quickViewData?.oadingDailyChannel}
              keywordsColor={keywordsColor}
              apiParams={apiParams}
              isLoading={isLoading}
              setIsLoading={setIsLoading}
            />
          ) : chartId === 'chart3' ? (
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
              keywordsColor={keywordsColor}
              resultBy={quickViewData?.resultChannelByDay}
              loading={quickViewData?.loadingChannelBy}
              apiParams={apiParams}
              setIsLoading={setIsLoading}
            />
          ) : chartId === 'chart4' ? (
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
              keywordsColor={keywordsColor}
              resultBy={quickViewData?.resultChannelByTime}
              loading={quickViewData?.loadingChannelBy}
              apiParams={apiParams}
              setIsLoading={setIsLoading}
            />
          ) : chartId === 'chart5' ? (
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
              keywordsColor={keywordsColor}
              resultBy={quickViewData?.resultChannelByDevice}
              loading={quickViewData?.loadingChannelBy}
              apiParams={apiParams}
              setIsLoading={setIsLoading}
            />
          ) : chartId === 'chart6' ? (
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
              keywordsColor={keywordsColor}
              resultBy={quickViewData?.resultChannelByAccount}
              loading={quickViewData?.loadingChannelBy}
              apiParams={apiParams}
              setIsLoading={setIsLoading}
            />
          ) : chartId === 'chart7' ? (
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
              keywordsColor={keywordsColor}
              resultBy={quickViewData?.resultChannelBySentiment}
              loading={quickViewData?.loadingChannelBy}
              apiParams={apiParams}
              setIsLoading={setIsLoading}
            />
          ) : chartId === 'chart8' ? (
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
              keywordsColor={keywordsColor}
              resultBy={quickViewData?.resultChannelByBullyLevel}
              loading={quickViewData?.loadingChannelBy}
              apiParams={apiParams}
              setIsLoading={setIsLoading}
            />
          ) : chartId === 'chart9' ? (
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
              keywordsColor={keywordsColor}
              resultBy={quickViewData?.resultChannelByBullyType}
              loading={quickViewData?.loadingChannelBy}
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
