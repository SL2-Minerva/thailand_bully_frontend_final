// ** MUI Imports
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'

// ** Third Party Imports
import { Bar, Line, getDatasetAtEvent, getElementAtEvent } from 'react-chartjs-2'
import { useEffect, useRef, useState, MouseEvent } from 'react'
import { StackChartDataset } from 'src/types/dashboard/overallDashboard'
import moment from 'moment'
import DailyMessageDetail from './DailyMessageDetail'
import { InteractionItem } from 'chart.js'

// import { Download, Information } from 'mdi-material-ui'
// import DotsVertical from 'mdi-material-ui/DotsVertical'

import { StyledTooltip } from './overall'
import { IconButton, LinearProgress, Menu, MenuItem, Paper, Typography } from '@mui/material'
import Translations from 'src/layouts/components/Translations'

// import { FilePngBox, ChartBarStacked, ChartLine, MicrosoftExcel, Download, DotsVertical, Information } from 'mdi-material-ui'

import { ChartBarStacked, ChartLine, MicrosoftExcel, Download, DotsVertical, Information } from 'mdi-material-ui'

// import { Download, ChartBarStacked, ChartLine, ChartScatterPlot } from 'mdi-material-ui'

import * as htmlToImage from 'html-to-image'
import { saveAs } from 'file-saver'

// export excel lib
import axios, { AxiosRequestConfig } from 'axios'
import authConfig from 'src/configs/auth'
import { API_PATH } from 'src/utils/const'
import toast from 'react-hot-toast'

// import CloseCircleOutline from 'mdi-material-ui/CloseCircleOutline';
// import { Bar, getDatasetAtEvent,  } from 'react-chartjs-2'

interface LineProps {
  white: string
  warning: string
  primary: string
  success: string
  labelColor: string
  borderColor: string
  gridLineColor: string
  params: any
  resultFilterData: any
  loadingFilterData: boolean
  keywordsColor: any
  apiParams: any
  isLoading: boolean
  setIsLoading: any
}

const chartLabel = (data: any) => {
  if (!data) return []

  let labels: any[] = []

  // let labelsArrayLength;
  const labelValue: any[] = []

  for (let i = 0; i < data?.length; i++) {
    const dataValue = data[i]?.value
    const label: any[] = []

    for (let j = 0; j < dataValue?.length; j++) {
      label.push(dataValue[j]?.date_m)
    }

    labels = [...labels, ...label]
  }

  if (labels && labels?.length > 0) {
    const filterArray = [...new Set(labels)]
    for (let i = 0; i < filterArray?.length; i++) {
      labelValue.push(new Date(filterArray[i]))
    }
    labelValue.sort((date1, date2) => date1 - date2)

    for (let i = 0; i < labelValue?.length; i++) {
      labelValue[i] = moment(labelValue[i]).format('DD/MM/YYYY')
    }
  }

  return labelValue
}

