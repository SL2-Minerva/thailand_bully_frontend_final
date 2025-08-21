import ReactWordcloud from 'react-wordcloud'
import 'tippy.js/dist/tippy.css'
import 'tippy.js/animations/scale.css'
import {
  CardHeader,
  FormControl,
  Grid,
  InputLabel,
  LinearProgress,
  MenuItem,
  Paper,
  Select,
  SelectChangeEvent,
  Typography
} from '@mui/material'
import { useCallback } from 'react'
import { GetPublicSourceList } from 'src/services/api/source/SourceApi'
import { StyledTooltip } from '../dashboard/overall'
import { Information } from 'mdi-material-ui'
import { GetWordCloudsPlatform } from 'src/services/api/dashboards/overall/overallDashboardApi'
import Translations from 'src/layouts/components/Translations'
import 'd3-transition'
import { select } from 'd3-selection'
import AccountList from '../dashboard/AccountList'

interface Props {
  apiParams: any
  platformId: string
  setPlatformId: any
  setWord: any
  params: any
}

const ChannelWordCloud = (props: Props) => {
  const { apiParams, platformId, setPlatformId, setWord, params } = props
  const { publicSourceList } = GetPublicSourceList()

  const { resultWordCloudsPlatform, loadingWordCloudsPlatform } = GetWordCloudsPlatform(apiParams)

  const handleSelectList = useCallback((e: SelectChangeEvent) => {
    setPlatformId(e.target.value)
  }, [])

  // const reportNo = '1.2.023'

  // function getCallback(callback: any) {
  //   return function (word: any, event: any) {
  //     const isActive = callback !== 'onWordMouseOut'
  //     const element = event.target
  //     const text = select(element)
  //     text
  //       .on('click', () => {
  //         if (isActive && word) {
  //           // window.open(`https://www.google.com/`, "_blank");

  //           const selectedWord = word?.text
  //           setWord(selectedWord)
  //         }
  //       })
  //       .transition()
  //       .attr('text-decoration', isActive ? 'underline' : 'none')

  //     // .attr('background', 'white')
  //     // .attr('font-size', isActive ? '300%' : '100%')
  //   }
  // }

  function getCallback(callback: any) {
    return function (word: any, event: any) {
      const isActive = callback !== 'onWordMouseOut'
      const element = event.target
      const text = select(element)
      text
        .on('click', () => {
          if (isActive && word) {
            const selectedWord = word?.text
            setWord((prevWords: string[]) => {
              if (prevWords.includes(selectedWord)) {
                return prevWords.filter(w => w !== selectedWord)
              } else {
                return [...prevWords, selectedWord]
              }
            })
          }
        })
        .transition()
        .attr('text-decoration', isActive ? 'underline' : 'none')
    }
  }

  const callbacks = {
    getWordTooltip: (word: any) => `The word "${word.text}" appears ${word.value} times.`,
    onWordClick: getCallback('onWordClick'),
    onWordMouseOut: getCallback('onWordMouseOut'),
    onWordMouseOver: getCallback('onWordMouseOver')
  }

  return (
    <>
      <Grid item xs={12} md={6}>
        <Paper
          style={{ border: `3px solid #fff`, borderRadius: 7, maxHeight: 500, minHeight: 500, overflow: 'auto' }}
        >
          {loadingWordCloudsPlatform && <LinearProgress style={{ width: '100%' }} />}
          <span style={{ display: 'flex', justifyContent: 'flex-start' }}>
            <CardHeader
              title={<Translations text='Word Cloud by Channel' />}
              titleTypographyProps={{ variant: 'h6' }}
            />
            <StyledTooltip
              arrow
              title={
                <span>
                  <Typography variant='h6' sx={{ color: 'white' }}>
                    <Translations text='wordCloudChart3Title' />
                  </Typography>
                  <Typography variant='body2' sx={{ color: 'white' }}>
                    <Translations text='wordCloudChart3Description' />
                  </Typography>
                </span>
              }
            >
              <Information style={{ marginTop: '22px', fontSize: '29px' }} />
            </StyledTooltip>
          </span>
          <Grid container spacing={2}>
            <Grid item sm={6} xs={6} ml={4}>
              <FormControl fullWidth>
                <InputLabel id='plan-select'>Select Platform</InputLabel>
                <Select
                  fullWidth
                  value={platformId}
                  id='select-platform'
                  label='Select Channel'
                  labelId='platform-select'
                  size='small'
                  onChange={e => {
                    handleSelectList(e)
                  }}
                  inputProps={{ placeholder: 'Select Channel' }}
                >
                  {publicSourceList &&
                    publicSourceList.map((item: any, index: number) => {
                      return (
                        <MenuItem key={index} value={item.id}>
                          {item.name}
                        </MenuItem>
                      )
                    })}
                </Select>
              </FormControl>
            </Grid>
          </Grid>
          <div style={{ display: 'flex', justifyContent: 'center', marginTop: '30px' }}>
            {loadingWordCloudsPlatform ? (
              ''
            ) : (
              <>
                {!resultWordCloudsPlatform?.word_clouds_platform ||
                resultWordCloudsPlatform?.word_clouds_platform?.length == 0 ? (
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
                    words={resultWordCloudsPlatform?.word_clouds_platform || []}
                    callbacks={callbacks}
                  />
                )}
              </>
            )}
          </div>
        </Paper>
      </Grid>
      <Grid id='chart16' item xs={12} md={6}>
        <AccountList
          loading={loadingWordCloudsPlatform}
          accountList={resultWordCloudsPlatform?.wordCloudByAccount}
          chartId='Chart 16'
          cardHeader='Word Cloud by Account'
          title='Word Cloud by Account: Message Transaction'
          networkTitle='Word Cloud by Account: Social Network Analysis'
          params={params}
        />
      </Grid>
    </>
  )
}

export default ChannelWordCloud
