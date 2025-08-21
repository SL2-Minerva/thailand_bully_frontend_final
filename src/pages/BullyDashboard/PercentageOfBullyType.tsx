// ** MUI Imports
import Paper from '@mui/material/Paper'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import { Box, Grid, IconButton, LinearProgress, Menu, MenuItem, Typography } from '@mui/material'

// ** Third Party Imports

import { Doughnut } from 'react-chartjs-2'
import { MouseEvent, useEffect, useState } from 'react'
import { BullyTypeColorCode, BullyTypeColors } from 'src/utils/const'
import { StyledTooltip } from '../dashboard/overall'
import { Information } from 'mdi-material-ui'
import { useTranslation } from 'react-i18next'
import Translations from 'src/layouts/components/Translations'
import { Chart } from 'chart.js'
import * as DoughnutLabel from 'chartjs-plugin-doughnutlabel-rebourne'
import CustomeLabels from '../VoiceDashboard/CustomLabel'
import * as htmlToImage from 'html-to-image'
import { saveAs } from 'file-saver'
import { DotsVertical, Download } from 'mdi-material-ui'
import { useSettings } from 'src/@core/hooks/useSettings'

const onCapture = () => {
  const pictureId = document.getElementById('percentageBullyType')
  if (pictureId) {
    htmlToImage.toPng(pictureId, { backgroundColor: '#fff' }).then(function (dataUrl) {
      saveAs(dataUrl, 'Percentage of Bully Type.png')
    })
  }
}

Chart.register(DoughnutLabel)

interface MessageData {
  params: any
  type: string
  chartId: string
  highlight: boolean
  resultBullyTypePercentage: any
  loadingBullyTypePercentage: boolean
}

const PercentageOfBullyType = (props: MessageData) => {
  const { t } = useTranslation()
  const { type,  resultBullyTypePercentage, loadingBullyTypePercentage } = props
  const colors = BullyTypeColors

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

  // const theme = useTheme()
  // const labelColor = theme.palette.text.primary
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
            text: currentTotal || '',
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
            text: previousTotal || '',
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
    const colorsBullyType = []

    for (let i = 0; i < data?.length; i++) {
      if (data[i].bully_level) {
        labels.push(t(data[i].bully_level))
      } else if (data[i].bully_type) {
        labels.push(t(data[i].bully_type))
      }

      for (let j = 0; j < BullyTypeColorCode?.length; j++) {
        if (BullyTypeColorCode[j]?.name == data[i].bully_level) {
          colorsBullyType.push(BullyTypeColorCode[j]?.color)
        }
      }

      // const percentageValue = data[i]?.value;
      // for(let j = 0 ; j<percentageValue?.length; j++) {

      // }

      percentage.push(data[i].value?.percentage)
      if (type === 'current') {
        setCurrentPeriod(data[i].value?.date)
      } else {
        setPreviousPeriod(data[i].value?.date)
      }
    }
    const returnData = {
      labels: labels,
      datasets: [
        {
          data: percentage,
          backgroundColor: colorsBullyType,
          hoverOffset: 4
        }
      ]
    }

    return returnData
  }

  const title = type === 'level' ? 'Percentage of Bully Level' : 'Percentage of Bully Type'

  const getLabels = (data: any) => {
    const labels: any = []

    for (let i = 0; i < data?.length; i++) {
      labels.push(data[i].name)
    }

    return labels
  }

  const getColors = (data: any) => {
    const bullyColors: any = []

    for (let i = 0; i < data?.length; i++) {
      bullyColors.push(data[i]?.color)
    }

    return bullyColors
  }

  useEffect(() => {
    if (resultBullyTypePercentage) {
      // const currentMessageData = resultBullyTypePercentage?.percentage_of_bully_current;
      // const previousMessageData = resultBullyTypePercentage?.percentage_of_bully_previous;

      const currentMessageData = resultBullyTypePercentage?.prcentage_of_messages_current
      const previousMessageData = resultBullyTypePercentage?.prcentage_of_messages_previous
      if (currentMessageData) {
        const currentDataset = chartDataset(currentMessageData, 'current')
        setCurrentData(currentDataset)
        if (currentMessageData?.length > 0) {
          setCurrentTotal(currentMessageData[0]?.value?.total)
          setShowNoDataText(false)
          if (!currentMessageData[0]?.bully_level) {
            setShowNoDataText(true)
          }
        } else {
          setShowNoDataText(true)
          setCurrentTotal(0)
        }
      } else {
        setCurrentData(initValue)
        setShowNoDataText(true)
        setCurrentTotal(0)
      }

      if (previousMessageData) {
        const previousDataset = chartDataset(previousMessageData, 'previous')
        setPreviousData(previousDataset)
        if (previousMessageData?.length > 0) {
          setPreviousTotal(previousMessageData[0]?.value?.total)
          setShowNoDataTextPrevious(false)
          if (!previousMessageData[0]?.bully_level) {
            setShowNoDataTextPrevious(true)
          }
        } else {
          setShowNoDataTextPrevious(true)
          setPreviousTotal(0)
        }
      } else {
        setPreviousTotal(0)
        setShowNoDataTextPrevious(true)
        setPreviousData(initValue)
      }
    } else {
      setCurrentData(initValue)
      setPreviousData(initValue)
      setCurrentTotal(0)
      setShowNoDataTextPrevious(true)
      setShowNoDataText(true)
      setPreviousTotal(0)
    }
  }, [resultBullyTypePercentage, t])

  // const reportNo = '6.1.011'

  return (
    <Paper sx={{ border: `3px solid #fff`, borderRadius: 1, minHeight: 600 }} >
      {loadingBullyTypePercentage && <LinearProgress style={{ width: '100%' }} />}
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
                  <Translations text='bullyChart9Title' />
                </Typography>
                <Typography variant='body2' sx={{ color: 'white' }}>
                  <Translations text='bullyChart9Description' />
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

      <CardContent id='percentageBullyType'>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Box pl={{ xs: 1.3 }} pr={{ xs: 1 }} sx={{ display: 'flex', justifyContent: 'center' }}>
              <CustomeLabels
                data={currentData || previousData}
                labels={getLabels(BullyTypeColorCode)}
                color={getColors(BullyTypeColorCode)}
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
              <Doughnut data={currentData} options={options as any} height={300} />
            )}
          </Grid>
          <Grid item xs={12} md={6}>
            {showNoDataTextPrevious ? (
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
              <Doughnut data={previousData} options={optionsPrevious as any} height={300} />
            )}
          </Grid>
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

export default PercentageOfBullyType
