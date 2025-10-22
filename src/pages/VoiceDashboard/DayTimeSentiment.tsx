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
  const pictureId = document.getElementById('dayTimeSentiment')
  if (pictureId) {
    htmlToImage.toPng(pictureId, { backgroundColor: '#fff' }).then(function (dataUrl) {
      saveAs(dataUrl, 'Day & Time by Sentiment(voice dashboard).png')
    })
  }
}
interface Props {
  chartId: string
  params: any
  highlight: boolean
  resultDayBySentiment: any
  resultTimeBySentiment: any
  loadingBySentiment: boolean
}

const DayTimeSentiment = (props: Props) => {
  const { params, resultDayBySentiment, resultTimeBySentiment, loadingBySentiment } = props

  const [seriesHour, setSeriesHour] = useState([{ name: '', data: [] }])
  const [seriesDays, setSeriesDays] = useState([{ name: '', data: [] }])
  const [showDetail, setShowDetail] = useState<boolean>(false)
  const [, setKeywordId] = useState<any>()
  const [yIndex, setYIndex] = useState()
  const [xIndex, setXIndex] = useState()
  const [yIndexTime, setYIndexTime] = useState()
  const [xIndexTime, setXIndexTime] = useState()
  const Days = ['Mon', 'Tue', 'Wed', 'Thur', 'Fri', 'Sat', 'Sun']
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const { settings } = useSettings()
  const rowOptionsOpen = Boolean(anchorEl)

  const handleRowOptionsClick = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }
  const handleRowOptionsClose = () => {
    setAnchorEl(null)
  }

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
    plotOptions: {
      heatmap: {
        radius: 0, // ช่องเป็นสี่เหลี่ยมตรง
        enableShades: true, // ไล่สีตามค่า
        shadeIntensity: 0.5,
        distributed: false // gradient ตามค่าจริง
      }
    },
    stroke: {
      show: true, // เส้นแบ่งช่อง
      width: 1,
      colors: [settings.mode === 'light' ? '#ecececff' : '#555']
    },
    tooltip: {
      theme: settings.mode === 'light' ? 'light' : 'dark'
    },
    dataLabels: {
      enabled: true,
      formatter: (val: number | string | number[]) => {
        // ถ้า val เป็น array ให้เลือกแสดงค่าตัวแรก หรือ return '' ก็ได้
        if (Array.isArray(val)) return ''
        if (val === 0) return ''

        return val
      },
      style: {
        colors: [settings.mode === 'light' ? '#000' : '#fff'],
        fontSize: '12px',
        fontWeight: 'lighter'
      },
      dropShadow: { enabled: false }
    },
    xaxis: {
      categories: TimeAxis,
      labels: {
        style: {
          colors: settings.mode === 'light' ? '#4c4e64de' : 'white'
        }
      }
    },
    yaxis: {
      labels: {
        style: {
          colors: settings.mode === 'light' ? '#4c4e64de' : 'white'
        }
      }
    },
    colors: ['#548235']
  }

  const options_days: ApexOptions = {
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
    plotOptions: {
      heatmap: {
        radius: 0, // ช่องเป็นสี่เหลี่ยมตรง
        enableShades: true, // ไล่สีตามค่า
        shadeIntensity: 0.5,
        distributed: false // gradient ตามค่าจริง
      }
    },
    stroke: {
      show: true, // เส้นแบ่งช่อง
      width: 1,
      colors: [settings.mode === 'light' ? '#ecececff' : '#555']
    },
    tooltip: {
      theme: settings.mode === 'light' ? 'light' : 'dark'
    },
    dataLabels: {
      enabled: true,
      formatter: (val: number | string | number[]) => {
        // ถ้า val เป็น array ให้เลือกแสดงค่าตัวแรก หรือ return '' ก็ได้
        if (Array.isArray(val)) return ''
        if (val === 0) return ''

        return val
      },
      style: {
        colors: [settings.mode === 'light' ? '#000' : '#fff'],
        fontSize: '12px',
        fontWeight: 'lighter'
      },
      dropShadow: { enabled: false }
    },
    xaxis: {
      categories: Days,
      labels: {
        style: {
          colors: settings.mode === 'light' ? '#4c4e64de' : 'white'
        }
      }
    },
    yaxis: {
      labels: {
        style: {
          colors: settings.mode === 'light' ? '#4c4e64de' : 'white'
        }
      }
    },
    colors: ['#548235']
  }

  useEffect(() => {
    if (resultDayBySentiment) {
      setSeriesDays(resultDayBySentiment)
    } else {
      setSeriesDays([{ name: '', data: [] }])
    }
    if (resultTimeBySentiment) {
      const hourValue: any[] = []
      if (resultTimeBySentiment?.length > 0) {
        for (let i = 0; i < resultTimeBySentiment?.length; i++) {
          hourValue.push({
            name: resultDayBySentiment[i]?.name,
            data: resultTimeBySentiment[i]?.data
          })
        }
      }
      setSeriesHour(hourValue)
    } else {
      setSeriesHour([{ name: '', data: [] }])
    }
  }, [resultDayBySentiment, resultTimeBySentiment])

  useEffect(() => {
    if (yIndex === 0 || yIndex) {
      params.ylabel = resultDayBySentiment[yIndex]?.name
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
      params.ylabel = resultDayBySentiment[yIndexTime]?.name
    }

    if (xIndexTime === 0 || xIndexTime) {
      console.log('x ', xIndexTime)
      params.label = TimeAxis[xIndexTime]
    }

    if (yIndexTime === 0 || xIndexTime === 0 || yIndexTime || xIndexTime) {
      setShowDetail(true)
    }
  }, [yIndexTime, xIndexTime])

  const reportNo = '2.2.017'

  return (
    <Paper sx={{ border: `3px solid #fff`, borderRadius: 1 }}>
      {loadingBySentiment && <LinearProgress style={{ width: '100%' }} />}

      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
        <span style={{ display: 'flex', justifyContent: 'flex-start' }}>
          <CardHeader
            title={<Translations text='Day & Time by Sentiment' />}
            titleTypographyProps={{ variant: 'h4' }}
          />
          <StyledTooltip
            arrow
            title={
              <span>
                <Typography variant='h6' sx={{ color: 'white' }}>
                  <Translations text='voiceChart15Title' />
                </Typography>
                <Typography variant='body2' sx={{ color: 'white' }}>
                  <Translations text='voiceChart15Description' />
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
      <CardContent id='dayTimeSentiment'>
        <Grid container spacing={3}>
          <Grid item xs={4}>
            {!resultDayBySentiment ? (
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
              <>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px'
                  }}
                >
                  <div
                    style={{
                      writingMode: 'vertical-rl',
                      transform: 'rotate(180deg)',
                      textAlign: 'center',
                      whiteSpace: 'nowrap',
                      color: '#555',
                      fontSize: 13,
                      minWidth: 20
                    }}
                  >
                    <Translations text='Sentiment' />
                  </div>

                  <div style={{ flex: 1, minWidth: 0 }}>
                    <ReactApexcharts options={options_days} series={seriesDays} type='heatmap' height={170} />
                  </div>
                </div>
                <div style={{ textAlign: 'center', color: '#555', fontSize: 13, marginTop: 8 }}>
                  <Translations text='Day' />
                </div>
              </>
            )}
          </Grid>
          <Grid item xs={8}>
            {!resultTimeBySentiment ? (
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
              <>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px'
                  }}
                >
                  <div
                    style={{
                      writingMode: 'vertical-rl',
                      transform: 'rotate(180deg)',
                      textAlign: 'center',
                      whiteSpace: 'nowrap',
                      color: '#555',
                      fontSize: 13,
                      minWidth: 20
                    }}
                  >
                    <Translations text='Sentiment' />
                  </div>

                  <div style={{ flex: 1, minWidth: 0 }}>
                    <ReactApexcharts options={options_hours} series={seriesHour} type='heatmap' height={170} />
                  </div>
                </div>
                <div style={{ textAlign: 'center', color: '#555', fontSize: 13, marginTop: 8 }}>
                  <Translations text='Time' />
                </div>
              </>
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

export default DayTimeSentiment
