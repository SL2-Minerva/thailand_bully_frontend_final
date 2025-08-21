import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'

// ** Third Party Imports
import { ApexOptions } from 'apexcharts'

// ** Custom Components Imports
import ReactApexcharts from 'src/@core/components/react-apexcharts'
import { SentimentAllColors } from 'src/utils/const'
import { LinearProgress, Paper } from '@mui/material'
import Translations from 'src/layouts/components/Translations'
import { useSettings } from 'src/@core/hooks/useSettings'

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

const ChartDataSentiment = (data: any, type: string) => {
  if (!data) {
    return []
  }
  const value: any[] = []
  if (data?.length > 0) {
    if (type === 'negative') {
      for (let i = 0; i < data?.length; i++) {
        value.push(data[i].negative)
      }
    } else if (type === 'neutral') {
      for (let i = 0; i < data?.length; i++) {
        value.push(data[i].neutral)
      }
    } else if (type === 'positive') {
      for (let i = 0; i < data?.length; i++) {
        value.push(data[i].positive)
      }
    }
  }

  return value
}

const SentimentScorePercentage = ({
  resultSentimentScorePercentage,
  loadingSentimentScore
}: {
  params: any
  highlight: boolean
  resultSentimentScorePercentage: any
  loadingSentimentScore: boolean
}) => {
  const chartLabels = Labels(resultSentimentScorePercentage)
  const negativeData = ChartDataSentiment(resultSentimentScorePercentage, 'negative')
  const neutralData = ChartDataSentiment(resultSentimentScorePercentage, 'neutral')
  const positiveData = ChartDataSentiment(resultSentimentScorePercentage, 'positive')
  const { settings } = useSettings()

  const series = [
    {
      name: 'Negative',
      data: negativeData || []
    },
    {
      name: 'Neutral',
      data: neutralData || []
    },
    {
      name: 'Positive',
      data: positiveData || []
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
          return val + '%'
        }
      },
      theme: settings.mode === 'dark' ? 'dark' : 'light'
    },
    fill: {
      opacity: 1,
      colors: SentimentAllColors
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

  return (
    <Paper sx={{ border: `3px solid #fff`, borderRadius: 1, minHeight: 520 }}>
      {loadingSentimentScore && <LinearProgress style={{ width: '100%' }} />}
      <CardHeader title='' titleTypographyProps={{ variant: 'h6' }} />
      <CardContent>
        {resultSentimentScorePercentage?.length === 0 ? (
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
            {negativeData?.length > 0 || positiveData?.length > 0 || neutralData?.length > 0 ? (
              <ReactApexcharts type='bar' height={430} series={series} options={options} />
            ) : (
              ''
            )}
          </>
        )}
      </CardContent>
    </Paper>
  )
}

export default SentimentScorePercentage
