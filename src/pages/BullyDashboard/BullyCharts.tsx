import { useEffect, useState } from 'react'
import { Backdrop, Button, CircularProgress, Grid, useTheme } from '@mui/material'

import {
  GetBullyDailyBy,
  GetBullyBy,
  GetDailyTypeBy,
  GetBullyTypeBy
} from 'src/services/api/dashboards/bully/BullyDashboardAPI'

import BullyLevelByAccount from './BullyLevelByAccount'
import BullyLevelByChannel from './BullyLevelByChannel'
import BullyLevelByDay from './BullyLevelByDay'

// import BullyLevelByDevice from './BullyLevelByDevice'
import BullyLevelBySentiment from './BullyLevelBySentiment'
import BullyLevelByTime from './BullyLevelByTime'
import BullyTypeByAccount from './BullyTypeByAccount'
import BullyTypeByChannel from './BullyTypeByChannel'
import BullyTypeByDay from './BullyTypeByDay'

// import BullyTypeByDevice from './BullyTypeByDevice'
import BullyTypeBySentiment from './BullyTypeBySentiment'
import BullyTypeByTime from './BullyTypeByTime'
import DailyMessgeByBully from './DailyMessageByBully'
import DailyMessgesByBullyType from './DailyMessageByBullyType'
import PercentageOfBully from './PercentageOfBully'
import PercentageOfBullyType from './PercentageOfBullyType'

// import QuickView from './QuickView'

// import QuickViewModal from './QuickViewModal'
import ShareOfChannel from './ShareOfChannel'

interface Props {
  params: any
  resultReportPermission: any
}

