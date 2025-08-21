import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import { Grid, IconButton, LinearProgress, Menu, MenuItem, Paper, Typography } from '@mui/material'

// ** Third Party Imports
import { ApexOptions } from 'apexcharts'

// ** Custom Components Imports
import ReactApexcharts from 'src/@core/components/react-apexcharts'
import { MouseEvent, useEffect, useState } from 'react'
import { StyledTooltip } from '../dashboard/overall'
import { Information } from 'mdi-material-ui'
import DailyMessageDetail from '../dashboard/DailyMessageDetail'
import { TimeAxis } from 'src/utils/const'
import Translations from 'src/layouts/components/Translations'
import * as htmlToImage from 'html-to-image'
import { saveAs } from 'file-saver'
import { DotsVertical, Download } from 'mdi-material-ui'
import { useSettings } from 'src/@core/hooks/useSettings'

const onCapture = () => {
  const pictureId = document.getElementById('dayTimeBullyLevel')
  if (pictureId) {
    htmlToImage.toPng(pictureId, { backgroundColor: '#fff' }).then(function (dataUrl) {
      saveAs(dataUrl, 'Day & Time By Bully Level(voice dashboard).png')
    })
  }
}
interface Props {
  chartId: string
  params: any
  highlight: boolean
  resultTimeByBullyLevel: any
  resultDayByBullyLevel: any
  loadingByBullyLevel: boolean
}

