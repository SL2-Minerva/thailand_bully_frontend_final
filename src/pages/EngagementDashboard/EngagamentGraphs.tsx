// import { Backdrop, Button, CircularProgress, Grid } from '@mui/material'
import { Backdrop, CircularProgress, Grid } from '@mui/material'
import { useEffect, useState } from 'react'
import { EngagementTransChartColor, EngagementTypeColors } from 'src/utils/const'

import {
  EngagementTypeBy,
  FilterByCampaignId,
  GetEngagementBy,
  GetEngagementComparisonBy
} from 'src/services/api/dashboards/engagement/EngagementApi'

import DailyEngagement from './DailyEngagement'
import PercentageOfEngangement from './PercentageOfEngagement'
import { useTheme } from '@mui/material/styles'
import TotalEngagement from './TotalEngagement'
import PeriodComparisonChart from './PeriodComparisonChart'
import EngagementTypeComparison from './EngagementTypeComparison'
import EngagmentComparisonChart from './EngagmentComparisonChart'
import EngagementSummary from './EngagementSummary'

// import QuickView from './QuickView'
import DailyEngagementType from './DailyEngagementType'
import EngagementByDay from './EngagementByDay'
import EngagementByTime from './EngagementByTime'

// import EngagementByDevice from './EngagementByDevice'
import EngagementByAccounts from './EngagementByAccount'
import EngagementByChannel from './EngagementByChannel'
import PercentageOfEngangementType from './PercentageEngagementType'
import EngagementTypeByDay from './EngagementTypeByDay'
import EngagementTypeByTime from './EngagementTypeByTime'

// import EngagementTypeByDevice from './EngagementTypeByDevice'
import EngagementTypeByAccount from './EngagementTypeByAccount'
import EngagementTypeByChannel from './EngagementTypeByChannel'
import PeriodComparisonChartSentiment from './PeriodComparisonChartSentiment'
import EngagementByType from './EngagementByType'

// import QuickViewModal from './QuickViewModal'

interface Props {
  params: any
  resultReportPermission: any
  keywordGraphColors: any
}

