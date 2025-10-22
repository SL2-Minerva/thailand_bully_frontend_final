import {
  CardContent,
  CardHeader,
  Grid,
  IconButton,
  LinearProgress,
  Menu,
  MenuItem,
  Paper,
  Table,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography
} from '@mui/material'
import { Information } from 'mdi-material-ui'
import { MouseEvent, useEffect, useRef, useState } from 'react'
import { Bar, getDatasetAtEvent, getElementAtEvent, getElementsAtEvent } from 'react-chartjs-2'
import Translations from 'src/layouts/components/Translations'
import { StackChartDataset } from 'src/types/dashboard/overallDashboard'
import { PeriodComparisonChannel, sentimentComparison, SentimentComparisonEngagment } from 'src/utils/const'
import { StyledTooltip } from '../dashboard/overall'
import * as htmlToImage from 'html-to-image'
import { saveAs } from 'file-saver'
import { DotsVertical, Download } from 'mdi-material-ui'

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
  chartTitle: string
  colorType?: string
  chartId: string
  highlight: boolean
  reportNo: string
  resultSentimentComparisonByEngagement: any
  loadingSenitmentComparisonByEngagement: boolean
}

const chartLabel = (data: any) => {
  if (!data) return []

  let labels: string[] = []
  if (data) {
    labels = data.labels
  }

  return labels
}

const getTitle = (title: string, chartTitle: string) => {
  if (!title && !chartTitle) return ''

  let cardTitle = ''
  if (title === 'channel') {
    cardTitle = chartTitle + ' by Channel'
  } else if (title === 'sentiment') {
    cardTitle = chartTitle + ' by Sentiment'
  } else if (title === 'engagementType') {
    cardTitle = chartTitle + ' by Engagement Type'
  } else {
    cardTitle = chartTitle
  }

  return cardTitle
}

