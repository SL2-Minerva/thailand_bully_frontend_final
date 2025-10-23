// export const API_PATH = process.env.NEXT_PUBLIC_APP_ENV === 'localhost' ? 'http://127.0.0.1:8000/api' : 'http://202.44.231.31/api';

// import { color } from 'd3'

export const API_PATH =
  process.env.NEXT_PUBLIC_APP_ENV === 'localhost'
    ? 'https://api.socialguard.online/api'
    : 'https://api.socialguard.online/api'

// export const API_PATH =
//   process.env.NEXT_PUBLIC_APP_ENV === 'localhost' ? 'http://127.0.0.1:8000/api' : 'http://127.0.0.1:8000/api'

export const lineOptions = {
  responsive: true,
  backgroundColor: false,
  maintainAspectRatio: false,
  scales: {
    x: {
      ticks: { color: '#4c4e64de' },
      stacked: true
    },
    y: {
      min: 0,
      scaleLabel: { display: true },
      ticks: {
        stepSize: 100,
        color: '#4c4e64de'
      }
    }
  },
  plugins: {
    legend: {
      align: 'end',
      position: 'top',
      labels: {
        padding: 25,
        boxWidth: 10,
        color: '#4c4e64de',
        usePointStyle: true
      }
    }
  }
}

export const GraphicColors = [
  '#4472c4',
  '#ed7d31',
  '#a5a5a5',
  '#ffc000',
  '#5b9bd5',
  '#299b82',
  '#1640a1c4',
  '#d8df20',
  '#e02916',
  '#ffca25',
  '#C0D3DF',
  '#4f86b9',
  '#70ad47',
  '#c00000',
  '#c46627'
]

export const ChannelColors = [
  '#ed7d31',
  '#3b5998',
  '#e31010',
  '#d62976',
  '#F4B400',
  '#642c8c',
  '#3b5998',
  '#00aced',
  '#e31010',
  '#d62976',
  '#F4B400',
  '#642c8c',
  '#010101',
  '#1640a1c4',
  '#d8df20',
  '#e02916',
  '#ffca25',
  '#C0D3DF',
  '#4f86b9',
  '#70ad47',
  '#c00000',
  '#c46627'
]

export const ChannelColorCode = [
  {
    name: 'facebook',
    color: '#3b5998'
  },
  {
    name: 'google',
    color: '#F4B400'
  },
  {
    name: 'instagram',
    color: '#d62976'
  },
  {
    name: 'pantip',
    color: '#642c8c'
  },
  {
    name: 'sanook',
    color: '#c46627'
  },
  {
    name: 'tiktok',
    color: '#010101'
  },
  {
    name: 'x',
    color: '#00aced'
  },
  {
    name: 'youtube',
    color: '#e31010'
  }
]

export const EngagementTransChartColor = [
  '#ed7d31',
  '#ffc000',
  '#4f86b9',
  '#70ad47',
  '#c00000',
  '#4472c4',
  '#a5a5a5',
  '#5b9bd5',
  '#299b82',
  '#1640a1c4',
  '#d8df20',
  '#e02916',
  '#ffca25',
  '#C0D3DF'
]

export const EngagementTypeColors = [
  // '#c46627',
  // '#ed7d31',
  // '#f4b9a4',
  // '#dc6a5b',
  '#c46628',
  '#ee7d30',
  '#ff9a56',
  '#f4baa3',
  '#4472c4',
  '#a5a5a5',
  '#ffc000',
  '#5b9bd5',
  '#299b82',
  '#1640a1c4',
  '#d8df20',
  '#e02916',
  '#ffca25',
  '#C0D3DF'
]

export const PeriodComparisonChannel = [
  '#4472c4',
  '#8fa2d4',
  '#c46627',
  '#ed7d31',
  '#a5a5a5',
  '#ffc000',
  '#5b9bd5',
  '#299b82',
  '#1640a1c4',
  '#d8df20',
  '#e02916',
  '#ffca25',
  '#C0D3DF'
]

export const SentimentComparisonEngagment = [
  '#e2aa00',
  '#ffd184',
  '#4472c4',
  '#ed7d31',
  '#a5a5a5',
  '#ffc000',
  '#5b9bd5',
  '#299b82',
  '#1640a1c4',
  '#d8df20',
  '#e02916',
  '#ffca25',
  '#C0D3DF'
]

