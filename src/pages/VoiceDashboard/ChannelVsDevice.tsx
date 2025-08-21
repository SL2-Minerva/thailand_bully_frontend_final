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
import { GraphicColors } from 'src/utils/const'
import Translations from 'src/layouts/components/Translations'
import * as htmlToImage from 'html-to-image'
import { saveAs } from 'file-saver'
import { DotsVertical, Download } from 'mdi-material-ui'
import { useSettings } from 'src/@core/hooks/useSettings'

const onCapture = () => {
  const pictureId = document.getElementById('channelVsDevice')
  if (pictureId) {
    htmlToImage.toPng(pictureId, { backgroundColor: '#fff' }).then(function (dataUrl) {
      saveAs(dataUrl, 'Channel vs. Device: Period over Period Comparison(voice dashboard).png')
    })
  }
}
const ChannelVsDevice = ({
  
  resultDeviceVsChannel,
  loadingDeviceVsChannel
}: {
  params: any
  chartId: string
  highlight: boolean
  resultDeviceVsChannel: any
  loadingDeviceVsChannel: boolean
}) => {
  const { settings } = useSettings()
 
  const [seriesData, setSeriesData] = useState([])
  const [labels, setLabels] = useState([])
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)

  const rowOptionsOpen = Boolean(anchorEl)

  const handleRowOptionsClick = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }
  const handleRowOptionsClose = () => {
    setAnchorEl(null)
  }

  const series = [
    {
      data: seriesData
    }
  ]
  const options: ApexOptions = {
    chart: {
      type: 'bar',
      toolbar: { show: false }
    },

    // labels: ["Anriod", "Web", "iPhone"],
    colors: GraphicColors,
    tooltip: {
      theme: settings.mode === 'dark' ? 'dark' : 'light'
    },
    plotOptions: {
      bar: {
        columnWidth: '45%',
        distributed: true
      }
    },
    dataLabels: {
      enabled: false
    },
    legend: {
      show: false
    },
    xaxis: {
      categories: labels,
      labels: {
        style: {
          colors: GraphicColors,
          fontSize: '12px'
        }
      }
    }
  }

  useEffect(() => {
    if (resultDeviceVsChannel) {
      const seriesData = resultDeviceVsChannel?.data
      const labelData = resultDeviceVsChannel?.labels

      if (seriesData) {
        setSeriesData(seriesData)
      }
      if (labelData) {
        setLabels(labelData)
      }
    }
  }, [resultDeviceVsChannel])

  // const reportNo = '2.2.024'

  return (
    <Paper style={{ minHeight: 550, maxHeight: 550, border: `3px solid #fff`, borderRadius: 7 }} >
      {loadingDeviceVsChannel && <LinearProgress style={{ width: '100%' }} />}

      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
        <span style={{ display: 'flex', justifyContent: 'flex-start' }}>
          <CardHeader
            title={<Translations text='Channel vs. Device: Period over Period Comparison' />}
            titleTypographyProps={{ variant: 'h6' }}
            subheader='Period over Period Comparison'
            subheaderTypographyProps={{ variant: 'h6' }}
          />
          <StyledTooltip
            arrow
            title={
              <span>
                <Typography variant='h6' sx={{ color: 'white' }}>
                  <Translations text='voiceChart20Title' />
                </Typography>
                <Typography variant='body2' sx={{ color: 'white' }}>
                  <Translations text='voiceChart20Description' />
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
      <CardContent id='channelVsDevice'>
        <Grid container spacing={1}>
          <Grid item xs={12} height={315}>
            {!resultDeviceVsChannel ? (
              <div
                style={{
                  height: 300,
                  padding: '70px 0',
                  textAlign: 'center',
                  verticalAlign: 'middle',
                  color: '#80808059'
                }}
              >
                <Translations text='no data' />
              </div>
            ) : (
              <ReactApexcharts type='bar' options={options} series={series} height={305} />
            )}
          </Grid>
        </Grid>
      </CardContent>
    </Paper>
  )
}

export default ChannelVsDevice
