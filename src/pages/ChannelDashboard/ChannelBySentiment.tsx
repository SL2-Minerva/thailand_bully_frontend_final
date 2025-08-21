// ** MUI Imports
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import { IconButton, LinearProgress, Menu, MenuItem } from '@mui/material'

// ** Third Party Imports
// import { Bar } from 'react-chartjs-2'
import { StyledTooltip } from '../dashboard/overall'
import { Information } from 'mdi-material-ui'
import Translations from 'src/layouts/components/Translations'
import { ChannelColors } from 'src/utils/const'
import ReactApexcharts from 'src/@core/components/react-apexcharts'
import { ApexOptions } from 'apexcharts'
import * as htmlToImage from 'html-to-image'
import { saveAs } from 'file-saver'
import { DotsVertical, Download } from 'mdi-material-ui'
import { MouseEvent, useState } from 'react'

const onCapture = () => {
  const pictureId = document.getElementById('channelBySentiment')
  if (pictureId) {
    htmlToImage.toPng(pictureId, { backgroundColor: '#fff' }).then(function (dataUrl) {
      saveAs(dataUrl, 'Channel by Sentiement.png')
    })
  }
}

const ChartLabels = (data: any) => {
  if (!data) return []
  const keywordData = data

  const labels: any[] = []

  for (let i = 0; i < keywordData?.length; i++) {
    labels.push(keywordData[i].keyword_name)
  }

  return labels
}

const ChartData = (data: any) => {
  if (!data) return []

  const chartDatas: any[] = []
  for (let i = 0; i < data?.length; i++) {
    chartDatas.push(data[i]?.total_value)
  }

  return chartDatas
}

const ChannelBySentiment = ({
  chartId,
  
  resultBy,
  loading
}: {
  params: any
  chartId: string
  highlight: boolean
  resultBy?: any
  loading?: boolean
}) => {
  const labels = resultBy ? ChartLabels(resultBy) : []

  // const data = {
  //   labels: labels,
  //   datasets: [
  //     {
  //       axis: 'y',
  //       label: '',
  //       data: ChartData(resultBy),
  //       fill: false,
  //       backgroundColor: ChannelColors,
  //       borderColor: ChannelColors,
  //       borderWidth: 1
  //     }
  //   ]
  // }
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)

  const rowOptionsOpen = Boolean(anchorEl)

  const handleRowOptionsClick = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }
  const handleRowOptionsClose = () => {
    setAnchorEl(null)
  }

  const series = [
    {
      name: 'Total ',
      data: ChartData(resultBy)
    }
  ]

  const data: ApexOptions = {
    chart: {
      type: 'bar',
      stacked: true,
      toolbar: { show: false }
    },
    dataLabels: { enabled: false },
    plotOptions: {
      bar: {
        horizontal: true,
        distributed: true
      }
    },
    colors: ChannelColors,
    xaxis: {
      categories: labels
    },
    legend: {
      show: false
    }
  }

  const reportNo = '3.2.015'

  return (
    <Card sx={{ minHeight: 460 }}>
      {loading && <LinearProgress style={{ width: '100%' }} />}

      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
        <span style={{ display: 'flex', justifyContent: 'flex-start' }}>
          <CardHeader
            title={<Translations text='Channel by Sentiment' />}
            titleTypographyProps={{ variant: 'h6' }}
          />
          <StyledTooltip
            arrow
            title={
              <span>
                {chartId} <br /> {' Report Level 2(' + reportNo + ')'}
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
      <CardContent id="channelBySentiment">
        {!resultBy ? (
          <div
            style={{
              height: 200,
              padding: '170px 0',
              textAlign: 'center',
              verticalAlign: 'middle',
              color: '#80808059',
              alignItems: 'center'
            }}
          >
            <Translations text='no data' />
          </div>
        ) : (
          <ReactApexcharts type='bar' series={series} options={data} height={300} />
        )}
      </CardContent>
    </Card>
  )
}

export default ChannelBySentiment