export const sentimentComparison = [
  '#62993e',
  '#a1c490',
  '#4472c4',
  '#ed7d31',
  '#a5a5a5',
  '#ffc000',
  '#5b9bd5',
  '#299b82',
  '#1640a1c4',
  '#d8df20',
  '#e02916',
  '#ffca25',
  '#C0D3DF'
]

export const BullyDashboardColors = [
  '#ed7d31',
  '#ffc000',
  '#70ad47',
  '#9e480e',
  '#997300',
  '#4472c4',
  '#a5a5a5',
  '#5b9bd5',
  '#299b82',
  '#1640a1c4',
  '#d8df20',
  '#e02916',
  '#ffca25',
  '#C0D3DF'
]

export const BullyLevelColors = [
  '#E1E1E1',
  '#B5362D',
  '#A81313',
  '#6F0000',
  '#EDF2F4',
  '#8D99AE',
  '#4C4B63',
  '#7A0010',
  '#F0F0F0',
  '#EFD4DC',
  '#EA638C',
  '#89023E',
  '#521130',
  '#34213E',
  '#ed7d31',
  '#ffc000',
  '#70ad47',
  '#9e480e',
  '#997300',
  '#4472c4',
  '#a5a5a5',
  '#5b9bd5',
  '#299b82',
  '#1640a1c4',
  '#d8df20',
  '#e02916',
  '#ffca25',
  '#C0D3DF'
]

export const BullyTypeColors = [
  '#F0F0F0',
  '#EFD4DC',
  '#EA638C',
  '#89023E',
  '#521130',
  '#34213E',
  '#ed7d31',
  '#ffc000',
  '#70ad47',
  '#9e480e',
  '#997300',
  '#4472c4',
  '#a5a5a5',
  '#5b9bd5',
  '#299b82',
  '#1640a1c4',
  '#d8df20',
  '#e02916',
  '#ffca25',
  '#C0D3DF'
]

export const SentimentColors = ['#C73E1D', '#FEB95F', '#63A375']

export const SentimentColorsCode = [
  {
    name: 'Negative',
    color: '#C73E1D'
  },
  {
    name: 'Neutral',
    color: '#FEB95F'
  },
  {
    name: 'Positive',
    color: '#63A375'
  }
]

export const SentimentAllColors = [
  '#C73E1D',
  '#FEB95F',
  '#63A375',
  '#F0F0F0',
  '#EFD4DC',
  '#EA638C',
  '#89023E',
  '#521130',
  '#34213E',
  '#EDF2F4',
  '#8D99AE',
  '#4C4B63',
  '#7A0010'
]

export const BullyTypeSummaryColors = [
  {
    name: 'all',
    color: '#FEB95F'
  },
  {
    name: 'NoBully',
    color: '#E1E1E1'
  },
  {
    name: 'Physical Bully',
    color: '#EF4444'
  },
  {
    name: 'Verbal Bullying',
    color: '#FF944A'
  },
  {
    name: 'Social Bullying',
    color: '#6EA5FF'
  },
  {
    name: 'Cyber Bullying',
    color: '#BA9DFE'
  }
]

export const BullyTypeColorCode = [
  {
    name: 'NoBully',
    color: '#E1E1E1'
  },
  {
    name: 'Physical Bully',
    color: '#EF4444'
  },
  {
    name: 'Verbal Bullying',
    color: '#FF944A'
  },
  {
    name: 'Social Bullying',
    color: '#6EA5FF'
  },
  {
    name: 'Cyber Bullying',
    color: '#BA9DFE'
  }
]

export const BullyLevelSummaryColors = [
  {
    name: 'all',
    color: '#FEB95F'
  },
  {
    name: 'Level 0',
    color: '#E1E1E1'
  },
  {
    name: 'Level 1',
    color: '#B5362D'
  },
  {
    name: 'Level 2',
    color: '#A81313'
  },
  {
    name: 'Level 3',
    color: '#6F0000'
  }
]

export const FacebookIcon = '/images/logos/facebook-round.png'
export const TwitterIcon = '/images/logos/x-black.jpg'
export const YoutubeIcon = '/images/logos/youtube-text.png'
export const InstagramIcon = '/images/logos/instagram.png'
export const PantipIcon = '/images/logos/pantip.png'
export const gitHubIcon = '/images/logos/github.png'
export const googleIcon = '/images/logos/google.png'
export const tiktokIcon = '/images/logos/tiktok.png'

