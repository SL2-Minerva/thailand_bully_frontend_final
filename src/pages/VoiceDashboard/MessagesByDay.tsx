import { Card, CardContent, CardHeader } from '@mui/material'
import { useEffect, useRef, useState } from 'react'
import { Bar, getDatasetAtEvent} from 'react-chartjs-2'
import { StackChartDataset } from 'src/types/dashboard/overallDashboard'
import DailyMessageDetail from '../dashboard/DailyMessageDetail'
import { BullyDashboardColors, EngagementTypeColors, GraphicColors } from 'src/utils/const'
import { StyledTooltip } from '../dashboard/overall'
import { Information } from 'mdi-material-ui'
import { InteractionItem } from 'chart.js'
import Translations from 'src/layouts/components/Translations'

interface LineProps {
    white: string
    warning: string
    primary: string
    success: string
    labelColor: string
    borderColor: string
    gridLineColor: string
    filterData: any
    type: string
    chartTitle: string
    colorType?: string
    chartId? : string
  }
  
  const chartLabel = (data:any) => {
    if(!data) return [];
    
    let labels : string[] = [];
    if(data) {
      labels = data.labels;
    }
  
    return labels;
  }

  const getTitle = (title: string, chartTitle: string) => {
    if(!title && !chartTitle) return "";

    let cardTitle = "";
    if (title === "day") {
      cardTitle = chartTitle +" by Day"
    } else if (title === "time") {
      cardTitle = chartTitle +" by Time"
    } else if(title === "device") {
      cardTitle = chartTitle +" by Devices"
    } else if(title === "account") {
      cardTitle = chartTitle +" by Account"
    } else if(title === "channel") {
      cardTitle = chartTitle +" by Channel"
    } else if(title === "sentiment") {
      cardTitle = chartTitle +" by Sentiment"
    } else if(title === "bullyType") {
      cardTitle = chartTitle +" by Bully Type"
    } else if(title === "bullyLevel") {
      cardTitle = chartTitle +" by Bully Level"
    } else {
      cardTitle = chartTitle
    }

    return cardTitle;
  }

const MessagesByDay = (props: LineProps) => {

  const { white, labelColor, borderColor, gridLineColor, filterData, type, chartTitle, colorType, chartId } = props

  const [ label, setLabel ] = useState<string[]>([]);
  const [ dataset, setDataset ] = useState<StackChartDataset[]>([]);
  const [ showDetail , setShowDetail ] = useState<boolean>(false);
  const [current, setCurrent] = useState<any>({})
  const [keywordId, setKeywordId] = useState<any>();
  const [showNoDataText, setShowNoDataText] = useState<boolean>(false)

  const chartRef = useRef();
  const getKeywordId = (dataset: InteractionItem[]) => {
    if (!dataset.length) return;

    const datasetIndex = dataset[0].datasetIndex;
    const keywordName = data.datasets[datasetIndex].label;
    const dailyMessageData = filterData?.daily_message;
    let keywordId : number | null= null;
    if (dailyMessageData?.length > 0) {
      for (let i =0; i<dailyMessageData?.length; i++) {
          if(keywordName === dailyMessageData[i].keyword_name) {
            keywordId = dailyMessageData[i].keyword_id;
          }
      }
    }

    return keywordId;
  };
  
  const onClick = (event : any) => {
    if(chartRef.current) {
      
      const keyword_id =  getKeywordId(getDatasetAtEvent(chartRef.current, event));
      setShowDetail(true);

      if(keyword_id) {
        // setShowDetail(true);
        setCurrent({})
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
        },

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

  const chartDatasets = (data:any) => {
    if(!data) return [];
    let totalAmount : number[] = [];
    let keywordName = "";
    const returnData : StackChartDataset[] = [];
    const color = colorType === "engagementType" ? EngagementTypeColors : colorType === "bullyDashboard" ? BullyDashboardColors : GraphicColors
    const total = data?.value || data?.data || [];

    for(let i = 0 ; i<total?.length; i++) {
      totalAmount = []

      for(let j=0; j<total[i]?.data?.length ; j++ ) {
        totalAmount.push(total[i]?.data[j]);
      } 
      
      keywordName = total[i]?.keyword_name;
      const chartDataset : StackChartDataset  = {
        fill: false,
        tension: 0.2,
        pointRadius: 4,
        label: keywordName,
        pointHoverRadius: 5,
        pointStyle: 'circle',
        borderColor: color[i],
        backgroundColor: color[i],
        pointHoverBorderWidth: 5,
        pointHoverBorderColor: white,
        pointBorderColor: 'transparent',
        pointHoverBackgroundColor: color[i],
        data: totalAmount
      }
  
      returnData.push(chartDataset);
    }

    return returnData;
  
  }

    useEffect(() => {
        if(filterData) {
        const dailyMessageData = filterData;
        if(dailyMessageData) {
            const labels = chartLabel(dailyMessageData);
            setLabel(labels);
            
            const dataSets = chartDatasets(dailyMessageData);
            setDataset(dataSets);

            if (!dailyMessageData?.value) {
              setShowNoDataText(true)
            } else {
              setShowNoDataText(false)
            }
        }
        }
    },[filterData]);

    const data = {
        labels: label || [],
        datasets: dataset
    }

    return (
      <Card>
        <span style={{ display: 'flex', justifyContent: 'flex-start' }}>
          <CardHeader
            title={getTitle(type, chartTitle)}
            titleTypographyProps={{ variant: 'h6' }}
            subheaderTypographyProps={{ variant: 'caption' }}
          />
          <StyledTooltip arrow title={chartId || ""}>
              <Information style={{marginTop: '22px', fontSize: '29px'}} />
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
          <DailyMessageDetail 
            show={showDetail}
            setShow={setShowDetail}
            current={current}
            keywordId={keywordId}
            setKeywordId={setKeywordId}
         />
        
      </CardContent>
    </Card>
    )
}

export default MessagesByDay