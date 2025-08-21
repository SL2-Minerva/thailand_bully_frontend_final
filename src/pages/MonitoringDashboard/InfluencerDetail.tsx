import React, { forwardRef, ReactElement, Ref, useEffect, useState } from 'react'

import Fade, { FadeProps } from '@mui/material/Fade'
import {
  Box,
  Button,
  Card,
  Dialog,
  DialogContent,
  IconButton,
  LinearProgress,
  Pagination,
  Tooltip,
  Typography
} from '@mui/material'
import Close from 'mdi-material-ui/Close'
import { OpenInNew, DotsVertical, ArrowUp, ArrowDown, MicrosoftExcel, ImageOutline} from 'mdi-material-ui'
import Translations from 'src/layouts/components/Translations'
import moment from 'moment'
import { DataGrid } from '@mui/x-data-grid'
import { withStyles } from '@mui/styles'
import { styled } from '@mui/material/styles'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell, { tableCellClasses } from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import { GetInfluencerByAuthor } from 'src/services/api/dashboards/monitoring/MonitoringDashboard'
import DetailPostEgagement from './DetailPostEngagement'
import ImagePopupDialog from '../dashboard/ImagePopupDialog'

const Transition = forwardRef(function Transition(
  props: FadeProps & { children?: ReactElement<any, any> },
  ref: Ref<unknown>
) {
  return <Fade ref={ref} {...props} />
})

interface DialogInfoProps {
  show: boolean
  setShow: any
  action?: string
  current?: any
  table?: any
  params?: any
  keywordId?: any
  setKeywordId?: any
  reportNo?: any
  title?: any
  networkTitle?: any
  excelExport?: () => void
  sentimentType?: string
}

export const StyledDataGrid = withStyles({
  root: {
    '& .MuiDataGrid-row': {
      maxHeight: 'none !important',
      height: '90px',
      paddingTop: '15px',
      borderBottom: '1px solid #8080802e'
    },
    '&>.MuiDataGrid-main': {
      '&>.MuiDataGrid-columnHeaders': {
        borderBottom: 'none'
      },

      '& div div div div >.MuiDataGrid-cell': {
        borderBottom: 'none !important',
        minHeight: '70px !important'
      }
    }
  }
})(DataGrid)

export const initialSort = {
  message_type: '',
  author: '',
  post_time: '',
  scrapingtime: '',
  source: '',
  engagement: '',
  sentiment: '',
  bully_level: '',
  bully_type: '',
  account_name: '',
  keyword_name: ''
}

export const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: '#f6f7f7',
    color: theme.palette.common.black,
    '& .hidden-button': {
      display: 'none'
    },
    '&:hover .hidden-button': {
      display: 'flex',
      justifyContent: 'center'
    }
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14
  }
}))

export const StyledTableRow = styled(TableRow)(() => ({
  '&:last-child td, &:last-child th': {
    border: 0
  }
}))

