import { Grid } from '@mui/material'
import { useEffect, useState } from 'react'
import ChannelWordCloud from '../WordCloud/ChannelWordCloud'

const WordCloudChannel = ({ params }: { params: any; chartId: string }) => {
  const [platformId, setPlatformId] = useState<string>('1')
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
        platform_id: platformId
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
        platform_id: platformId
      })
    }
  }, [params, platformId, word])

  return (
    <Grid container spacing={3}>
      {apiParams ? (
        <ChannelWordCloud
          apiParams={apiParams}
          platformId={platformId}
          setPlatformId={setPlatformId}
          setWord={setWord}
          params={params}
        />
      ) : (
        ''
      )}
    </Grid>
  )
}

export default WordCloudChannel
