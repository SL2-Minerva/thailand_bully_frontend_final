import { Grid } from '@mui/material'
import { GetKeywordComparisonByAll } from 'src/services/api/dashboards/voice/VoiceDashboardAPIs'
import KeywordComparisonByChannel from './KeywordComparison'
import KeywordComparisonByBullyLevel from './KeywordComparisonByBullyLevel'
import KeywordComparisonByBullyType from './KeywordComparisonByBullyType'
import KeywordComparisonBySentiment from './KeywordComparisonBySentiment'

const KeywordBy = ({
  params,
  highlight,
  resultReportPermission,
  keywordsColor,
  apiParams
}: {
  params: any
  highlight: string
  resultReportPermission: any
  keywordsColor : any
  apiParams: any
}) => {

  const {
    resultKeywordComparisonByBullyLevel,
    resultKeywordComparisonByBullyType,
    resultKeywordComparisonBySentiment,
    resultKeywordComparisonByChannel,
    loadingKeywordComparisonByAll
  } = GetKeywordComparisonByAll(
    apiParams
  )

  return (
    <>
      {resultReportPermission?.includes('40') ? (
        <Grid item xs={12} md={6} id='chart21'>
          <KeywordComparisonByChannel
            params={params}
            chartId='Chart 21'
            highlight={highlight === 'chart21' ? true : false}
            resultKeywordComparisonByChannel={resultKeywordComparisonByChannel}
            loadingKeywordComparisonByChannel={loadingKeywordComparisonByAll}
            keywordColors ={keywordsColor}
          />
        </Grid>
      ) : (
        ''
      )}
      {resultReportPermission?.includes('41') ? (
        <Grid item xs={12} md={6} id='chart22'>
          <KeywordComparisonBySentiment
            params={params}
            chartId='Chart 22'
            highlight={highlight === 'chart23' ? true : false}
            resultKeywordComparisonBySentiment={resultKeywordComparisonBySentiment}
            loadingKeywordComparisonBySentiment={loadingKeywordComparisonByAll}
            keywordsColor={keywordsColor}
          />
        </Grid>
      ) : (
        ''
      )}
      {resultReportPermission?.includes('42') ? (
        <Grid item xs={12} md={6} id='chart23'>
          <KeywordComparisonByBullyLevel
            params={params}
            chartId='Chart 23'
            highlight={highlight === 'chart23' ? true : false}
            resultKeywordComparisonByBullyLevel={resultKeywordComparisonByBullyLevel}
            loadingKeywordComparisonByBullyLevel={loadingKeywordComparisonByAll}
            keywordsColor={keywordsColor}
          />
        </Grid>
      ) : (
        ''
      )}
      {resultReportPermission?.includes('43') ? (
        <Grid item xs={12} md={6} id='chart24'>
          <KeywordComparisonByBullyType
            params={params}
            chartId='Chart 24'
            highlight={highlight === 'chart24' ? true : false}
            resultKeywordComparisonByBullyType={resultKeywordComparisonByBullyType}
            loadingKeywordComparisonByBullyType={loadingKeywordComparisonByAll}
            keywordsColor={keywordsColor}
          />
        </Grid>
      ) : (
        ''
      )}
    </>
  )
}

export default KeywordBy
