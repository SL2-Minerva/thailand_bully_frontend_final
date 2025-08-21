// import Card from '@mui/material/Card'
// import CardHeader from '@mui/material/CardHeader'
// import CardContent from '@mui/material/CardContent'

// ** Third Party Imports
import { ApexOptions } from 'apexcharts'

// ** Custom Components Imports
import ReactApexcharts from 'src/@core/components/react-apexcharts'
import { GetSentimentLevel } from 'src/services/api/dashboards/overall/overallDashboardApi'
import { LinearProgress } from '@mui/material'
import Translations from 'src/layouts/components/Translations'
import { useEffect, useState } from 'react'

const Labels = (data: any) => {
  if (!data) {
    return []
  }
  const labels: any[] = []
  if (data?.length > 0) {
    for (let i = 0; i < data?.length; i++) {
      labels.push(data[i].keyword_name || "")
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
        value.push(data[i].Positive)
      }
    } else if (type === 'negative') {
      for (let i = 0; i < data?.length; i++) {
        value.push(data[i].Negative)
      }
    } else if (type === 'neutral') {
      for (let i = 0; i < data?.length; i++) {
        value.push(data[i].Neutral)
      }
    }
  }

  return value
}

const SentimentLevelChart = ({ params }: { params: any }) => {
  const [apiParams, setApiParams] = useState<any>()

  const { resultSentimentLevel, loadingSentimentLevel } = GetSentimentLevel(
    apiParams
  )
  const chartLabels = Labels(resultSentimentLevel)
  const positiveData = ChartDataPositive(resultSentimentLevel, 'positive')
  const neutralData = ChartDataPositive(resultSentimentLevel, 'neutral')
  const negativeData = ChartDataPositive(resultSentimentLevel, 'negative')

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
      categories: chartLabels
    },
    yaxis: {
      show: false
    },
    tooltip: {
      y: {
        formatter: function (val) {
          return val + '%'
        }
      }
    },
    fill: {
      opacity: 1,
      colors: ['#C73E1D', '#FEB95F', '#63A375']
    },
    legend: {
      show: false
    }

    // legend: {
    //   position: 'top',
    //   horizontalAlign: 'left',
    //   offsetX: 40
    // }
  }

  useEffect(() => {
    if (params?.period !== 'customrange') {
      setApiParams({
        campaign_id: params?.campaign,
        source: params?.platformId,
        start_date: params?.date,
        end_date: params?.endDate,
        period: params?.period,
        fillter_keywords: params?.keywordIds
      })
    } 
    if (
      params?.period === 'customrange' &&
      params?.endDate &&
      params?.previousEndDate &&
      params?.date !== params?.endDate
      && params?.previousDate !== params?.previousEndDate
    ) {
      setApiParams({
        campaign_id: params?.campaign,
        source: params?.platformId,
        start_date: params?.date,
        end_date: params?.endDate,
        period: params?.period,
        start_date_period: params?.previousDate,
        end_date_period: params?.previousEndDate,
        fillter_keywords: params?.keywordIds
      })
    }
  }, [params])

  return (
   
    // <Card sx={{ height: 400 }}>
    
    //   <span style={{ display: 'flex', justifyContent: 'flex-start' }}>
    //     <CardHeader title='Sentiment' titleTypographyProps={{ variant: 'h6' }} />
    //   </span>
    //   <CardContent>
        
    //   </CardContent>
    // </Card>

    <>
      {resultSentimentLevel ? (
        <>
          {loadingSentimentLevel && <LinearProgress style={{ width: '100%' }} />}
          <ReactApexcharts type='bar' series={series} options={options} height={470} />
        </>
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

export default SentimentLevelChart
