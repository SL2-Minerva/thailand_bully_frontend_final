import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'

// ** Third Party Imports
import { ApexOptions } from 'apexcharts'

// ** Custom Components Imports
import ReactApexcharts from 'src/@core/components/react-apexcharts'
import { SentimentAllColors } from 'src/utils/const'
import { IconButton, LinearProgress, Menu, MenuItem } from '@mui/material'
import { MouseEvent, useEffect, useState } from 'react'
import Translations from 'src/layouts/components/Translations'
import * as htmlToImage from 'html-to-image'
import { saveAs } from 'file-saver'
import { DotsVertical, Download } from 'mdi-material-ui'

const onCapture = () => {
  const pictureId = document.getElementById('sentimentLevel')
  if (pictureId) {
    htmlToImage.toPng(pictureId, { backgroundColor: '#fff' }).then(function (dataUrl) {
      saveAs(dataUrl, 'Sentiment Level.png')
    })
  }
}

// const Labels = (data: any) => {
//   if (!data) {
//     return []
//   }
//   const labels: any[] = []
//   if (data?.length > 0) {
//     for (let i = 0; i < data?.length; i++) {
//       labels.push(data[i].keyword_name || "")
//     }
//   }

//   return labels
// }

const YLabels = (data: any) => {
  if (!data) {
    return []
  }
  const labels: any[] = []
  if (data?.length > 0) {
    for (let i = 0; i < data?.length; i++) {
      labels.push(data[i].source_name || "")
    }
  }

  return labels
}



const ChartDataPositive = (data: any, type: string) => {
  if (!data) {
    return []
  }
  const value: any[] = []
  if (data?.length > 0) {
    if (type === 'positive') {
      for (let i = 0; i < data?.length; i++) {
        value.push(data[i].positive)
      }
    } else if (type === 'negative') {
      for (let i = 0; i < data?.length; i++) {
        value.push(data[i].negative)
      }
    } else if (type === 'neutral') {
      for (let i = 0; i < data?.length; i++) {
        value.push(data[i].neutral)
      }
    }
  }

  return value
}

const SentimentLevelChart = ({
  
  resultSentimentLevel,
  loading
}: {
  params: any
  chartId: string
  highlight: boolean
  resultSentimentLevel: any
  loading: boolean
}) => {
  // const chartLabels = Labels(resultSentimentLevel)

  const sourceNames = YLabels(resultSentimentLevel);
  const positiveData = ChartDataPositive(resultSentimentLevel, 'positive')
  const neutralData = ChartDataPositive(resultSentimentLevel, 'neutral')
  const negativeData = ChartDataPositive(resultSentimentLevel, 'negative')
  const [showNoDataText, setShowNoDataText] = useState<boolean>(false)
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)

  const rowOptionsOpen = Boolean(anchorEl)

  const handleRowOptionsClick = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }
  const handleRowOptionsClose = () => {
    setAnchorEl(null)
  }

  useEffect(() => {
    if(resultSentimentLevel) {
      setShowNoDataText(false)
    } else {
      setShowNoDataText(true)
    }
  },[resultSentimentLevel])
  const series = [
    {
      name: 'Negative',
      data: negativeData
    },
    {
      name: 'Neutral',
      data: neutralData
    },
    {
      name: 'Positive',
      data: positiveData
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
    colors: SentimentAllColors,
    xaxis: {
      categories: sourceNames
    },

    // yaxis : {
    //   show: false
    // },
    tooltip: {
      y: {
        formatter: function (val) {
          return val + '%'
        }
      }
    },
    fill: {
      opacity: 1,
      colors: SentimentAllColors
    },
    legend: {
      show: false

      // position: 'top',
      // horizontalAlign: 'left',
      // offsetX: 40
    }
  }

  return (
    <Card sx={{ minHeight: 460 }}>
      {loading && <LinearProgress style={{ width: '100%' }} />}
      
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
      <span style={{ display: 'flex', justifyContent: 'flex-start' }}>
        <CardHeader
          title='Sentiment Level'
          titleTypographyProps={{ variant: 'h6' }}
        />
        {/* <StyledTooltip arrow title={chartId}>
              <Information style={{marginTop: '22px', fontSize: '29px',color: highlight ? 'green' : '#4c4e64de'}} />
          </StyledTooltip> */}
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
      <CardContent id="sentimentLevel">
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
          <ReactApexcharts type='bar' height={300} series={series} options={options} />
        )}
        
      </CardContent>
    </Card>
  )
}

export default SentimentLevelChart
