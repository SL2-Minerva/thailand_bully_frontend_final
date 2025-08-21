import { Grid } from '@mui/material'
import InfluencerGraph from './InfluencerGraph'

// import InfluencerComparison from './InfluencerComparison'
// import MessageText from 'mdi-material-ui/MessageText'
// import { AccountGroup } from 'mdi-material-ui'
import { GetNumbersOfAccountComparison } from 'src/services/api/dashboards/voice/VoiceDashboardAPIs'

interface Props {
  apiParams: any
  params: any
  keywordGraphColors: any
  setIsLoading: any
  highlight: string
  resultReportPermission: any
}

const NumberOfAccounts = (props: Props) => {
  const { apiParams, highlight, params, keywordGraphColors, setIsLoading,  resultReportPermission } = props

  // const { resultNumbersOfAccounts, resultTotalAccounts, resultTotalMessages, loadingNumbersOfAccountsComparison } =
  const { resultNumbersOfAccounts, loadingNumbersOfAccountsComparison } =

    GetNumbersOfAccountComparison(apiParams)

  return (
    <>
      {resultReportPermission?.includes('30') ? (
        <Grid item xs={12} md={12} id='chart11'>
          <InfluencerGraph
            chartId='Chart 11'
            params={params}
            highlight={highlight === 'chart11' ? true : false}
            resultNumbersOfAccounts={resultNumbersOfAccounts}
            loadingNumbersOfAccounts={loadingNumbersOfAccountsComparison}
            keywordsColor={keywordGraphColors}
            apiParams={apiParams}
            setIsLoading={setIsLoading}
          />
        </Grid>
      ) : (
        ''
      )}

      {/* <Grid item xs={12} md={4}>
        {resultReportPermission?.includes('31') ? (
          <Grid item xs={12} id='chart12'>
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
          <Grid item xs={12} mt={3} id='chart13'>
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
      </Grid> */}
    </>
  )
}

export default NumberOfAccounts