const BullyCharts = (data: Props) => {
  const { params, resultReportPermission } = data
  const theme = useTheme()
  const [apiParams, setApiParams] = useState<any>()
  const [isLoading, setIsLoading] = useState(false)

  // const [showQuickView, setShowQuickView] = useState<boolean>(false)
  const [bullyType, setBullyType] = useState<string>('level')

  // const [highlight, setHighlight] = useState<string>('')
  const [highlight] = useState<string>('')

  const whiteColor = '#fff'
  const lineChartYellow = '#d4e157'
  const lineChartPrimary = '#456FCA'
  const lineChartWarning = '#ff9800'
  const labelColor = theme.palette.text.primary
  const borderColor = theme.palette.action.focus
  const gridLineColor = theme.palette.action.focus

  const { resultBullyLevelPercentage, resultFilterData, loadingFilterData } = GetBullyDailyBy(apiParams)
  const {
    resultBullyByAccount,
    resultBullyByChannel,
    resultBullyByDay,

    // resultBullyByDevice,
    resultBullyBySentiment,
    resultBullyByTime,
    loadingBullyBy
  } = GetBullyBy(apiParams)

  const {
    resultBullyTypeByAccount,
    resultBullyTypeByChannel,
    resultBullyTypeByDay,

    // resultBullyTypeByDevice,
    resultBullyTypeBySenitment,
    resultBullyTypeByTime,
    loadingBullyTypeBy,
    resultBullyTypeByDaily,
    resultBullyTypeByPercentage
  } = GetDailyTypeBy(apiParams)

  const {
    resultShareOfChannelBullyLevels,
    resultShareOfChannelChart,
    resultShareOfChannelChartBullyLevel,
    resultShareOfChannelPlatform,
    loadingShareOfChannelChart
  } = GetBullyTypeBy(apiParams)

  // const quickViewData = {
  //   resultFilterData: resultFilterData,
  //   loadingFilterData: loadingFilterData,
  //   resultBullyByAccount: resultBullyByAccount,
  //   resultBullyByChannel: resultBullyByChannel,
  //   resultBullyByDay: resultBullyByDay,
  //   resultBullyByDevice: resultBullyByDevice,
  //   resultBullyBySentiment: resultBullyBySentiment,
  //   resultBullyByTime: resultBullyByTime,
  //   loadingBullyBy: loadingBullyBy,
  //   resultBullyTypeByAccount: resultBullyTypeByAccount,
  //   resultBullyTypeByChannel: resultBullyTypeByChannel,
  //   resultBullyTypeByDay: resultBullyTypeByDay,
  //   resultBullyTypeByDevice: resultBullyTypeByDevice,
  //   resultBullyTypeBySenitment: resultBullyTypeBySenitment,
  //   resultBullyTypeByTime: resultBullyTypeByTime,
  //   resultBullyTypeByDaily: resultBullyTypeByDaily,
  //   loadingBullyTypeBy: loadingBullyTypeBy
  // }

  const handleBullyType = (data: string) => {
    setBullyType(data)
  }

  useEffect(() => {
    setBullyType('level')
  }, [resultShareOfChannelChart, resultShareOfChannelPlatform])

  useEffect(() => {
    if (params?.period !== 'customrange') {
      setApiParams({
        campaign_id: params?.campaign,
        source: params?.platformId,
        start_date: params?.date,
        end_date: params?.endDate,
        period: params?.period,
        fillter_keywords: params?.keywordIds
      })
    }
    if (
      params?.period === 'customrange' &&
      params?.endDate &&
      params?.previousEndDate &&
      params?.date !== params?.endDate &&
      params?.previousDate !== params?.previousEndDate
    ) {
      setApiParams({
        campaign_id: params?.campaign,
        source: params?.platformId,
        start_date: params?.date,
        end_date: params?.endDate,
        period: params?.period,
        start_date_period: params?.previousDate,
        end_date_period: params?.previousEndDate,
        fillter_keywords: params?.keywordIds
      })
    }
  }, [params])

  return (
    <>
      <Backdrop sx={{ color: '#fff', zIndex: theme => theme.zIndex.drawer + 1 }} open={isLoading}>
        <CircularProgress color='inherit' />
      </Backdrop>
      <Grid container spacing={3} pt={2} pl={2}>
        {resultReportPermission?.includes('93') ? (
          <Grid id='chart1' item xs={12} md={4} mt={2}>
            <PercentageOfBully
              resultBullyLevelPercentage={resultBullyLevelPercentage}
              loadingBullyLevelPercentage={loadingFilterData}
              params={params}
              type='level'
              chartId='Chart 1'
              highlight={highlight === 'chart1' ? true : false}
            />
          </Grid>
        ) : (
          ''
        )}
        {resultReportPermission?.includes('94') ? (
          <Grid id='chart2' item xs={12} md={8} mt={2}>
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
              highlight={highlight === 'chart2' ? true : false}
              resultFilterData={resultFilterData}
              loadingFilterData={loadingFilterData}
              apiParams={apiParams}
              isLoading={isLoading}
              setIsLoading={setIsLoading}
            />
          </Grid>
        ) : (
          ''
        )}
        {resultReportPermission?.includes('95') ? (
          <Grid item xs={12} md={12} id='chart3'>
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
              highlight={highlight === 'chart3' ? true : false}
              resultBy={resultBullyByDay}
              loading={loadingBullyBy}
              apiParams={apiParams}
              setIsLoading={setIsLoading}
            />
          </Grid>
        ) : (
          ''
        )}
        {resultReportPermission?.includes('96') ? (
          <Grid item xs={12} md={12} id='chart4'>
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
              highlight={highlight === 'chart4' ? true : false}
              resultBy={resultBullyByTime}
              loading={loadingBullyBy}
              apiParams={apiParams}
              setIsLoading={setIsLoading}
            />
          </Grid>
        ) : (
          ''
        )}
        {/* {resultReportPermission?.includes('97') ? (
          <Grid item xs={12} md={12} id='chart5'>
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
              highlight={highlight === 'chart5' ? true : false}
              resultBy={resultBullyByDevice}
              loading={loadingBullyBy}
              apiParams={apiParams}
              setIsLoading={setIsLoading}
            />
          </Grid>
        ) : (
          ''
        )} */}
        {resultReportPermission?.includes('98') ? (
          <Grid item xs={12} md={12} id='chart6'>
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
              highlight={highlight === 'chart6' ? true : false}
              resultBy={resultBullyByAccount}
              loading={loadingBullyBy}
              apiParams={apiParams}
              setIsLoading={setIsLoading}
            />
          </Grid>
        ) : (
          ''
        )}
        {resultReportPermission?.includes('99') ? (
          <Grid item xs={12} md={12} id='chart7'>
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
              highlight={highlight === 'chart7' ? true : false}
              resultBy={resultBullyByChannel}
              loading={loadingBullyBy}
              apiParams={apiParams}
              setIsLoading={setIsLoading}
            />
          </Grid>
        ) : (
          ''
        )}
        {resultReportPermission?.includes('100') ? (
          <Grid item xs={12} md={12} id='chart8'>
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
              highlight={highlight === 'chart8' ? true : false}
              resultBy={resultBullyBySentiment}
              loading={loadingBullyBy}
              apiParams={apiParams}
              setIsLoading={setIsLoading}
            />
          </Grid>
        ) : (
          ''
        )}
        {resultReportPermission?.includes('101') ? (
          <Grid id='chart9' item xs={12} md={4}>
            <PercentageOfBullyType
              params={params}
              type='type'
              chartId='Chart 9'
              highlight={highlight === 'chart9' ? true : false}
              resultBullyTypePercentage={resultBullyTypeByPercentage}
              loadingBullyTypePercentage={loadingBullyTypeBy}
            />
          </Grid>
        ) : (
          ''
        )}
        {resultReportPermission?.includes('102') ? (
          <Grid id='chart10' item xs={12} md={8}>
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
              highlight={highlight === 'chart10' ? true : false}
              resultBullyTypeFilterData={resultBullyTypeByDaily}
              loadingBullyTypeFilterData={loadingBullyTypeBy}
              apiParams={apiParams}
              isLoading={isLoading}
              setIsLoading={setIsLoading}
            />
          </Grid>
        ) : (
          ''
        )}
        {resultReportPermission?.includes('103') ? (
          <Grid item xs={12} md={12} id='chart11'>
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
              highlight={highlight === 'chart11' ? true : false}
              loading={loadingBullyTypeBy}
              resultBy={resultBullyTypeByDay}
              apiParams={apiParams}
              setIsLoading={setIsLoading}
            />
          </Grid>
        ) : (
          ''
        )}
        {resultReportPermission?.includes('104') ? (
          <Grid item xs={12} md={12} id='chart12'>
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
              highlight={highlight === 'chart12' ? true : false}
              loading={loadingBullyTypeBy}
              resultBy={resultBullyTypeByTime}
              apiParams={apiParams}
              setIsLoading={setIsLoading}
            />
          </Grid>
        ) : (
          ''
        )}
        {/* {resultReportPermission?.includes('105') ? (
          <Grid item xs={12} md={12} id='chart13'>
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
              highlight={highlight === 'chart13' ? true : false}
              loading={loadingBullyTypeBy}
              resultBy={resultBullyTypeByDevice}
              apiParams={apiParams}
              setIsLoading={setIsLoading}
            />
          </Grid>
        ) : (
          ''
        )} */}
        {resultReportPermission?.includes('106') ? (
          <Grid item xs={12} md={12} id='chart14'>
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
              highlight={highlight === 'chart14' ? true : false}
              loading={loadingBullyTypeBy}
              resultBy={resultBullyTypeByAccount}
              apiParams={apiParams}
              setIsLoading={setIsLoading}
            />
          </Grid>
        ) : (
          ''
        )}
        {resultReportPermission?.includes('107') ? (
          <Grid item xs={12} md={12} id='chart15'>
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
              highlight={highlight === 'chart15' ? true : false}
              loading={loadingBullyTypeBy}
              resultBy={resultBullyTypeByChannel}
              apiParams={apiParams}
              setIsLoading={setIsLoading}
            />
          </Grid>
        ) : (
          ''
        )}
        {resultReportPermission?.includes('108') ? (
          <Grid item xs={12} md={12} id='chart16'>
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
              highlight={highlight === 'chart16' ? true : false}
              loading={loadingBullyTypeBy}
              resultBy={resultBullyTypeBySenitment}
              apiParams={apiParams}
              setIsLoading={setIsLoading}
            />
          </Grid>
        ) : (
          ''
        )}
        {resultReportPermission?.includes('109') ? (
          <>
            <Grid container spacing={3} mt={2}>
              <Grid item xs={12} md={12} sx={{ display: 'flex', justifyContent: 'end' }}>
                <Button
                  variant='contained'
                  color={bullyType === 'level' ? 'warning' : 'inherit'}
                  size='medium'
                  sx={{ marginRight: '20px' }}
                  onClick={() => {
                    handleBullyType('level')
                  }}
                >
                  <span style={{ color: bullyType === 'level' ? 'white' : '#626376' }}>Bully Level</span>
                </Button>
                <Button
                  variant='contained'
                  color={bullyType === 'type' ? 'warning' : 'inherit'}
                  size='medium'
                  sx={{ marginRight: '20px' }}
                  onClick={() => {
                    handleBullyType('type')
                  }}
                >
                  <span style={{ color: bullyType === 'all' ? 'white' : '#626376' }}>Bully Type</span>
                </Button>
              </Grid>
            </Grid>
            <Grid id='chart17' item xs={12} mt={3}>
              {bullyType === 'level' ? (
                <ShareOfChannel
                  resultShareOfChannel={resultShareOfChannelPlatform}
                  resultShareofChannelPlatform={resultShareOfChannelChart}
                  loading={loadingShareOfChannelChart}
                  loadingChannel={loadingShareOfChannelChart}
                  type={bullyType}
                  chartId={
                    <span>
                      Chart 17 <br /> Report Level 2(6.2.021)
                    </span>
                  }
                  highlight={highlight === 'chart17' ? true : false}
                  title='Bully Level: Share of Channel'
                />
              ) : (
                <ShareOfChannel
                  resultShareOfChannel={resultShareOfChannelChartBullyLevel}
                  resultShareofChannelPlatform={resultShareOfChannelBullyLevels}
                  loading={loadingShareOfChannelChart}
                  loadingChannel={loadingShareOfChannelChart}
                  type={bullyType}
                  chartId={
                    <span>
                      Chart 18
                      <br /> Report Level 2(6.2.022)
                    </span>
                  }
                  highlight={highlight === 'chart17' ? true : false}
                  title='Bully Type: Share of Channel'
                />
              )}
            </Grid>
          </>
        ) : (
          ''
        )}

        {/* <QuickView setHighlight={setHighlight} setShowQuickView={setShowQuickView} /> */}

        {/* <QuickViewModal
          show={showQuickView}
          setShow={setShowQuickView}
          params={params}
          chartId={highlight}
          quickViewData={quickViewData}
          apiParams={apiParams}
          isLoading={isLoading}
          setIsLoading={setIsLoading}
        /> */}
      </Grid>
    </>
  )
}

export default BullyCharts
