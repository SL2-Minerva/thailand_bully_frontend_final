import { forwardRef, ReactElement, Ref } from 'react'
import Fade, { FadeProps } from '@mui/material/Fade'
import { Box, Card, Dialog, DialogContent, IconButton, Typography } from '@mui/material'
import Close from 'mdi-material-ui/Close'
import { useTheme } from '@mui/material/styles'
import DailyEngagement from './DailyEngagement'
import EngagementByDay from './EngagementByDay'
import EngagementByTime from './EngagementByTime'
import EngagementByDevice from './EngagementByDevice'
import EngagementByAccounts from './EngagementByAccount'
import EngagementByChannel from './EngagementByChannel'
import EngagementByType from './EngagementByType'
import DailyEngagementType from './DailyEngagementType'
import EngagementTypeByDay from './EngagementTypeByDay'
import EngagementTypeByDevice from './EngagementTypeByDevice'
import EngagementTypeByAccount from './EngagementTypeByAccount'
import EngagementTypeByChannel from './EngagementTypeByChannel'
import EngagementTypeByTime from './EngagementTypeByTime'
import { EngagementTypeColors } from 'src/utils/const'

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
  keywordsColor?: any
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
            <DailyEngagement
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
              keywordsColor={keywordsColor}
              apiParams={apiParams}
              isLoading={isLoading}
              setIsLoading={setIsLoading}
            />
          ) : chartId === 'chart3' ? (
            <EngagementByDay
              white={whiteColor}
              labelColor={labelColor}
              success={lineChartYellow}
              borderColor={borderColor}
              primary={lineChartPrimary}
              warning={lineChartWarning}
              gridLineColor={gridLineColor}
              params={params}
              chartId='Chart 3'
              resultBy={quickViewData?.resultEngagementByDay}
              loading={quickViewData?.loadingEngagementBy}
              keywordsColor={keywordsColor}
              apiParams={apiParams}
              setIsLoading={setIsLoading}
            />
          ) : chartId === 'chart4' ? (
            <EngagementByTime
              white={whiteColor}
              labelColor={labelColor}
              success={lineChartYellow}
              borderColor={borderColor}
              primary={lineChartPrimary}
              warning={lineChartWarning}
              gridLineColor={gridLineColor}
              params={params}
              chartId='Chart 4'
              resultBy={quickViewData?.resultEngagementByTime}
              loading={quickViewData?.loadingEngagementBy}
              keywordsColor={keywordsColor}
              apiParams={apiParams}
              setIsLoading={setIsLoading}
            />
          ) : chartId === 'chart5' ? (
            <EngagementByDevice
              white={whiteColor}
              labelColor={labelColor}
              success={lineChartYellow}
              borderColor={borderColor}
              primary={lineChartPrimary}
              warning={lineChartWarning}
              gridLineColor={gridLineColor}
              params={params}
              chartId='Chart 5'
              resultBy={quickViewData?.resultEngagementByDevice}
              loading={quickViewData?.loadingEngagementBy}
              keywordsColor={keywordsColor}
              apiParams={apiParams}
              setIsLoading={setIsLoading}
            />
          ) : chartId === 'chart6' ? (
            <EngagementByAccounts
              white={whiteColor}
              labelColor={labelColor}
              success={lineChartYellow}
              borderColor={borderColor}
              primary={lineChartPrimary}
              warning={lineChartWarning}
              gridLineColor={gridLineColor}
              chartId='Chart 6'
              params={params}
              loading={quickViewData?.loadingEngagementBy}
              resultBy={quickViewData?.resultEngagementByAccount}
              keywordsColor={keywordsColor}
              apiParams={apiParams}
              setIsLoading={setIsLoading}
            />
          ) : chartId === 'chart7' ? (
            <EngagementByChannel
              white={whiteColor}
              labelColor={labelColor}
              success={lineChartYellow}
              borderColor={borderColor}
              primary={lineChartPrimary}
              warning={lineChartWarning}
              gridLineColor={gridLineColor}
              chartId='Chart 7'
              params={params}
              loading={quickViewData?.loadingEngagementBy}
              resultBy={quickViewData?.resultEngagementChannel}
              keywordsColor={keywordsColor}
              apiParams={apiParams}
              setIsLoading={setIsLoading}
            />
          ) : chartId === 'chart8' ? (
            <EngagementByType
              white={whiteColor}
              labelColor={labelColor}
              success={lineChartYellow}
              borderColor={borderColor}
              primary={lineChartPrimary}
              warning={lineChartWarning}
              gridLineColor={gridLineColor}
              params={params}
              chartId='Chart 8'
              loading={quickViewData?.loadingEngagementBy}
              resultBy={quickViewData?.resultKeywordByEngagementType}
              keywordsColor={keywordsColor}
              apiParams={apiParams}
              setIsLoading={setIsLoading}
            />
          ) : chartId === 'chart10' ? (
            <DailyEngagementType
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
              resultBy={quickViewData?.resultEngagementPercentage}
              loading={quickViewData?.loadingEngagementType}
              keywordsColor={
                quickViewData?.loadingEngagementType && keywordsColor ? keywordsColor : EngagementTypeColors
              }
              apiParams={apiParams}
              isLoading={isLoading}
              setIsLoading={setIsLoading}
            />
          ) : chartId === 'chart11' ? (
            <EngagementTypeByDay
              white={whiteColor}
              labelColor={labelColor}
              success={lineChartYellow}
              borderColor={borderColor}
              primary={lineChartPrimary}
              warning={lineChartWarning}
              gridLineColor={gridLineColor}
              params={params}
              colorType='engagementType'
              chartId='Chart 11'
              loading={quickViewData?.loadingEngagementType}
              resultBy={quickViewData?.resultEngagementTypeByDay}
              keywordsColor={
                quickViewData?.loadingEngagementType && keywordsColor ? keywordsColor : EngagementTypeColors
              }
              apiParams={apiParams}
              setIsLoading={setIsLoading}
            />
          ) : chartId === 'chart12' ? (
            <EngagementTypeByTime
              white={whiteColor}
              labelColor={labelColor}
              success={lineChartYellow}
              borderColor={borderColor}
              primary={lineChartPrimary}
              warning={lineChartWarning}
              gridLineColor={gridLineColor}
              params={params}
              colorType='engagementType'
              chartId='Chart 12'
              loading={quickViewData?.loadingEngagementType}
              resultBy={quickViewData?.resultEngagementTypeByTime}
              keywordsColor={
                quickViewData?.loadingEngagementType && keywordsColor ? keywordsColor : EngagementTypeColors
              }
              apiParams={apiParams}
              setIsLoading={setIsLoading}
            />
          ) : chartId === 'chart13' ? (
            <EngagementTypeByDevice
              white={whiteColor}
              labelColor={labelColor}
              success={lineChartYellow}
              borderColor={borderColor}
              primary={lineChartPrimary}
              warning={lineChartWarning}
              gridLineColor={gridLineColor}
              params={params}
              colorType='engagementType'
              chartId='Chart 13'
              loading={quickViewData?.loadingEngagementType}
              resultBy={quickViewData?.resultEngagementTypeByDevice}
              keywordsColor={
                quickViewData?.loadingEngagementType && keywordsColor ? keywordsColor : EngagementTypeColors
              }
              apiParams={apiParams}
              setIsLoading={setIsLoading}
            />
          ) : chartId === 'chart14' ? (
            <EngagementTypeByAccount
              white={whiteColor}
              labelColor={labelColor}
              success={lineChartYellow}
              borderColor={borderColor}
              primary={lineChartPrimary}
              warning={lineChartWarning}
              gridLineColor={gridLineColor}
              params={params}
              chartId='Chart 14'
              loading={quickViewData?.loadingEngagementType}
              resultBy={quickViewData?.resultEngagementTypeByAccount}
              keywordsColor={
                quickViewData?.loadingEngagementType && keywordsColor ? keywordsColor : EngagementTypeColors
              }
              apiParams={apiParams}
              setIsLoading={setIsLoading}
            />
          ) : chartId === 'chart15' ? (
            <EngagementTypeByChannel
              white={whiteColor}
              labelColor={labelColor}
              success={lineChartYellow}
              borderColor={borderColor}
              primary={lineChartPrimary}
              warning={lineChartWarning}
              gridLineColor={gridLineColor}
              params={params}
              chartId='Chart 15'
              loading={quickViewData?.loadingEngagementType}
              resultBy={quickViewData?.resultEngagementTypeByChannel}
              keywordsColor={
                quickViewData?.loadingEngagementType && keywordsColor ? keywordsColor : EngagementTypeColors
              }
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
