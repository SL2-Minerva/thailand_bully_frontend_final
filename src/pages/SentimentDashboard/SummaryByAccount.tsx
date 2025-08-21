// import { Grid, Button, LinearProgress, Typography, Paper } from '@mui/material'
import { LinearProgress, Typography, Paper } from '@mui/material'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import { StyledTooltip } from '../dashboard/overall'
import { Information } from 'mdi-material-ui'
import { useEffect } from 'react'
import { changeToFixedValue, renderProgress } from './SummaryByKeywords'
import { DataGrid, GridColDef } from '@mui/x-data-grid'
import Translations from 'src/layouts/components/Translations'

const SummaryByAccount = ({
  resultSummaryByAccount,
  total,
  loadingSummaryByAccount,

  // topAccount,
  // setTopAccount
}: {
  params: any
  chartId: string
  highlight: boolean
  resultSummaryByAccount: any
  total: number
  loadingSummaryByAccount: boolean
  topAccount: string
  setTopAccount: any
}) => {
  // const [page, setPage] = useState(0);
  // const [pageCount, setPageCount] = useState<number>(0);

  // const handleTopAccounts = (data: string) => {
  //   setTopAccount(data)
  // }

  // const handleChangePagination = (event: React.ChangeEvent<unknown>, value: number) => {
  //     setPage(value-1);
  // };

  useEffect(() => {
    if (total > 0) {
      // setPageCount(Math.ceil(total / 10));
    }
  }, [total])

  // const reportNo = '5.2.017'

  const columns: GridColDef[] = [
    { field: 'infulencer', headerName: 'Influencer', flex: 1, sortable: false },
    {
      field: 'sentiment_score',
      headerName: 'Sentiment Score ',
      flex: 1,
      renderCell: changeToFixedValue,
      align: 'center',
      headerAlign: 'center'
    },
    {
      field: 'positive',
      headerName: ' Positive',
      flex: 1,
      renderCell: renderProgress,
      align: 'center',
      headerAlign: 'center'
    },
    {
      field: 'neutral',
      headerName: ' Neutral',
      flex: 1,
      renderCell: renderProgress,
      align: 'center',
      headerAlign: 'center'
    },
    {
      field: 'negative',
      headerName: ' Negative',
      flex: 1,
      renderCell: renderProgress,
      align: 'center',
      headerAlign: 'center'
    }
  ]

  return (
    <Paper sx={{ border: `3px solid #fff`, borderRadius: 1 }}>
      {loadingSummaryByAccount && <LinearProgress style={{ width: '100%' }} />}
      <span style={{ display: 'flex', justifyContent: 'flex-start' }}>
        <CardHeader
        
          title={<Translations text='Summary Sentiment Score by Account' />}
          
          // title={<Translations text='Top 10 Sentiment Score by Account' />}
          titleTypographyProps={{ variant: 'h6' }}
        />
        <StyledTooltip
          arrow
          title={
            <span>
              <Typography variant='h6' sx={{ color: 'white' }}>
                <Translations text='sentimentChart15Title' />
              </Typography>
              <Typography variant='body2' sx={{ color: 'white' }}>
                <Translations text='sentimentChart15Description' />
              </Typography>
            </span>
          }
        >
          <Information style={{ marginTop: '22px', fontSize: '29px' }} />
        </StyledTooltip>
      </span>
      <CardContent>
        {/* <Grid container spacing={3} mt={2} mb={3}>
          <Grid item xs={12} md={12} sx={{ display: 'flex', justifyContent: 'end' }}>
            <span style={{ marginTop: '7px', marginRight: '20px', fontSize: '20px' }}> Select </span>
            <Button
              variant='contained'
              color={topAccount === 'top10' ? 'warning' : 'inherit'}
              size='medium'
              sx={{ marginRight: '20px' }}
              onClick={() => {
                handleTopAccounts('top10')
              }}
            >
              <span style={{ color: topAccount === 'top10' ? 'white' : '#626376' }}>Top 10</span>
            </Button>
            <Button
              variant='contained'
              color={topAccount === 'top20' ? 'warning' : 'inherit'}
              size='medium'
              sx={{ marginRight: '20px' }}
              onClick={() => {
                handleTopAccounts('top20')
              }}
            >
              <span style={{ color: topAccount === 'top20' ? 'white' : '#626376' }}>Top 20</span>
            </Button>
            <Button
              variant='contained'
              color={topAccount === 'top50' ? 'warning' : 'inherit'}
              size='medium'
              sx={{ marginRight: '20px' }}
              onClick={() => {
                handleTopAccounts('top50')
              }}
            >
              <span style={{ color: topAccount === 'top50' ? 'white' : '#626376' }}>Top 50</span>
            </Button>
            <Button
              variant='contained'
              color={topAccount === 'top100' ? 'warning' : 'inherit'}
              size='medium'
              sx={{ marginRight: '20px' }}
              onClick={() => {
                handleTopAccounts('top100')
              }}
            >
              <span style={{ color: topAccount === 'top100' ? 'white' : '#626376' }}>Top 100</span>
            </Button>
            <Button
              variant='contained'
              color={topAccount === 'all' ? 'warning' : 'inherit'}
              size='medium'
              sx={{ marginRight: '20px' }}
              onClick={() => {
                handleTopAccounts('all')
              }}
            >
              <span style={{ color: topAccount === 'all' ? 'white' : '#626376' }}>ALL</span>{' '}
            </Button>
          </Grid>
        </Grid> */}

        {resultSummaryByAccount ? (
          <DataGrid
            autoHeight
            hideFooter
            
            // rows={resultSummaryByAccount}
            rows={resultSummaryByAccount.slice(0, 10)}
            columns={columns}
            pageSize={10}
            rowsPerPageOptions={[10]}
            getRowId={row => row.id}
          />
        ) : (
          'There is no data'
        )}
      </CardContent>
    </Paper>
  )
}

export default SummaryByAccount
