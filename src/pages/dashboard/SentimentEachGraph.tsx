// import Card from '@mui/material/Card'
// import CardHeader from '@mui/material/CardHeader'
// import CardContent from '@mui/material/CardContent'

// ** Third Party Imports
import { Box } from '@mui/material'
import { ApexOptions } from 'apexcharts'

// ** Custom Components Imports
import ReactApexcharts from 'src/@core/components/react-apexcharts'
import { useSettings } from 'src/@core/hooks/useSettings'
import Translations from 'src/layouts/components/Translations'

const Labels = (data: any) => {
  if (!data) {
    return []
  }
  const labels: any[] = []
  labels.push(data?.keyword_name || '')

  return labels
}

const ChartDataPositive = (data: any, type: string) => {
  if (!data) {
    return []
  }
  const value: any[] = []
  if (type === 'positive') {
    value.push(data?.Positive)
  } else if (type === 'negative') {
    value.push(data?.Negative)
  } else if (type === 'neutral') {
    value.push(data?.Neutral)
  }

  return value
}

const SentimentEachGraph = ({ resultSentimentLevel }: { resultSentimentLevel: any }) => {
  const chartLabels = Labels(resultSentimentLevel)
  const positiveData = ChartDataPositive(resultSentimentLevel, 'positive')
  const neutralData = ChartDataPositive(resultSentimentLevel, 'neutral')
  const negativeData = ChartDataPositive(resultSentimentLevel, 'negative')
  const { settings } = useSettings()
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
    colors: ['#C73E1D', '#FEB95F', '#63A375'],
    xaxis: {
      categories: chartLabels,
      labels: {
        show: false
      },
      axisBorder: {
        show: false
      },
      axisTicks: {
        show: false
      }
    },
    yaxis: {
      show: false
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
      colors: ['#C73E1D', '#FEB95F', '#63A375']
    },
    legend: {
      show: false
    }
  }

  return (
    <>
      {resultSentimentLevel ? (
        <Box sx={{ maxHeight: 65, mt: '-20px' }}>
          <ReactApexcharts type='bar' series={series} options={options} height={75} />
        </Box>
      ) : (
        <div
          style={{
            padding: '130px 0',
            textAlign: 'center',
            verticalAlign: 'middle',
            color: '#80808059'
          }}
        >
          <Translations text='no data' />
        </div>
      )}
    </>
  )
}

export default SentimentEachGraph
