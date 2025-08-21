import {
  LinearProgress,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Paper
} from '@mui/material'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import { StyledTooltip } from './overall'
import { Information } from 'mdi-material-ui'
import Translations from 'src/layouts/components/Translations'

const TotalMessageLists = ({
  resultWordClouds,
  loadingWordClouds,
  total,
  topKeyword
}: {
  params: any
  chartId: string
  resultWordClouds: any
  loadingWordClouds: boolean
  total: number
  topKeyword: string
}) => {
  const selectedKeyword =
    topKeyword === 'top10'
      ? 'Top 10'
      : topKeyword === 'top20'
      ? 'Top 20'
      : topKeyword === 'top50'
      ? 'Top 50'
      : topKeyword === 'top100'
      ? 'Top 100'
      : 'All'

  return (
    <Paper style={{ border: `3px solid #fff`, borderRadius: 7, maxHeight: 470, minHeight: 470 }}>
      {loadingWordClouds && <LinearProgress style={{ width: '100%' }} />}
      <span style={{ display: 'flex', justifyContent: 'flex-start' }}>
        <CardHeader
          titleTypographyProps={{ variant: 'h6' }}
          title={selectedKeyword + ' Match: Popular Words'}

          // title={<Translations text='Top 10 Match: Popular Words' />}
        />
        <StyledTooltip
          arrow
          title={
            <span>
              <Typography variant='h6' sx={{ color: 'white' }}>
                <Translations text='wordCloudChart2Title' />
              </Typography>
              <Typography variant='body2' sx={{ color: 'white' }}>
                <Translations text='wordCloudChart2Description' />
              </Typography>
            </span>
          }
        >
          <Information style={{ marginTop: '22px', fontSize: '29px' }} />
        </StyledTooltip>
      </span>
      <Typography variant='h5' sx={{ ml: 5 }}>
        {' '}
        <Translations text='Popular Word Total' /> : {total}
      </Typography>
      <CardContent>
        <TableContainer sx={{ maxHeight: 320, p: 2, pt: 0 }}>
          <Table size='small'>
            <TableHead sx={{ backgroundColor: 'lightgrey !important' }}>
              <TableRow>
                <TableCell variant='head' align='center'>
                  <span style={{ color: '#626376' }}>No.</span>
                </TableCell>
                <TableCell variant='head' align='center'>
                  <span style={{ color: '#626376' }}>
                    <Translations text='Popular Word' />
                  </span>
                </TableCell>
                <TableCell variant='head' align='center'>
                  <span style={{ color: '#626376' }}>
                    <Translations text='Amount' />
                  </span>
                </TableCell>
                <TableCell variant='head' align='center'>
                  <span style={{ color: '#626376' }}>%</span>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {(resultWordClouds?.word_clouds_table || [])?.map((keyword: any, index: any) => {
                return (
                  <TableRow key={index}>
                    <TableCell sx={{ backgroundColor: '#d3d3d338 !important' }} align='center'>
                      {/* <b>{index + 1 + page * 7}</b> */}
                      <b>{index + 1}</b>
                    </TableCell>
                    <TableCell align='center'>
                      <span style={{ fontWeight: 'bold' }}>{keyword.keyword}</span>
                    </TableCell>
                    <TableCell align='center'>{keyword.total}</TableCell>
                    <TableCell align='center'>{keyword.percent} %</TableCell>
                  </TableRow>
                )
              })}
              {!resultWordClouds?.word_clouds_table || resultWordClouds?.word_clouds_table?.length == 0 ? (
                <TableRow>
                  <TableCell colSpan={6} sx={{ textAlign: 'center' }}>
                    <Translations text='no data' />
                  </TableCell>
                </TableRow>
              ) : (
                ''
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </CardContent>
    </Paper>
  )
}

export default TotalMessageLists
