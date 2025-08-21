import {
  Paper,
  Table,
  TableRow,
  TableHead,
  TableCell,
  TableContainer,
  TableBody,
  LinearProgress,
  Typography
} from '@mui/material'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import { StyledTooltip } from './overall'
import { Information } from 'mdi-material-ui'
import Translations from 'src/layouts/components/Translations'
import { tableCellStyle } from './TopSiteList'
import { useSettings } from 'src/@core/hooks/useSettings'

// import { useState } from "react";
// import DailyMessageDetail from "./DailyMessageDetail";

interface Props {
  params: any
  chartId: string
  resultTopKeywords: any
  loadingTopKeywords: boolean
}

const TopHashtagList = ({ resultTopKeywords, loadingTopKeywords }: Props) => {
  // const reportNo = '1.2.015'
  const { settings } = useSettings()

  return (
    <Paper sx={{ maxHeight: 360, minHeight: 360, border: `3px solid #fff`, borderRadius: 1 }} >
      {loadingTopKeywords && <LinearProgress style={{ width: '100%' }} />}
      <span style={{ display: 'flex', justifyContent: 'flex-start' }}>
        <CardHeader title={<Translations text='Top Hashtag' />} titleTypographyProps={{ variant: 'h6' }} />
        <StyledTooltip
          arrow
          title={
            <span>
              <Typography variant='h6' sx={{ color: 'white' }}>
                <Translations text='overallChart9Title' />
              </Typography>
              <Typography variant='body2' sx={{ color: 'white' }}>
                <Translations text='overallChart9Description' />
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
                <TableCell variant='head' align='center'>
                  {' '}
                  No. of Messages{' '}
                </TableCell>
                <TableCell variant='head' align='center'>
                  {' '}
                  %{' '}
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {(resultTopKeywords?.top_hastag || [])?.map((hashtag: any, index: any) => {
                return (
                  <TableRow
                    key={index}
                    onClick={() => {
                      //   setShowDetail(true)
                      //   setKeywordId(hashtag?.keyword_id)
                    }}
                  >
                    <TableCell sx={tableCellStyle}>{hashtag?.hashtag}</TableCell>
                    <TableCell width='40%' align='center'>
                      {hashtag?.no_of_message?.toLocaleString('en-US')}
                    </TableCell>
                    <TableCell width='30%' align='center'>
                      {hashtag?.percentage && hashtag?.percentage?.toFixed(2)}
                    </TableCell>
                  </TableRow>
                )
              })}

              {!resultTopKeywords?.top_hastag || resultTopKeywords?.top_hastag?.length == 0 ? (
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
        {/* {
                        params?.campaign ? 
                        <DailyMessageDetail 
                            show={showDetail}
                            setShow={setShowDetail}
                            params={params}
                            keywordId={keywordId}
                            setKeywordId = {setKeywordId}
                            reportNo = {reportNo}
                            title = "Top Hashtag: Messages Transaction"
                            networkTitle="Top Hashtag: Social Network Analysis"
                        /> : ""
                    } */}
      </CardContent>
    </Paper>
  )
}

export default TopHashtagList
