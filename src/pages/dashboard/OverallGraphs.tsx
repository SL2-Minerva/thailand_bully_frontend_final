import { Grid } from '@mui/material'
import { useTheme } from '@mui/material/styles'
import KeywordTable from './keywordTable'
import SentimentGaugeChart from './SentimentGaugeChart'
import CommentSentiment from './CommentSentiment'
import ShareOfVoices from './ShareofVoices'
import { useEffect, useState } from 'react'
import Backdrop from '@mui/material/Backdrop'
import CircularProgress from '@mui/material/CircularProgress'
import TopKeywordsSummary from './TopKeywordsSummary'
import KeyStatus from './KeyStatus'
import OverallCharts from './overallCharts'

interface Props {
  params: any
  setTopKeyword: any
  resultReportPermission: any
  keywordGraphColors: any
  topKeyword: any
}

const OverallGraphs = (data: Props) => {
  const { params, resultReportPermission, keywordGraphColors } = data
  const theme = useTheme()

  const [apiParams, setApiParams] = useState<any>()
  const [isLoading, setIsLoading] = useState(false)

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
        {apiParams ? (
          <OverallCharts
            theme={theme}
            resultReportPermission={resultReportPermission}
            keywordGraphColors={keywordGraphColors}
            params={params}
            apiParams={apiParams}
            isLoading={isLoading}
            setIsLoading={setIsLoading}
          />
        ) : (
          ''
        )}
      </Grid>

      <Grid container spacing={3} pt={3}>
        {apiParams ? <KeyStatus apiParams={apiParams} resultReportPermission={resultReportPermission} /> : ''}
      </Grid>

      <Grid container spacing={3} pt={3}>
        {resultReportPermission?.includes('6') && apiParams ? (
          <Grid id='chart6' item xs={12}>
            <KeywordTable apiParams={apiParams} chartId='Chart 6' />
          </Grid>
        ) : (
          ''
        )}
      </Grid>

      <Grid container spacing={3} pt={3}>
        {apiParams ? (
          <TopKeywordsSummary apiParams={apiParams} params={params} resultReportPermission={resultReportPermission} />
        ) : (
          ''
        )}
      </Grid>

      <Grid container spacing={3} pt={3}>
        {resultReportPermission?.includes('10') && apiParams ? (
          <Grid id='chart10' item xs={12} md={6}>
            <SentimentGaugeChart apiParams={apiParams} chartId='Chart 10' />
          </Grid>
        ) : (
          ''
        )}
        {resultReportPermission?.includes('11') && apiParams ? (
          <Grid id='chart11' item xs={12} md={6}>
            <CommentSentiment apiParams={apiParams} chartId='Chart 11' />
          </Grid>
        ) : (
          ''
        )}
      </Grid>
      <Grid container spacing={3} pt={3}>
        {resultReportPermission?.includes('12') && apiParams ? (
          <Grid id='chart12' item xs={12}>
            <ShareOfVoices apiParams={apiParams} chartId='Chart 12' keywordsColor={keywordGraphColors} />
          </Grid>
        ) : (
          ''
        )}
      </Grid>
    </>
  )
}

export default OverallGraphs
