import { Paper, CardContent, CardHeader, LinearProgress } from '@mui/material'
import { useEffect, useRef, useState } from 'react'
import { Bar, getDatasetAtEvent, getElementAtEvent } from 'react-chartjs-2'
import { StackChartDataset } from 'src/types/dashboard/overallDashboard'
import { StyledTooltip } from '../dashboard/overall'
import { Information } from 'mdi-material-ui'
import { InteractionItem } from 'chart.js'
import { LineProps } from '../VoiceDashboard/MessageByDays'
import { GetChannelByBullyTypes } from 'src/services/api/dashboards/channel/ChannelDashboardApi'
import { chartDatasets } from './ChannelByBullyLevel'
import MessageDetail from '../VoiceDashboard/MessageDetail'
import { useTranslation } from 'react-i18next'
import Translations from 'src/layouts/components/Translations'

const ChannelByBullyType = (props: LineProps) => {
  const { t } = useTranslation()
  const { labelColor, borderColor, gridLineColor, chartId, params,  keywordsColor } = props
  const [showNoDataText, setShowNoDataText] = useState<boolean>(false)

  const [label, setLabel] = useState<string[]>([])
  const [dataset, setDataset] = useState<StackChartDataset[]>([])
  const [showDetail, setShowDetail] = useState<boolean>(false)
  const { resultChannelByBullyType, loadingChannelByBullyType } = GetChannelByBullyTypes(
    params?.campaign,
    params?.date,
    params?.endDate,
    params?.period,
    params?.keywordIds,
    params?.previousDate,
    params?.previousEndDate
  )
  const [paramsId, setParamsId] = useState<any>({
    keywordId: null,
    sourceId: null,
    campaign_id: null,
    organization_id: null
  })
  const chartRef = useRef()

  const getKeywordId = (dataset: InteractionItem[]) => {
    if (!dataset.length) return

    const datasetIndex = dataset[0].datasetIndex
    const keywordName = data.datasets[datasetIndex].label
    const dailyMessageData = resultChannelByBullyType?.value

    const keywordId: number | null = null
    let sourceId: number | null = null
    let campaign_id: number | null = null
    const organization_id: number | null = null

    if (dailyMessageData?.length > 0) {
      for (let i = 0; i < dailyMessageData?.length; i++) {
        if (keywordName === dailyMessageData[i].source_name) {
          sourceId = dailyMessageData[i].source_id
          campaign_id = dailyMessageData[i].campaign_id
        }
      }
    }

    const returnData = {
      keywordId: keywordId,
      sourceId: sourceId,
      campaign_id: campaign_id,
      organization_id: organization_id
    }

    return returnData
  }

  const onClick = (event: any) => {
    if (chartRef.current) {
      const getIndex = getElementAtEvent(chartRef.current, event)

      if (getIndex?.length > 0) {
        const index = getIndex[0].index
        params.label = label[index]
      }
      const messageDetailIds = getKeywordId(getDatasetAtEvent(chartRef.current, event))
      const getDatasetIndex = getDatasetAtEvent(chartRef.current, event)

      if (getDatasetIndex?.length > 0) {
        const datasetIndex = getDatasetIndex[0]?.datasetIndex

        if (datasetIndex === 0 || datasetIndex) {
          params.Llabel = dataset[datasetIndex]?.label
        }
      }
      if (messageDetailIds) {
        setParamsId(messageDetailIds)
        setShowDetail(true)
      }
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

  const chartLabel = (data: any) => {
    if (!data) return []
    const labels: any[] = []

    if (data) {
      for (let i = 0; i < data.labels?.length; i++) {
        labels.push(t(data.labels[i]))
      }
    }

    return labels
  }
  useEffect(() => {
    if (resultChannelByBullyType) {
      const labels = chartLabel(resultChannelByBullyType)
      setLabel(labels)
    }
  }, [t])

  useEffect(() => {
    if (resultChannelByBullyType) {
      const dailyMessageData = resultChannelByBullyType
      if (dailyMessageData) {
        const labels = chartLabel(dailyMessageData)
        setLabel(labels)

        const dataSets = chartDatasets(dailyMessageData, keywordsColor)
        setDataset(dataSets)
      }
      if (!dailyMessageData?.value) {
        setShowNoDataText(true)
      } else {
        setShowNoDataText(false)
      }
    }
  }, [resultChannelByBullyType])

  const data = {
    labels: label || [],
    datasets: dataset
  }

  const reportNo = '3.2.009'

  const chartTitle = chartId + ', Report Level 2(' + reportNo + ')'

  return (
    <Paper sx={{ border: `3px solid #fff`, borderRadius: 1 }} >
      {loadingChannelByBullyType && <LinearProgress style={{ width: '100%' }} />}
      <span style={{ display: 'flex', justifyContent: 'flex-start' }}>
        <CardHeader
          title={<Translations text='Daily Messages By Bully Type' />}
          titleTypographyProps={{ variant: 'h6' }}
          subheaderTypographyProps={{ variant: 'caption' }}
        />
        <StyledTooltip arrow title={chartTitle || ''}>
          <Information style={{ marginTop: '22px', fontSize: '29px' }} />
        </StyledTooltip>
      </span>

      <CardContent>
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
          <Bar ref={chartRef} data={data} options={options as any} height={400} onClick={onClick} />
        )}
        {showDetail ? (
          <MessageDetail
            show={showDetail}
            setShow={setShowDetail}
            params={params}
            paramsId={paramsId}
            setParamsId={setParamsId}
            reportNo={reportNo}
            type="channel"
          />
        ) : (
          ''
        )}
      </CardContent>
    </Paper>
  )
}

export default ChannelByBullyType
