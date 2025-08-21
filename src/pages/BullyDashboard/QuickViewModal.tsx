import { forwardRef, ReactElement, Ref } from 'react'
import Fade, { FadeProps } from '@mui/material/Fade'
import { Box, Card, Dialog, DialogContent, IconButton, Typography } from '@mui/material'
import Close from 'mdi-material-ui/Close'
import { useTheme } from '@mui/material/styles'
import DailyMessgeByBully from './DailyMessageByBully'
import BullyLevelByDay from './BullyLevelByDay'
import BullyLevelByTime from './BullyLevelByTime'
import BullyLevelByDevice from './BullyLevelByDevice'
import BullyLevelByAccount from './BullyLevelByAccount'
import BullyLevelBySentiment from './BullyLevelBySentiment'
import BullyLevelByChannel from './BullyLevelByChannel'
import DailyMessgesByBullyType from './DailyMessageByBullyType'
import BullyTypeByDay from './BullyTypeByDay'
import BullyTypeBySentiment from './BullyTypeBySentiment'
import BullyTypeByChannel from './BullyTypeByChannel'
import BullyTypeByAccount from './BullyTypeByAccount'
import BullyTypeByDevice from './BullyTypeByDevice'
import BullyTypeByTime from './BullyTypeByTime'

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
  const { show, setShow, params, chartId, quickViewData, apiParams, isLoading, setIsLoading } = props

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
            <DailyMessgeByBully
              white={whiteColor}
              labelColor={labelColor}
              success={lineChartYellow}
              borderColor={borderColor}
              primary={lineChartPrimary}
              warning={lineChartWarning}
              gridLineColor={gridLineColor}
              params={params}
              type='level'
              chartId='Chart 2'
              resultFilterData={quickViewData?.resultFilterData}
              loadingFilterData={quickViewData?.loadingFilterData}
              apiParams={apiParams}
              isLoading={isLoading}
              setIsLoading={setIsLoading}
            />
          ) : chartId === 'chart3' ? (
            <BullyLevelByDay
              white={whiteColor}
              labelColor={labelColor}
              success={lineChartYellow}
              borderColor={borderColor}
              primary={lineChartPrimary}
              warning={lineChartWarning}
              gridLineColor={gridLineColor}
              params={params}
              chartId='Chart 3'
              colorType='bullyDashboard'
              resultBy={quickViewData?.resultBullyByDay}
              loading={quickViewData?.loadingBullyBy}
              apiParams={apiParams}
              setIsLoading={setIsLoading}
            />
          ) : chartId === 'chart4' ? (
            <BullyLevelByTime
              white={whiteColor}
              labelColor={labelColor}
              success={lineChartYellow}
              borderColor={borderColor}
              primary={lineChartPrimary}
              warning={lineChartWarning}
              gridLineColor={gridLineColor}
              params={params}
              chartId='Chart 4'
              colorType='bullyDashboard'
              resultBy={quickViewData?.resultBullyByTime}
              loading={quickViewData?.loadingBullyBy}
              apiParams={apiParams}
              setIsLoading={setIsLoading}
            />
          ) : chartId === 'chart5' ? (
            <BullyLevelByDevice
              white={whiteColor}
              labelColor={labelColor}
              success={lineChartYellow}
              borderColor={borderColor}
              primary={lineChartPrimary}
              warning={lineChartWarning}
              gridLineColor={gridLineColor}
              chartId='Chart 5'
              colorType='bullyDashboard'
              params={params}
              loading={quickViewData?.loadingBullyBy}
              resultBy={quickViewData?.resultBullyByDevice}
              apiParams={apiParams}
              setIsLoading={setIsLoading}
            />
          ) : chartId === 'chart6' ? (
            <BullyLevelByAccount
              white={whiteColor}
              labelColor={labelColor}
              success={lineChartYellow}
              borderColor={borderColor}
              primary={lineChartPrimary}
              warning={lineChartWarning}
              gridLineColor={gridLineColor}
              chartId='Chart 6'
              colorType='bullyDashboard'
              params={params}
              loading={quickViewData?.loadingBullyBy}
              resultBy={quickViewData?.resultBullyByAccount}
              apiParams={apiParams}
              setIsLoading={setIsLoading}
            />
          ) : chartId === 'chart7' ? (
            <BullyLevelByChannel
              white={whiteColor}
              labelColor={labelColor}
              success={lineChartYellow}
              borderColor={borderColor}
              primary={lineChartPrimary}
              warning={lineChartWarning}
              gridLineColor={gridLineColor}
              chartId='Chart 7'
              colorType='bullyDashboard'
              params={params}
              loading={quickViewData?.loadingBullyBy}
              resultBy={quickViewData?.resultBullyByChannel}
              apiParams={apiParams}
              setIsLoading={setIsLoading}
            />
          ) : chartId === 'chart8' ? (
            <BullyLevelBySentiment
              white={whiteColor}
              labelColor={labelColor}
              success={lineChartYellow}
              borderColor={borderColor}
              primary={lineChartPrimary}
              warning={lineChartWarning}
              gridLineColor={gridLineColor}
              chartId='Chart 8'
              colorType='bullyDashboard'
              params={params}
              loading={quickViewData?.loadingBullyBy}
              resultBy={quickViewData?.resultBullyBySentiment}
              apiParams={apiParams}
              setIsLoading={setIsLoading}
            />
          ) : chartId === 'chart10' ? (
            <DailyMessgesByBullyType
              white={whiteColor}
              labelColor={labelColor}
              success={lineChartYellow}
              borderColor={borderColor}
              primary={lineChartPrimary}
              warning={lineChartWarning}
              gridLineColor={gridLineColor}
              params={params}
              type='type'
              chartId='Chart 10'
              resultBullyTypeFilterData={quickViewData?.resultBullyTypeByDaily}
              loadingBullyTypeFilterData={quickViewData?.loadingBullyTypeBy}
              apiParams={apiParams}
              isLoading={isLoading}
              setIsLoading={setIsLoading}
            />
          ) : chartId === 'chart11' ? (
            <BullyTypeByDay
              white={whiteColor}
              labelColor={labelColor}
              success={lineChartYellow}
              borderColor={borderColor}
              primary={lineChartPrimary}
              warning={lineChartWarning}
              gridLineColor={gridLineColor}
              chartId='Chart 11'
              colorType='bullyDashboard'
              params={params}
              loading={quickViewData?.loadingBullyTypeBy}
              resultBy={quickViewData?.resultBullyTypeByDay}
              apiParams={apiParams}
              setIsLoading={setIsLoading}
            />
          ) : chartId === 'chart12' ? (
            <BullyTypeByTime
              white={whiteColor}
              labelColor={labelColor}
              success={lineChartYellow}
              borderColor={borderColor}
              primary={lineChartPrimary}
              warning={lineChartWarning}
              gridLineColor={gridLineColor}
              chartId='Chart 12'
              colorType='bullyDashboard'
              params={params}
              loading={quickViewData?.loadingBullyTypeBy}
              resultBy={quickViewData?.resultBullyTypeByTime}
              apiParams={apiParams}
              setIsLoading={setIsLoading}
            />
          ) : chartId === 'chart13' ? (
            <BullyTypeByDevice
              white={whiteColor}
              labelColor={labelColor}
              success={lineChartYellow}
              borderColor={borderColor}
              primary={lineChartPrimary}
              warning={lineChartWarning}
              gridLineColor={gridLineColor}
              chartId='Chart 13'
              colorType='bullyDashboard'
              params={params}
              loading={quickViewData?.loadingBullyTypeBy}
              resultBy={quickViewData?.resultBullyTypeByDevice}
              apiParams={apiParams}
              setIsLoading={setIsLoading}
            />
          ) : chartId === 'chart14' ? (
            <BullyTypeByAccount
              white={whiteColor}
              labelColor={labelColor}
              success={lineChartYellow}
              borderColor={borderColor}
              primary={lineChartPrimary}
              warning={lineChartWarning}
              gridLineColor={gridLineColor}
              chartId='Chart 14'
              colorType='bullyDashboard'
              params={params}
              loading={quickViewData?.loadingBullyTypeBy}
              resultBy={quickViewData?.resultBullyTypeByAccount}
              apiParams={apiParams}
              setIsLoading={setIsLoading}
            />
          ) : chartId === 'chart15' ? (
            <BullyTypeByChannel
              white={whiteColor}
              labelColor={labelColor}
              success={lineChartYellow}
              borderColor={borderColor}
              primary={lineChartPrimary}
              warning={lineChartWarning}
              gridLineColor={gridLineColor}
              chartId='Chart 15'
              colorType='bullyDashboard'
              params={params}
              loading={quickViewData?.loadingBullyTypeBy}
              resultBy={quickViewData?.resultBullyTypeByChannel}
              apiParams={apiParams}
              setIsLoading={setIsLoading}
            />
          ) : chartId === 'chart16' ? (
            <BullyTypeBySentiment
              white={whiteColor}
              labelColor={labelColor}
              success={lineChartYellow}
              borderColor={borderColor}
              primary={lineChartPrimary}
              warning={lineChartWarning}
              gridLineColor={gridLineColor}
              params={params}
              chartId='Chart 16'
              colorType='bullyDashboard'
              loading={quickViewData?.loadingBullyTypeBy}
              resultBy={quickViewData?.resultBullyTypeBySenitment}
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
