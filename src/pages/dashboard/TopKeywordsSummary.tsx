import { Grid } from '@mui/material'

// import TopSiteList from './TopSiteList'
import MainKeyWordTable from './MainKeywordTable'

// import TopHashtagList from './TopHastagList'
import { GetTopKeywords } from 'src/services/api/dashboards/overall/overallDashboardApi'

interface Props {
  apiParams: any
  params: any
  resultReportPermission: any
}

const TopKeywordsSummary = (props: Props) => {
  const { apiParams, resultReportPermission, params } = props
  const { resultTopKeywords, loadingTopKeywords } = GetTopKeywords(apiParams)

  return (
    <>
      {resultReportPermission?.includes('7') ? (
        <Grid id='chart7' item xs={12} md={12}>
          <MainKeyWordTable
            params={params}
            loadingTopKeywords={loadingTopKeywords}
            resultTopKeywords={resultTopKeywords}
            chartId='Chart 7'
          />
        </Grid>
      ) : (
        ''
      )}

      {/* {resultReportPermission?.includes('8') ? (
        <Grid id='chart8' item xs={12} md={4}>
          <TopSiteList
            params={params}
            loadingTopKeywords={loadingTopKeywords}
            resultTopKeywords={resultTopKeywords}
            chartId='Chart 8'
          />
        </Grid>
      ) : (
        ''
      )} */}

      {/* {resultReportPermission?.includes('9') ? (
        <Grid id='chart9' item xs={12} md={6}>
          <TopHashtagList
            params={params}
            loadingTopKeywords={loadingTopKeywords}
            resultTopKeywords={resultTopKeywords}
            chartId='Chart 9'
          />
        </Grid>
      ) : (
        ''
      )} */}
    </>
  )
}

export default TopKeywordsSummary
