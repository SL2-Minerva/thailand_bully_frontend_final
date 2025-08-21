// ** MUI Imports
import Paper from '@mui/material/Paper'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import { Box, Grid, IconButton, LinearProgress, Menu, MenuItem, Typography } from '@mui/material'

// ** Third Party Imports

import { Doughnut } from 'react-chartjs-2'
import { MouseEvent, useEffect, useState } from 'react'
import { StyledTooltip } from '../dashboard/overall'
import { Information } from 'mdi-material-ui'
import Translations from 'src/layouts/components/Translations'
import { Chart } from 'chart.js'
import * as DoughnutLabel from 'chartjs-plugin-doughnutlabel-rebourne'
import CustomeLabels from '../VoiceDashboard/CustomLabel'
import * as htmlToImage from 'html-to-image'
import { saveAs } from 'file-saver'
import { DotsVertical, Download } from 'mdi-material-ui'
import { useSettings } from 'src/@core/hooks/useSettings'

const onCapture = () => {
  const pictureId = document.getElementById('percentageType')
  if (pictureId) {
    htmlToImage.toPng(pictureId, { backgroundColor: '#fff' }).then(function (dataUrl) {
      saveAs(dataUrl, 'Percentage of Engagement Type.png')
    })
  }
}

Chart.register(DoughnutLabel)

interface MessageData {
  type: string
  chartId: string
  params: any
  highlight: boolean
  resultEngagementType: any
  loadingEngagementType: boolean
  keywordsColor: any
}

