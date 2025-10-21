import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'

// ** Third Party Imports
import { Bar, Line, getDatasetAtEvent, getElementAtEvent } from 'react-chartjs-2'

// ** Custom Components Imports
import { StyledTooltip } from '../dashboard/overall'
import { Information, MicrosoftExcel } from 'mdi-material-ui'
import { useEffect, useRef, useState, MouseEvent } from 'react'
import { StackChartDataset } from 'src/types/dashboard/overallDashboard'
import { InteractionItem } from 'chart.js'
import moment from 'moment'
import { IconButton, LinearProgress, Menu, MenuItem, Paper, Typography } from '@mui/material'
import Translations from 'src/layouts/components/Translations'

// import MessageDetail from './MessageDetail'
import DotsVertical from 'mdi-material-ui/DotsVertical'
import { Download, ChartBarStacked, ChartLine } from 'mdi-material-ui'

import * as htmlToImage from 'html-to-image'
import { saveAs } from 'file-saver'

// excel export
import axios, { AxiosRequestConfig } from 'axios'
import { API_PATH } from 'src/utils/const'
import authConfig from 'src/configs/auth'
import toast from 'react-hot-toast'
import { GetDailyMessages } from 'src/services/api/dashboards/voice/VoiceDashboardAPIs'
import { useTheme } from '@mui/material/styles'
import DailyMessageDetails from './DailyMessageDetails'

interface Props {
  type: string
  chartId: string
  params: any
  keywordsColor: any
  highlight?: boolean
  apiParams: any
  isLoading: boolean
  setIsLoading: any
  quickViewData: any
  setQuickViewData: any
}
export const getSeries = (seriesData: any) => {
  if (!seriesData) return []

  const series: any[] = []
  if (seriesData && seriesData?.length > 0) {
    for (let i = 0; i < seriesData?.length; i++) {
      series.push({
        name: seriesData[i].name,
        data: seriesData[i].data
      })
    }
  }

  return series
}

