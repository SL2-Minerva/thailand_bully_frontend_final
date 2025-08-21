import {
  Table,
  TableRow,
  TableHead,
  TableCell,
  TableContainer,
  TableBody,
  LinearProgress,
  Typography,
  Paper
} from '@mui/material'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import { StyledTooltip } from './overall'
import { Information } from 'mdi-material-ui'
import Translations from 'src/layouts/components/Translations'
import { useSettings } from 'src/@core/hooks/useSettings'

// import { useState } from 'react'
// import DailyMessageDetail from './DailyMessageDetail'

interface Props {
  params: any
  chartId: string
  resultTopKeywords: any
  loadingTopKeywords: boolean
}

export const tableCellStyle = {
  width: 200,
  maxWidth: 200,
  whiteSpace: 'normal',
  wordWrap: 'break-word',
  borderStyle: 'border-box',
  backgroundColor: 'lightslategrey !important',
  color: 'white'

  // overflow: "hidden",
  // textOverflow: "ellipsis",
}

const TopSiteList = ({ resultTopKeywords, loadingTopKeywords }: Props) => {
  
  // const reportNo = '1.2.012'
  const { settings } = useSettings()

  return (
    <Paper sx={{ maxHeight: 360, minHeight: 360, border: `3px solid #fff`, borderRadius: 1 }} >
      {loadingTopKeywords && <LinearProgress style={{ width: '100%' }} />}
      <span style={{ display: 'flex', justifyContent: 'flex-start' }}>
        <CardHeader title={<Translations text='Top Sites' />} titleTypographyProps={{ variant: 'h6' }} />
        <StyledTooltip
          arrow
          title={
            <span>
              <Typography variant='h6' sx={{ color: 'white' }}>
                <Translations text='overallChart8Title' />
              </Typography>
              <Typography variant='body2' sx={{ color: 'white' }}>
                <Translations text='overallChart8Description' />
              </Typography>
            </span>
          }
        >
          <Information style={{ marginTop: '21px', fontSize: '29px' }} />
        </StyledTooltip>
      </span>
      <CardContent>
        <TableContainer sx={{ maxHeight: 250, minHeight: 250 }}>
          <Table stickyHeader={true} size='small'>
            <TableHead sx={{ backgroundColor: 'lightgrey !important' }}>
              <TableRow>
                <TableCell variant='head' sx={{ backgroundColor: settings.mode === 'light' ? 'white' : '#30334e' }}>
                  {' '}
                </TableCell>
                <TableCell variant='head'  align='center'> No. of Messages </TableCell>
                <TableCell variant='head'  align='center'> % </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {(resultTopKeywords?.top_sites || [])?.map((topsite: any, index: any) => {
                return (
                  <TableRow
                    key={index}
                    onClick={() => {
                      // setShowDetail(true)
                      // setKeywordId(topsite?.keyword_id)
                    }}

                    // style={{ cursor: 'pointer' }}
                  >
                    <TableCell sx={tableCellStyle}>{topsite?.site_domain}</TableCell>
                    <TableCell  align='center'>{topsite?.no_of_message?.toLocaleString('en-US')}</TableCell>
                    <TableCell  align='center'>{topsite?.percentage}</TableCell>
                  </TableRow>
                )
              })}
              {!resultTopKeywords?.top_sites || resultTopKeywords?.top_sites?.length == 0 ? (
                <TableRow>
                  <TableCell colSpan={3} sx={{ textAlign: 'center' }}>
                    <Translations text='no data' />
                  </TableCell>
                </TableRow>
              ) : (
                ''
              )}
            </TableBody>
          </Table>
        </TableContainer>
        {/* {params?.campaign ? (
          <DailyMessageDetail
            show={showDetail}
            setShow={setShowDetail}
            params={params}
            keywordId={keywordId}
            setKeywordId={setKeywordId}
            reportNo={reportNo}
            title='Top Site: Messages Transaction'
            networkTitle='Top Site: Social Network Analysis'
          />
        ) : (
          ''
        )} */}
      </CardContent>
    </Paper>
  )
}

export default TopSiteList
