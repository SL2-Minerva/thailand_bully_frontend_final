import { Grid } from '@mui/material'
import { GetDayTimeByAll } from 'src/services/api/dashboards/voice/VoiceDashboardAPIs'
import DayTimeBullyLevel from './DayTimeBullyLevel'
import DayTimeBullyType from './DayTimeBullyType'
import DayTimeComparison from './DayTimeComparison'
import DayTimeSentiment from './DayTimeSentiment'

const DayTimeBy = ({
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

  const {
    resultDayByBullyLevel,
    resultDayByBullyType,
    resultDayBySentiment,
    resultDayTimeComparison,
    resultTimeByBullyLevel,
    resultTimeByBullyType,
    resultTimeBySentiment,
    loadingDayByAll
  } = GetDayTimeByAll(
    apiParams
  )

  return (
    <>
      {resultReportPermission?.includes('33') ? (
        <Grid item xs={12} id='chart14'>
          <DayTimeComparison
            resultDayTimeComparison={resultDayTimeComparison}
            loadingDayTimeComparison={loadingDayByAll}
            params={params}
            chartId='Chart 14'
            highlight={highlight === 'chart14' ? true : false}
          />
        </Grid>
      ) : (
        ''
      )}

      {resultReportPermission?.includes('34') ? (
        <Grid item xs={12} id='chart15'>
          <DayTimeSentiment
            resultTimeBySentiment={resultTimeBySentiment}
            resultDayBySentiment={resultDayBySentiment}
            loadingBySentiment={loadingDayByAll}
            chartId='Chart 15'
            params={params}
            highlight={highlight === 'chart15' ? true : false}
          />
        </Grid>
      ) : (
        ''
      )}

      {resultReportPermission?.includes('35') ? (
        <Grid item xs={12} id='chart16'>
          <DayTimeBullyLevel
            resultTimeByBullyLevel={resultTimeByBullyLevel}
            resultDayByBullyLevel={resultDayByBullyLevel}
            loadingByBullyLevel={loadingDayByAll}
            chartId='Chart 16'
            params={params}
            highlight={highlight === 'chart16' ? true : false}
          />
        </Grid>
      ) : (
        ''
      )}

      {resultReportPermission?.includes('36') ? (
        <Grid item xs={12} id='chart17'>
          <DayTimeBullyType
            resultDayByBullyType={resultDayByBullyType}
            resultTimeByBullyType={resultTimeByBullyType}
            loadingDayByBullyType={loadingDayByAll}
            chartId='Chart 17'
            params={params}
            highlight={highlight === 'chart17' ? true : false}
          />
        </Grid>
      ) : (
        ''
      )}
    </>
  )
}

export default DayTimeBy
