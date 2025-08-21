// ** MUI Imports
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import { Grid, LinearProgress } from "@mui/material"

// ** Third Party Imports
import { Bar } from 'react-chartjs-2'
import { StyledTooltip } from 'src/pages/dashboard/overall' 
import { Information } from 'mdi-material-ui'
import { GetChannelSentimentLevel } from 'src/services/api/dashboards/channel/ChannelDashboardApi'
import Translations from 'src/layouts/components/Translations'

const ChartLabels = (data: any) => {
  if (!data) return [];
  const keywordData = data;

  const labels : any[] = [];

  for (let i = 0; i<keywordData?.length ; i ++) {
    labels.push(keywordData[i].keyword_name)
  }
  
  return labels;
}

const ChartData = (data: any ) => {
  if (!data) return [];

  const chartDatas : any[] = [];
  for (let i = 0; i<data?.length ; i ++) {
    chartDatas.push(data[i]?.total_value)
  }
  
  return chartDatas;
}

const ChannelBySentiment  = ({params, chartId, highlight} : {params: any, chartId: string, highlight : boolean}) => {
  const { resultChannelSentimentLevel, loadingChannelSentimentLevel } = GetChannelSentimentLevel(params?.campaign, params?.date, params?.endDate, params?.period, params?.keywordIds, params?.previousDate, params?.previousEndDate);

  const labels = resultChannelSentimentLevel ? ChartLabels(resultChannelSentimentLevel) : [];
  const data = {
  labels: labels,
  datasets: [{
      axis: 'y',
      label: '',
      data: ChartData(resultChannelSentimentLevel),
      fill: false,
      backgroundColor: ['rgb(54, 162, 235)'],
      borderColor: [
      'rgb(54, 162, 235)'
      ],
      borderWidth: 1
  }]
  };  

  const reportNo = '3.2.015';

  const chartTitle = chartId + ", Report Level 2(" + reportNo + ")";

  return (
    <Card>
      {loadingChannelSentimentLevel && (
        <LinearProgress
            style={{ width: "100%" }}
        />
        )}
        <span style={{ display: 'flex', justifyContent: 'flex-start' }}>
          <CardHeader
            title={<Translations text='Daily Messages By Sentiment' />}
            titleTypographyProps={{ variant: 'h6',color: highlight ? 'green' : '#4c4e64de' }}
          />
          <StyledTooltip arrow title={chartTitle || ""}>
              <Information style={{marginTop: '22px', fontSize: '29px',color: highlight ? 'green' : '#4c4e64de'}} />
          </StyledTooltip>
        </span>
      <CardContent>
        <Grid container spacing={3}>
            <Bar data={data} options={{ indexAxis: 'y' }} height={140}/>
        </Grid>
        
      </CardContent>
    </Card>
  )
}

export default ChannelBySentiment
