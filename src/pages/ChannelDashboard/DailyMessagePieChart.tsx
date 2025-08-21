// ** MUI Imports
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import { Box, Grid, IconButton, LinearProgress, Menu, MenuItem, Paper, Typography } from '@mui/material'

// ** Third Party Imports

import { Doughnut } from 'react-chartjs-2'
import { Chart } from 'chart.js'
import * as DoughnutLabel from 'chartjs-plugin-doughnutlabel-rebourne'
import { MouseEvent, useEffect, useState } from 'react'
import { StyledTooltip } from '../dashboard/overall'
import { Information } from 'mdi-material-ui'
import Translations from 'src/layouts/components/Translations'
import CustomeLabels from '../VoiceDashboard/CustomLabel'
import { GraphicColors } from 'src/utils/const'
import * as htmlToImage from 'html-to-image'
import { saveAs } from 'file-saver'
import { DotsVertical, Download } from 'mdi-material-ui'
import { ActiveChannel } from 'src/services/api/source/SourceApi'
import { useSettings } from 'src/@core/hooks/useSettings'

const onCapture = () => {
  const pictureId = document.getElementById('percentageGraph')
  if (pictureId) {
    htmlToImage.toPng(pictureId, { backgroundColor: '#fff' }).then(function (dataUrl) {
      saveAs(dataUrl, 'Percentage of Channel.png')
    })
  }
}
interface Props {
  apiParams: any
  type: string
  chartId: string
  highlight: boolean
  resultPercentageChannelCurrent: any
  resultPercentageChannelPrevious: any
  loadingPercentageChannel: boolean
  keywordsColor: any
}
Chart.register(DoughnutLabel)
const DailyMessagePieChart = (props: Props) => {
  const {
    type,

    resultPercentageChannelCurrent,
    resultPercentageChannelPrevious,
    loadingPercentageChannel,
    keywordsColor
  } = props

  // const theme = useTheme()
  // const labelColor = theme.palette.text.primary
  const initValue = {
    labels: [],
    datasets: [
      {
        data: [],
        backgroundColor: keywordsColor,
        hoverOffset: 4
      }
    ]
  }
  const { result_source_list } = ActiveChannel()
  const [previousData, setPreviousData] = useState<any>(initValue)
  const [currentData, setCurrentData] = useState<any>(initValue)
  const [currentPeriod, setCurrentPeriod] = useState<string>('')
  const [previousPeriod, setPreviousPeriod] = useState<string>('')

  // const [currentLabel, setCurrentLabel] = useState<any[]>([])
  // const [previousLabel, setPreviousLabel] = useState<any[]>([])

  const [currentTotal, setCurrentTotal] = useState<number>()
  const [previousTotal, setPreviousTotal] = useState<number>()
  const [showNoDataText, setShowNoDataText] = useState<boolean>(false)
  const [showNoDataTextPrevious, setShowNoDataTextPrevious] = useState<boolean>(false)
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)

  const rowOptionsOpen = Boolean(anchorEl)
  const { settings } = useSettings()

  const handleRowOptionsClick = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }
  const handleRowOptionsClose = () => {
    setAnchorEl(null)
  }

  const chartDataset = (data: any, type: string, keywordColor: any) => {
    if (!data) {
      const chartData = {
        labels: [],
        datasets: [
          {
            data: [],
            backgroundColor: keywordsColor,
            hoverOffset: 4
          }
        ]
      }

      return chartData
    }
    const labels: any[] = []
    const percentage: number[] = []
    const colors = []
    for (let i = 0; i < data?.length; i++) {
      labels.push(data[i].source_name)

      for (let j = 0; j < keywordColor?.length; j++) {
        if (keywordColor[j]?.name == data[i].source_name) {
          colors.push(keywordColor[j]?.color)
        }
      }

      const percentageValue = data[i]?.value
      for (let j = 0; j < percentageValue?.length; j++) {
        percentage.push(data[i].value[j]?.percentage)
        if (type === 'current') {
          setCurrentPeriod(data[i].value[j]?.date)
        } else {
          setPreviousPeriod(data[i].value[j]?.date)
        }
      }
    }

    const returnData = {
      labels: labels,
      datasets: [
        {
          data: percentage,
          backgroundColor: colors?.length !== 0 ? colors : GraphicColors,
          hoverOffset: 4
        }
      ]
    }

    return returnData
  }

  const currentPeriodOptions = {
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

  const previousPeriodOptions = {
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

  useEffect(() => {
    if (resultPercentageChannelCurrent) {
      const currentMessageData = resultPercentageChannelCurrent
      const currentDataset = chartDataset(currentMessageData, 'current', keywordsColor)
      setCurrentData(currentDataset)

      // if (currentDataset?.labels?.length > 0) {
      //   setCurrentLabel(currentDataset?.labels)
      // }

      if (currentMessageData?.length > 0) {
        setCurrentTotal(currentMessageData[0]?.total)
      } else {
        setCurrentTotal(0)
      }
      setShowNoDataText(false)
    } else {
      setCurrentData(initValue)
      setCurrentTotal(0)
      setShowNoDataText(true)

      // setCurrentLabel([])
    }

    if (resultPercentageChannelPrevious) {
      const previousMessageData = resultPercentageChannelPrevious
      const previousDataset = chartDataset(previousMessageData, 'previous', keywordsColor)

      // if (previousDataset?.labels?.length > 0) {
      //   setPreviousLabel(previousDataset?.labels)
      // }
      setPreviousData(previousDataset)
      if (previousMessageData?.length > 0) {
        setPreviousTotal(previousMessageData[0]?.total)
      } else {
        setPreviousTotal(0)
      }
      setShowNoDataTextPrevious(false)
    } else {
      setPreviousData(initValue)
      setPreviousTotal(0)
      setShowNoDataTextPrevious(true)

      // setPreviousLabel([])
    }
  }, [resultPercentageChannelCurrent, resultPercentageChannelPrevious, keywordsColor])

  // const reportNo = '3.1.001'

  // const getLabels = (current: any, previous: any) => {
  //   const union = Array.from(new Set([...current, ...previous]))

  //   return union
  // }

  const getLabelColor = (data: any) => {
    const labels: any = []

    for (let i = 0; i < data?.length; i++) {
      labels.push(data[i].name)
    }

    return labels
  }

  const getColors = (data: any) => {
    const channelColor: any = []

    for (let i = 0; i < data?.length; i++) {
      channelColor.push(data[i]?.color)
    }

    return channelColor
  }

  return (
    <Paper sx={{ border: `3px solid #fff`, borderRadius: 1, minHeight: 561 }}>
      {loadingPercentageChannel && <LinearProgress style={{ width: '100%' }} />}

      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
        <span style={{ display: 'flex', justifyContent: 'flex-start' }}>
          {type === 'message' ? (
            <CardHeader
              title={<Translations text='Percentage of Channel' />}
              titleTypographyProps={{ varient: 'h6' }}
              subheader='Period over Period Comparison'
              subheaderTypographyProps={{ varient: 'h6' }}
            />
          ) : (
            <CardHeader
              title={<Translations text='Percentage of Channel' />}
              titleTypographyProps={{ varient: 'h6' }}
              subheader='Period over Period Comparison'
              subheaderTypographyProps={{ varient: 'h6' }}
            />
          )}
          <StyledTooltip
            arrow
            title={
              <span>
                <Typography variant='h6' sx={{ color: 'white' }}>
                  <Translations text='channelChart1Title' />
                </Typography>
                <Typography variant='body2' sx={{ color: 'white' }}>
                  <Translations text='channelChart1Description' />
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

      <CardContent id='percentageGraph'>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Box pl={{ xs: 1.3 }} pr={{ xs: 1 }} sx={{ display: 'flex', justifyContent: 'center' }}>
              <CustomeLabels
                data={currentData || previousData}
                labels={getLabelColor(result_source_list)}
                color={getColors(result_source_list)}
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
                  padding: '150px 0',
                  textAlign: 'center',
                  verticalAlign: 'middle',
                  color: '#80808059'
                }}
              >
                <Translations text='no data' />
              </div>
            ) : (
              <Doughnut data={currentData} options={currentPeriodOptions as any} height={270} />
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
              <Doughnut data={previousData} options={previousPeriodOptions as any} height={270} />
            )}
          </Grid>
        </Grid>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <p style={{ fontSize: '10px' }}> Current Period :</p>
            <p style={{ fontSize: '10px' }}> {currentPeriod} </p>
          </Grid>
          <Grid item xs={12} md={6}>
            <p style={{ fontSize: '10px' }}> Previous Period : </p>
            <p style={{ fontSize: '10px' }}> {previousPeriod} </p>
          </Grid>
        </Grid>
      </CardContent>
    </Paper>
  )
}

export default DailyMessagePieChart
