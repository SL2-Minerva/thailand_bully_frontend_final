// ** MUI Imports
import Paper from '@mui/material/Paper'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'

// ** Third Party Imports
import { Bar, Line, getDatasetAtEvent, getElementAtEvent } from 'react-chartjs-2'
import { useEffect, useRef, useState, MouseEvent } from 'react'
import { StackChartDataset } from 'src/types/dashboard/overallDashboard'
import moment from 'moment'
import { InteractionItem } from 'chart.js'
import { BullyTypeColorCode } from 'src/utils/const'
import { StyledTooltip } from '../dashboard/overall'
import { Information } from 'mdi-material-ui'

// import MessageDetail from '../ChannelDashboard/MessageDetail'
import { IconButton, LinearProgress, Menu, MenuItem, Typography } from '@mui/material'
import { useTranslation } from 'react-i18next'
import Translations from 'src/layouts/components/Translations'
import DotsVertical from 'mdi-material-ui/DotsVertical'
import { Download, ChartBarStacked, ChartLine } from 'mdi-material-ui'

import * as htmlToImage from 'html-to-image'
import { saveAs } from 'file-saver'
import ExportExcel from '../VoiceDashboard/ExportExcel'
import DailyMessageChannel from '../ChannelDashboard/DailyMessageChannel'

// excel export
// import axios, { AxiosRequestConfig } from 'axios'
// import { API_PATH } from 'src/utils/const'
// import authConfig from 'src/configs/auth'
// import toast from 'react-hot-toast'

interface LineProps {
  white: string
  warning: string
  primary: string
  success: string
  labelColor: string
  borderColor: string
  gridLineColor: string
  params: any
  type: string
  chartId: string
  highlight?: boolean
  resultBullyTypeFilterData: any
  loadingBullyTypeFilterData: boolean
  apiParams: any
  isLoading: boolean
  setIsLoading: any
}

// const chartLabel = (data: any) => {
//   if (!data) return []

//   let labels: any[] = []
//   let labelsArrayLength
//   const labelValue: any[] = []
//   for (let i = 0; i < data?.length; i++) {
//     const label = data[i]?.value
//     if (data?.length - 1 !== i) {
//       if (label?.length > data[i + 1].length) {
//         labelsArrayLength = i
//         labels = data[labelsArrayLength]?.value
//       } else {
//         labelsArrayLength = i + 1
//         labels = data[labelsArrayLength]?.value
//       }
//     } else {
//       labels = label
//     }
//   }

//   if (labels?.length > 0) {
//     for (let i = 0; i < labels?.length; i++) {
//       labelValue.push(new Date(labels[i]?.date_m))
//     }
//     labelValue.sort((date1, date2) => date1 - date2)

//     for (let i = 0; i < labelValue?.length; i++) {
//       labelValue[i] = moment(labelValue[i]).format('DD/MM/YYYY')
//     }
//   }

//   return labelValue
// }

