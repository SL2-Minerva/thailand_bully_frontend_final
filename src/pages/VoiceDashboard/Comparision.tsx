import { Grid } from '@mui/material'
import PlatformsComparison from './PlatformsComparison'

// import DevicesComparison from './DevicesComparison'
// import ChannelVsDevice from './ChannelVsDevice'
import { GetChannelDeviceAll } from 'src/services/api/dashboards/voice/VoiceDashboardAPIs'
import InfluencerComparison from './InfluencerComparison'
import MessageText from 'mdi-material-ui/MessageText'
import { AccountGroup } from 'mdi-material-ui'
import { GetNumbersOfAccountComparison } from 'src/services/api/dashboards/voice/VoiceDashboardAPIs'

const Comparison = ({
  params,
  highlight,
  resultReportPermission,
  apiParams
}: {
  params: any
  highlight: string
  resultReportPermission: any
  apiParams: any 
}) => {

  const { result, loading } = GetChannelDeviceAll(
    apiParams
  )

  const { resultTotalAccounts, resultTotalMessages, loadingNumbersOfAccountsComparison } = 
    GetNumbersOfAccountComparison(apiParams)

  return (
    <>
      {resultReportPermission?.includes('37') ? (
        <Grid item xs={12} md={4} id='chart18'>
          <PlatformsComparison
            params={params}
            resultPlatformComparison={result?.channelPlatform}
            loadingPlatformComparison={loading}
            chartId='chart 18'
            highlight={highlight === 'chart18' ? true : false}
          />
        </Grid>
      ) : (
        ''
      )}
      {/* {resultReportPermission?.includes('38') ? (
        <Grid item xs={12} md={4} id='chart19'>
          <DevicesComparison
            resultDevicesComparison={result?.device}
            loadingDevicesComparison={loading}
            params={params}
            chartId='Chart 19'
            highlight={highlight === 'chart19' ? true : false}
          />
        </Grid>
      ) : (
        ''
      )}
      {resultReportPermission?.includes('39') ? (
        <Grid item xs={12} md={4} id='chart20'>
          <ChannelVsDevice
            resultDeviceVsChannel={result?.channelDevice}
            loadingDeviceVsChannel={loading}
            params={params}
            chartId='Chart 20'
            highlight={highlight === 'chart20' ? true : false}
          />
        </Grid>
      ) : (
        ''
      )} */}
        {resultReportPermission?.includes('31') ? (
          <Grid item xs={12} md={4} id='chart12'>
            <InfluencerComparison
              color='primary'
              trendNumber={resultTotalMessages?.percentage}
              trend={resultTotalMessages?.type}
              icon={<MessageText />}
              totalText='Messages'
              totalValue={resultTotalMessages?.total_message}
              chartId='voiceChart12Title' //chart 12
              highlight={highlight === 'chart12' ? true : false}
              reportNo='voiceChart12Description' // 2.2.014
              loading={loadingNumbersOfAccountsComparison}
            />
          </Grid>
        ) : (
          ''
        )}
        {resultReportPermission?.includes('32') ? (
          <Grid item xs={12} md={4} id='chart13'>
            <InfluencerComparison
              color='primary'
              trendNumber={resultTotalAccounts?.percentage || ''}
              trend={resultTotalAccounts?.type}
              icon={<AccountGroup />}
              totalText='Accounts'
              totalValue={resultTotalAccounts?.total_account || resultTotalAccounts?.total_message}
              chartId='voiceChart13Title' //Chart 13
              highlight={highlight === 'chart13' ? true : false}
              reportNo='voiceChart13Description' //2.2.015
              loading={loadingNumbersOfAccountsComparison}
            />
          </Grid>
        ) : (
          ''
        )}
    </>
  )
}

export default Comparison