const PercentageOfEngangementType = (props: MessageData) => {
  const { type,  resultEngagementType, loadingEngagementType, keywordsColor } = props
  const colors = keywordsColor
  
  // const reportNo = '4.1.011'
  const initValue = {
    labels: [],
    datasets: [
      {
        data: [],
        backgroundColor: colors,
        hoverOffset: 4
      }
    ]
  }

  const [previousData, setPreviousData] = useState<any>(initValue)
  const [currentData, setCurrentData] = useState<any>(initValue)
  const [currentPeriod, setCurrentPeriod] = useState<string>('')
  const [previousPeriod, setPreviousPeriod] = useState<string>('')
  const [currentTotal, setCurrentTotal] = useState<number>()
  const [previousTotal, setPreviousTotal] = useState<number>()
  const [showNoDataText, setShowNoDataText] = useState<boolean>(false)
  const [showNoDataTextPrevious, setShowNoDataTextPrevious] = useState<boolean>(false)
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)

  const rowOptionsOpen = Boolean(anchorEl)

  const handleRowOptionsClick = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }
  const handleRowOptionsClose = () => {
    setAnchorEl(null)
  }

  const {settings} = useSettings();

  const options = {
    responsive: true,
    backgroundColor: false,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false
      },
      tooltip: {
        callbacks: {
          label: (context: any) => context?.label + ': ' + context?.formattedValue + '%'
        }
      },
      doughnutlabel: {
        paddingPercentage: 5,
        labels: [
          {
            text: currentTotal && currentTotal != 0 ? currentTotal : '',
            font: {
              size: '50',
              family: 'Arial, Helvetica, sans-serif',
              weight: 'bold'
            },
            color: settings.mode === 'light' ? '#434343' : 'white'
          }
        ]
      }
    }
  }

  const optionsPrevious = {
    responsive: true,
    backgroundColor: false,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false
      },
      tooltip: {
        callbacks: {
          label: (context: any) => context?.label + ': ' + context?.formattedValue + '%'
        }
      },
      doughnutlabel: {
        paddingPercentage: 5,
        labels: [
          {
            text: previousTotal && previousTotal != 0 ? previousTotal : '',
            font: {
              size: '50',
              family: 'Arial, Helvetica, sans-serif',
              weight: 'bold'
            },
            color: settings.mode === 'light' ? '#434343' : 'white'
          }
        ]
      }
    }
  }

  const chartDataset = (data: any, type: string) => {
    if (!data) {
      const chartData = {
        labels: [],
        datasets: [
          {
            data: [],
            backgroundColor: colors,
            hoverOffset: 4
          }
        ]
      }

      return chartData
    }
    const labels: string[] = []
    const percentage: number[] = []
    for (let i = 0; i < data?.length; i++) {
      if (data[i].name) labels.push(data[i].name)
      const percentageValue = data[i]?.value
      percentage.push(percentageValue?.percentage)
      if (type === 'current') {
        setCurrentPeriod(percentageValue?.date)
      } else {
        setPreviousPeriod(percentageValue?.date)
      }
    }
    const returnData = {
      labels: labels,
      datasets: [
        {
          data: percentage,
          backgroundColor: colors,
          hoverOffset: 4
        }
      ]
    }

    return returnData
  }

  const title = type === 'transaction' ? 'Percentage of Engagement Trans' : 'Percentage of Engagement Type'

  useEffect(() => {
    console.log('enggagementtype', resultEngagementType)
    if (resultEngagementType) {
      const currentMessageData = resultEngagementType?.prcentage_of_engagement_current
      const previousMessageData = resultEngagementType?.prcentage_of_engagement_previous

      if (currentMessageData || previousMessageData) {
        const currentDataset = chartDataset(currentMessageData, 'current')
        setCurrentData(currentDataset)

        const previousDataset = chartDataset(previousMessageData, 'previous')
        setPreviousData(previousDataset)

        if (currentMessageData?.length > 0) {
          setCurrentTotal(currentMessageData[0]?.value?.total)
          setShowNoDataText(false)
        } else {
          setShowNoDataText(true)
        }

        if (previousMessageData?.length > 0) {
          setPreviousTotal(previousMessageData[0]?.value?.total)
          setShowNoDataTextPrevious(false)
        } else {
          setShowNoDataTextPrevious(true)
        }
      } else {
        setCurrentData(initValue)
        setPreviousData(initValue)
      }
    } else {
      setCurrentData(initValue)
      setPreviousData(initValue)
      setCurrentTotal(0)
      setPreviousTotal(0)
      setShowNoDataTextPrevious(true)
      setShowNoDataText(true)
    }
  }, [resultEngagementType])

  return (
    <Paper sx={{ border: `3px solid #fff`, borderRadius: 1, minHeight: 550 }} >
      {loadingEngagementType && <LinearProgress style={{ width: '100%' }} />}

      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
        <span style={{ display: 'flex', justifyContent: 'flex-start' }}>
          <CardHeader
            title={<Translations text={title} />}
            titleTypographyProps={{ variant: 'h6' }}
            subheader='Period over Period Comparison'
            subheaderTypographyProps={{ variant: 'caption' }}
          />
          <StyledTooltip
            arrow
            title={
              <span>
                <Typography variant='h6' sx={{ color: 'white' }}>
                  <Translations text='engagementChart9Title' />
                </Typography>
                <Typography variant='body2' sx={{ color: 'white' }}>
                  <Translations text='engagementChart9Description' />
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

      <CardContent id='percentageType'>
        <Grid container spacing={3}>
          {!showNoDataText || !showNoDataTextPrevious ? (
            <Grid item xs={12}>
              <Box pl={{ xs: 1.3 }} pr={{ xs: 1 }} sx={{ display: 'flex', justifyContent: 'center' }}>
                <CustomeLabels
                  data={currentData || previousData}
                  labels={['Share', 'Comment', 'Reactions','Views']}
                  color={keywordsColor}
                  itemsCountPerPage={50}
                  showValue={false}
                />
              </Box>
            </Grid>
          ) : (
            ''
          )}

          <Grid item xs={12} md={6}>
            {showNoDataText ? (
              <div
                style={{
                  height: 300,
                  padding: '150px 0',
                  textAlign: 'center',
                  verticalAlign: 'middle',
                  color: '#80808059'
                }}
              >
                <Translations text='no data' />
              </div>
            ) : (
              <>
                <Doughnut data={currentData} options={options as any} height={250} />
              </>
            )}
          </Grid>
          <Grid item xs={12} md={6}>
            {showNoDataTextPrevious ? (
              <div
                style={{
                  height: 300,
                  padding: '150px 0',
                  textAlign: 'center',
                  verticalAlign: 'middle',
                  color: '#80808059'
                }}
              >
                <Translations text='no data' />
              </div>
            ) : (
              <Doughnut data={previousData} options={optionsPrevious as any} height={250} />
            )}
          </Grid>
          <Grid item xs={12} md={6} mt={0}>
            <p style={{ fontSize: '10px' }}> Current Period :</p>
            <p style={{ fontSize: '10px' }}> {currentPeriod} </p>
          </Grid>
          <Grid item xs={12} md={6} mt={0}>
            <p style={{ fontSize: '10px' }}> Previous Period : </p>
            <p style={{ fontSize: '10px' }}> {previousPeriod} </p>
          </Grid>
        </Grid>
      </CardContent>
    </Paper>
  )
}

export default PercentageOfEngangementType
