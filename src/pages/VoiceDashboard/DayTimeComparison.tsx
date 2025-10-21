import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'

// ** Third Party Imports
import { ApexOptions } from 'apexcharts'

// ** Custom Components Imports
import ReactApexcharts from 'src/@core/components/react-apexcharts'
import { MouseEvent, useEffect, useState } from 'react'
import { StyledTooltip } from '../dashboard/overall'
import { Information } from 'mdi-material-ui'
import DailyMessageDetail from '../dashboard/DailyMessageDetail'
import { IconButton, LinearProgress, Menu, MenuItem, Paper, Typography } from '@mui/material'
import { TimeAxis } from 'src/utils/const'
import Translations from 'src/layouts/components/Translations'
import * as htmlToImage from 'html-to-image'
import { saveAs } from 'file-saver'
import { DotsVertical, Download } from 'mdi-material-ui'
import { useSettings } from 'src/@core/hooks/useSettings'

const onCapture = () => {
  const pictureId = document.getElementById('dayTimeComparison')
  if (pictureId) {
    htmlToImage.toPng(pictureId, { backgroundColor: '#fff' }).then(function (dataUrl) {
      saveAs(dataUrl, 'Day & Time(voice dashboard).png')
    })
  }
}
const DayTimeComparison = ({
  params,
  
  resultDayTimeComparison,
  loadingDayTimeComparison
}: {
  params: any
  chartId: string
  highlight: boolean
  resultDayTimeComparison: any
  loadingDayTimeComparison: boolean
}) => {
  const [series, setSeries] = useState([])
  const [showDetail, setShowDetail] = useState<boolean>(false)
  const [, setKeywordId] = useState<any>()
  const [yIndex, setYIndex] = useState()
  const [xIndex, setXIndex] = useState()
  const [showNoDataText, setShowNoDataText] = useState<boolean>(false)
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const {settings} = useSettings();
  const rowOptionsOpen = Boolean(anchorEl)

  const handleRowOptionsClick = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }
  const handleRowOptionsClose = () => {
    setAnchorEl(null)
  }

  const options: ApexOptions = {
    chart: {
      height: 350,
      type: 'heatmap',
      toolbar: { show: false },
      events: {
        click(event, chartContext, config) {
          setYIndex(config.seriesIndex)
          setXIndex(config.dataPointIndex)
        }
      }
    },
    tooltip: {
      theme : settings.mode === 'light' ? 'light' : 'dark'
    },
    dataLabels: {
      enabled: false
    },
    colors: ['#548235'],
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
    title: {
      text: ''
    }
  }

  useEffect(() => {
    if (resultDayTimeComparison) {
      setSeries(resultDayTimeComparison)
      setShowNoDataText(false)
    } else {
      setSeries([])
      setShowNoDataText(true)
    }
  }, [resultDayTimeComparison])

  useEffect(() => {
    if (yIndex === 0 || yIndex) {
      params.ylabel = resultDayTimeComparison[yIndex]?.name
    }

    if (xIndex === 0 || xIndex) {
      params.label = TimeAxis[xIndex]
    }

    if (yIndex || xIndex || yIndex === 0 || xIndex === 0) {
      setShowDetail(true)
    }
  }, [yIndex, xIndex])

  const reportNo = '2.2.016'

  return (
    <Paper sx={{ border: `3px solid #fff`, borderRadius: 1 }} >
      {loadingDayTimeComparison && <LinearProgress style={{ width: '100%' }} />}

      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
        <span style={{ display: 'flex', justifyContent: 'flex-start' }}>
          <CardHeader
            title={<Translations text='Day & Time' />}
            titleTypographyProps={{ variant: 'h4' }}
          />
          <StyledTooltip
            arrow
            title={
              <span>
                <Typography variant='h6' sx={{ color: 'white' }}>
                  <Translations text='voiceChart14Title' />
                </Typography>
                <Typography variant='body2' sx={{ color: 'white' }}>
                  <Translations text='voiceChart14Description' />
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
      <CardContent id='dayTimeComparison'>
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
          <>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                height: 400,
                overflow: 'visible'
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
                <Translations text='Day' />
              </div>

              <div style={{ flex: 1, height: '100%', minWidth: 0 }}>
                <ReactApexcharts options={options} series={series} type='heatmap' height={350} />
              </div>
            </div>
            <div style={{ textAlign: 'center', color: '#555', fontSize: 13, marginTop: -30 }}>
              <Translations text='Time' />
            </div>
          </>
        )}
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

export default DayTimeComparison
