import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'

import { MouseEvent, useEffect, useState } from 'react'
import { StyledTooltip } from '../dashboard/overall'
import { Information } from 'mdi-material-ui'
import { Chart as ChartJS, RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend } from 'chart.js'

import { Radar } from 'react-chartjs-2'
import { getChartData, initValue } from './KeywordComparisonByBullyType'
import { IconButton, LinearProgress, Menu, MenuItem, Paper, Typography } from '@mui/material'
import Translations from 'src/layouts/components/Translations'
import * as htmlToImage from 'html-to-image'
import { saveAs } from 'file-saver'
import { DotsVertical, Download } from 'mdi-material-ui'
import { useSettings } from 'src/@core/hooks/useSettings'

const onCapture = () => {
  const pictureId = document.getElementById('bySentiment')
  if (pictureId) {
    htmlToImage.toPng(pictureId, { backgroundColor: '#fff' }).then(function (dataUrl) {
      saveAs(dataUrl, 'Percentage of Keyword Comparison by Sentiment(voice dashboard).png')
    })
  }
}
ChartJS.register(RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend)

const KeywordComparisonBySentiment = ({
  resultKeywordComparisonBySentiment,
  loadingKeywordComparisonBySentiment,
  keywordsColor
}: {
  params: any
  chartId: string
  highlight?: boolean
  resultKeywordComparisonBySentiment: any
  loadingKeywordComparisonBySentiment: boolean
  keywordsColor: any
}) => {
  const [charData, setChartData] = useState(initValue)
  const [showNoDataText, setShowNoDataText] = useState<boolean>(false)
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)

  const rowOptionsOpen = Boolean(anchorEl)
  const { settings } = useSettings()

  const handleRowOptionsClick = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }
  const handleRowOptionsClose = () => {
    setAnchorEl(null)
  }

  useEffect(() => {
    if (resultKeywordComparisonBySentiment) {
      const seriesData = getChartData(resultKeywordComparisonBySentiment?.value, keywordsColor)
      setChartData({
        labels: resultKeywordComparisonBySentiment?.labels ? resultKeywordComparisonBySentiment?.labels : [],
        datasets: seriesData
      })

      if (resultKeywordComparisonBySentiment?.value) {
        setShowNoDataText(false)
      } else {
        setShowNoDataText(true)
      }
    }
  }, [resultKeywordComparisonBySentiment, keywordsColor])

  const options = {
    plugins: {
      legend: {
        display: true,
        labels: {
          color: settings.mode === 'light' ? 'grey' : 'white'
        }
      }
    },
    scales: {
      r: {
        angleLines: {
          color: settings.mode === 'light' ? '#eaeaea' : 'white'
        },
        grid: {
          color: settings.mode === 'light' ? '#eaeaea' : 'white'
        }, 
        pointLabels: {
          color: settings.mode === 'light' ? 'grey' : 'white'
        }
      }
    }
  }

  // const reportNo = '2.2.026'

  return (
    <Paper style={{ border: `3px solid #fff`, borderRadius: 7 }}>
      {loadingKeywordComparisonBySentiment && <LinearProgress style={{ width: '100%' }} />}

      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
        <span style={{ display: 'flex', justifyContent: 'flex-start' }}>
          <CardHeader
            title={<Translations text='Percentage of Keyword Comparison by Sentiment' />}
            titleTypographyProps={{ variant: 'h6' }}
          />
          <StyledTooltip
            arrow
            title={
              <span>
                <Typography variant='h6' sx={{ color: 'white' }}>
                  <Translations text='voiceChart22Title' />
                </Typography>
                <Typography variant='body2' sx={{ color: 'white' }}>
                  <Translations text='voiceChart22Description' />
                </Typography>
              </span>
            }
          >
            <Information style={{ marginTop: '22px', fontSize: '29px' }} />
          </StyledTooltip>
        </span>
        <span style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <IconButton size='large' onClick={handleRowOptionsClick} sx={{ m: 2 }}>
            <DotsVertical />
          </IconButton>
          <Menu
            keepMounted
            anchorEl={anchorEl}
            open={rowOptionsOpen}
            onClose={handleRowOptionsClose}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'right'
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right'
            }}
            PaperProps={{ style: { minWidth: '8rem' } }}
          >
            <MenuItem
              onClick={() => {
                onCapture()
                setAnchorEl(null)
              }}
            >
              <Download fontSize='medium' sx={{ mr: 2 }} />
              PNG
            </MenuItem>
          </Menu>
        </span>
      </div>
      <CardContent id='bySentiment'>
        {showNoDataText ? (
          <div
            style={{
              height: 300,
              padding: '170px 0',
              textAlign: 'center',
              verticalAlign: 'middle',
              color: '#80808059'
            }}
          >
            <Translations text='no data' />
          </div>
        ) : (
          <Radar data={charData} height={100} options={options} />
        )}
      </CardContent>
    </Paper>
  )
}

export default KeywordComparisonBySentiment