export const chartLabel = (data: any) => {
  if (!data) return []

  let labels: any[] = []
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


const onCapture = () => {
  const pictureId = document.getElementById('savePNGBullyType')
  if (pictureId) {
    htmlToImage.toPng(pictureId, { backgroundColor: '#fff' }).then(function (dataUrl) {
      saveAs(dataUrl, 'Bully Type: Daily Messages By Date.png')
    })
  }
}

const DailyMessgesByBullyType = (props: LineProps) => {
  // ** Props
  const { t } = useTranslation()
  const {
    white,
    labelColor,
    borderColor,
    gridLineColor,
    params,
    type,

    resultBullyTypeFilterData,
    loadingBullyTypeFilterData,
    apiParams,
    setIsLoading
  } = props
  console.log(labelColor);
  
  // const [ chartData, setChartData ] = useState();
  // const colors = BullyTypeColors
  const [showNoDataText, setShowNoDataText] = useState<boolean>(false)
  const [, setKeywordId] = useState<any>()
  const [label, setLabel] = useState<string[]>([])
  const [dataset, setDataset] = useState<StackChartDataset[]>([])
  const [showDetail, setShowDetail] = useState<boolean>(false)
  const [paramsId, setParamsId] = useState<any>({
    keywordId: null,
    sourceId: null,
    campaign_id: null,
    organization_id: null
  })

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const [chooseChart, setChooseChart] = useState<string>('bar')

  const rowOptionsOpen = Boolean(anchorEl)

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
    const dailyMessageData = resultBullyTypeFilterData?.bully_type

    // const keywordId: number | null = null // Old
    const keywordId = params.keywordIds === 'all' ? '' : params.keywordIds || null; // New
    let sourceId: number | null = null
    let campaign_id: number | null = null
    let organization_id: number | null = null

    if (dailyMessageData?.length > 0) {
      for (let i = 0; i < dailyMessageData?.length; i++) {
        if (keywordName === dailyMessageData[i].keyword_name) {
          sourceId = dailyMessageData[i].source_id || ''
          campaign_id = dailyMessageData[i].campaign_id || ''
          organization_id = dailyMessageData[i].organization_id || ''

          // keywordId = dailyMessageData[i].value[i]?.keyword_id;
        }
      }
    }

    const returnData = {
      keywordId: keywordId,
      sourceId: sourceId,
      campaign_id: campaign_id,
      organization_id: organization_id
    }

    return returnData
  }

  const onClick = (event: any) => {
    if (chartRef.current) {
      const getIndex = getElementAtEvent(chartRef.current, event)

      if (getIndex?.length > 0) {
        const index = getIndex[0].index
        params.label = label[index]
      }
      const keyword_id = getKeywordId(getDatasetAtEvent(chartRef.current, event))
      const getDatasetIndex = getDatasetAtEvent(chartRef.current, event)

      if (getDatasetIndex?.length > 0) {
        const datasetIndex = getDatasetIndex[0]?.datasetIndex

        if (datasetIndex === 0 || datasetIndex) {
          params.Llabel = dataset[datasetIndex]?.label
        }
      }
      if (keyword_id) {
        setParamsId(keyword_id)
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
        },
        stacked: true
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

  const chartDatasets = (data: any, labels: any) => {
    console.log(data)
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

      if (data[i].bully_level) {
        keywordName = t(data[i].bully_level)
      }

      if (data[i].bully_type) {
        keywordName = t(data[i].bully_type)
      }

      // keywordName = data[i].bully_level
      for (let j = 0; j < BullyTypeColorCode?.length; j++) {
        if (BullyTypeColorCode[j]?.name === data[i].bully_level) {
          color.push(BullyTypeColorCode[j]?.color)
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

  const handleChooseChart = (data: string) => {
    setChooseChart(data)
  }

  useEffect(() => {
    if (resultBullyTypeFilterData) {
      const bully_levelData = resultBullyTypeFilterData
      if (bully_levelData) {
        const labels = chartLabel(bully_levelData)
        setLabel(labels)

        if (labels?.length > 0) {
          const dataSets = chartDatasets(bully_levelData, labels)

          // dataSets?.sort((a, b) => {
          //   const fa = a.label?.toLowerCase(),
          //     fb = b.label?.toLowerCase()

          //   if (fa < fb) {
          //     return -1
          //   }
          //   if (fa > fb) {
          //     return 1
          //   }

          //   return 0
          // })
          setDataset(dataSets)
          setShowNoDataText(false)
        }
      } else {
        setLabel([])
        setDataset([])
        setShowNoDataText(true)
      }
    } else {
      setLabel([])
      setDataset([])
      setShowNoDataText(true)
    }
  }, [resultBullyTypeFilterData, t])

  const data = {
    labels: label || [],
    datasets: dataset
  }
  const reportNo = '6.2.012'

  const title = type === 'level' ? 'Bully Level: Daily Message by Date' : 'Bully Type: Daily Message by Date'

  // const excelExport = () => {
  //   setIsLoading(true)
  //   const instance = axios.create({ baseURL: API_PATH })
  //   const method = 'GET'
  //   const url = `/export/export-overall`
  //   const headers = {
  //     Authorization: `Bearer ${window.localStorage.getItem(authConfig.storageTokenKeyName)!}`
  //   }
  //   const params = apiParams
  //   const options: AxiosRequestConfig = {
  //     url,
  //     method,
  //     responseType: 'blob',
  //     headers,
  //     params: params
  //   }

  //   return instance
  //     .request<any>(options)
  //     .then(response => {
  //       const url = window.URL.createObjectURL(new Blob([response.data]))
  //       setIsLoading(false)
  //       saveAs(url, 'Overall Daily Messages.xlsx')
  //       toast.success('Successfully Downloaded!')
  //     })
  //     .catch(() => {
  //       setIsLoading(false)
  //       toast.error('Somenthing went wrong')
  //     })
  // }

  return (
    <Paper sx={{ border: `3px solid #fff`, borderRadius: 1, minHeight: 600, maxHeight: 600 }}>
      {loadingBullyTypeFilterData && <LinearProgress style={{ width: '100%' }} />}
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
                  <Translations text='bullyChart10Title' />
                </Typography>
                <Typography variant='body2' sx={{ color: 'white' }}>
                  <Translations text='bullyChart10Description' />
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
            <ExportExcel
              setIsLoading={setIsLoading}
              params={params}
              apiParams={apiParams}
              reportNo={reportNo}
              setAnchorEl={setAnchorEl}
              fileName='Bully Type: Daily Messages by Date.xlsx'
              apiPath='/export/export-bully'
            />
          </Menu>
        </span>
      </div>

      <CardContent id='savePNGBullyType'>
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
                <Translations text='Bully Type' />
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
        {showDetail ? (
          <DailyMessageChannel
            show={showDetail}
            setShow={setShowDetail}
            params={params}
            paramsId={paramsId}
            setParamsId={setParamsId}
            reportNo={reportNo}
            setIsLoading={setIsLoading}
            apiParams={apiParams}
            fileName='Bully Type: Daily Messages by Date.xlsx'
            apiPath='/export/export-bully'
            setKeywordId={setKeywordId}
          />
        ) : (
          ''
        )}
      </CardContent>
    </Paper>
  )
}

export default DailyMessgesByBullyType
