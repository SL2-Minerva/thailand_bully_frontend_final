import { Button, Grid } from '@mui/material'
import { useEffect, useState } from 'react'

import WordCloudChannel from '../dashboard/WordCloudChannel'
import WordCloudSentiment from '../dashboard/WordCloudSentiment'
import WordClouds from './WordClouds'

// import SentimentLevelChart from './SentimentLevelChart'

interface Props {
  params: any
  setTopKeyword: any
  resultReportPermission: any
  keywordGraphColors: any
  topKeyword: any
}

const WordCloudGraphs = (data: Props) => {
  const { params, setTopKeyword, resultReportPermission, topKeyword } = data

  const [word, setWord] = useState<string>('')
  const [apiParams, setApiParams] = useState<any>()

  const handleTopKeywords = (data: string) => {
    setTopKeyword(data)
  }

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
        select: params?.topKeyword || 'top10'
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
        select: params?.topKeyword || 'top10'
      })
    }
  }, [params, word])

  return (
    <>
      {resultReportPermission?.includes('13') ||
      resultReportPermission?.includes('15') ||
      resultReportPermission?.includes('18') ? (
        <Grid container spacing={3} mt={2}>
          <Grid item xs={12} md={12} sx={{ display: 'flex', justifyContent: 'end' }}>
            <span style={{ marginTop: '7px', marginRight: '20px', fontSize: '20px' }}> Select </span>
            <Button
              variant='contained'
              color={topKeyword === 'top10' ? 'warning' : 'inherit'}
              size='medium'
              sx={{ marginRight: '20px', color: 'balck' }}
              onClick={() => {
                handleTopKeywords('top10')
              }}
            >
              {' '}
              <span style={{color: topKeyword === 'top10' ? 'white' : '#626376'}}>Top 10</span>
            </Button>
            <Button
              variant='contained'
              color={topKeyword === 'top20' ? 'warning' : 'inherit'}
              size='medium'
              sx={{ marginRight: '20px' }}
              onClick={() => {
                handleTopKeywords('top20')
              }}
            >
              {' '}
              <span style={{color: topKeyword === 'top20' ? 'white' : '#626376'}}>Top 20</span>
            </Button>
            <Button
              variant='contained'
              color={topKeyword === 'top50' ? 'warning' : 'inherit'}
              size='medium'
              sx={{ marginRight: '20px' }}
              onClick={() => {
                handleTopKeywords('top50')
              }}
            >
              {' '}
              <span style={{color: topKeyword === 'top50' ? 'white' : '#626376'}}>Top 50</span>
            </Button>
            <Button
              variant='contained'
              color={topKeyword === 'top100' ? 'warning' : 'inherit'}
              size='medium'
              sx={{ marginRight: '20px' }}
              onClick={() => {
                handleTopKeywords('top100')
              }}
            >
              {' '}
              <span style={{color: topKeyword === 'top100' ? 'white' : '#626376'}}>Top 100</span>
            </Button>
            <Button
              variant='contained'
              color={topKeyword === 'all' ? 'warning' : 'inherit'}
              size='medium'
              sx={{ marginRight: '20px' }}
              onClick={() => {
                handleTopKeywords('all')
              }}
            >
              {' '}
              <span style={{color: topKeyword === 'all' ? 'white' : '#626376'}}>ALL</span>{' '}
            </Button>
          </Grid>
        </Grid>
      ) : (
        ''
      )}

      {apiParams ? (
        <>
          <WordClouds
            apiParams={apiParams}
            resultReportPermission={resultReportPermission}
            params={params}
            setWord={setWord}
            topKeyword={topKeyword}
          />
        </>
      ) : (
        ''
      )}

      {resultReportPermission?.includes('15') ? (
        <Grid container spacing={3} pt={3}>
          <Grid id='chart15' item xs={12}>
            <WordCloudChannel params={params} chartId='Chart 15' />
          </Grid>
        </Grid>
      ) : (
        ''
      )}
      {resultReportPermission?.includes('18') ? (
        <Grid container spacing={3} pt={3}>
          <Grid id='chart17' item xs={12} md={12}>
            <WordCloudSentiment chartId='Chart 18' params={params} />
          </Grid>
        </Grid>
      ) : (
        ''
      )}
    </>
  )
}

export default WordCloudGraphs
