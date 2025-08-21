import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'

// ** Third Party Imports
import { ApexOptions } from 'apexcharts'

// ** Custom Components Imports
import ReactApexcharts from 'src/@core/components/react-apexcharts'
import { StyledTooltip } from '../dashboard/overall'
import { Information } from 'mdi-material-ui'
import { IconButton, LinearProgress, Menu, MenuItem, Paper, Typography } from '@mui/material'
import Translations from 'src/layouts/components/Translations'
import * as htmlToImage from 'html-to-image'
import { saveAs } from 'file-saver'
import { DotsVertical, Download } from 'mdi-material-ui'
import { MouseEvent, useState } from 'react'
import { useSettings } from 'src/@core/hooks/useSettings'

const onCapture = () => {
  const pictureId = document.getElementById('engagementProption')
  if (pictureId) {
    htmlToImage.toPng(pictureId, { backgroundColor: '#fff' }).then(function (dataUrl) {
      saveAs(dataUrl, 'Engagement Type Proption.png')
    })
  }
}

const Labels = (data: any) => {
  if (!data) {
    return []
  }
  const labels: any[] = []
  if (data?.length > 0) {
    for (let i = 0; i < data?.length; i++) {
      labels.push(data[i].keyword_name || '')
    }
  }

  return labels
}

const ChartDataEngagement = (data: any, type: string) => {
  if (!data) {
    return []
  }
  const value: any[] = []
  if (data?.length > 0) {
    if (type === 'share') {
      for (let i = 0; i < data?.length; i++) {
        value.push(data[i].share_r)
      }
    } else if (type === 'comment') {
      for (let i = 0; i < data?.length; i++) {
        value.push(data[i].comment_r)
      }
    } else if (type === 'reaction') {
      for (let i = 0; i < data?.length; i++) {
        value.push(data[i].reaction_r)
      }
    } else if (type === 'views') {
      for (let i = 0; i < data?.length; i++) {
        value.push(data[i].views_r)
      }
    }
  }

  return value
}

const EngagmentComparisonChart = ({
  resultComparison,
  loadingComparison
}: {
  params: any
  highlight: boolean
  chartId: string
  resultComparison: any
  loadingComparison: boolean
}) => {
  const chartLabels = Labels(resultComparison)
  const shareData = ChartDataEngagement(resultComparison, 'share')
  const commentData = ChartDataEngagement(resultComparison, 'comment')
  const reactionData = ChartDataEngagement(resultComparison, 'reaction')
  const viewsData = ChartDataEngagement(resultComparison, 'views')
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)

  const rowOptionsOpen = Boolean(anchorEl)
  const { settings } = useSettings()
  const handleRowOptionsClick = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }
  const handleRowOptionsClose = () => {
    setAnchorEl(null)
  }

  const series = [
    {
      name: 'Share',
      data: shareData
    },
    {
      name: 'Comment',
      data: commentData
    },
    {
      name: 'Reaction',
      data: reactionData
    },
    {
      name: 'Views',
      data: viewsData
    }
  ]

  const options: ApexOptions = {
    chart: {
      type: 'bar',
      height: 350,
      stacked: true,
      stackType: '100%',
      toolbar: { show: false }
    },
    dataLabels: { enabled: false },
    plotOptions: {
      bar: {
        horizontal: true
      }
    },
    stroke: {
      width: 1,
      colors: ['#fff']
    },
    title: {
      text: ''
    },
    colors: ['#c46628', '#ee7d30', '#ff9a56' ,'#f4baa3'],
    xaxis: {
      categories: chartLabels,
      labels: {
        style: {
          colors: settings.mode === 'dark' ? '#fff' : 'dark'
        }
      }
    },
    yaxis: {
      labels: {
        style: {
          colors: settings.mode === 'dark' ? '#fff' : 'dark'
        }
      }
    },
    tooltip: {
      y: {
        formatter: function (val) {

          // return val + ''

          return val.toLocaleString()
        }
      },
      theme: settings.mode === 'dark' ? 'dark' : 'light'
    },
    fill: {
      opacity: 1,
      colors: ['#c46628', '#ee7d30', '#ff9a56' , '#f4baa3']
    },
    legend: {
      position: 'top',
      horizontalAlign: 'left',
      offsetX: 40,
      labels: {
        colors: settings.mode === 'dark' ? '#fff' : 'dark'
      }
    }
  }

  // const reportNo = '4.2.024'

  return (
    <Paper style={{ border: `3px solid #fff`, borderRadius: 7, minHeight: 560 }}>
      {loadingComparison && <LinearProgress style={{ width: '100%' }} />}
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
        <span style={{ display: 'flex', justifyContent: 'flex-start' }}>
          <CardHeader
            title={<Translations text='Engagement Type Proportion' />}
            titleTypographyProps={{ variant: 'h6' }}
          />
          <StyledTooltip
            arrow
            title={
              <span>
                <span>
                  <Typography variant='h6' sx={{ color: 'white' }}>
                    <Translations text='engagementChart20Title' />
                  </Typography>
                  <Typography variant='body2' sx={{ color: 'white' }}>
                    <Translations text='engagementChart20Description' />
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

      <CardContent id='engagementProption'>
        {resultComparison ? (
          <ReactApexcharts type='bar' height={420} series={series} options={options} />
        ) : (
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
        )}
      </CardContent>
    </Paper>
  )
}

export default EngagmentComparisonChart
