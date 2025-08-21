import ReactWordcloud from 'react-wordcloud'
import 'tippy.js/dist/tippy.css'
import 'tippy.js/animations/scale.css'
import { Button, CardHeader, Grid, LinearProgress, Paper, Typography } from '@mui/material'
import { StyledTooltip } from '../dashboard/overall'
import { Information } from 'mdi-material-ui'
import { GetWordCloudsSentiment } from 'src/services/api/dashboards/overall/overallDashboardApi'
import Translations from 'src/layouts/components/Translations'
import SentimentAccountList from '../dashboard/SentimentAccountList'
import 'd3-transition'
import { select } from 'd3-selection'

interface Props {
  apiParams: any
  setSentiment: any
  setWord: any
  sentiment: string
  params: any
}

const SentimentWordCloud = (props: Props) => {
  const { apiParams, setSentiment, setWord, sentiment, params } = props
  const { resultWordCloudsSentiment, loadingWordCloudsSentiment } = GetWordCloudsSentiment(apiParams)

  const chooseSentiment = (value: string) => {
    setSentiment(value)
  }

  function getCallback(callback: any) {
    return function (word: any, event: any) {
      const isActive = callback !== 'onWordMouseOut'
      const element = event.target
      const text = select(element)
      text
        .on('click', () => {
          if (isActive && word) {
            const selectedWord = word?.text
            setWord(selectedWord)
          }
        })
        .transition()
        .attr('text-decoration', isActive ? 'underline' : 'none')
    }
  }

  const callbacks = {
    // getWordColor: (word:any) => (word.value > 50 ? "orange" : "purple"),
    getWordTooltip: (word: any) => `The word "${word.text}" appears ${word.value} times.`,
    onWordClick: getCallback('onWordClick'),
    onWordMouseOut: getCallback('onWordMouseOut'),
    onWordMouseOver: getCallback('onWordMouseOver')
  }

  return (
    <>
      <Grid item xs={12} md={6}>
        <Paper style={{ border: `3px solid #fff`, borderRadius: 7, maxHeight: 500, minHeight: 500, overflow: 'auto' }}>
          {loadingWordCloudsSentiment && <LinearProgress style={{ width: '100%' }} />}
          <span style={{ display: 'flex', justifyContent: 'flex-start' }}>
            <CardHeader
              title={<Translations text='Word Cloud by Sentiment Type' />}
              titleTypographyProps={{ variant: 'h6' }}
            />
            <StyledTooltip
              arrow
              title={
                <span>
                  <Typography variant='h6' sx={{ color: 'white' }}>
                    <Translations text='wordCloudChart5Title' />
                  </Typography>
                  <Typography variant='body2' sx={{ color: 'white' }}>
                    <Translations text='wordCloudChart5Description' />
                  </Typography>
                </span>
              }
            >
              <Information style={{ marginTop: '22px', fontSize: '29px' }} />
            </StyledTooltip>
          </span>
          <Grid container spacing={2}>
            <Grid item sm={8} xs={8} ml={4}>
              <Button
                variant='contained'
                color={sentiment === 'positive' ? 'warning' : 'inherit'}
                size='medium'
                style={{ marginRight: '6px' }}
                onClick={() => {
                  chooseSentiment('positive')
                }}
              >
                <span style={{ color: sentiment === 'positive' ? 'white' : '#626376'}}>Positive</span>
              </Button>
              <Button
                variant='contained'
                color={sentiment === 'negative' ? 'error' : 'inherit'}
                size='medium'
                onClick={() => {
                  chooseSentiment('negative')
                }}
              >
                <span style={{ color: sentiment === 'negative' ? 'white' : '#626376' }}>Negative</span>
              </Button>
            </Grid>
          </Grid>
          <div style={{ display: 'flex', justifyContent: 'center', marginTop: '30px' }}>
            {!loadingWordCloudsSentiment ? (
              <>
                {!resultWordCloudsSentiment?.word_clouds_position ||
                resultWordCloudsSentiment?.word_clouds_position?.length == 0 ? (
                  <div
                    style={{
                      padding: '130px 0',
                      textAlign: 'center',
                      verticalAlign: 'middle',
                      color: '#80808059'
                    }}
                  >
                    <Translations text='no data' />
                  </div>
                ) : (
                  <ReactWordcloud
                    options={{
                      enableTooltip: true,
                      deterministic: false,
                      fontFamily: 'impact',
                      fontSizes: [12, 70],
                      fontStyle: 'normal',
                      fontWeight: 'normal',
                      padding: 1,
                      spiral: 'archimedean',
                      transitionDuration: 1000
                    }}
                    callbacks={callbacks}
                    words={resultWordCloudsSentiment?.word_clouds_position || []}
                  />
                )}
              </>
            ) : (
              ''
            )}
          </div>
        </Paper>
      </Grid>
      <Grid id='chart18' item xs={12} md={6}>
        <SentimentAccountList
          loading={loadingWordCloudsSentiment}
          accountList={resultWordCloudsSentiment?.wordCloudBySentimentType}
          chartId='Chart 19'
          cardHeader='Word Cloud by Account'
          title='Word Cloud by Sentiment Type: Message Transaction'
          networkTitle='Word Cloud by Sentiment Type: Social Network Analysis'
          params={params}
        />
      </Grid>
    </>
  )
}

export default SentimentWordCloud