const DayTimeBullyLevel = (props: Props) => {
  const { params, highlight, resultTimeByBullyLevel, resultDayByBullyLevel, loadingByBullyLevel } = props

  const [seriesHour, setSeriesHour] = useState([{ name: '', data: [] }])
  const [seriesDays, setSeriesDays] = useState([{ name: '', data: [] }])
  const [showDetail, setShowDetail] = useState<boolean>(false)
  const [, setKeywordId] = useState<any>()
  const [yIndex, setYIndex] = useState()
  const [xIndex, setXIndex] = useState()
  const [yIndexTime, setYIndexTime] = useState()
  const [xIndexTime, setXIndexTime] = useState()
  const [ylabels, setYlabels] = useState<any>([])
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const {settings} = useSettings();
  const rowOptionsOpen = Boolean(anchorEl)

  const handleRowOptionsClick = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }
  const handleRowOptionsClose = () => {
    setAnchorEl(null)
  }


  const Days = ['Mon', 'Tue', 'Wed', 'Thur', 'Fri', 'Sat', 'Sun']

  const options_hours: ApexOptions = {
    chart: {
      height: 200,
      type: 'heatmap',
      toolbar: { show: false },
      events: {
        click(event, chartContext, config) {
          setYIndexTime(config.seriesIndex)
          setXIndexTime(config.dataPointIndex)
        }
      }
    },
    tooltip: {
      theme : settings.mode === 'light' ? 'light' : 'dark'
    },
    dataLabels: {
      enabled: false
    },
    xaxis: {
      categories: TimeAxis,
      labels: {
        style: {
          colors: settings.mode === 'light' ? '#4c4e64de' : 'white'
        }
      } 
    },
    yaxis : {
      labels: {
        style: {
          colors: settings.mode === 'light' ? '#4c4e64de' : 'white'
        }
      } 
    },
    colors: ['#548235']
  }

  const options_level: ApexOptions = {
    chart: {
      height: 100,
      type: 'heatmap',
      toolbar: { show: false },
      events: {
        click(event, chartContext, config) {
          setYIndex(config.seriesIndex)
          setXIndex(config.dataPointIndex)
        }
      }
    },
    xaxis: {
      categories: Days,
      labels: {
        style: {
          colors: settings.mode === 'light' ? '#4c4e64de' : 'white'
        }
      } 
    },
    yaxis : {
      labels: {
        style: {
          colors: settings.mode === 'light' ? '#4c4e64de' : 'white'
        }
      } 
    },
    tooltip: {
      theme : settings.mode === 'light' ? 'light' : 'dark'
    },
    dataLabels: {
      enabled: false
    },
    colors: ['#548235']
  }

  useEffect(() => {
    const bullyLevelLabels = []
    if (resultDayByBullyLevel) {
      setSeriesDays(resultDayByBullyLevel)
      if (resultDayByBullyLevel?.length > 0) {
        for (let i = 0; i <= resultDayByBullyLevel?.length; i++) {
          bullyLevelLabels.push(resultDayByBullyLevel[i]?.name)
        }
        setYlabels(bullyLevelLabels)
      }
    } else {
      setSeriesDays([{ name: '', data: [] }])
    }
    if (resultTimeByBullyLevel) {
      const hourValue: any[] = []
      if (resultTimeByBullyLevel?.length > 0) {
        for (let i = 0; i < resultTimeByBullyLevel?.length; i++) {
          hourValue.push({
            name: bullyLevelLabels[i],
            data: resultTimeByBullyLevel[i]?.data
          })
        }
      }
      setSeriesHour(hourValue)
    } else {
      setSeriesHour([{ name: '', data: [] }])
    }
  }, [resultTimeByBullyLevel, resultDayByBullyLevel])
  const reportNo = '2.2.018'

  useEffect(() => {
    if (yIndex === 0 || yIndex) {
      params.ylabel = ylabels[yIndex]
    }

    if (xIndex === 0 || xIndex) {
      params.label = Days[xIndex]
    }

    if (yIndex || xIndex || yIndex === 0 || xIndex === 0) {
      setShowDetail(true)
    }
  }, [yIndex, xIndex])

  useEffect(() => {
    if (yIndexTime === 0 || yIndexTime) {
      params.ylabel = ylabels[yIndexTime]
    }

    if (xIndexTime === 0 || xIndexTime) {
      console.log('x ', xIndexTime)
      params.label = TimeAxis[xIndexTime]
    }

    if (yIndexTime === 0 || xIndexTime === 0 || yIndexTime || xIndexTime) {
      setShowDetail(true)
    }
  }, [yIndexTime, xIndexTime])

  return (
    <Paper sx={{ border: `3px solid #fff`, borderRadius: 1 }} >
      {loadingByBullyLevel && <LinearProgress style={{ width: '100%' }} />}

      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
        <span style={{ display: 'flex', justifyContent: 'flex-start' }}>
          <CardHeader
            title={<Translations text='Day & Time by Bully Level' />}
            titleTypographyProps={{ variant: 'h4', color: highlight ? 'green' : '#4c4e64de' }}
          />
          <StyledTooltip
            arrow
            title={
              <span>
                <Typography variant='h6' sx={{ color: 'white' }}>
                  <Translations text='voiceChart16Title' />
                </Typography>
                <Typography variant='body2' sx={{ color: 'white' }}>
                  <Translations text='voiceChart16Description' />
                </Typography>
              </span>
            }
          >
            <Information style={{ marginTop: '22px', fontSize: '29px', color: highlight ? 'green' : '#4c4e64de' }} />
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
      <CardContent id='dayTimeBullyLevel'>
        <Grid container spacing={3}>
          <Grid item xs={4}>
            {!resultDayByBullyLevel ? (
              <div
                style={{
                  height: 300,
                  padding: '100px 0',
                  textAlign: 'center',
                  verticalAlign: 'middle',
                  color: '#80808059'
                }}
              >
                <Translations text='no data' />
              </div>
            ) : (
              <ReactApexcharts options={options_level} series={seriesDays} type='heatmap' height={200} />
            )}
          </Grid>
          <Grid item xs={8}>
            {!resultTimeByBullyLevel ? (
              <div
                style={{
                  height: 300,
                  padding: '100px 0',
                  textAlign: 'center',
                  verticalAlign: 'middle',
                  color: '#80808059'
                }}
              >
                <Translations text='no data' />
              </div>
            ) : (
              <ReactApexcharts options={options_hours} series={seriesHour} type='heatmap' height={200} />
            )}
          </Grid>
        </Grid>
        {showDetail ? (
          <DailyMessageDetail
            show={showDetail}
            setShow={setShowDetail}
            params={params}
            reportNo={reportNo}

            keywordId={params.keywordIds === 'all' ? '' : params.keywordIds}
            setKeywordId={setKeywordId}
          />
        ) : (
          ''
        )}
      </CardContent>
    </Paper>
  )
}

export default DayTimeBullyLevel
