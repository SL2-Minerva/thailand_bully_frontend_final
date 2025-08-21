import { Grid } from '@mui/material'
import { useEffect, useState } from 'react'
import SentimentWordCloud from '../WordCloud/SentimentWordCloud'

const WordCloudSentiment = ({ params }: { chartId: string; params: any }) => {
  const [sentiment, setSentiment] = useState('positive')
  const [word, setWord] = useState<string>('')
  const [apiParams, setApiParams] = useState<any>()

  useEffect(() => {
    if (params?.period !== 'customrange') {
      setApiParams({
        campaign_id: params?.campaign,
        source: params?.platformId,
        start_date: params?.date,
        end_date: params?.endDate,
        period: params?.period,
        fillter_keywords: params?.keywordIds,
        word: word,
        select: params?.topKeyword || 'top10',
        sentiment_type: sentiment
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
        fillter_keywords: params?.keywordIds,
        word: word,
        select: params?.topKeyword || 'top10',
        sentiment_type: sentiment
      })
    }
  }, [params, sentiment, word])

  return (
    <Grid container spacing={3}>
      {apiParams ? (
        <SentimentWordCloud
          apiParams={apiParams}
          setSentiment={setSentiment}
          setWord={setWord}
          sentiment={sentiment}
          params={params}
        />
      ) : (
        ''
      )}
    </Grid>
  )
}

export default WordCloudSentiment
