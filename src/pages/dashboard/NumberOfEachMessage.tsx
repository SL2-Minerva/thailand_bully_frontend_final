// ** Third Party Imports
import { Box } from '@mui/material'
import { ApexOptions } from 'apexcharts'

// ** Custom Components Imports
import ReactApexcharts from 'src/@core/components/react-apexcharts'
import { useSettings } from 'src/@core/hooks/useSettings'
import Translations from 'src/layouts/components/Translations'

export const Labels = (data: any) => {
  if (!data) {
    return []
  }
  const labels: any[] = []
  labels.push(data?.keyword_name || '')

  return labels
}

export const ChartData = (data: any) => {
  if (!data) {
    return []
  }
  const value: any[] = []
  value.push(data?.number_of_message || data?.total)

  return value
}

const NumberOfEachMessage = ({
  keywordsColor,
  resultShareOfVoiceChart
}: {
  keywordsColor: any
  resultShareOfVoiceChart: any
}) => {
  //   const chartLabels = Labels(resultShareOfVoiceChart)

  const chartSeriesData = ChartData(resultShareOfVoiceChart)
  const {settings} = useSettings();

  const series = [
    {
      name: 'Number of Message',
      data: chartSeriesData
    }
  ]

  const options: ApexOptions = {
    chart: {
      type: 'bar',
      stacked: true,
      toolbar: { show: false }
    },
    tooltip: {
      theme: settings.mode === 'dark' ? 'dark' : 'light'
    },
    dataLabels: { enabled: false },
    plotOptions: {
      bar: {
        horizontal: true
      }
    },
    colors: keywordsColor,
    xaxis: {
      categories: Labels(resultShareOfVoiceChart),
      max: 20000,
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
    legend: {
      show: false
    }
  }

  return (
    <>
      {resultShareOfVoiceChart ? (
        <Box sx={{ maxHeight: 65, mt: '-20px' }}>
          <ReactApexcharts type='bar' series={series} options={options} height={70} />
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

export default NumberOfEachMessage
