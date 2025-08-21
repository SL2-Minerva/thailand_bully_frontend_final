import { Table, Paper, TableRow, TableHead, TableCell, TableContainer, TableBody, LinearProgress, Typography } from '@mui/material'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import { useState } from 'react'

// import DailyMessageDetail from './DailyMessageDetail'
import { StyledTooltip } from './overall'
import { Information } from 'mdi-material-ui'
import Translations from 'src/layouts/components/Translations'
import { tableCellStyle } from './TopSiteList'
import { useSettings } from 'src/@core/hooks/useSettings'

interface Props {
  params: any
  chartId: string
  resultTopKeywords: any
  loadingTopKeywords: boolean
}

// const MainKeyWordTable = ({ params, resultTopKeywords, loadingTopKeywords }: Props) => {

const MainKeyWordTable = ({ resultTopKeywords, loadingTopKeywords }: Props) => {
  // const [showDetail, setShowDetail] = useState<boolean>(false)
  // const [keywordId, setKeywordId] = useState<number>()
  const [, setShowDetail] = useState<boolean>(false)
  const [, setKeywordId] = useState<number>()
  const { settings } = useSettings()

  // const reportNo = '1.2.009'

  return (
    <Paper sx={{ maxHeight: 360, minHeight: 360,border: `3px solid #fff`, borderRadius: 1 }} >
      {loadingTopKeywords && <LinearProgress style={{ width: '100%' }} />}
      <span style={{ display: 'flex', justifyContent: 'flex-start' }}>
        <CardHeader title={<Translations text='Main Keyword' />} titleTypographyProps={{ variant: 'h6' }} />
        <StyledTooltip
          arrow
          title={
            <span>
                <Typography variant='h6' sx={{ color: 'white' }}>
                  <Translations text='overallChart7Title' />
                </Typography>
                <Typography variant='body2' sx={{ color: 'white' }}>
                  <Translations text='overallChart7Description' />
                </Typography>
              </span>
          }
        >
          <Information style={{ marginTop: '22px', fontSize: '29px' }} />
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
              {(resultTopKeywords?.main_keyword || [])?.map((keyword: any, index: any) => {
                return (
                  <TableRow
                  
                    // style={{ cursor: 'pointer' }}
                    key={index}
                    onClick={() => {
                      setShowDetail(true)
                      setKeywordId(keyword?.keyword_id)
                    }}
                  >
                    <TableCell sx={tableCellStyle}>{keyword?.keyword}</TableCell>
                    <TableCell  align='center'>{keyword?.no_of_message}</TableCell>
                    <TableCell  align='center'>{keyword?.percentage}</TableCell>
                  </TableRow>
                )
              })}

              {!resultTopKeywords?.main_keyword || resultTopKeywords?.main_keyword?.length == 0 ? (
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

        {/* {params?.campaign && showDetail ? (
          <DailyMessageDetail
            show={showDetail}
            setShow={setShowDetail}
            params={params}
            keywordId={keywordId}
            setKeywordId={setKeywordId}
            reportNo={reportNo}
            title='Main Keyword: Message Transactions'
            networkTitle='Main Keyword: Social Network Analysis'
          />
        ) : (
          ''
        )} */}
      </CardContent>
    </Paper>
  )
}

export default MainKeyWordTable
