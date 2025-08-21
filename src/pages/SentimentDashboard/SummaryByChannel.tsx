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

const SummaryByChannel = ({
  resultSummaryByChannel,
  total,
  loadingSummaryByChannel,

  // topChannel,
  // setTopChannel
}: {
  params: any
  chartId: string
  highlight: boolean
  resultSummaryByChannel: any
  total: number
  loadingSummaryByChannel: boolean
  topChannel: string
  setTopChannel: any
}) => {
  // const [page, setPage] = useState(0);
  // const [pageCount, setPageCount] = useState<number>(0);
  // const handleTopChannels = (data: string) => {
  //   setTopChannel(data)
  // }

  // const handleChangePagination = (event: React.ChangeEvent<unknown>, value: number) => {
  //     setPage(value-1);
  // };

  useEffect(() => {
    if (total > 0) {
      // setPageCount(Math.ceil(total / 10));
    }
  }, [total])

  // const reportNo = '5.2.018'

  const columns: GridColDef[] = [
    { field: 'channel', headerName: 'Channel', flex: 1, sortable: false, align: 'center', headerAlign: 'center' },
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
      {loadingSummaryByChannel && <LinearProgress style={{ width: '100%' }} />}
      <span style={{ display: 'flex', justifyContent: 'flex-start' }}>
        <CardHeader
          title={<Translations text='Summary Sentiment Score by Channel' />}
          titleTypographyProps={{ variant: 'h6' }}
        />
        <StyledTooltip
          arrow
          title={
            <span>
              <Typography variant='h6' sx={{ color: 'white' }}>
                <Translations text='sentimentChart16Title' />
              </Typography>
              <Typography variant='body2' sx={{ color: 'white' }}>
                <Translations text='sentimentChart16Description' />
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
              color={topChannel === 'top10' ? 'warning' : 'inherit'}
              size='medium'
              sx={{ marginRight: '20px' }}
              onClick={() => {
                handleTopChannels('top10')
              }}
            >
              <span style={{ color: topChannel === 'top10' ? 'white' : '#626376' }}>Top 10</span>
            </Button>
            <Button
              variant='contained'
              color={topChannel === 'top20' ? 'warning' : 'inherit'}
              size='medium'
              sx={{ marginRight: '20px' }}
              onClick={() => {
                handleTopChannels('top20')
              }}
            >
              <span style={{ color: topChannel === 'top20' ? 'white' : '#626376' }}>Top 20</span>
            </Button>
            <Button
              variant='contained'
              color={topChannel === 'top50' ? 'warning' : 'inherit'}
              size='medium'
              sx={{ marginRight: '20px' }}
              onClick={() => {
                handleTopChannels('top50')
              }}
            >
              <span style={{ color: topChannel === 'top50' ? 'white' : '#626376' }}>Top 50</span>
            </Button>
            <Button
              variant='contained'
              color={topChannel === 'top100' ? 'warning' : 'inherit'}
              size='medium'
              sx={{ marginRight: '20px' }}
              onClick={() => {
                handleTopChannels('top100')
              }}
            >
              <span style={{ color: topChannel === 'top100' ? 'white' : '#626376' }}>Top 100</span>
            </Button>
            <Button
              variant='contained'
              color={topChannel === 'all' ? 'warning' : 'inherit'}
              size='medium'
              sx={{ marginRight: '20px' }}
              onClick={() => {
                handleTopChannels('all')
              }}
            >
              <span style={{ color: topChannel === 'top10' ? 'white' : '#626376' }}>ALL</span>
            </Button>
          </Grid>
        </Grid> */}
        {/* <TableContainer sx={{ maxHeight: 500 }}>
            <Table size="small" stickyHeader={true}>
                    <TableHead style={{ backgroundColor: "green"}}>
                        <TableRow>
                            <TableCell variant="head"> Channel </TableCell>
                            <TableCell variant="head"> Sentiment Score </TableCell>
                            <TableCell variant="head"> Positive </TableCell>
                            <TableCell variant="head"> Neutral </TableCell>
                            <TableCell variant="head"> Negative </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            (resultSummaryByChannel||[])?.map((summary: any, index:any) => {
                                return(
                                    <TableRow key={index}>
                                        <TableCell><b>{summary.channel}</b></TableCell>
                                        <TableCell>{summary.sentiment_score}</TableCell>
                                        <TableCell>
                                            <LinearProgressBar value={summary.positive} />
                                        </TableCell>
                                        <TableCell>
                                            <LinearProgressBar value={summary.neutral} />
                                        </TableCell>
                                        <TableCell>
                                             <LinearProgressBar value= {summary.negative} />
                                        </TableCell>
                                    </TableRow>
                                )
                            })
                        }
                    </TableBody>
                    
            </Table>
            </TableContainer>
            <Box sx={{ mt: 4, display: 'flex', justifyContent: 'center'}}> 
                {
                    total > 0 ? 
                    <Pagination count={pageCount} page={page+1} onChange={handleChangePagination} variant='outlined' color='primary'/>
                    : ""
                }
            </Box> */}
        {resultSummaryByChannel ? (
          <DataGrid
            autoHeight
            rows={resultSummaryByChannel}
            columns={columns}
            pageSize={10}
            rowsPerPageOptions={[10]}
            getRowId={row => row.id}
          />
        ) : (
          ''
        )}
      </CardContent>
    </Paper>
  )
}

export default SummaryByChannel
