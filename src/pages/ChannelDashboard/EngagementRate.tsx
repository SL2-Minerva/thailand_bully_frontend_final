import { CardContent, CardHeader, IconButton, LinearProgress, Menu, MenuItem, Paper, Typography } from '@mui/material'
import { MouseEvent, useEffect, useRef, useState } from 'react'
import { Bar, getDatasetAtEvent, getElementAtEvent } from 'react-chartjs-2'
import { StackChartDataset } from 'src/types/dashboard/overallDashboard'
import { GraphicColors } from 'src/utils/const'
import { StyledTooltip } from '../dashboard/overall'
import { Information } from 'mdi-material-ui'
import { InteractionItem } from 'chart.js'
import { LineProps } from '../VoiceDashboard/MessageByDays'
import Translations from 'src/layouts/components/Translations'
import MessageDetailChannel from './MessageDetailChannel'
import * as htmlToImage from 'html-to-image'
import { saveAs } from 'file-saver'
import { DotsVertical, Download } from 'mdi-material-ui'

const onCapture = () => {
  const pictureId = document.getElementById('engagementRateChannel')
  if (pictureId) {
    htmlToImage.toPng(pictureId, { backgroundColor: '#fff' }).then(function (dataUrl) {
      saveAs(dataUrl, 'Engagement Rate.png')
    })
  }
}

export const chartLabels = (currentData: any, previousData: any) => {
  if (!currentData && !previousData) return []

  let labels: string[] = []

  const currentPeriod = currentData?.labels
  const previousPeriod = previousData?.labels

  if (currentPeriod?.length > previousPeriod?.length) {
    labels = currentPeriod
  } else {
    labels = previousPeriod
  }

  return labels
}

export const chartDatasets = (currentData: any, previousData: any) => {
  if (!currentData) return []
  const returnData: StackChartDataset[] = []

  const color = GraphicColors

  const totalCurrent = currentData?.value?.current_period?.data || []
  const totalPrevious = previousData?.value?.previous_period?.data || []

  const chartDatasetCurrent: StackChartDataset = {
    fill: false,
    tension: 0.5,
    pointRadius: 1,
    label: 'Current Period',
    pointHoverRadius: 5,
    pointStyle: 'circle',
    borderColor: color[0],
    backgroundColor: color[0],
    pointHoverBorderWidth: 5,
    pointHoverBorderColor: '#fff',
    pointBorderColor: 'transparent',
    pointHoverBackgroundColor: color[0],
    data: totalCurrent
  }

  const chartDatasetPrevious: StackChartDataset = {
    fill: false,
    tension: 0.5,
    pointRadius: 1,
    label: 'Previous Period',
    pointHoverRadius: 5,
    pointStyle: 'circle',
    borderColor: color[1],
    backgroundColor: color[1],
    pointHoverBorderWidth: 5,
    pointHoverBorderColor: '#fff',
    pointBorderColor: 'transparent',
    pointHoverBackgroundColor: color[1],
    data: totalPrevious
  }

  returnData.push(chartDatasetCurrent)
  returnData.push(chartDatasetPrevious)

  return returnData
}

const EngagementRate = (props: LineProps) => {
  const { labelColor, borderColor, gridLineColor, params,  resultBy, resultByPrevious, loading } = props

  const [label, setLabel] = useState<string[]>([])
  const [dataset, setDataset] = useState<StackChartDataset[]>([])
  const [showDetail, setShowDetail] = useState<boolean>(false)
  const [showNoDataText, setShowNoDataText] = useState<boolean>(false)
  const [, setKeywordId] = useState<any>()
  const [paramsId, setParamsId] = useState<any>({
    keywordId: null,
    sourceId: null,
    campaign_id: null,
    organization_id: null
  })

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)

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
    const dailyMessageData = resultByPrevious?.value?.previous_period

    const keywordId: number | null = null
    let sourceId: number | null = null
    let campaign_id: number | null = null
    const organization_id: number | null = null

    if (dailyMessageData?.length > 0) {
      for (let i = 0; i < dailyMessageData?.length; i++) {
        if (keywordName === dailyMessageData[i].source_name) {
          sourceId = dailyMessageData[i].source_id || ''
          campaign_id = dailyMessageData[i].campaign_id || ''
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
      const getDatasetIndex = getDatasetAtEvent(chartRef.current, event)

      if (getDatasetIndex?.length > 0) {
        const datasetIndex = getDatasetIndex[0]?.datasetIndex

        if (datasetIndex === 0) {
          params.select_period = 'current'
        } else if (datasetIndex === 1) {
          params.select_period = 'previous'
        }
      }

      if (getIndex?.length > 0) {
        const index = getIndex[0].index
        params.label = label[index]
      }
      const messageDetailIds = getKeywordId(getDatasetAtEvent(chartRef.current, event))

      if (messageDetailIds) {
        setParamsId(messageDetailIds)
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
        stacked: false
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

  useEffect(() => {
    if (resultBy) {
      const currentEngagementData = resultBy
      const previousEngagementData = resultByPrevious

      if (currentEngagementData) {
        const labels = chartLabels(currentEngagementData, previousEngagementData)
        setLabel(labels)

        const dataSets = chartDatasets(currentEngagementData, previousEngagementData)
        setDataset(dataSets)

        if (currentEngagementData?.value || previousEngagementData?.value) {
          setShowNoDataText(false)
        } else {
          setShowNoDataText(true)
        }
      }
    } else {
      setShowNoDataText(true)
    }
  }, [resultBy, resultByPrevious])

  const data = {
    labels: label || [],
    datasets: dataset
  }

  const reportNo = '3.2.013'

  return (
    <Paper style={{ minHeight: 550, border: `3px solid #fff`, borderRadius: 7 }} >
      {loading && <LinearProgress style={{ width: '100%' }} />}
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
        <span style={{ display: 'flex', justifyContent: 'flex-start' }}>
          <CardHeader
            title={<Translations text='Total Engagement By Channel' />}
            titleTypographyProps={{ variant: 'h6' }}
            subheaderTypographyProps={{ variant: 'caption' }}
          />
          <StyledTooltip
            arrow
            title={
              <span>
                <Typography variant='h6' sx={{ color: 'white' }}>
                  <Translations text='channelChart11Title' />
                </Typography>
                <Typography variant='body2' sx={{ color: 'white' }}>
                  <Translations text='channelChart11Description' />
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

      <CardContent id='engagementRateChannel'>
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
                <Translations text='Engagement' />
              </div>

              <div style={{ flex: 1, height: '100%', minWidth: 0 }}>
                <Bar ref={chartRef} data={data} options={options as any} height={400} onClick={onClick} />
              </div>
            </div>
            <div style={{ textAlign: 'center', color: '#555', fontSize: 13, marginTop: 10 }}>
              <Translations text='Channel' />
            </div>
          </>
        )}
        {showDetail ? (
          <MessageDetailChannel
            show={showDetail}
            setShow={setShowDetail}
            params={params}
            paramsId={paramsId}
            setParamsId={setParamsId}
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

export default EngagementRate