export const chartLabel = (data: any) => {
  if (!data) return []

  let labels: any[] = []

  // let labelsArrayLength;
  const labelValue: any[] = []

  for (let i = 0; i < data?.length; i++) {
    const dataValue = data[i]?.value
    const label: any[] = []

    for (let j = 0; j < dataValue?.length; j++) {
      label.push(dataValue[j]?.date)
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
const onCapture = () => {
  const pictureId = document.getElementById('savePNG')
  if (pictureId) {
    htmlToImage.toPng(pictureId, { backgroundColor: '#fff' }).then(function (dataUrl) {
      saveAs(dataUrl, 'Daily Messages By Date (Message).png')
    })
  }
}

const DailyMessageGraph = (props: Props) => {
  const { type, params, keywordsColor, setIsLoading, apiParams, quickViewData, setQuickViewData } = props
  const theme = useTheme()

  const labelColor = theme.palette.text.primary
  const borderColor = theme.palette.action.focus
  const gridLineColor = theme.palette.action.focus

  const [label, setLabel] = useState<string[]>([])
  const [dataset, setDataset] = useState<StackChartDataset[]>([])
  const [showDetail, setShowDetail] = useState<boolean>(false)
  const [paramsId, setParamsId] = useState<any>({
    keywordId: null,
    sourceId: null,
    campaign_id: null,
    organization_id: null
  })
  const [showNoDataText, setShowNoDataText] = useState<boolean>(false)
  const [keywordId, setKeywordId] = useState<any>()
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const rowOptionsOpen = Boolean(anchorEl)
  const [chooseChart, setChooseChart] = useState<string>('bar')
  const [paramsData, setParamsData] = useState<any>()
  const { resultDailyMessage, loadingDailyMessage } = GetDailyMessages(apiParams)
  const handleRowOptionsClick = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }
  const handleRowOptionsClose = () => {
    setAnchorEl(null)
  }

  const chartRef = useRef()
  const getKeywordId = (dataset: InteractionItem[]) => {
    if (!dataset.length) return

    const datasetIndex = dataset[0].datasetIndex
    const keywordName = data.datasets[datasetIndex].label
    const dailyMessageData = resultDailyMessage

    let keywordId: number | null = null
    if (dailyMessageData?.length > 0) {
      for (let i = 0; i < dailyMessageData?.length; i++) {
        if (dailyMessageData[i]?.value && dailyMessageData[i]?.value?.length > 0) {
          if (keywordName === dailyMessageData[i]?.value[0]?.keyword_name) {
            keywordId = dailyMessageData[i].value[0]?.keyword_id
          }
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
        setParamsId(keyword_id)
        setKeywordId(keyword_id)
        setShowDetail(true)
      }
    }
  }

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
        const oldInfo = total.find((item: any) => moment(item?.date).format('DD/MM/YYYY') === node)
        if (oldInfo) {
          return {
            ...node,
            total_at_date: oldInfo?.total_at_date || 0,
            date: oldInfo?.date || node,
            keyword_name: oldInfo?.keyword_name || ''
          }
        } else {
          return { ...node, total_at_date: 0, date: node, keyword_name: oldInfo?.keyword_name || '' }
        }
      })

      for (let j = 0; j < modifiedData?.length; j++) {
        totalAmount.push(modifiedData[j].total_at_date)
      }

      keywordName = data[i]?.value[0]?.keyword_name ? data[i]?.value[0]?.keyword_name : ''

      for (let j = 0; j < keywordColor?.length; j++) {
        if (keywordColor[j]?.keywordName === keywordName) {
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
        pointHoverBorderColor: '#fff',
        pointBorderColor: 'transparent',
        pointHoverBackgroundColor: color[i],
        data: totalAmount
      }

      returnData.push(chartDataset)
    }

    return returnData
  }

  const data = {
    labels: label || [],
    datasets: dataset
  }

  useEffect(() => {
    if (resultDailyMessage && resultDailyMessage?.length > 0) {
      const labels = chartLabel(resultDailyMessage)
      setLabel(labels)

      if (labels?.length > 0) {
        const dataSets = chartDatasets(resultDailyMessage, labels, keywordsColor)
        setDataset(dataSets)
        setShowNoDataText(false)
      }
    } else {
      setLabel([])
      setDataset([])
      setShowNoDataText(true)
    }

    setQuickViewData({
      ...quickViewData,
      resultDailyMessage: resultDailyMessage,
      loadingDailyMessage: loadingDailyMessage
    })
  }, [resultDailyMessage, keywordsColor])

  const reportNo = '2.2.002'

  const handleChooseChart = (data: string) => {
    setChooseChart(data)
  }

  const excelExport = () => {
    setIsLoading(true)
    const instance = axios.create({ baseURL: API_PATH })
    const method = 'GET'
    const url = `/export/export-voice`
    const headers = {
      Authorization: `Bearer ${window.localStorage.getItem(authConfig.storageTokenKeyName)!}`
    }

    // const params = apiParams
    const options: AxiosRequestConfig = {
      url,
      method,
      responseType: 'blob',
      headers,
      params: paramsData
    }

    return instance
      .request<any>(options)
      .then(response => {
        const url = window.URL.createObjectURL(new Blob([response.data]))
        setIsLoading(false)
        saveAs(url, 'Daily Messages(Message).xlsx')
        toast.success('Successfully Downloaded!')
      })
      .catch(() => {
        setIsLoading(false)
        toast.error('Somenthing went wrong')
      })
  }

  useEffect(() => {
    if (params) {
      let paramData: any = {}
      const todayDate = new Date()

      if (
        params?.period === 'customrange' &&
        params?.previousDate !== todayDate &&
        params?.previousEndDate !== todayDate
      ) {
        paramData = {
          campaign_id: params?.campaign || '',
          source: apiParams?.source || params?.platformId || '',
          start_date: params?.date ? moment(params?.date).format('YYYY-MM-DD') : '',
          end_date: params?.endDate ? moment(params?.endDate).format('YYYY-MM-DD') : '',
          period: params?.period,
          start_date_period: params?.previousDate ? moment(params?.previousDate).format('YYYY-MM-DD') : '',
          end_date_period: params?.previousEndDate ? moment(params?.previousEndDate).format('YYYY-MM-DD') : '',
          report_number: reportNo,
          page_name: params?.page
        }
      } else {
        paramData = {
          campaign_id: params?.campaign || '',
          source: apiParams?.source || params?.platformId || '',
          start_date: params?.date ? moment(params?.date).format('YYYY-MM-DD') : '',
          end_date: params?.endDate ? moment(params?.endDate).format('YYYY-MM-DD') : '',
          period: params?.period,
          report_number: reportNo,
          page_name: params?.page

          // keyword_id: paramsId?.keywordId || keywordId || '',
          // classification_id: paramsId?.classification_id || '',
          // organization_id: paramsId?.organization_id || ''
        }
      }
      setParamsData(paramData)
    }
  }, [params, apiParams])

  return (
    <Paper sx={{ border: `3px solid #fff`, borderRadius: 1, minHeight: 600 }}>
      {loadingDailyMessage && <LinearProgress style={{ width: '100%' }} />}
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
        <span style={{ display: 'flex', justifyContent: 'flex-start' }}>
          {type === 'message' ? (
            <CardHeader
              title={<Translations text='Daily Messages by Date' />}
              titleTypographyProps={{ variant: 'h6' }}
            />
          ) : type === 'channel' ? (
            <CardHeader title='Daily Channel By Date' titleTypographyProps={{ variant: 'h6' }} />
          ) : (
            ''
          )}
          <StyledTooltip
            arrow
            title={
              <span>
                <Typography variant='h6' sx={{ color: 'white' }}>
                  <Translations text='voiceChart2Title' />
                </Typography>
                <Typography variant='body2' sx={{ color: 'white' }}>
                  <Translations text='voiceChart2Description' />
                </Typography>
              </span>
            }
          >
            <Information style={{ marginTop: '22px', fontSize: '29px' }} />
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
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', height: 400, overflow: 'visible' }}>
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
                <Translations text='Message' />
              </div>
              <div style={{ flex: 1, height: '100%', minWidth: 0 }}> 
                <div style={{ width: '100%', height: '100%' }}>
                {chooseChart === 'line' ? (
                  <Line ref={chartRef} data={data} options={lineOptions as any} height={400} onClick={onClick} />
                ) : (
                  <Bar ref={chartRef} data={data} options={options as any} height={400} onClick={onClick} />
                )}
                </div>
              </div>
            </div>
            <div style={{ textAlign: 'center', marginTop: '0.75rem', color: '#555', fontSize: 13 }}> 
              <Translations text='Date' /> 
            </div>
          </>
        )}
      </CardContent>
      {showDetail ? (
        <DailyMessageDetails
          show={showDetail}
          setShow={setShowDetail}
          params={params}
          paramsId={paramsId}
          setParamsId={setParamsId}
          reportNo={reportNo}
          keywordId={keywordId}
          setKeywordId={setKeywordId}
          title='Daily Messages: Message Transactions'
          networkTitle='Daily Messages: Social Network Analysis'
          excelExport={excelExport}
        />
      ) : (
        ''
      )}
    </Paper>
  )
}

export default DailyMessageGraph
