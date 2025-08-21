import { Grid } from '@mui/material'
import KeyStatusReport from './keyStatusReport'
import MessageText from 'mdi-material-ui/MessageText'
import ThumbUp from 'mdi-material-ui/ThumbUp'
import Person from 'mdi-material-ui/Account'
import { TotalKeyStats } from 'src/services/api/dashboards/overall/overallDashboardApi'

interface Props {
  apiParams: any
  resultReportPermission: any
}

const KeyStatus = (props: Props) => {
  const { apiParams, resultReportPermission } = props
  const { resultTotalMessagePerDay, resultTotalEngagement, resultTotalAccount, loadingTotalKeystats } =
    TotalKeyStats(apiParams)

  return (
    <>
      {resultReportPermission?.includes('3') ? (
        <Grid id='chart3' item xs={12} md={4}>
          <KeyStatusReport
            stats={resultTotalMessagePerDay?.comparison || '0'}
            type={resultTotalMessagePerDay?.type}
            color='primary'
            trendNumber={resultTotalMessagePerDay?.percentage || '0'}
            icon={<MessageText />}
            title='Period over Period Comparison'
            chipText='Last 1 Month'
            totalText='Total Messages'
            totalValue={resultTotalMessagePerDay?.total_message?.toString() || '0'}
            averageText='Average Message per Day'
            averageValue={resultTotalMessagePerDay?.average_message?.toString() || '0'}
            chartId='overallChart3Title' //Chart 3
            reportNo='overallChart3Description' //1.1.005
            loading={loadingTotalKeystats}
          />
        </Grid>
      ) : (
        ''
      )}

      {resultReportPermission?.includes('4') ? (
        <Grid id='chart4' item xs={12} md={4}>
          <KeyStatusReport
            stats={resultTotalEngagement?.comparison || '0'}
            type={resultTotalEngagement?.type}
            color='primary'
            trendNumber={resultTotalEngagement?.percentage || '0'}
            icon={<ThumbUp />}
            title='Period over Period Comparison'
            chipText='Last 1 Month'
            totalText='Total Engagements'
            totalValue={resultTotalEngagement?.total_engagement?.toString() || '0'}
            averageText='Avg. Engagement per Day'
            averageValue={resultTotalEngagement?.average_engagement?.toString() || '0'}
            chartId='overallChart4Title' //Chart 4
            reportNo='overallChart4Description' //1.1.006
            loading={loadingTotalKeystats}
          />
        </Grid>
      ) : (
        ''
      )}

      {resultReportPermission?.includes('5') ? (
        <Grid id='chart5' item xs={12} md={4}>
          <KeyStatusReport
            stats={resultTotalAccount?.comparison || '0'}
            type={resultTotalAccount?.type}
            color='primary'
            trendNumber={resultTotalAccount?.percentage || '0'}
            icon={<Person />}
            title='Period over Period Comparison'
            chipText='Last 1 Month'
            totalText='Total Accounts'
            totalValue={resultTotalAccount?.total_account?.toString() || '0'}
            averageText='Average Account per Day'
            averageValue={resultTotalAccount?.average_account?.toString() || '0'}
            chartId='overallChart5Title' //Chart 5
            reportNo='overallChart5Description' //1.1.007
            loading={loadingTotalKeystats}
          />
        </Grid>
      ) : (
        ''
      )}
    </>
  )
}

export default KeyStatus
