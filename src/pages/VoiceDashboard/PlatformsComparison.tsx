// ** MUI Imports
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import { Box, Grid, IconButton, LinearProgress, Menu, MenuItem, Typography, Paper } from '@mui/material'

// ** Third Party Imports

import { Doughnut } from 'react-chartjs-2'
import { Chart } from 'chart.js'
import * as DoughnutLabel from 'chartjs-plugin-doughnutlabel-rebourne'
import { MouseEvent, useEffect, useState } from 'react'
import { StyledTooltip } from '../dashboard/overall'
import { Information } from 'mdi-material-ui'
import { GraphicColors } from 'src/utils/const'
import Translations from 'src/layouts/components/Translations'
import CustomeLabels from './CustomLabel'
import * as htmlToImage from 'html-to-image'
import { saveAs } from 'file-saver'
import { DotsVertical, Download } from 'mdi-material-ui'
import { useSettings } from 'src/@core/hooks/useSettings'

const onCapture = () => {
  const pictureId = document.getElementById('platformComparison')
  if (pictureId) {
    htmlToImage.toPng(pictureId, { backgroundColor: '#fff' }).then(function (dataUrl) {
      saveAs(dataUrl, 'Channel/Platform: Period over Period Comparison(voice dashboard).png')
    })
  }
}
Chart.register(DoughnutLabel)
const PlatformsComparison = ({
  resultPlatformComparison,
  loadingPlatformComparison
}: {
  params: any
  chartId: string
  highlight: boolean
  resultPlatformComparison: any
  loadingPlatformComparison: boolean
}) => {
  const initValue = {
    label: [],
    data: [],
    total: 0
  }
  const [previousData, setPreviousData] = useState(initValue)
  const [currentData, setCurrentData] = useState(initValue)
  const [showNoDataText, setShowNoDataText] = useState<boolean>(false)
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const { settings } = useSettings()
  const rowOptionsOpen = Boolean(anchorEl)

  const handleRowOptionsClick = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }
  const handleRowOptionsClose = () => {
    setAnchorEl(null)
  }

  const currentPeriodOptions = {
    responsive: true,
    backgroundColor: false,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false
      },
      doughnutlabel: {
        paddingPercentage: 5,
        labels: [
          {
            text: currentData?.total && currentData?.total != 0 ? currentData?.total?.toLocaleString('en-US') : '',
            font: {
              size: '50',
              family: 'Arial, Helvetica, sans-serif',
              weight: 'bold'
            },
            color: settings.mode ==='light' ? '#434343' : 'white'
          }
        ]
      }
    }
  }

  const currentPeriodData = {
    labels: currentData?.label || [],
    datasets: [
      {
        data: currentData?.data || [],
        backgroundColor: GraphicColors,

        // backgroundColor: [
        //   "#299b82",
        //   "#1640a1c4",
        //   "#d8df20",
        //   "#e02916",
        //   "#ffca25",
        //   "#C0D3DF",
        // ],
        hoverOffset: 3
      }
    ]
  }

  const previousPeriodOptions = {
    responsive: true,
    backgroundColor: false,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false
      },
      doughnutlabel: {
        paddingPercentage: 5,
        labels: [
          {
            text: previousData?.total && previousData?.total != 0 ? previousData?.total?.toLocaleString('en-US') : '',
            font: {
              size: '50',
              family: 'Arial, Helvetica, sans-serif',
              weight: 'bold'
            },
            color: settings.mode ==='light' ? '#434343' : 'white'
          }
        ]
      }
    }
  }

  const previousPeriodData = {
    labels: previousData?.label || [],
    datasets: [
      {
        data: previousData?.data || [],
        backgroundColor: GraphicColors,

        // backgroundColor: [
        //   "#299b82",
        //   "#1640a1c4",
        //   "#d8df20",
        //   "#e02916",
        //   "#ffca25",
        //   "#C0D3DF",
        // ],
        hoverOffset: 3
      }
    ]
  }

  useEffect(() => {
    if (resultPlatformComparison) {
      setCurrentData(resultPlatformComparison.current_period)
      setPreviousData(resultPlatformComparison.previous_period)

      if (resultPlatformComparison?.current_period?.total || resultPlatformComparison?.previous_period?.total) {
        setShowNoDataText(false)
      } else {
        setShowNoDataText(true)
      }
    }
  }, [resultPlatformComparison])

  // const reportNo = '2.2.022'

  return (
    <Paper sx={{ border: `3px solid #fff`, borderRadius: 1, minHeight: 550 }}>
      {loadingPlatformComparison && <LinearProgress style={{ width: '100%' }} />}

      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
        <span style={{ display: 'flex', justifyContent: 'flex-start' }}>
          <CardHeader
            title={<Translations text='Channel/Platform: Period over Period Comparison' />}
            titleTypographyProps={{ variant: 'h6' }}
            subheader='Period over Period Comparison'
            subheaderTypographyProps={{ variant: 'h6' }}
          />
          <StyledTooltip
            arrow
            title={
              <span>
                <Typography variant='h6' sx={{ color: 'white' }}>
                  <Translations text='voiceChart18Title' />
                </Typography>
                <Typography variant='body2' sx={{ color: 'white' }}>
                  <Translations text='voiceChart18Description' />
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

      <CardContent id='platformComparison'>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Box pl={{ xs: 1.3 }} pr={{ xs: 1 }} sx={{ display: 'flex', justifyContent: 'center' }}>
              <CustomeLabels
                data={currentData}
                labels={previousData?.label || currentData?.label}
                color={GraphicColors}
                itemsCountPerPage={50}
                showValue={false}
              />
            </Box>
          </Grid>
          <Grid item xs={12} md={6}>
            {showNoDataText ? (
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
              <Doughnut data={currentPeriodData} options={currentPeriodOptions as any} height={290} />
            )}
          </Grid>
          <Grid item xs={12} md={6}>
            {showNoDataText ? (
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
              <Doughnut data={previousPeriodData} options={previousPeriodOptions as any} height={290} />
            )}
          </Grid>
        </Grid>
        <Grid container spacing={3} mt={3}>
          <Grid item xs={12} md={6} sx={{ display: 'flex', justifyContent: 'center' }}>
            Current Period
          </Grid>
          <Grid item xs={12} md={6} sx={{ display: 'flex', justifyContent: 'center' }}>
            Previous Period
          </Grid>
        </Grid>
      </CardContent>
    </Paper>
  )
}

export default PlatformsComparison
