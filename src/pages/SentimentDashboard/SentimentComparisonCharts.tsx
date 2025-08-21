import SummaryByAccount from './SummaryByAccount'
import SummaryByChannel from './SummaryByChannel'
import SummaryByKeywords from './SummaryByKeywords'
import { useState } from 'react'
import { Grid } from '@mui/material'
import { GetSummaryBy } from 'src/services/api/dashboards/sentiment/sentimentDashboard'

interface Props {
    apiParams: any
    resultReportPermission: any
    params: any
    highlight: string
  }

const SentimentComparisonCharts = (props : Props) => {
    const { apiParams, resultReportPermission, params, highlight } = props
  const [topAccount, setTopAccount] = useState<string>('all')
  const [topChannel, setTopChannel] = useState<string>('all')
  const [topKeyword, setTopKeyword] = useState<string>('all')

  const { resultSummaryByAccount, resultSummaryByChannel, resultSummaryByKeywords, total, loadingSummaryByAccount } =
    GetSummaryBy(apiParams, topAccount, topChannel, topKeyword)

  return (
    <>
      {resultReportPermission?.includes('90') ? (
        <Grid item xs={12} md={12} id='chart15'>
          <SummaryByAccount
            resultSummaryByAccount={resultSummaryByAccount}
            total={total}
            loadingSummaryByAccount={loadingSummaryByAccount}
            params={params}
            chartId='Chart 15'
            highlight={highlight === 'chart15' ? true : false}
            topAccount={topAccount}
            setTopAccount={setTopAccount}
          />
        </Grid>
      ) : (
        ''
      )}
      {resultReportPermission?.includes('91') ? (
        <Grid item xs={12} md={12} id='chart16'>
          <SummaryByChannel
            resultSummaryByChannel={resultSummaryByChannel}
            total={total}
            loadingSummaryByChannel={loadingSummaryByAccount}
            params={params}
            chartId='Chart 16'
            highlight={highlight === 'chart16' ? true : false}
            topChannel={topChannel}
            setTopChannel={setTopChannel}
          />
        </Grid>
      ) : (
        ''
      )}
      {resultReportPermission?.includes('92') ? (
        <Grid item xs={12} md={12} id='chart17'>
          <SummaryByKeywords
            total={total}
            resultSummaryByKeywords={resultSummaryByKeywords}
            loadingSummaryByKeywords={loadingSummaryByAccount}
            params={params}
            chartId='Chart 17'
            highlight={highlight === 'chart17' ? true : false}
            topKeyword={topKeyword}
            setTopKeyword={setTopKeyword}
          />
        </Grid>
      ) : (
        ''
      )}
    </>
  )
}

export default SentimentComparisonCharts