const StackedChart = (props: LineProps) => {
  // ** Props
  const {
    white,
    labelColor,
    borderColor,
    gridLineColor,
    params,
    resultFilterData,
    loadingFilterData,
    keywordsColor,
    apiParams,
    setIsLoading
  } = props

  // const [ chartData, setChartData ] = useState();

  const [label, setLabel] = useState<string[]>([])
  const [dataset, setDataset] = useState<StackChartDataset[]>([])
  const [showDetail, setShowDetail] = useState<boolean>(false)
  const [keywordId, setKeywordId] = useState<any>()
  const [showNoDataText, setShowNoDataText] = useState<boolean>(false)
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const [chooseChart, setChooseChart] = useState<string>('bar')
  const rowOptionsOpen = Boolean(anchorEl)

  const chartRef = useRef()
  const getKeywordId = (dataset: InteractionItem[]) => {
    if (!dataset.length) return

    const datasetIndex = dataset[0].datasetIndex
    const keywordName = data.datasets[datasetIndex].label
    const dailyMessageData = resultFilterData?.daily_message
    let keywordId: number | null = null
    if (dailyMessageData?.length > 0) {
      for (let i = 0; i < dailyMessageData?.length; i++) {
        if (keywordName === dailyMessageData[i].keyword_name) {
          keywordId = dailyMessageData[i].keyword_id
        }
      }
    }

    return keywordId
  }

  const onClick = (event: any) => {
    if (chartRef.current) {
      const getIndex = getElementAtEvent(chartRef.current, event)

      if (getIndex?.length > 0) {
        const index = getIndex[0].index
        params.label = label[index]
      }

      const keyword_id = getKeywordId(getDatasetAtEvent(chartRef.current, event))

      if (keyword_id) {
        setKeywordId(keyword_id)
        setShowDetail(true)
      }
    }
  }

  // const showMessageDetail = () => {
  //   setShowDetail(false);
  // }

  const options = {
    responsive: true,
    backgroundColor: false,
    maintainAspectRatio: false,
    scales: {
      x: {
        ticks: { color: labelColor },
        grid: {
          borderColor,
          color: gridLineColor
        },
        stacked: true
      },
      y: {
        min: 0,

        // max: 5000,

        scaleLabel: { display: true },
        ticks: {
          stepSize: 100,
          color: labelColor
        },
        grid: {
          borderColor,
          color: gridLineColor
        },

        stacked: true
      }
    },
    plugins: {
      legend: {
        align: 'end',
        position: 'top',
        labels: {
          padding: 25,
          boxWidth: 10,
          color: labelColor,
          usePointStyle: true
        }
      }
    }
  }

  const lineOptions = {
    responsive: true,
    backgroundColor: false,
    maintainAspectRatio: false,
    scales: {
      x: {
        ticks: { color: labelColor },
        grid: {
          borderColor,
          color: gridLineColor
        }
      },
      y: {
        min: 0,
        scaleLabel: { display: true },
        ticks: {
          stepSize: 100,
          color: labelColor
        },
        grid: {
          borderColor,
          color: gridLineColor
        }

        // stacked: true
      }
    },
    plugins: {
      legend: {
        align: 'end',
        position: 'top',
        labels: {
          padding: 25,
          boxWidth: 10,
          color: labelColor,
          usePointStyle: true
        }
      }
    }
  }

  const chartDatasets = (data: any, labels: any, keywordColor: any) => {
    if (!data) return []
    let totalAmount: number[] = []
    let keywordName = ''
    const returnData: StackChartDataset[] = []
    const color = []
    for (let i = 0; i < data?.length; i++) {
      totalAmount = []
      const total = data[i]?.value

      const modifiedData = labels.map((node: any) => {
        const oldInfo = total.find((item: any) => moment(item?.date_m).format('DD/MM/YYYY') === node)
        if (oldInfo) {
          return {
            ...node,
            total_at_date: oldInfo?.total_at_date || 0,
            date: oldInfo?.date_m || node
          }
        } else {
          return { ...node, total_at_date: 0, date: node }
        }
      })

      for (let i = 0; i < modifiedData?.length; i++) {
        totalAmount.push(modifiedData[i].total_at_date)
      }

      keywordName = data[i].keyword_name
      for (let j = 0; j < keywordColor?.length; j++) {
        if (keywordColor[j]?.keywordName === data[i].keyword_name) {
          color.push(keywordColor[j]?.color)
        }
      }

      const chartDataset: StackChartDataset = {
        fill: false,
        tension: 0.2,
        pointRadius: 4,
        label: keywordName,
        pointHoverRadius: 5,
        pointStyle: 'circle',
        borderColor: color[i],
        backgroundColor: color[i],
        pointHoverBorderWidth: 5,
        pointHoverBorderColor: white,
        pointBorderColor: 'transparent',
        pointHoverBackgroundColor: color[i],
        data: totalAmount
      }

      returnData.push(chartDataset)
    }

    return returnData
  }

  useEffect(() => {
    if (resultFilterData) {
      const dailyMessageData = resultFilterData?.daily_message
      if (dailyMessageData) {
        const labels = chartLabel(dailyMessageData)
        setLabel(labels)

        if (labels?.length > 0) {
          const dataSets = chartDatasets(dailyMessageData, labels, keywordsColor)
          setDataset(dataSets)
        }
        setShowNoDataText(false)
      } else {
        setLabel([])
        setDataset([])
        setShowNoDataText(true)
      }
    }
  }, [resultFilterData, keywordsColor])

  const data = {
    labels: label || [],
    datasets: dataset
  }

  const reportNo = '1.2.002'

  const handleRowOptionsClick = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }
  const handleRowOptionsClose = () => {
    setAnchorEl(null)
  }

  const handleChooseChart = (data: string) => {
    setChooseChart(data)
  }

  const onCapture = () => {
    setIsLoading(true)
    const pictureId = document.getElementById('savePNG')
    if (pictureId) {
      htmlToImage.toPng(pictureId, { backgroundColor: '#fff' }).then(function (dataUrl) {
        setIsLoading(false)
        saveAs(dataUrl, 'Daily Message (overall).png')
      })
    }
  }

  const excelExport = () => {
    setIsLoading(true)
    const instance = axios.create({ baseURL: API_PATH })
    const method = 'GET'
    const url = `/export/export-overall`
    const headers = {
      Authorization: `Bearer ${window.localStorage.getItem(authConfig.storageTokenKeyName)!}`
    }
    const params = apiParams
    const options: AxiosRequestConfig = {
      url,
      method,
      responseType: 'blob',
      headers,
      params: params
    }

    return instance
      .request<any>(options)
      .then(response => {
        const url = window.URL.createObjectURL(new Blob([response.data]))
        setIsLoading(false)
        saveAs(url, 'Overall Daily Messages.xlsx')
        toast.success('Successfully Downloaded!')
      })
      .catch(() => {
        setIsLoading(false)
        toast.error('Somenthing went wrong')
      })
  }

  return (
    <Paper sx={{ border: `3px solid #fff`, borderRadius: 1, minHeight: 620 }} >
      {loadingFilterData && <LinearProgress style={{ width: '100%' }} />}
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
        <span style={{ display: 'flex', justifyContent: 'flex-start' }}>
          <CardHeader
            title={<Translations text='Daily Messages' />}
            titleTypographyProps={{ variant: 'h6' }}
            subheader='KeyWords'
            subheaderTypographyProps={{ variant: 'caption' }}
          />
          <StyledTooltip
            arrow
            title={
              <span>
                <Typography variant='h6' sx={{ color: 'white' }}>
                  <Translations text='overallChart2Title' />
                </Typography>
                <Typography variant='body2' sx={{ color: 'white' }}>
                  <Translations text='overallChart2Description' />
                </Typography>
              </span>
            }
          >
            <Information fontSize='large' style={{ marginTop: '23px' }} />
          </StyledTooltip>
        </span>
        <span style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <IconButton
            size='large'
            onClick={() => {
              handleChooseChart('bar')
            }}
            sx={{ m: 1 }}
          >
            <ChartBarStacked />
          </IconButton>
          <IconButton
            size='large'
            onClick={() => {
              handleChooseChart('line')
            }}
            sx={{ m: 1 }}
          >
            <ChartLine />
          </IconButton>
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
            <MenuItem
              onClick={() => {
                excelExport()
                setAnchorEl(null)
              }}
            >
              <MicrosoftExcel fontSize='medium' sx={{ mr: 2 }} />
              Excel
            </MenuItem>
          </Menu>
        </span>
      </div>

      <CardContent id='savePNG'>
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
            {chooseChart === 'line' ? (
              <Line ref={chartRef} data={data} options={lineOptions as any} height={400} onClick={onClick} />
            ) : (
              <Bar ref={chartRef} data={data} options={options as any} height={400} onClick={onClick} />
            )}
          </>
        )}
        {keywordId && params?.campaign ? (
          <DailyMessageDetail
            show={showDetail}
            setShow={setShowDetail}
            params={params}
            keywordId={keywordId}
            setKeywordId={setKeywordId}
            reportNo={reportNo}
            title='Daily Messages: Message Transactions'
            networkTitle='Daily Messages: Social Network Analysis'
            excelExport={excelExport}
          />
        ) : (
          ''
        )}
      </CardContent>
    </Paper>
  )
}

export default StackedChart