export const ReportOptions = [
  {
    groupName: 'Overall Dashboard',
    title: 'Percentage of Messages',
    id: '1'
  },
  {
    groupName: 'Overall Dashboard',
    title: 'Daily Message',
    id: '2'
  },
  {
    groupName: 'Overall Dashboard',
    title: 'Total Message',
    id: '3'
  },
  {
    groupName: 'Overall Dashboard',
    title: 'Total Engagement',
    id: '4'
  },
  {
    groupName: 'Overall Dashboard',
    title: 'Total Account',
    id: '5'
  },
  {
    groupName: 'Overall Dashboard',
    title: 'Keywords',
    id: '6'
  },
  {
    groupName: 'Overall Dashboard',
    title: 'Main Keyword',
    id: '7'
  },
  {
    groupName: 'Overall Dashboard',
    title: 'Top Sites',
    id: '8'
  },
  {
    groupName: 'Overall Dashboard',
    title: 'Top Hashtag',
    id: '9'
  },
  {
    groupName: 'Overall Dashboard',
    title: 'Sentiment Score',
    id: '10'
  },
  {
    groupName: 'Overall Dashboard',
    title: 'Comment Sentiment',
    id: '11'
  },
  {
    groupName: 'Overall Dashboard',
    title: 'Sentiment Level',
    id: '12'
  },
  {
    groupName: 'Word Clouds',
    title: 'Word Clouds',
    id: '13'
  },
  {
    groupName: 'Word Clouds',
    title: 'Total Message(Word clouds)',
    id: '14'
  },
  {
    groupName: 'Word Clouds',
    title: 'Word Clouds(Platforms)',
    id: '15'
  },
  {
    groupName: 'Word Clouds',
    title: 'Accounts(Platforms)',
    id: '17'
  },
  {
    groupName: 'Word Clouds',
    title: 'Word Clouds(Sentiment)',
    id: '18'
  },
  {
    groupName: 'Word Clouds',
    title: 'Accounts(Sentiment)',
    id: '19'
  },
  {
    groupName: 'Voice Dashboard',
    title: 'Percentage of Message',
    id: '20'
  },
  {
    groupName: 'Voice Dashboard',
    title: 'Daily Messages',
    id: '21'
  },
  {
    groupName: 'Voice Dashboard',
    title: 'Message by Day',
    id: '22'
  },
  {
    groupName: 'Voice Dashboard',
    title: 'Message by Time',
    id: '23'
  },
  {
    groupName: 'Voice Dashboard',
    title: 'Message by Devices',
    id: '24'
  },
  {
    groupName: 'Voice Dashboard',
    title: 'Message by Account',
    id: '25'
  },
  {
    groupName: 'Voice Dashboard',
    title: 'Message by Channel',
    id: '26'
  },
  {
    groupName: 'Voice Dashboard',
    title: 'Message by Sentiment',
    id: '27'
  },
  {
    groupName: 'Voice Dashboard',
    title: 'Message by Bully Level',
    id: '28'
  },
  {
    groupName: 'Voice Dashboard',
    title: 'Message by Bully Type',
    id: '29'
  },
  {
    groupName: 'Voice Dashboard',
    title: 'Number of Accounts',
    id: '30'
  },
  {
    groupName: 'Voice Dashboard',
    title: 'Period over Period comparison(Messages)',
    id: '31'
  },
  {
    groupName: 'Voice Dashboard',
    title: 'Period over Period comparison(Accounts)',
    id: '32'
  },
  {
    groupName: 'Voice Dashboard',
    title: 'Day&Time Comparison',
    id: '33'
  },
  {
    groupName: 'Voice Dashboard',
    title: 'Day&Time by Sentiment',
    id: '34'
  },
  {
    groupName: 'Voice Dashboard',
    title: 'Day&Time by Bully Level',
    id: '35'
  },
  {
    groupName: 'Voice Dashboard',
    title: 'Day&Time by Bully Type',
    id: '36'
  },
  {
    groupName: 'Voice Dashboard',
    title: 'Period over Period comparison(Channel/Platforms)',
    id: '37'
  },
  {
    groupName: 'Voice Dashboard',
    title: 'Period over Period comparison(Devices)',
    id: '38'
  },
  {
    groupName: 'Voice Dashboard',
    title: 'Period over Period comparison(Channel vs Devices)',
    id: '39'
  },
  {
    groupName: 'Voice Dashboard',
    title: 'Percentage of Keyword Comparison By Channel',
    id: '40'
  },
  {
    groupName: 'Voice Dashboard',
    title: 'Percentage of Keyword Comparison By Sentiment',
    id: '41'
  },
  {
    groupName: 'Voice Dashboard',
    title: 'Percentage of Keyword Comparison By Bully Level',
    id: '42'
  },
  {
    groupName: 'Voice Dashboard',
    title: 'Percentage of Keyword Comparison By Bully Type',
    id: '43'
  },
  {
    groupName: 'Channel Dashboard',
    title: 'Percentage of Channel',
    id: '44'
  },
  {
    groupName: 'Channel Dashboard',
    title: 'Daily Channel',
    id: '45'
  },
  {
    groupName: 'Channel Dashboard',
    title: 'Channel by Day',
    id: '46'
  },
  {
    groupName: 'Channel Dashboard',
    title: 'Channel by Time',
    id: '47'
  },
  {
    groupName: 'Channel Dashboard',
    title: 'Channel by Devices',
    id: '48'
  },
  {
    groupName: 'Channel Dashboard',
    title: 'Channel by Account',
    id: '49'
  },
  {
    groupName: 'Channel Dashboard',
    title: 'Channel by Sentiment',
    id: '50'
  },
  {
    groupName: 'Channel Dashboard',
    title: 'Channel by Bully Level',
    id: '51'
  },
  {
    groupName: 'Channel Dashboard',
    title: 'Channel by Bully Type',
    id: '52'
  },
  {
    groupName: 'Channel Dashboard',
    title: 'Period over Period Comparison',
    id: '53'
  },
  {
    groupName: 'Channel Dashboard',
    title: 'Engagement Rate',
    id: '54'
  },
  {
    groupName: 'Channel Dashboard',
    title: 'Sentiment Score',
    id: '55'
  },
  {
    groupName: 'Channel Dashboard',
    title: 'Channel by Sentiment & Sentiment Level',
    id: '56'
  },
  {
    groupName: 'Engagement Dashboard',
    title: 'Percentage of Engagement Trans',
    id: '57'
  },
  {
    groupName: 'Engagement Dashboard',
    title: 'Daily Engagement',
    id: '58'
  },
  {
    groupName: 'Engagement Dashboard',
    title: 'Engagement by Day',
    id: '59'
  },
  {
    groupName: 'Engagement Dashboard',
    title: 'Engagement by Time',
    id: '60'
  },
  {
    groupName: 'Engagement Dashboard',
    title: 'Engagement by Devices',
    id: '61'
  },
  {
    groupName: 'Engagement Dashboard',
    title: 'Engagement by Account',
    id: '62'
  },
  {
    groupName: 'Engagement Dashboard',
    title: 'Engagement by Channel',
    id: '63'
  },
  {
    groupName: 'Engagement Dashboard',
    title: 'Engagement Trans by Engagement Type',
    id: '110'
  },
  {
    groupName: 'Engagement Dashboard',
    title: 'Percentage of Engagement Type ',
    id: '64'
  },
  {
    groupName: 'Engagement Dashboard',
    title: 'Daily Engagement Type',
    id: '65'
  },
  {
    groupName: 'Engagement Dashboard',
    title: 'Engangement Type By Day',
    id: '66'
  },
  {
    groupName: 'Engagement Dashboard',
    title: 'Engagement Type By Time',
    id: '67'
  },
  {
    groupName: 'Engagement Dashboard',
    title: 'Engagement Type By Devices',
    id: '68'
  },
  {
    groupName: 'Engagement Dashboard',
    title: 'Engagement Type By Account',
    id: '69'
  },
  {
    groupName: 'Engagement Dashboard',
    title: 'Engagement Type By Channel',
    id: '70'
  },
  {
    groupName: 'Engagement Dashboard',
    title: 'Total Engagement(Period over Period Comparison)',
    id: '71'
  },
  {
    groupName: 'Engagement Dashboard',
    title: 'Engagement Comparison by Channels',
    id: '72'
  },
  {
    groupName: 'Engagement Dashboard',
    title: 'Engagement Comparison by Sentiment',
    id: '73'
  },
  {
    groupName: 'Engagement Dashboard',
    title: 'Engagement Type Comparison',
    id: '74'
  },
  {
    groupName: 'Engagement Dashboard',
    title: 'Summary Engagement by Account',
    id: '75'
  },
  {
    groupName: 'Sentiment Dashboard',
    title: 'Daily Sentiment',
    id: '76'
  },
  {
    groupName: 'Sentiment Dashboard',
    title: 'Percentage of Sentiment',
    id: '77'
  },
  {
    groupName: 'Sentiment Dashboard',
    title: 'Sentiment by Day',
    id: '78'
  },
  {
    groupName: 'Sentiment Dashboard',
    title: 'Sentiment by Time',
    id: '79'
  },
  {
    groupName: 'Sentiment Dashboard',
    title: 'Sentiment by Devices',
    id: '80'
  },
  {
    groupName: 'Sentiment Dashboard',
    title: 'Sentiment by Account',
    id: '81'
  },
  {
    groupName: 'Sentiment Dashboard',
    title: 'Sentiment by Channel',
    id: '82'
  },
  {
    groupName: 'Sentiment Dashboard',
    title: 'Sentiment by Bully Level',
    id: '83'
  },
  {
    groupName: 'Sentiment Dashboard',
    title: 'Sentiment by Bully Type',
    id: '84'
  },
  {
    groupName: 'Sentiment Dashboard',
    title: 'Total Message',
    id: '85'
  },
  {
    groupName: 'Sentiment Dashboard',
    title: 'Engagement Comparison by Channel',
    id: '86'
  },
  {
    groupName: 'Sentiment Dashboard',
    title: 'Engagement Comparison by Engagement Type',
    id: '87'
  },
  {
    groupName: 'Sentiment Dashboard',
    title: 'Sentiment Score',
    id: '88'
  },
  {
    groupName: 'Sentiment Dashboard',
    title: 'Sentiment Type Comparison',
    id: '89'
  },
  {
    groupName: 'Sentiment Dashboard',
    title: 'Summary Sentiment Score by Account',
    id: '90'
  },
  {
    groupName: 'Sentiment Dashboard',
    title: 'Summary Sentiment Score by Channel',
    id: '91'
  },
  {
    groupName: 'Sentiment Dashboard',
    title: 'Sentiment Type by Keyword',
    id: '92'
  },
  {
    groupName: 'Bully Dashboard',
    title: 'Percentage of Bully Level',
    id: '93'
  },
  {
    groupName: 'Bully Dashboard',
    title: 'Daily Message of Bully Level',
    id: '94'
  },
  {
    groupName: 'Bully Dashboard',
    title: 'Bully Level By Day',
    id: '95'
  },
  {
    groupName: 'Bully Dashboard',
    title: 'Bully Level By Time',
    id: '96'
  },
  {
    groupName: 'Bully Dashboard',
    title: 'Bully Level By Devices',
    id: '97'
  },
  {
    groupName: 'Bully Dashboard',
    title: 'Bully Level by Account',
    id: '98'
  },
  {
    groupName: 'Bully Dashboard',
    title: 'Bully Level by Channel',
    id: '99'
  },
  {
    groupName: 'Bully Dashboard',
    title: 'Bully Level by Sentiment',
    id: '100'
  },
  {
    groupName: 'Bully Dashboard',
    title: 'Percentage of Bully Type',
    id: '101'
  },
  {
    groupName: 'Bully Dashboard',
    title: 'Daily Message of Bully Type',
    id: '102'
  },
  {
    groupName: 'Bully Dashboard',
    title: 'Bully Type By Day',
    id: '103'
  },
  {
    groupName: 'Bully Dashboard',
    title: 'Bully Type By Time',
    id: '104'
  },
  {
    groupName: 'Bully Dashboard',
    title: 'Bully Type By Devices',
    id: '105'
  },
  {
    groupName: 'Bully Dashboard',
    title: 'Bully Type by Account',
    id: '106'
  },
  {
    groupName: 'Bully Dashboard',
    title: 'Bully Type by Channel',
    id: '107'
  },
  {
    groupName: 'Bully Dashboard',
    title: 'Bully Type by Sentiment',
    id: '108'
  },
  {
    groupName: 'Bully Dashboard',
    title: 'Share of Channel',
    id: '109'
  }
]

export const TimeAxis = [
  '00',
  '01',
  '02',
  '03',
  '04',
  '05',
  '06',
  '07',
  '08',
  '09',
  '10',
  '11',
  '12',
  '13',
  '14',
  '15',
  '16',
  '17',
  '18',
  '19',
  '20',
  '21',
  '22',
  '23'
]
