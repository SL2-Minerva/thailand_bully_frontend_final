import {
  Table,
  TableRow,
  TableHead,
  TableCell,
  TableBody,
  TableContainer,
  LinearProgress,
  Typography,
  Paper
} from '@mui/material'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import { StyledTooltip } from './overall'
import { Information } from 'mdi-material-ui'
import { GetKeyWords } from 'src/services/api/dashboards/overall/overallDashboardApi'
import Translations from 'src/layouts/components/Translations'
import { useSettings } from 'src/@core/hooks/useSettings'

const cellStyle = {
  width: 250,
  maxWidth: 250,
  whiteSpace: 'normal',
  wordWrap: 'break-word',
  borderStyle: 'border-box',
  backgroundColor: 'lightslategrey !important',
  color: 'white'
}

const KeywordTable = ({ apiParams }: { apiParams: any; chartId: string }) => {

  const { resultKeywords, loadingFilterData } = GetKeyWords(apiParams)
  const { settings } = useSettings()

  // const reportNo = '1.1.008'


  return (
    <Paper sx={{ border: `3px solid #fff`, borderRadius: 1 }} >
      {loadingFilterData && <LinearProgress style={{ width: '100%' }} />}
      <span style={{ display: 'flex', justifyContent: 'flex-start' }}>
        <CardHeader title={<Translations text='Keyword Summary' />} titleTypographyProps={{ variant: 'h6' }} />
        <StyledTooltip
          arrow
          title={
            <span>
              <Typography variant='h6' sx={{ color: 'white' }}>
                <Translations text='overallChart6Title' />
              </Typography>
              <Typography variant='body2' sx={{ color: 'white' }}>
                <Translations text='overallChart6Description' />
              </Typography>
            </span>
          }
        >
          <Information style={{ marginTop: '22px', fontSize: '29px' }} />
        </StyledTooltip>
      </span>
      <CardContent>
        <TableContainer sx={{ maxHeight: 250 }}>
          <Table size='small' stickyHeader={true}>
            <TableHead sx={{ backgroundColor: 'lightgrey !important' }}>
              <TableRow>
                <TableCell variant='head' style={{ backgroundColor: settings.mode === 'light' ? 'white' : '#30334e' }}>
                  {' '}
                </TableCell>
                <TableCell variant='head' align='center'> Message </TableCell>
                <TableCell variant='head' align='center'> Engagement </TableCell>
                <TableCell variant='head' align='center'> Accounts </TableCell>
                <TableCell variant='head' align='center'> Average message per day </TableCell>
                <TableCell variant='head' align='center'> Average Engagement per day </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {(resultKeywords || [])?.map((keyword: any, index: any) => {
                return (
                  <TableRow key={index}>
                    <TableCell sx={cellStyle}>
                      <b>{keyword.keyword}</b>
                    </TableCell>
                    <TableCell sx={{ textAlign: 'center' }}>{keyword.message}</TableCell>
                    <TableCell sx={{ textAlign: 'center' }}>{keyword.engagement}</TableCell>
                    <TableCell sx={{ textAlign: 'center' }}>{keyword.accounts}</TableCell>
                    <TableCell sx={{ textAlign: 'center' }}>{keyword.average_message}</TableCell>
                    <TableCell sx={{ textAlign: 'center' }}>{keyword.average_engagement}</TableCell>
                  </TableRow>
                )
              })}

              {!resultKeywords || resultKeywords.length == 0 ? (
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

export default KeywordTable