const PeriodComparisonChart = (props: LineProps) => {
  const {
    white,
    labelColor,
    borderColor,
    gridLineColor,
    type,
    chartTitle,
    colorType,
    chartId,
    resultSentimentComparisonByEngagement,
    loadingSenitmentComparisonByEngagement,
    
    reportNo
  } = props
  const [label, setLabel] = useState<string[]>([])
  const [dataset, setDataset] = useState<StackChartDataset[]>([])
  const [showNoDataText, setShowNoDataText] = useState<boolean>(false)
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)

  const rowOptionsOpen = Boolean(anchorEl)

  const handleRowOptionsClick = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }
  const handleRowOptionsClose = () => {
    setAnchorEl(null)
  }

  const onCapture = () => {
    const pictureId = document.getElementById('comparisonByCharts')
    if (pictureId) {
      const title = getTitle(type, chartTitle)

      htmlToImage.toPng(pictureId, { backgroundColor: '#fff' }).then(function (dataUrl) {
        saveAs(dataUrl, title + '.png')
      })
    }
  }

  //   const handleChangePagination = (event: React.ChangeEvent<unknown>, value: number) => {
  //     setPage(value-1);
  // };

  //   useEffect(()=> {
  //       if (total > 0) {
  //       setPageCount(Math.ceil(total / 10));
  //       }
  //   }, [total]);

  const chartRef = useRef()
  const onClick = (event: any) => {
    if (chartRef.current) {
      console.log(getDatasetAtEvent(chartRef.current, event))
      console.log(getElementAtEvent(chartRef.current, event))
      console.log(getElementsAtEvent(chartRef.current, event))
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

  const chartDatasets = (data: any) => {
    if (!data) return []
    let totalAmount: number[] = []
    let keywordName = ''
    const returnData: StackChartDataset[] = []
    const color =
      colorType === 'SentimentComparisonEngagment'
        ? SentimentComparisonEngagment
        : colorType === 'sentimentComparison'
        ? sentimentComparison
        : PeriodComparisonChannel
    for (let i = 0; i < data?.value?.length; i++) {
      totalAmount = []
      const total = data?.value

      for (let j = 0; j < total[i]?.data?.length; j++) {
        totalAmount.push(total[i]?.data[j])
      }

      keywordName = data?.value[i]?.keyword_name
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
    if (resultSentimentComparisonByEngagement) {
      const dailyMessageData = resultSentimentComparisonByEngagement
      if (dailyMessageData) {
        const labels = chartLabel(dailyMessageData)
        setLabel(labels)

        const dataSets = chartDatasets(dailyMessageData)
        setDataset(dataSets)

        if (dailyMessageData?.value) {
          setShowNoDataText(false)
        } else {
          setShowNoDataText(true)
        }
      }
    } else {
      setShowNoDataText(true)
    }
  }, [resultSentimentComparisonByEngagement])

  const data = {
    labels: label || [],
    datasets: dataset
  }

  const cardTitle = getTitle(type, chartTitle)

  return (
      <Paper sx={{ border: `3px solid #fff`, borderRadius: 1 ,minHeight: 713 }} >
      {loadingSenitmentComparisonByEngagement && <LinearProgress style={{ width: '100%' }} />}
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
        <span style={{ display: 'flex', justifyContent: 'flex-start' }}>
          <CardHeader
            title={<Translations text={cardTitle} />}
            titleTypographyProps={{ variant: 'h6' }}
            subheaderTypographyProps={{ variant: 'caption' }}
          />
          <StyledTooltip
            arrow
            title={
              <span>
                <Typography variant='h6' sx={{ color: 'white' }}>
                  <Translations text={chartId} />
                </Typography>
                <Typography variant='body2' sx={{ color: 'white' }}>
                  <Translations text={reportNo} />
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

      <CardContent id='comparisonByCharts'>
        <Grid container spacing={2}>
          <Grid item xs={12}>
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
            <div style={{ textAlign: 'center', color: '#555', fontSize: 13, marginTop: 15 }}>
              <Translations text='Channel' />
            </div>
          </>
        )}
          </Grid>
          <Grid item xs={12}>
            {resultSentimentComparisonByEngagement?.value ? (
              <TableContainer component={Paper}>
                <Table aria-label='simple table'>
                  <TableHead>
                    <TableRow>
                      <TableCell width='10'>
                        {resultSentimentComparisonByEngagement?.share ? 'Share' : 'Positive'}
                      </TableCell>
                      {(
                        resultSentimentComparisonByEngagement?.share ||
                        resultSentimentComparisonByEngagement?.positive ||
                        []
                      )?.map((share: any, index: number) => {
                        return (
                          <TableCell align='center' key={index}>
                            {share}%
                          </TableCell>
                        )
                      })}
                      {/* <TableCell align='center'>{resultSentimentComparisonByEngagement?.share || resultSentimentComparisonByEngagement?.positive || ""}</TableCell> */}
                    </TableRow>
                    <TableRow>
                      <TableCell width='10'>
                        {resultSentimentComparisonByEngagement?.comment ? 'Comment' : 'Neutral'}
                      </TableCell>
                      {(
                        resultSentimentComparisonByEngagement?.comment ||
                        resultSentimentComparisonByEngagement?.neutral ||
                        []
                      )?.map((comment: any, index: number) => {
                        return (
                          <TableCell align='center' key={index}>
                            {comment}%
                          </TableCell>
                        )
                      })}
                      {/* <TableCell align='center'>{resultSentimentComparisonByEngagement?.comment || resultSentimentComparisonByEngagement?.neutral || ""}</TableCell> */}
                    </TableRow>
                    <TableRow>
                      <TableCell width='10'>
                        {resultSentimentComparisonByEngagement?.comment ? 'Reaction' : 'Negative'}
                      </TableCell>
                      {(
                        resultSentimentComparisonByEngagement?.reaction ||
                        resultSentimentComparisonByEngagement?.negative ||
                        []
                      )?.map((reaction: any, index: number) => {
                        return (
                          <TableCell align='center' key={index}>
                            {reaction}%
                          </TableCell>
                        )
                      })}
                      {/* <TableCell align='center'>{resultSentimentComparisonByEngagement?.reaction || resultSentimentComparisonByEngagement?.negative || ""}</TableCell> */}
                    </TableRow>
                    {/* <TableRow>
                      <TableCell width='10'>Views</TableCell>
                      {(resultSentimentComparisonByEngagement?.views || []).map((view: any, index: number) => {
                        return (
                          <TableCell align='center' key={index}>
                            {view}%
                          </TableCell>
                        )
                      })}
                    </TableRow> */}
                    
                    {/* เพิ่มเงื่อนไขนี้เพื่อแสดง Views เฉพาะในกรณีที่มี Share/Comment/Reaction */}
                    {(resultSentimentComparisonByEngagement?.share ||
                      resultSentimentComparisonByEngagement?.comment ||
                      resultSentimentComparisonByEngagement?.reaction) && (
                      <TableRow>
                        <TableCell width="10">Views</TableCell>
                        {(resultSentimentComparisonByEngagement?.views || []).map((view: any, index: number) => {
                          return (
                            <TableCell align="center" key={index}>
                              {view}%
                            </TableCell>
                          )
                        })}
                      </TableRow>
                    )}
                  </TableHead>
                </Table>
              </TableContainer>
            ) : (
              ''
            )}
          </Grid>
        </Grid>
      </CardContent>
    </Paper>
  )
}

export default PeriodComparisonChart
