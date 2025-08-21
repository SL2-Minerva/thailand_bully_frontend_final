import { forwardRef, ReactElement, Ref } from 'react'
import Fade, { FadeProps } from '@mui/material/Fade'
import { Box, Card, Dialog, DialogContent, IconButton, Typography } from '@mui/material'
import Close from 'mdi-material-ui/Close'
import { useTheme } from '@mui/material/styles'
import DailySenitment from './DailySentiment'
import SentimentByDay from './SentimentByDay'
import SentimentByTime from './SentimentByTime'
import SentimentByDevice from './SentimentByDevice'
import SentimentByAccount from './SentimentByAccount'
import SentimentByChannel from './SentitmentByChannel'
import SentimentByBullyLevel from './SentimentByBullyLevel'
import SentimentByBullyType from './SentimentByBullyType'

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
  quickViewData?: any
  apiParams: any
  isLoading: boolean
  setIsLoading: any
}

const QuickViewModal = (props: DialogInfoProps) => {
  const { show, setShow, params, chartId, quickViewData, apiParams, isLoading, setIsLoading  } = props

  const theme = useTheme()

  const whiteColor = '#fff'
  const lineChartYellow = '#d4e157'
  const lineChartPrimary = '#787EFF'
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
            <DailySenitment
              white={whiteColor}
              labelColor={labelColor}
              success={lineChartYellow}
              borderColor={borderColor}
              primary={lineChartPrimary}
              warning={lineChartWarning}
              gridLineColor={gridLineColor}
              params={params}
              type='transaction'
              chartId='Chart 2'
              resultFilterData={quickViewData?.resultFilterData}
              loadingFilterData={quickViewData?.loadingFilterData}
              apiParams={apiParams}
              isLoading={isLoading}
              setIsLoading={setIsLoading}
            />
          ) : chartId === 'chart3' ? (
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
              loading={quickViewData?.loadingSentimentByDay}
              resultBy={quickViewData?.resultSentimentByDay}
              apiParams={apiParams}
              setIsLoading={setIsLoading}
            />
          ) : chartId === 'chart4' ? (
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
              loading={quickViewData?.loadingSentimentByDay}
              resultBy={quickViewData?.resultSentimentByTime}
              apiParams={apiParams}
              setIsLoading={setIsLoading}
            />
          ) : chartId === 'chart5' ? (
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
              loading={quickViewData?.loadingSentimentByDay}
              resultBy={quickViewData?.resultSentimentByDevice}
              apiParams={apiParams}
              setIsLoading={setIsLoading}
            />
          ) : chartId === 'chart6' ? (
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
              loading={quickViewData?.loadingSentimentByDay}
              resultBy={quickViewData?.resultSentimentByAccount}
              apiParams={apiParams}
              setIsLoading={setIsLoading}
            />
          ) : chartId === 'chart7' ? (
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
              loading={quickViewData?.loadingSentimentByDay}
              resultBy={quickViewData?.resultSentimentByChannel}
              apiParams={apiParams}
              setIsLoading={setIsLoading}
            />
          ) : chartId === 'chart8' ? (
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
              loading={quickViewData?.loadingSentimentByDay}
              resultBy={quickViewData?.resultSentimentByBullyLevel}
              apiParams={apiParams}
              setIsLoading={setIsLoading}
            />
          ) : chartId === 'chart9' ? (
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
              loading={quickViewData?.loadingSentimentByDay}
              resultBy={quickViewData?.resultSentimentByBullyType}
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
