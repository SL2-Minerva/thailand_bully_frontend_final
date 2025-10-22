import { Paper, CardContent, CardHeader, IconButton, LinearProgress, Menu, MenuItem, Typography } from '@mui/material'
import { MouseEvent, useEffect, useRef, useState } from 'react'
import { Bar, getDatasetAtEvent, getElementAtEvent } from 'react-chartjs-2'
import { StackChartDataset } from 'src/types/dashboard/overallDashboard'
import { StyledTooltip } from '../dashboard/overall'
import { Information } from 'mdi-material-ui'
import { InteractionItem } from 'chart.js'
import { LineProps } from '../VoiceDashboard/MessageByDays'
import { chartDatasets, chartLabels } from './EngagementRate'
import Translations from 'src/layouts/components/Translations'
import MessageDetailChannel from './MessageDetailChannel'
import * as htmlToImage from 'html-to-image'
import { saveAs } from 'file-saver'
import { DotsVertical, Download } from 'mdi-material-ui'

const onCapture = () => {
  const pictureId = document.getElementById('sentimentScoreChannel')
  if (pictureId) {
    htmlToImage.toPng(pictureId, { backgroundColor: '#fff' }).then(function (dataUrl) {
      saveAs(dataUrl, 'Sentiment Score.png')
    })
  }
}

const SentimentScore = (props: LineProps) => {
  const { labelColor, borderColor, gridLineColor, params,  resultBy, resultByPrevious, loading } =
    props
  const [showNoDataText, setShowNoDataText] = useState<boolean>(false)

  const [label, setLabel] = useState<string[]>([])
  const [dataset, setDataset] = useState<StackChartDataset[]>([])
  const [showDetail, setShowDetail] = useState<boolean>(false)
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
    if (resultBy || resultByPrevious) {
      const currentSentimentScore = resultBy
      const previousSentimentScore = resultByPrevious
      if (currentSentimentScore) {
        const labels = chartLabels(currentSentimentScore, previousSentimentScore)
        setLabel(labels)

        const dataSets = chartDatasets(currentSentimentScore, previousSentimentScore)
        setDataset(dataSets)
      }
      if (currentSentimentScore?.value || previousSentimentScore?.value) {
        setShowNoDataText(false)
      } else {
        setShowNoDataText(true)
      }
    } else {
      setShowNoDataText(true)
    }
  }, [resultBy, resultByPrevious])

  const data = {
    labels: label || [],
    datasets: dataset
  }

  const reportNo = '3.2.014'

  return (
    <Paper style={{ border: `3px solid #fff`, borderRadius: 7 }}>
      {loading && <LinearProgress style={{ width: '100%' }} />}

      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
        <span style={{ display: 'flex', justifyContent: 'flex-start' }}>
          <CardHeader
            title={<Translations text='Total Messages By Channel' />}
            titleTypographyProps={{ variant: 'h6' }}
            subheaderTypographyProps={{ variant: 'caption' }}
          />
          <StyledTooltip
            arrow
            title={
              <span>
                <span>
                  <Typography variant='h6' sx={{ color: 'white' }}>
                    <Translations text='channelChart12Title' />
                  </Typography>
                  <Typography variant='body2' sx={{ color: 'white' }}>
                    <Translations text='channelChart12Description' />
                  </Typography>
                </span>
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

      <CardContent id='sentimentScoreChannel'>
        {showNoDataText ? (
          <div
            style={{
              height: 400,
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
                <Translations text='Message' />
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

export default SentimentScore
