// import Card from '@mui/material/Card'
// import CardHeader from '@mui/material/CardHeader'
// import CardContent from '@mui/material/CardContent'

// ** Third Party Imports
import { ApexOptions } from 'apexcharts'

// ** Custom Components Imports
import ReactApexcharts from 'src/@core/components/react-apexcharts'
import { GetShareOfVoiceChart } from 'src/services/api/dashboards/overall/overallDashboardApi'
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
      labels.push(data[i].keyword_name || '')
    }
  }

  return labels
}

const ChartData = (data: any) => {
  if (!data) {
    return []
  }
  const value: any[] = []
  if (data?.length > 0) {
    for (let i = 0; i < data?.length; i++) {
      value.push(data[i]?.number_of_massage)
    }
  }

  return value
}

const NumberOfMessage = ({ params, keywordsColor }: { params: any; keywordsColor: any }) => {
  const { resultShareOfVoiceChart, loadingShareOfVoiceChart } = GetShareOfVoiceChart(
    params?.campaign,
    params?.platformId,
    params?.date,
    params?.endDate,
    params?.period,
    params?.previousDate,
    params?.previousEndDate,
    params?.keywordIds
  )
  
  // const chartLabels = Labels(resultShareOfVoiceChart)

  const chartSeriesData = ChartData(resultShareOfVoiceChart)

  const [chartOptions, setChartOptions] = useState<ApexOptions>()

  const series = [
    {
      name: 'Number of Message',
      data: chartSeriesData
    }
  ]

  useEffect(() => {
    if (keywordsColor?.length > 0) {
      setChartOptions({
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
        colors: keywordsColor,
        xaxis: {
          categories: Labels(resultShareOfVoiceChart)
        },
        legend: {
          show: false
        }
      })
    }
  }, [keywordsColor, resultShareOfVoiceChart])

  return (
    <>
      {resultShareOfVoiceChart?.length > 0 ? (
        <>
          {loadingShareOfVoiceChart && <LinearProgress style={{ width: '100%' }} />}
          <ReactApexcharts type='bar' series={series} options={chartOptions} height={470} />
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

export default NumberOfMessage
