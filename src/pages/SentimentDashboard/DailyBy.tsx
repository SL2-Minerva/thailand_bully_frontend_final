import { Grid } from '@mui/material'
import DailySenitment from './DailySentiment'
import PercentageOfSentiments from './PercentageOfSentiment'
import { FilterByCampaignId } from 'src/services/api/dashboards/sentiment/sentimentDashboard'
import { useEffect } from 'react'

interface Props {
  theme: any
  apiParams: any
  resultReportPermission: any
  params: any
  highlight: string
  isLoading: boolean
  setIsLoading: any
  quickViewData: any
  setQuickViewData: any
}

const DailyBy = (props: Props) => {
  const {
    theme,
    apiParams,
    resultReportPermission,
    params,
    highlight,
    isLoading,
    setIsLoading,
    quickViewData,
    setQuickViewData
  } = props
  const whiteColor = '#fff'
  const lineChartYellow = '#d4e157'
  const lineChartPrimary = '#787EFF'
  const lineChartWarning = '#ff9800'
  const labelColor = theme.palette.text.primary
  const borderColor = theme.palette.action.focus
  const gridLineColor = theme.palette.action.focus

  const { resultFilterData, loadingFilterData } = FilterByCampaignId(apiParams)

  useEffect(() => {
    setQuickViewData({ ...quickViewData, resultFilterData: resultFilterData, loadingFilterData: loadingFilterData })
  }, [resultFilterData, loadingFilterData])

  return (
    <>
      {resultReportPermission?.includes('77') ? (
        <Grid id='chart1' item xs={12} md={4}>
          <PercentageOfSentiments
            resultFilterData={resultFilterData}
            loadingFilterData={loadingFilterData}
            params={params}
            type='transaction'
            chartId='Chart 1'
            highlight={highlight === 'chart1' ? true : false}
          />
        </Grid>
      ) : (
        ''
      )}
      {resultReportPermission?.includes('76') ? (
        <Grid id='chart2' item xs={12} md={8}>
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
    </>
  )
}

export default DailyBy