const EngagementGraphs = (data: Props) => {
  const { params, resultReportPermission, keywordGraphColors } = data

  const theme = useTheme()
  const whiteColor = '#fff'
  const lineChartYellow = '#d4e157'
  const lineChartPrimary = '#456FCA'
  const lineChartWarning = '#ff9800'
  const labelColor = theme.palette.text.primary
  const borderColor = theme.palette.action.focus
  const gridLineColor = theme.palette.action.focus

  // const [showQuickView, setShowQuickView] = useState<boolean>(false)

  const [highlight] = useState<string>('')

  // const [highlight, setHighlight] = useState<string>('')
  // const [topKeyword, setTopKeyword] = useState<string>('all')
  const [topKeyword] = useState<string>('all')
  const [apiParams, setApiParams] = useState<any>()
  const [isLoading, setIsLoading] = useState(false)
  const [page, setPage] = useState(1)
  const [pageCount, setPageCount] = useState<number>(1)

  const { resultFilterData, loadingFilterData } = FilterByCampaignId(apiParams)

  const {
    resultEngagementByTime,
    resultEngagementByAccount,

    // resultEngagementByDevice,
    resultEngagementByDay,
    resultEngagementChannel,
    resultKeywordByEngagementType,
    loadingEngagementBy
  } = GetEngagementBy(apiParams)

  const {
    resultEngagementPercentage,
    resultEngagementTypeByAccount,
    resultEngagementTypeByChannel,
    resultEngagementTypeByDay,

    // resultEngagementTypeByDevice,
    resultEngagementTypeByTime,
    loadingEngagementType
  } = EngagementTypeBy(apiParams)

  const {
    resultTotalEngagement,
    resultComparison,
    resultEngagementComparison,
    resultPeriodComparisonBySenitment,
    loadingPeriodComparisonBySenitment,
    resultPeriodComparisonByChannel
  } = GetEngagementComparisonBy(apiParams)

  // const quickViewData = {
  //   resultFilterData: resultFilterData,
  //   loadingFilterData: loadingFilterData,
  //   resultEngagementByTime: resultEngagementByTime,
  //   resultEngagementByAccount: resultEngagementByAccount,
  //   resultEngagementByDevice: resultEngagementByDevice,
  //   resultEngagementByDay: resultEngagementByDay,
  //   resultEngagementChannel: resultEngagementChannel,
  //   resultKeywordByEngagementType: resultKeywordByEngagementType,
  //   loadingEngagementBy: loadingEngagementBy,
  //   resultEngagementPercentage: resultEngagementPercentage,
  //   resultEngagementTypeByAccount: resultEngagementTypeByAccount,
  //   resultEngagementTypeByChannel: resultEngagementTypeByChannel,
  //   resultEngagementTypeByDay: resultEngagementTypeByDay,
  //   resultEngagementTypeByDevice: resultEngagementTypeByDevice,
  //   resultEngagementTypeByTime: resultEngagementTypeByTime,
  //   loadingEngagementType: loadingEngagementType
  // }

  // const handleTopKeywords = (data: string) => {
  //   setTopKeyword(data)
  // }

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
      <Grid container spacing={3} mt={1}>
        {resultReportPermission?.includes('57') ? (
          <Grid id='chart1' item xs={12} md={4}>
            <PercentageOfEngangement
              resultFilterData={resultFilterData}
              loadingFilterData={loadingFilterData}
              params={params}
              type='transaction'
              chartId='Chart 1'
              highlight={highlight === 'chart1' ? true : false}
              keywordsColor={keywordGraphColors}
            />
          </Grid>
        ) : (
          ''
        )}
        {resultReportPermission?.includes('58') ? (
          <Grid id='chart2' item xs={12} md={8}>
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
              highlight={highlight === 'chart2' ? true : false}
              resultFilterData={resultFilterData}
              loadingFilterData={loadingFilterData}
              keywordsColor={keywordGraphColors}
              apiParams={apiParams}
              isLoading={isLoading}
              setIsLoading={setIsLoading}
            />
          </Grid>
        ) : (
          ''
        )}
        {resultReportPermission?.includes('59') ? (
          <Grid item xs={12} md={12} id='chart3'>
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
              highlight={highlight === 'chart3' ? true : false}
              resultBy={resultEngagementByDay}
              loading={loadingEngagementBy}
              keywordsColor={keywordGraphColors ?? EngagementTransChartColor}
              apiParams={apiParams}
              setIsLoading={setIsLoading}
            />
          </Grid>
        ) : (
          ''
        )}
        {resultReportPermission?.includes('60') ? (
          <Grid item xs={12} md={12} id='chart4'>
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
              highlight={highlight === 'chart4' ? true : false}
              resultBy={resultEngagementByTime}
              loading={loadingEngagementBy}
              keywordsColor={keywordGraphColors ?? EngagementTransChartColor}
              apiParams={apiParams}
              setIsLoading={setIsLoading}
            />
          </Grid>
        ) : (
          ''
        )}
        {/* {resultReportPermission?.includes('61') ? (
          <Grid item xs={12} md={12} id='chart5'>
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
              highlight={highlight === 'chart5' ? true : false}
              resultBy={resultEngagementByDevice}
              loading={loadingEngagementBy}
              keywordsColor={keywordGraphColors ?? EngagementTransChartColor}
              apiParams={apiParams}
              setIsLoading={setIsLoading}
            />
          </Grid>
        ) : (
          ''
        )} */}
        {resultReportPermission?.includes('62') ? (
          <Grid item xs={12} md={12} id='chart6'>
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
              highlight={highlight === 'chart6' ? true : false}
              loading={loadingEngagementBy}
              resultBy={resultEngagementByAccount}
              keywordsColor={keywordGraphColors ?? EngagementTransChartColor}
              apiParams={apiParams}
              setIsLoading={setIsLoading}
            />
          </Grid>
        ) : (
          ''
        )}
        {resultReportPermission?.includes('63') ? (
          <Grid item xs={12} md={12} id='chart7'>
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
              highlight={highlight === 'chart7' ? true : false}
              loading={loadingEngagementBy}
              resultBy={resultEngagementChannel}
              keywordsColor={keywordGraphColors ?? EngagementTransChartColor}
              apiParams={apiParams}
              setIsLoading={setIsLoading}
            />
          </Grid>
        ) : (
          ''
        )}
        {resultReportPermission?.includes('110') ? (
          <Grid item xs={12} md={12} id='chart8'>
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
              highlight={highlight === 'chart8' ? true : false}
              loading={loadingEngagementBy}
              resultBy={resultKeywordByEngagementType}
              keywordsColor={keywordGraphColors ?? EngagementTransChartColor}
              apiParams={apiParams}
              setIsLoading={setIsLoading}
            />
          </Grid>
        ) : (
          ''
        )}
      </Grid>

      <Grid container spacing={3} pt={3}>
        {resultReportPermission?.includes('64') ? (
          <Grid id='chart9' item xs={12} md={4}>
            <PercentageOfEngangementType
              params={params}
              type='type'
              chartId='Chart 9'
              highlight={highlight === 'chart9' ? true : false}
              resultEngagementType={resultEngagementPercentage}
              loadingEngagementType={loadingEngagementType}
              keywordsColor={EngagementTypeColors}
            />
          </Grid>
        ) : (
          ''
        )}
        {resultReportPermission?.includes('65') ? (
          <Grid id='chart10' item xs={12} md={8}>
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
              highlight={highlight === 'chart10' ? true : false}
              resultBy={resultEngagementPercentage}
              loading={loadingEngagementType}
              keywordsColor={EngagementTypeColors}
              apiParams={apiParams}
              isLoading={isLoading}
              setIsLoading={setIsLoading}
            />
          </Grid>
        ) : (
          ''
        )}
        {resultReportPermission?.includes('66') ? (
          <Grid item xs={12} md={12} id='chart11'>
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
              highlight={highlight === 'chart11' ? true : false}
              resultBy={resultEngagementTypeByDay}
              loading={loadingEngagementType}
              keywordsColor={EngagementTypeColors}
              apiParams={apiParams}
              setIsLoading={setIsLoading}
            />
          </Grid>
        ) : (
          ''
        )}
        {resultReportPermission?.includes('67') ? (
          <Grid item xs={12} md={12} id='chart10'>
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
              highlight={highlight === 'chart12' ? true : false}
              resultBy={resultEngagementTypeByTime}
              loading={loadingEngagementType}
              keywordsColor={EngagementTypeColors}
              apiParams={apiParams}
              setIsLoading={setIsLoading}
            />
          </Grid>
        ) : (
          ''
        )}
        {/* {resultReportPermission?.includes('68') ? (
          <Grid item xs={12} md={12} id='chart13'>
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
              highlight={highlight === 'chart13' ? true : false}
              resultBy={resultEngagementTypeByDevice}
              loading={loadingEngagementType}
              keywordsColor={EngagementTypeColors}
              apiParams={apiParams}
              setIsLoading={setIsLoading}
            />
          </Grid>
        ) : (
          ''
        )} */}
        {resultReportPermission?.includes('69') ? (
          <Grid item xs={12} md={12} id='chart14'>
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
              highlight={highlight === 'chart14' ? true : false}
              resultBy={resultEngagementTypeByAccount}
              loading={loadingEngagementType}
              keywordsColor={EngagementTypeColors}
              apiParams={apiParams}
              setIsLoading={setIsLoading}
            />
          </Grid>
        ) : (
          ''
        )}

        {resultReportPermission?.includes('70') ? (
          <Grid item xs={12} md={12} id='chart15'>
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
              highlight={highlight === 'chart15' ? true : false}
              resultBy={resultEngagementTypeByChannel}
              loading={loadingEngagementType}
              keywordsColor={EngagementTypeColors}
              apiParams={apiParams}
              setIsLoading={setIsLoading}
            />
          </Grid>
        ) : (
          ''
        )}

        {resultReportPermission?.includes('71') ? (
          <>
            <Grid item xs={12} md={12} id='chart16'>
              <TotalEngagement
                totalEngagement={resultTotalEngagement}
                highlight={highlight === 'chart16' ? true : false}
                loading={loadingPeriodComparisonBySenitment}
              />
            </Grid>
          </>
        ) : (
          ''
        )}
        {resultReportPermission?.includes('72') ? (
          <Grid item xs={12} md={6} id='chart17'>
            <PeriodComparisonChart
              white={whiteColor}
              labelColor={labelColor}
              success={lineChartYellow}
              borderColor={borderColor}
              primary={lineChartPrimary}
              warning={lineChartWarning}
              gridLineColor={gridLineColor}
              params={params}
              type='channel'
              chartTitle='Engagement'
              colorType='engagementDefault'
              chartId='engagementChart17Title' // Chart 17
              highlight={highlight === 'chart17' ? true : false}
              reportNo='engagementChart17Description' // 4.2.021
              loadingSenitmentComparisonByEngagement={loadingPeriodComparisonBySenitment}
              resultSentimentComparisonByEngagement={resultPeriodComparisonByChannel}
            />
          </Grid>
        ) : (
          ''
        )}
        {resultReportPermission?.includes('73') ? (
          <Grid item xs={12} md={6} id='chart18'>
            <PeriodComparisonChartSentiment
              white={whiteColor}
              labelColor={labelColor}
              success={lineChartYellow}
              borderColor={borderColor}
              primary={lineChartPrimary}
              warning={lineChartWarning}
              gridLineColor={gridLineColor}
              params={params}
              type='sentiment'
              chartTitle='Engagement'
              colorType='SentimentComparisonEngagment'
              chartId='Chart 18'
              highlight={highlight === 'chart18' ? true : false}
              resultPeriodComparisonBySenitment={resultPeriodComparisonBySenitment}
              loadingPeriodComparisonBySenitment={loadingPeriodComparisonBySenitment}
            />
          </Grid>
        ) : (
          ''
        )}
        {resultReportPermission?.includes('74') ? (
          <>
            <Grid item xs={12} md={7} id='chart19'>
              <EngagementTypeComparison
                params={params}
                chartId='Chart 19'
                highlight={highlight === 'chart19' ? true : false}
                resultEngagementComparison={resultEngagementComparison}
                loadingEngagementComparison={loadingPeriodComparisonBySenitment}
              />
            </Grid>
            <Grid item xs={12} md={5} id='chart20'>
              <EngagmentComparisonChart
                params={params}
                chartId='chart 20'
                highlight={highlight === 'chart20' ? true : false}
                resultComparison={resultComparison}
                loadingComparison={loadingPeriodComparisonBySenitment}
              />
            </Grid>
          </>
        ) : (
          ''
        )}
        {resultReportPermission?.includes('75') ? (
          <>
            {/* <Grid container spacing={3} mt={2}>
              <Grid item xs={12} md={12} sx={{ display: 'flex', justifyContent: 'end', overflowX: 'auto' }}>
                <span style={{ marginTop: '7px', marginRight: '20px', fontSize: '20px' }}> Select </span>
                <Button
                  variant='contained'
                  color={topKeyword === 'top10' ? 'warning' : 'inherit'}
                  size='medium'
                  sx={{ marginRight: '20px' }}
                  onClick={() => {
                    handleTopKeywords('top10')
                  }}
                >
                  <span style={{ color: topKeyword === 'top10' ? 'white' : '#626376' }}>Top 10</span>
                </Button>
                <Button
                  variant='contained'
                  color={topKeyword === 'top20' ? 'warning' : 'inherit'}
                  size='medium'
                  sx={{ marginRight: '20px', color: 'black' }}
                  onClick={() => {
                    handleTopKeywords('top20')
                  }}
                >
                  <span style={{ color: topKeyword === 'top20' ? 'white' : '#626376' }}>Top 20</span>
                </Button>
                <Button
                  variant='contained'
                  color={topKeyword === 'top50' ? 'warning' : 'inherit'}
                  size='medium'
                  sx={{ marginRight: '20px', color: 'black' }}
                  onClick={() => {
                    handleTopKeywords('top50')
                  }}
                >
                  <span style={{ color: topKeyword === 'top50' ? 'white' : '#626376' }}>Top 50</span>
                </Button>
                <Button
                  variant='contained'
                  color={topKeyword === 'top100' ? 'warning' : 'inherit'}
                  size='medium'
                  sx={{ marginRight: '20px', color: 'black' }}
                  onClick={() => {
                    handleTopKeywords('top100')
                  }}
                >
                  <span style={{ color: topKeyword === 'top100' ? 'white' : '#626376' }}>Top 100</span>
                </Button>
                <Button
                  variant='contained'
                  color={topKeyword === 'all' ? 'warning' : 'inherit'}
                  size='medium'
                  sx={{ marginRight: '20px', color: 'black' }}
                  onClick={() => {
                    handleTopKeywords('all')
                  }}
                >
                  <span style={{ color: topKeyword === 'all' ? 'white' : '#626376' }}>ALL</span>{' '}
                </Button>
              </Grid>
            </Grid> */}
            <Grid item xs={12} id='chart21'>
              {apiParams ? (
                <EngagementSummary
                  topKeyword={topKeyword}
                  params={params}
                  chartId='Chart 21'
                  highlight={highlight === 'chart21' ? true : false}
                  page={page}
                  setPage={setPage}
                  pageCount={pageCount}
                  setPageCount={setPageCount}
                  apiParams={apiParams}
                />
              ) : (
                ''
              )}
            </Grid>
          </>
        ) : (
          ''
        )}
      </Grid>

      {/* <QuickView setHighlight={setHighlight} setShowQuickView={setShowQuickView} /> */}

      {/* <QuickViewModal
        show={showQuickView}
        setShow={setShowQuickView}
        params={params}
        chartId={highlight}
        quickViewData={quickViewData}
        keywordsColor={keywordGraphColors}
        apiParams={apiParams}
        isLoading={isLoading}
        setIsLoading={setIsLoading}
      /> */}
    </>
  )
}

export default EngagementGraphs
