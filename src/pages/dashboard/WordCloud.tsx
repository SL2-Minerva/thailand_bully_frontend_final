import ReactWordcloud from 'react-wordcloud'
import 'tippy.js/dist/tippy.css'
import 'tippy.js/animations/scale.css'
import { Paper, CardHeader, LinearProgress, Typography } from '@mui/material'
import { StyledTooltip } from './overall'
import { Information } from 'mdi-material-ui'
import Translations from 'src/layouts/components/Translations'
import 'd3-transition'
import { select } from 'd3-selection'

const WordCloud = ({
  resultWordClouds,
  loadingWordClouds,
  setWord
}: {
  params: any
  chartId: string
  resultWordClouds: any
  loadingWordClouds: boolean
  setWord: any
}) => {
  // const reportNo = '1.2.021'

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
        
        //.attr('text-decoration', isActive ? 'underline' : 'none')
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
    <Paper style={{ border: `3px solid #fff`, borderRadius: 7, maxHeight: 470, minHeight: 470, overflow: 'auto' }}>
      {loadingWordClouds && <LinearProgress style={{ width: '100%' }} />}
      <span style={{ display: 'flex', justifyContent: 'flex-start' }}>
        <CardHeader title={<Translations text='Word Clouds' />} titleTypographyProps={{ variant: 'h6' }} />
        <StyledTooltip
          arrow
          title={
            <span>
              <Typography variant='h6' sx={{ color: 'white' }}>
                <Translations text='wordCloudChart1Title' />
              </Typography>
              <Typography variant='body2' sx={{ color: 'white' }}>
                <Translations text='wordCloudChart1Description' />
              </Typography>
            </span>
          }
        >
          <Information style={{ marginTop: '22px', fontSize: '29px' }} />
        </StyledTooltip>
      </span>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        {!loadingWordClouds ? (
          <>
            {!resultWordClouds?.word_clouds || resultWordClouds?.word_clouds?.length == 0 ? (
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
                  colors: ['#1f77b4', '#ff7f0e', '#2ca02c', '#d62728', '#9467bd', '#8c564b'],
                  enableTooltip: true,
                  deterministic: false,
                  fontFamily: 'impact',
                  fontSizes: [12, 70],
                  fontStyle: 'normal',
                  fontWeight: 'normal',
                  padding: 1,
                  scale: 'sqrt',
                  spiral: 'archimedean',
                  transitionDuration: 1000
                }}
                words={resultWordClouds?.word_clouds || []}
                callbacks={callbacks}
              />
            )}
          </>
        ) : (
          ''
        )}
      </div>
    </Paper>
  )
}

export default WordCloud
