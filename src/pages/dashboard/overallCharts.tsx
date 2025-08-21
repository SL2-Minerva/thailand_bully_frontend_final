import { Grid } from '@mui/material'
import DonutChart from './donutChart'
import StackedChart from './stackedChart'
import {
  EngagementTransactionReport,
  FilterByCampaignId
} from 'src/services/api/dashboards/overall/overallDashboardApi'
import EngagementDonutChart from './EngagementDonutChart'
import DailyEngagementTrans from './DailyEngagementTrans'

interface Props {
  theme: any
  resultReportPermission: any
  keywordGraphColors: any
  params: any
  apiParams: any
  isLoading: boolean
  setIsLoading: any
}

const OverallCharts = (props: Props) => {
  const { theme, resultReportPermission, keywordGraphColors, params, apiParams, isLoading, setIsLoading } = props
  const whiteColor = '#fff'
  const lineChartYellow = '#d4e157'
  const lineChartPrimary = '#787EFF'
  const lineChartWarning = '#ff9800'
  const labelColor = theme.palette.text.primary
  const borderColor = theme.palette.action.focus
  const gridLineColor = theme.palette.action.focus

  const { resultFilterData, loadingFilterData } = FilterByCampaignId(apiParams)

  const { resultEngagementTransaction, loadingEngagementTransaction } = EngagementTransactionReport(apiParams)

  return (
    <>
      {resultReportPermission?.includes('1') ? (
        <Grid id='chart1' item xs={12} md={4}>
          <DonutChart
            keywordsColor={keywordGraphColors}
            params={params}
            resultFilterData={resultFilterData}
            loadingFilterData={loadingFilterData}
          />
        </Grid>
      ) : (
        ''
      )}
      {resultReportPermission?.includes('2') ? (
        <Grid id='chart2' item xs={12} md={8}>
          <StackedChart
            white={whiteColor}
            labelColor={labelColor}
            success={lineChartYellow}
            borderColor={borderColor}
            primary={lineChartPrimary}
            warning={lineChartWarning}
            gridLineColor={gridLineColor}
            params={params}
            loadingFilterData={loadingFilterData}
            resultFilterData={resultFilterData}
            keywordsColor={keywordGraphColors}
            apiParams={apiParams}
            isLoading={isLoading}
            setIsLoading={setIsLoading}
          />
        </Grid>
      ) : (
        ''
      )}

      {resultReportPermission?.includes('1') ? (
        <>
          <Grid id='chart1' item xs={12} md={4}>
            <EngagementDonutChart
              resultFilterData={resultEngagementTransaction}
              loadingFilterData={loadingEngagementTransaction}
              params={params}
              type='transaction'
              keywordsColor={keywordGraphColors}
            />
          </Grid>

          <Grid id='chart2' item xs={12} md={8}>
            <DailyEngagementTrans
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
              highlight={false}
              resultFilterData={resultEngagementTransaction}
              loadingFilterData={loadingEngagementTransaction}
              keywordsColor={keywordGraphColors}
              apiParams={apiParams}
              isLoading={isLoading}
              setIsLoading={setIsLoading}
            />
          </Grid>
        </>
      ) : (
        ''
      )}
    </>
  )
}

export default OverallCharts