const InfluencerDetail = (props: DialogInfoProps) => {
  const { show, setShow, params, keywordId, setKeywordId, title, excelExport, sentimentType } = props
  const [page, setPage] = useState(1)
  const [messageId, setMessageId] = useState<string>()
  const [pageCount, setPageCount] = useState<number>(0)
  const [data, setData] = useState<any>([])
  const [fieldName, setFieldName] = useState<string>('')
  const [sortSelect, setSortSelect] = useState('')
  const [sortColumns, setSortColumn] = useState<any>(initialSort)
  const [showDetail, setShowDetail] = useState<boolean>(false)
  const [showImagePopup, setShowImagePopup] = useState(false)
  const [imageUrl, setImageUrl] = useState('')  

  const { resultMessageDetail, totalMessage, loadingMessageDetail } = GetInfluencerByAuthor({
    campaign_id: params?.campaign_id || params?.campaign,
    source: params?.source || params.platformId,
    start_date: params?.start_date || params?.date,
    end_date: params?.end_date || params?.endDate,
    period: params?.period,
    filter_keywords: params?.filter_keywords,
    page: page,
    limit: 10,
    author: keywordId?.toString(),
    fieldName: fieldName,
    sortSelect: sortSelect,
    page_name: params?.page, 
    sentiment_type: sentimentType
  })

  const handleChangePagination = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value)
  }

  const onCloseDialog = () => {
    setShow(false)
    setPage(0)
    setPageCount(0)
    if (keywordId) {
      setKeywordId('')
      console.log(messageId)
    }
  }

  useEffect(() => {
    if (totalMessage > 0) {
      const count = Math.ceil(totalMessage / 10)
      setPageCount(count)
    }
  }, [totalMessage])

  useEffect(() => {
    if (loadingMessageDetail) {
      setData([])
    }
    if (!loadingMessageDetail && resultMessageDetail) {
      setData(resultMessageDetail)
    }
  }, [loadingMessageDetail])

  const cardTitle = title ? title : 'Post Detail By Influencer'

  const handleButtonSort = (field: string, sortName: string) => {
    setFieldName(field)
    setSortSelect(sortName)
    setSortColumn({ ...initialSort, [field]: sortName })
  }

  return (
    <Card>
      <Dialog
        fullWidth
        open={show}
        maxWidth='xl'
        scroll='body'
        onClose={onCloseDialog}
        TransitionComponent={Transition}
      >
        <DialogContent
          sx={{
            pb: 6,
            pt: { xs: 3, sm: 6 },
            position: 'relative'
          }}
        >
          <IconButton size='small' onClick={onCloseDialog} sx={{ position: 'absolute', right: '1rem', top: '1rem' }}>
            <Close />
          </IconButton>
          {loadingMessageDetail && <LinearProgress style={{ width: '100%' }} />}
          <Box sx={{ mb: 8 }}>
            <Typography variant='h5' sx={{ mb: 3, lineHeight: '2rem', textAlign: 'center' }}>
              <Translations text={cardTitle} />
              {excelExport ? (
                <Button
                  size='small'
                  variant='outlined'
                  color='secondary'
                  onClick={() => {
                    if (excelExport) {
                      excelExport()
                      onCloseDialog()
                    }
                  }}
                  sx={{ marginLeft: '20px' }}
                >
                  <MicrosoftExcel fontSize='medium' sx={{ mr: 2 }} />
                  Excel
                </Button>
              ) : (
                ''
              )}
            </Typography>
          </Box>

          <TableContainer component={Paper} sx={{ maxHeight: '640px' }}>
            <Table style={{ minWidth: '00px' }} aria-label='customized table' stickyHeader>
              <TableHead>
                <TableRow>
                  <StyledTableCell align='center'>No.</StyledTableCell>
                  <StyledTableCell
                    align='center'
                    onClick={() => {
                      const type =
                        sortColumns.keyword_name === '' ? 'asc' : sortColumns.keyword_name === 'asc' ? 'desc' : ''
                      handleButtonSort('keyword_name', type)
                    }}
                  >
                    <span style={{ display: 'flex', justifyContent: 'center' }}>
                      <span className='hidden-button' style={{ margin: 'auto', color: 'grey' }}>
                        {sortColumns.keyword_name === 'desc' ? (
                          <Tooltip title='Descending'>
                            <ArrowDown style={{ fontSize: '20px' }} />
                          </Tooltip>
                        ) : sortColumns.keyword_name === 'asc' ? (
                          <Tooltip title='Ascending'>
                            <ArrowUp style={{ fontSize: '20px' }} />
                          </Tooltip>
                        ) : (
                          <Tooltip title='unsort'>
                            <DotsVertical style={{ fontSize: '20px' }} />
                          </Tooltip>
                        )}
                      </span>
                      <span style={{ textAlign: 'center' }}>Keyword</span>
                    </span>
                  </StyledTableCell>
                  <StyledTableCell
                    align='center'
                    onClick={() => {
                      const type =
                        sortColumns.account_name === '' ? 'asc' : sortColumns.account_name === 'asc' ? 'desc' : ''
                      handleButtonSort('account_name', type)
                    }}
                  >
                    <span style={{ display: 'flex', justifyContent: 'center',minWidth: '110px'}}>
                      <span className='hidden-button' style={{ margin: 'auto', color: 'grey' }}>
                        {/* {sortColumns.account_name === 'desc' ? (
                          <Tooltip title='Descending'>
                            <ArrowDown style={{ fontSize: '20px' }} />
                          </Tooltip>
                        ) : sortColumns.account_name === 'asc' ? (
                          <Tooltip title='Ascending'>
                            <ArrowUp style={{ fontSize: '20px' }} />
                          </Tooltip>
                        ) : (
                          <Tooltip title='unsort'>
                            <DotsVertical style={{ fontSize: '20px' }} />
                          </Tooltip>
                        )} */}
                      </span>
                      <span style={{ textAlign: 'center' }}>Account Name</span>
                    </span>
                  </StyledTableCell>
                  <StyledTableCell align='left' sx={{ minWidth: '200px' }}>Message Detail</StyledTableCell>
                  <StyledTableCell
                    align='center'
                    onClick={() => {
                      const type =
                        sortColumns.message_type === '' ? 'asc' : sortColumns.message_type === 'asc' ? 'desc' : ''
                      handleButtonSort('message_type', type)
                    }}
                  >
                    <span style={{ display: 'flex', justifyContent: 'center',minWidth: '100px' }}>
                      <span className='hidden-button' style={{ margin: 'auto', color: 'grey' }}>
                        {/* {sortColumns.message_type === 'desc' ? (
                          <Tooltip title='Descending'>
                            <ArrowDown style={{ fontSize: '20px' }} />
                          </Tooltip>
                        ) : sortColumns.message_type === 'asc' ? (
                          <Tooltip title='Ascending'>
                            <ArrowUp style={{ fontSize: '20px' }} />
                          </Tooltip>
                        ) : (
                          <Tooltip title='Unsort'>
                            <DotsVertical style={{ fontSize: '20px' }} />
                          </Tooltip>
                        )} */}
                      </span>
                      Message Type
                    </span>
                  </StyledTableCell>

                  <StyledTableCell
                    align='center'
                    onClick={() => {
                      const type = sortColumns.post_time === '' ? 'asc' : sortColumns.post_time === 'asc' ? 'desc' : ''
                      handleButtonSort('post_time', type)
                    }}
                  >
                    <span style={{ display: 'flex', justifyContent: 'center',minWidth: '100px' }}>
                      <span className='hidden-button' style={{ margin: 'auto', color: 'grey' }}>
                        {sortColumns.post_time === 'desc' ? (
                          <Tooltip title='Descending'>
                            <ArrowDown style={{ fontSize: '20px' }} />
                          </Tooltip>
                        ) : sortColumns.post_time === 'asc' ? (
                          <Tooltip title='Ascending'>
                            <ArrowUp style={{ fontSize: '20px' }} />
                          </Tooltip>
                        ) : (
                          <Tooltip title='unsort'>
                            <DotsVertical style={{ fontSize: '20px' }} />
                          </Tooltip>
                        )}
                      </span>
                      Post Time
                    </span>
                  </StyledTableCell>
                  <StyledTableCell
                    align='center'
                    onClick={() => {
                      const type = sortColumns.scrapingtime === '' ? 'asc' : sortColumns.scrapingtime === 'asc' ? 'desc' : ''
                      handleButtonSort('scrapingtime', type)
                    }}
                  >
                    <span style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', minWidth: '130px' }}>
                      <span className='hidden-button' style={{color: 'grey', marginRight: '0px' }}>
                        {sortColumns.scrapingtime === 'desc' ? (
                          <Tooltip title='Descending'>
                            <ArrowDown style={{ fontSize: '20px' }} />
                          </Tooltip>
                        ) : sortColumns.scrapingtime === 'asc' ? (
                          <Tooltip title='Ascending'>
                            <ArrowUp style={{ fontSize: '20px' }} />
                          </Tooltip>
                        ) : (
                          <Tooltip title='unsort'>
                            <DotsVertical style={{ fontSize: '20px' }} />
                          </Tooltip>
                        )}
                      </span>
                      Scraping Time
                    </span>
                  </StyledTableCell>
                  <StyledTableCell
                    align='center'
                    onClick={() => {
                      const type = sortColumns.source === '' ? 'asc' : sortColumns.source === 'asc' ? 'desc' : ''
                      handleButtonSort('source', type)
                    }}
                  >
                    <span style={{ display: 'flex', justifyContent: 'center' }}>
                      <span className='hidden-button' style={{ margin: 'auto', color: 'grey' }}>
                        {/* {sortColumns.source === 'desc' ? (
                          <Tooltip title='Descending'>
                            <ArrowDown style={{ fontSize: '20px' }} />
                          </Tooltip>
                        ) : sortColumns.source === 'asc' ? (
                          <Tooltip title='Ascending'>
                            <ArrowUp style={{ fontSize: '20px' }} />
                          </Tooltip>
                        ) : (
                          <Tooltip title='unsort'>
                            <DotsVertical style={{ fontSize: '20px' }} />
                          </Tooltip>
                        )} */}
                      </span>
                      Channel
                    </span>
                  </StyledTableCell>
                  <StyledTableCell
                    align='center'
                    onClick={() => {
                      const type =
                        sortColumns.engagement === '' ? 'asc' : sortColumns.engagement === 'asc' ? 'desc' : ''
                      handleButtonSort('engagement', type)
                    }}
                  >
                    <span style={{ display: 'flex', justifyContent: 'center' }}>
                      <span className='hidden-button' style={{ margin: 'auto', color: 'grey' }}>
                        {sortColumns.engagement === 'desc' ? (
                          <Tooltip title='Descending'>
                            <ArrowDown style={{ fontSize: '20px' }} />
                          </Tooltip>
                        ) : sortColumns.engagement === 'asc' ? (
                          <Tooltip title='Ascending'>
                            <ArrowUp style={{ fontSize: '20px' }} />
                          </Tooltip>
                        ) : (
                          <Tooltip title='unsort'>
                            <DotsVertical style={{ fontSize: '20px' }} />
                          </Tooltip>
                        )}
                      </span>
                      Engagement
                    </span>
                  </StyledTableCell>
                  <StyledTableCell
                    align='center'
                    onClick={() => {
                      const type = sortColumns.sentiment === '' ? 'asc' : sortColumns.sentiment === 'asc' ? 'desc' : ''
                      handleButtonSort('sentiment', type)
                    }}
                  >
                    <span style={{ display: 'flex', justifyContent: 'center' }}>
                      <span className='hidden-button' style={{ margin: 'auto', color: 'grey' }}>
                        {/* {sortColumns.sentiment === 'desc' ? (
                          <Tooltip title='Descending'>
                            <ArrowDown style={{ fontSize: '20px' }} />
                          </Tooltip>
                        ) : sortColumns.sentiment === 'asc' ? (
                          <Tooltip title='Ascending'>
                            <ArrowUp style={{ fontSize: '20px' }} />
                          </Tooltip>
                        ) : (
                          <Tooltip title='unsort'>
                            <DotsVertical style={{ fontSize: '20px' }} />
                          </Tooltip>
                        )} */}
                      </span>
                      Sentiment
                    </span>
                  </StyledTableCell>
                  <StyledTableCell
                    align='center'
                    onClick={() => {
                      const type =
                        sortColumns.bully_level === '' ? 'asc' : sortColumns.bully_level === 'asc' ? 'desc' : ''
                      handleButtonSort('bully_level', type)
                    }}
                  >
                    <span style={{ display: 'flex', justifyContent: 'center',minWidth: '100px' }}>
                      <span className='hidden-button' style={{ margin: 'auto', color: 'grey' }}>
                        {/* {sortColumns.bully_level === 'desc' ? (
                          <Tooltip title='Descending'>
                            <ArrowDown style={{ fontSize: '20px' }} />
                          </Tooltip>
                        ) : sortColumns.bully_level === 'asc' ? (
                          <Tooltip title='Ascending'>
                            <ArrowUp style={{ fontSize: '20px' }} />
                          </Tooltip>
                        ) : (
                          <Tooltip title='unsort'>
                            <DotsVertical style={{ fontSize: '20px' }} />
                          </Tooltip>
                        )} */}
                      </span>
                      Bully Level
                    </span>
                  </StyledTableCell>
                  <StyledTableCell
                    align='center'
                    onClick={() => {
                      const type =
                        sortColumns.bully_type === '' ? 'asc' : sortColumns.bully_type === 'asc' ? 'desc' : ''
                      handleButtonSort('bully_type', type)
                    }}
                  >
                    <span style={{ display: 'flex', justifyContent: 'center',minWidth: '100px' }}>
                      <span className='hidden-button' style={{ margin: 'auto', color: 'grey' }}>
                        {/* {sortColumns.bully_type === 'desc' ? (
                          <Tooltip title='Descending'>
                            <ArrowDown style={{ fontSize: '20px' }} />
                          </Tooltip>
                        ) : sortColumns.bully_type === 'asc' ? (
                          <Tooltip title='Ascending'>
                            <ArrowUp style={{ fontSize: '20px' }} />
                          </Tooltip>
                        ) : (
                          <Tooltip title='unsort'>
                            <DotsVertical style={{ fontSize: '20px' }} />
                          </Tooltip>
                        )} */}
                      </span>
                      Bully Type
                    </span>
                  </StyledTableCell>
                  <StyledTableCell align='center'>Link</StyledTableCell>
                  <StyledTableCell align='center'>Image</StyledTableCell>
                  {/* <StyledTableCell align='center'>Action</StyledTableCell> */}
                </TableRow>
              </TableHead>
              <TableBody>
                {(data || []).map((messageDetail: any, index: number) => (
                  <StyledTableRow
                    key={index}
                    sx={{
                      cursor: messageDetail.parent ? 'pointer' : '',
                      backgroundColor: '#fff',
                      transition: 'box-shadow 0.3s ease',
                      '&:hover': {
                        boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.1), inset 0 -2px 4px rgba(0,0,0,0.1)', // shadow
                        backgroundColor: '#fff' 
                      }
                    }}

                    // onClick={() => {
                    //   // setMessageId(messageDetail.message_id);
                    //   setMessageId(messageDetail.id)
                    //   setShowDetail(true)
                    // }}
                  >
                    <StyledTableCell sx={{ color: 'grey' }}>
                      {index + 1 + (page - 1) * 10}
                    </StyledTableCell>
                    <StyledTableCell align='center' sx={{ color: 'grey' }}
                    onClick={() => {
                      // setMessageId(messageDetail.message_id);
                      setMessageId(messageDetail.id)
                      setShowDetail(true)
                    }}
                    >
                      {messageDetail.keyword_name}
                    </StyledTableCell>

                    <StyledTableCell align='center' sx={{ color: 'grey' }} onClick={() => {
                      // setMessageId(messageDetail.message_id);
                      setMessageId(messageDetail.id)
                      setShowDetail(true)
                    }}
                    >
                      {messageDetail.account_name}
                    </StyledTableCell>
                    <StyledTableCell component='th' scope='row' width={200} sx={{ color: 'grey' }}>
                      <span
                        style={{
                          overflow: 'hidden',
                          display: '-webkit-box',
                          WebkitBoxOrient: 'vertical',
                          WebkitLineClamp: 3,
                          maxWidth: 200
                        }}
                      >
                        {messageDetail.message_detail}
                      </span>
                    </StyledTableCell>
                    <StyledTableCell align='center' sx={{ color: 'grey' }} onClick={() => {
                      // setMessageId(messageDetail.message_id);
                      setMessageId(messageDetail.id)
                      setShowDetail(true)
                    }}
                    >
                      {messageDetail.message_type || '-'}
                    </StyledTableCell>

                    <StyledTableCell align='left' sx={{ color: 'grey' }} onClick={() => {
                      // setMessageId(messageDetail.message_id);
                      setMessageId(messageDetail.id)
                      setShowDetail(true)
                    }}
                    >
                      {moment(messageDetail.post_date)?.format('DD.MM.YYYY') + ', ' + messageDetail.post_time}
                    </StyledTableCell>

                    <StyledTableCell align='left' sx={{ color: 'grey' }} onClick={() => {
                      // setMessageId(messageDetail.message_id);
                      setMessageId(messageDetail.id)
                      setShowDetail(true)
                    }}
                    >
                      {moment(messageDetail.scrape_date)?.format('DD.MM.YYYY') + ', ' + messageDetail.scrape_time}
                      {/* {messageDetail.device === 'android' ? (
                        <img alt={'logo'} width={25} height={25} src={`/images/logos/android.png`} />
                      ) : messageDetail.device === 'webapp' || messageDetail.device === 'website' ? (
                        <img alt={'logo'} width={25} height={25} src={`/images/logos/website.png`} />
                      ) : messageDetail.device === 'iphone' ? (
                        <img alt={'logo'} width={25} height={25} src={`/images/logos/ios.png`} />
                      ) : (
                        '-'
                      )} */}
                    </StyledTableCell>
                    <StyledTableCell align='center' sx={{ color: 'grey' }} onClick={() => {
                      // setMessageId(messageDetail.message_id);
                      setMessageId(messageDetail.id)
                      setShowDetail(true)
                    }}
                    >
                      {messageDetail?.source_name === 'facebook' ? (
                        <img alt={'logo'} width={28} height={28} src={`/images/logos/facebook-round.png`} />
                      ) : messageDetail?.source_name === 'x' ? (
                        <img alt={'logo'} width={34} height={34} src={`/images/logos/x-black.jpg`} />
                      ) : messageDetail?.source_name === 'youtube' ? (
                        <img width={28} height={28} alt={'logo'} src={`/images/logos/youtube-text.png`} />
                      ) : messageDetail?.source_name === 'instagram' ? (
                        <img width={28} alt={'logo'} height={28} src={`/images/logos/instagram.png`} />
                      ) : messageDetail?.source_name === 'pantip' ? (
                        <img width={28} alt={'logo'} height={28} src={`/images/logos/pantip.png`} />
                      ) : messageDetail?.source_name === 'google' ? (
                        <img width={25} alt={'logo'} height={25} src={`/images/logos/google.png`} />
                      ) : messageDetail?.source_name == 'tiktok' ? (
                        <img width={34} alt={'logo'} height={34} src={`/images/logos/tiktok.png`} />
                      ) : (
                        <span style={{ textTransform: 'uppercase' }}>{messageDetail?.channel}</span>
                      )}
                    </StyledTableCell>

                    {/* <StyledTableCell
                      align='center'
                      onClick={() => {
                        if (messageDetail.parent) {
                          setMessageId(messageDetail.message_id)
                        }
                      }}
                    >
                      {messageDetail?.source_image ? (
                        <img
                          alt='logo'
                          width={28}
                          height={28}
                          src={`https://api.cornea-demo.com/storage/${messageDetail.source_image}`}
                          onError={(e) => {
                            e.currentTarget.style.display = 'none'
                          }}
                        />
                      ) : (
                        <span style={{ textTransform: 'uppercase' }}>
                          {messageDetail?.channel || messageDetail?.source_name}
                        </span>
                      )}
                    </StyledTableCell> */}

                    <StyledTableCell align='center' sx={{ color: 'grey' }} onClick={() => {
                      // setMessageId(messageDetail.message_id);
                      setMessageId(messageDetail.id)
                      setShowDetail(true)
                    }}
                    >
                      {messageDetail.total_engagement || '-'}
                    </StyledTableCell>
                    <StyledTableCell align='center' sx={{ color: 'grey' }} onClick={() => {
                      // setMessageId(messageDetail.message_id);
                      setMessageId(messageDetail.id)
                      setShowDetail(true)
                    }}
                    >
                      {messageDetail.sentiment || '-'}
                    </StyledTableCell>
                    <StyledTableCell align='left' sx={{ color: 'grey' }} onClick={() => {
                      // setMessageId(messageDetail.message_id);
                      setMessageId(messageDetail.id)
                      setShowDetail(true)
                    }}
                    >
                      {messageDetail.bully_level}
                    </StyledTableCell>
                    <StyledTableCell align='left' sx={{ color: 'grey' }} onClick={() => {
                      // setMessageId(messageDetail.message_id);
                      setMessageId(messageDetail.id)
                      setShowDetail(true)
                    }}
                    >
                      {messageDetail.bully_type}
                    </StyledTableCell>

                    <StyledTableCell align='center' sx={{ color: 'grey' }} onClick={() => {
                      // setMessageId(messageDetail.message_id);
                      setMessageId(messageDetail.id)
                      setShowDetail(true)
                    }}
                    >
                      {messageDetail.link_message ? (
                        <a
                          href={messageDetail.link_message}
                          onClick={event => {
                            event.stopPropagation()
                          }}
                          target='_blank'
                          rel='noopener noreferrer'
                        >
                          <OpenInNew style={{ color: '#0047ff9e' }} />
                        </a>
                      ) : (
                        ''
                      )}
                    </StyledTableCell>

                    <StyledTableCell align='center'>
                      <a
                        onClick={() => {
                          setImageUrl(messageDetail.imageUrl) 
                          setShowImagePopup(true) 
                        }}
                        target='_self'
                        rel='noopener noreferrer'
                        style={{ cursor: 'pointer' }}
                      >
                        <ImageOutline style={{ color: '#0047ff9e' }} />
                      </a>
                    </StyledTableCell>            

                    {/* <StyledTableCell align='center'>
                       <a
                        onClick={() => {
                          setDeleteMsgId(messageDetail.id)
                          setShowConfirm(true)
                        }}
                        target='_self'
                        rel='noopener noreferrer'
                      >
                        <TrashCanOutline style={{ color: 'grey' }} />
                      </a>
                      </StyledTableCell> */}
                  </StyledTableRow>
                ))}

                {!data || data?.length === 0 ? (
                  <TableCell colSpan={12} sx={{ color: 'grey' }}>
                    <Typography
                      variant='h6'
                      sx={{
                        color: 'rgba(76, 78, 100, 0.42)',
                        display: 'flex',
                        justifyContent: 'center'
                      }}
                    >
                      <Translations text='no post data' />
                    </Typography>
                  </TableCell>
                ) : (
                  ''
                )}
              </TableBody>
            </Table>
          </TableContainer>

          <Box sx={{ mt: 4, display: 'flex', justifyContent: 'center' }}>
            <Pagination
              count={pageCount}
              page={page}
              onChange={handleChangePagination}
              variant='outlined'
              color='primary'
            />
          </Box>
        </DialogContent>
      </Dialog>
      {showDetail && messageId ? (
        <DetailPostEgagement show={showDetail} setShow={setShowDetail} messageId={messageId} params={params} />
      ) : (
        ''
      )}
      <ImagePopupDialog
        showDialog={showImagePopup}
        setShowDialog={setShowImagePopup}
        imageUrl={imageUrl}
        title='Image'
      />  
    </Card>
  )
}

export default InfluencerDetail
