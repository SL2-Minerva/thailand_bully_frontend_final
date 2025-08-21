// ** Third Party Imports
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

const ShareOfChannelGraph = ({
  keywordsColor,
  resultShareOfVoiceChart,
  max
}: {
  keywordsColor: any
  resultShareOfVoiceChart: any
  max: number
}) => {
  //   const chartLabels = Labels(resultShareOfVoiceChart)

  const chartSeriesData = ChartData(resultShareOfVoiceChart)
  const { settings } = useSettings();

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
    dataLabels: { enabled: false },
    plotOptions: {
      bar: {
        horizontal: true
      }
    },
    colors: keywordsColor,
    xaxis: {
      categories: Labels(resultShareOfVoiceChart),
      max: max,
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
    },
    tooltip: {
      y: {
        formatter: function (val) {
          return val.toString()
        }
      },
      theme: settings.mode === 'dark' ? 'dark' : 'light'
    },
  }

  return (
    <>
      {resultShareOfVoiceChart ? (
        <>
          <ReactApexcharts type='bar' series={series} options={options} height={70}/>
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

export default ShareOfChannelGraph
