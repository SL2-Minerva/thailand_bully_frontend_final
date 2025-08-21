import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'

// ** Custom Components Imports
import { MouseEvent, useEffect, useState } from 'react'
import { StyledTooltip } from '../dashboard/overall'
import { Information } from 'mdi-material-ui'

import { Chart as ChartJS, RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend } from 'chart.js'

import { Radar } from 'react-chartjs-2'
import { GraphicColors } from 'src/utils/const'
import { IconButton, LinearProgress, Menu, MenuItem, Paper, Typography } from '@mui/material'
import Translations from 'src/layouts/components/Translations'
import * as htmlToImage from 'html-to-image'
import { saveAs } from 'file-saver'
import { DotsVertical, Download } from 'mdi-material-ui'
import { useSettings } from 'src/@core/hooks/useSettings'

const onCapture = () => {
  const pictureId = document.getElementById('byBullyType')
  if (pictureId) {
    htmlToImage.toPng(pictureId, { backgroundColor: '#fff' }).then(function (dataUrl) {
      saveAs(dataUrl, 'Percentage of Keyword Comparison by Bully Type(voice dashboard).png')
    })
  }
}

ChartJS.register(RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend)

const datasets: any[] = []
export const initValue = {
  labels: [],
  datasets: datasets
}

export const getChartData = (data: any, keywordColor: any) => {
  if (!data) return []

  const seriesData: any[] = []

  if (data) {
    for (let i = 0; i < data?.length; i++) {
      let color = ''
      for (let j = 0; j < keywordColor?.length; j++) {
        if (keywordColor[j]?.keywordName === data[i].keyword_name) {
          color = keywordColor[j]?.color
        }
      }
  
      seriesData.push({
        label: data[i].keyword_name || '',
        data: data[i]?.data || [],
        backgroundColor: color || GraphicColors[i],
        borderColor: color || GraphicColors[i],
        borderWidth: 4,
        fill: false
      })
    }
  }

  return seriesData
}

const KeywordComparisonByBullyType = ({
  resultKeywordComparisonByBullyType,
  loadingKeywordComparisonByBullyType,
  keywordsColor
}: {
  params: any
  chartId: string
  highlight?: boolean
  resultKeywordComparisonByBullyType: any
  loadingKeywordComparisonByBullyType: boolean
  keywordsColor: any
}) => {
  const [charData, setChartData] = useState(initValue)
  const [showNoDataText, setShowNoDataText] = useState<boolean>(false)
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)

  const rowOptionsOpen = Boolean(anchorEl)

  const handleRowOptionsClick = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }
  const handleRowOptionsClose = () => {
    setAnchorEl(null)
  }

  useEffect(() => {
    if (resultKeywordComparisonByBullyType) {
      const seriesData = getChartData(resultKeywordComparisonByBullyType?.value, keywordsColor)
      setChartData({
        labels: resultKeywordComparisonByBullyType?.labels ? resultKeywordComparisonByBullyType?.labels : [],
        datasets: seriesData
      })
    }
    if (resultKeywordComparisonByBullyType?.value) {
      setShowNoDataText(false)
    } else {
      setShowNoDataText(true)
    }
  }, [resultKeywordComparisonByBullyType, keywordsColor])

  // const reportNo = '2.2.028'
  const {settings} = useSettings();

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

  return (
    <Paper style={{ border: `3px solid #fff`, borderRadius: 7 }}>
      {loadingKeywordComparisonByBullyType && <LinearProgress style={{ width: '100%' }} />}

      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
        <span style={{ display: 'flex', justifyContent: 'flex-start' }}>
          <CardHeader
            title={<Translations text='Percentage of Keyword Comparison by Bully Type' />}
            titleTypographyProps={{ variant: 'h6' }}
          />
          <StyledTooltip
            arrow
            title={
              <span>
                <Typography variant='h6' sx={{ color: 'white' }}>
                  <Translations text='voiceChart24Title' />
                </Typography>
                <Typography variant='body2' sx={{ color: 'white' }}>
                  <Translations text='voiceChart24Description' />
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
      <CardContent id='byBullyType'>
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
          <Radar data={charData} height={100} options={options}/>
        )}
      </CardContent>
    </Paper>
  )
}

export default KeywordComparisonByBullyType
