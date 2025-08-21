import { forwardRef, ReactElement, Ref, useEffect, useState } from 'react'
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
import { GetMessageDetailSentimentDashboard } from 'src/services/api/dashboards/overall/overallDashboardApi'
import moment from 'moment'
import Translations from 'src/layouts/components/Translations'
import { ArrowDown, ArrowUp, DotsVertical, MicrosoftExcel, OpenInNew, TrashCanOutline, ImageOutline } from 'mdi-material-ui'
import { initialSort, StyledTableCell, StyledTableRow } from '../dashboard/DailyMessageDetail'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import DeleteConfirmDialog from '../dashboard/DeleteConfirmDialog'
import ExportExcelL3 from '../VoiceDashboard/ExportExcelL3'
import ImagePopupDialog from '../dashboard/ImagePopupDialog'

import DialogNetworkGraphByFilter from '../dashboard/DialogNetworkGraphByFilter'

// import DialogNetworkGraph from '../dashboard/DialogNetworkGraph'
// import { GridColDef } from '@mui/x-data-grid'
// import { StyledDataGrid } from '../dashboard/DailyMessageDetail'

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
  paramsId?: any
  setParamsId?: any
  reportNo?: string
  title?: string
  networkTitle?: string
  keywordId?: number
  setKeywordId?: any
  excelExport?: () => void
  apiParams?: any
  setIsLoading?: any
  fileName?: any
  apiPath?: string
}

const MessageDetail = (props: DialogInfoProps) => {
  const {
    show,
    setShow,
    params,
    paramsId,
    setParamsId,
    reportNo,
    title,

    // current,
    // networkTitle,
    excelExport,
    apiParams,
    setIsLoading,
    fileName,
    apiPath
  } = props

  const [showDialog, setShowDialog] = useState<boolean>(false)
  const [messageId, setMessageId] = useState<number | string>()
  const [id, setId] = useState<boolean>()
  const [page, setPage] = useState(1)

  // const [, setShowDialog] = useState<boolean>(false)
  // const [, setMessageId] = useState<number | string>()
  const [pageCount, setPageCount] = useState<number>(0)
  const [data, setData] = useState<any>([])
  const [fieldName, setFieldName] = useState<string>('')
  const [sortSelect, setSortSelect] = useState('')
  const [sortColumns, setSortColumn] = useState<any>(initialSort)
  const [showConfirm, setShowConfirm] = useState<boolean>(false)
  const [deleteMsgId, setDeleteMsgId] = useState<string>('')
  const [reload, setReload] = useState<boolean>(false)
  const [showImagePopup, setShowImagePopup] = useState(false)
  const [imageUrl, setImageUrl] = useState('')

  const handleButtonSort = (field: string, sortName: string) => {
    setFieldName(field)
    setSortSelect(sortName)
    setSortColumn({ ...initialSort, [field]: sortName })
  }

  let paramData: any = {}
  const todayDate = new Date()
  paramData.Llabel = ''
  if (params?.period === 'customrange' && params?.previousDate !== todayDate && params?.previousEndDate !== todayDate) {
    paramData = {
      campaign_id: params?.campaign || '',
      source: paramsId?.sourceId || params?.platformId || '',
      start_date: params?.date ? moment(params?.date).format('YYYY-MM-DD') : '',
      end_date: params?.endDate ? moment(params?.endDate).format('YYYY-MM-DD') : '',
      period: params?.period,
      keyword_id: paramsId?.keywordId || '',
      organization_id: paramsId?.organization_id || '',
      classification_id: paramsId?.classification_id || '',
      start_date_period: params?.previousDate ? moment(params?.previousDate).format('YYYY-MM-DD') : '',
      end_date_period: params?.previousEndDate ? moment(params?.previousEndDate).format('YYYY-MM-DD') : '',
      page: page,
      limit: 10,
      report_number: reportNo,
      page_name: params?.page,
      label: params?.label,
      field: fieldName,
      sort: sortSelect
    }
  } else {
    paramData = {
      campaign_id: params?.campaign || '',
      source: paramsId?.sourceId || params?.platformId || '',
      start_date: params?.date ? moment(params?.date).format('YYYY-MM-DD') : '',
      end_date: params?.endDate ? moment(params?.endDate).format('YYYY-MM-DD') : '',
      period: params?.period,
      keyword_id: paramsId?.keywordId || '',
      classification_id: paramsId?.classification_id || '',
      organization_id: paramsId?.organization_id || '',
      page: page,
      limit: 10,
      report_number: reportNo,
      page_name: params?.page,
      label: params?.label,
      field: fieldName,
      sort: sortSelect
    }
  }

  if (params?.Llabel) {
    paramData.Llabel = params?.Llabel
  }
  const { resultMessageDetail, totalMessage, loadingMessageDetail } = GetMessageDetailSentimentDashboard(
    paramData,
    reload
  )

  const handleChangePagination = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value)
  }

  const onCloseDialog = () => {
    setShow(false)
    setPage(1)
    setPageCount(0)
    setParamsId({
      keywordId: null,
      sourceId: null,
      campaign_id: null,
      organization_id: null
    })
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
        <DialogContent sx={{ pb: 6, pt: { xs: 3, sm: 6 }, position: 'relative' }}>
          <IconButton size='small' onClick={onCloseDialog} sx={{ position: 'absolute', right: '1rem', top: '1rem' }}>
            <Close />
          </IconButton>
          {loadingMessageDetail && <LinearProgress style={{ width: '100%' }} />}
          <Box sx={{ mb: 8, textAlign: 'center' }}>
            <Typography variant='h5' sx={{ mb: 3, lineHeight: '2rem' }}>
              <Translations text={title || 'Daily Messages: Message Transactions'} />
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
              ) : fileName ? (
                <ExportExcelL3
                  setIsLoading={setIsLoading}
                  params={params}
                  apiParams={apiParams}
                  reportNo={reportNo || ''}
                  fileName={fileName}
                  onCloseDialog={onCloseDialog}
                  apiPath={apiPath ?? ''}
                />
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
                  <StyledTableCell align='left' sx={{ minWidth: '200px' }}>Message Detail</StyledTableCell>
                  <StyledTableCell
                    align='center'

                    // onClick={() => {
                    //   const type =
                    //     sortColumns.message_type === '' ? 'asc' : sortColumns.message_type === 'asc' ? 'desc' : ''
                    //   handleButtonSort('message_type', type)
                    // }}

                  >
                    <span style={{ display: 'flex', justifyContent: 'center', minWidth: '100px' }}>
                      <span className='hidden-button' style={{ color: 'grey',  display: 'block' }}>

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

                    // onClick={() => {
                    //   const type = sortColumns.author === '' ? 'asc' : sortColumns.author === 'asc' ? 'desc' : ''
                    //   handleButtonSort('author', type)
                    // }}

                  >
                    <span style={{ display: 'flex', justifyContent: 'center',minWidth: '105px' }}>
                      <span className='hidden-button' style={{ color: 'grey', display:'block' }}>

                        {/* {sortColumns.author === 'desc' ? (
                          <Tooltip title='Descending'>
                            <ArrowDown style={{ fontSize: '20px' }} />
                          </Tooltip>
                        ) : sortColumns.author === 'asc' ? (
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
                  <StyledTableCell
                    align='center'
                    onClick={() => {
                      const type = sortColumns.date === '' ? 'asc' : sortColumns.date === 'asc' ? 'desc' : ''
                      handleButtonSort('date', type)
                    }}
                  >
                    <span style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', minWidth: '130px', justifyContent: 'flex-start' }}>
                      <span className='hidden-button' style={{ color: 'grey', marginRight: '0px' }}>
                        {sortColumns.date === 'desc' ? (
                          <Tooltip title='Descending'>
                            <ArrowDown style={{ fontSize: '20px' }} />
                          </Tooltip>
                        ) : sortColumns.date === 'asc' ? (
                          <Tooltip title='Ascending'>
                            <ArrowUp style={{ fontSize: '20px' }} />
                          </Tooltip>
                        ) : (
                          <Tooltip title='unsort'>
                            <DotsVertical style={{ fontSize: '20px' }} />
                          </Tooltip>
                        )}
                      </span>
                      <span style={{ textAlign: 'left' }}>Post Time</span>
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

                  {/* <StyledTableCell
                    align='center'
                    onClick={() => {
                      const type = sortColumns.device === '' ? 'asc' : sortColumns.device === 'asc' ? 'desc' : ''
                      handleButtonSort('device', type)
                    }}
                  >
                    <span style={{ display: 'flex', justifyContent: 'center' }}>
                      <span className='hidden-button' style={{ margin: 'auto', color: 'grey' }}>
                        {sortColumns.device === 'desc' ? (
                          <Tooltip title='Descending'>
                            <ArrowDown style={{ fontSize: '20px' }} />
                          </Tooltip>
                        ) : sortColumns.device === 'asc' ? (
                          <Tooltip title='Ascending'>
                            <ArrowUp style={{ fontSize: '20px' }} />
                          </Tooltip>
                        ) : (
                          <Tooltip title='unsort'>
                            <DotsVertical style={{ fontSize: '20px' }} />
                          </Tooltip>
                        )}
                      </span>
                      Device
                    </span>
                  </StyledTableCell> */}

                  <StyledTableCell
                    align='center'

                    // onClick={() => {
                    //   const type = sortColumns.source === '' ? 'asc' : sortColumns.source === 'asc' ? 'desc' : ''
                    //   handleButtonSort('source', type)
                    // }}

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
                    <span style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', minWidth: '130px', justifyContent:'right' }}>
                      <span className='hidden-button' style={{color: 'grey', marginRight: '0px' }}>
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

                    // onClick={() => {
                    //   const type = sortColumns.sentiment === '' ? 'asc' : sortColumns.sentiment === 'asc' ? 'desc' : ''
                    //   handleButtonSort('sentiment', type)
                    // }}

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

                    // onClick={() => {
                    //   const type =
                    //     sortColumns.bully_level === '' ? 'asc' : sortColumns.bully_level === 'asc' ? 'desc' : ''
                    //   handleButtonSort('bully_level', type)
                    // }}

                  >
                    <span style={{ display: 'flex', justifyContent: 'left',minWidth: '80px' }}>
                      <span className='hidden-button' style={{ color: 'grey' }}>

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

                    // onClick={() => {
                    //   const type =
                    //     sortColumns.bully_type === '' ? 'asc' : sortColumns.bully_type === 'asc' ? 'desc' : ''
                    //   handleButtonSort('bully_type', type)
                    // }}

                  >
                    <span style={{ display: 'flex', justifyContent: 'center' ,minWidth: '75px'}}>
                      <span className='hidden-button' style={{ color: 'grey' }}>

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
                  <StyledTableCell align='center'>Action</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {(data || []).map((messageDetail: any, index: number) => (
                  <StyledTableRow
                    key={index}
                    onClick={() => {
                      if (messageDetail.parent) {
                        setMessageId(messageDetail.message_id)
                        setId(messageDetail.id)
                        setShowDialog(true)
                      }
                    }}
                    sx={{
                      cursor: messageDetail.parent ? 'pointer' : '',
                      backgroundColor: '#fff',
                      transition: 'box-shadow 0.3s ease',
                      '&:hover': {
                        boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.1), inset 0 -2px 4px rgba(0,0,0,0.1)', // shadow
                        backgroundColor: '#fff' 
                      }
                    }}
                  >
                    <StyledTableCell
                      onClick={() => {
                        if (messageDetail.parent) {
                          setMessageId(messageDetail.message_id)
                          setId(messageDetail.id)
                          setShowDialog(true)
                        }
                      }}
                    >
                      {index + 1 + (page - 1) * 10}
                    </StyledTableCell>
                    <StyledTableCell
                      component='th'
                      scope='row'
                      width={200}
                      onClick={() => {
                        if (messageDetail.parent) {
                          setMessageId(messageDetail.message_id)
                          setId(messageDetail.id)
                          setShowDialog(true)
                        }
                      }}
                    >
                      <span
                        style={{
                          overflow: 'hidden',
                          display: '-webkit-box',
                          WebkitBoxOrient: 'vertical',
                          WebkitLineClamp: 3,
                          minWidth: '200px'
                        }}
                      >
                        {messageDetail.message_detail}
                      </span>
                    </StyledTableCell>
                    <StyledTableCell
                      align='left'
                      onClick={() => {
                        if (messageDetail.parent) {
                          setMessageId(messageDetail.message_id)
                          setId(messageDetail.id)
                          setShowDialog(true)
                        }
                      }}
                    >
                      {messageDetail.message_type || '-'}
                    </StyledTableCell>
                    <StyledTableCell
                      align='left'
                      onClick={() => {
                        if (messageDetail.parent) {
                          setMessageId(messageDetail.message_id)
                          setId(messageDetail.id)
                          setShowDialog(true)
                        }
                      }}
                    >
                      {messageDetail.account_name}
                    </StyledTableCell>

                    <StyledTableCell
                      align='left'
                      onClick={() => {
                        if (messageDetail.parent) {
                          setMessageId(messageDetail.message_id)
                          setId(messageDetail.id)
                          setShowDialog(true)
                        }
                      }}
                    >
                      {moment(messageDetail.post_date)?.format('DD.MM.YYYY') + ', ' + messageDetail.post_time}
                    </StyledTableCell>

                    <StyledTableCell
                      align='left'
                      onClick={() => {
                        if (messageDetail.parent) {
                          setMessageId(messageDetail.message_id)
                          setId(messageDetail.id)
                          setShowDialog(true)
                        }
                      }}
                    >
                      {moment(messageDetail.scrape_date)?.format('DD.MM.YYYY') + ', ' + messageDetail.scrape_time}
                      {/* {messageDetail.device === 'android' ? (
                        <img alt={'logo'} width={25} height={25} src={`/images/logos/android.png`} />
                      ) : messageDetail.device === 'webapp' ? (
                        <img alt={'logo'} width={25} height={25} src={`/images/logos/website.png`} />
                      ) : messageDetail.device === 'iphone' ? (
                        <img alt={'logo'} width={25} height={25} src={`/images/logos/ios.png`} />
                      ) : (
                        '-'
                      )} */}
                    </StyledTableCell>
                    <StyledTableCell
                      align='center'
                      onClick={() => {
                        if (messageDetail.parent) {
                          setMessageId(messageDetail.message_id)
                          setId(messageDetail.id)
                          setShowDialog(true)
                        }
                      }}
                    >
                      {messageDetail?.channel === 'facebook' ? (
                        <img alt={'logo'} width={28} height={28} src={`/images/logos/facebook-round.png`} />
                      ) : messageDetail?.channel === 'x' ? (
                        <img alt={'logo'} width={25} height={25} src={`/images/logos/x-black.jpg`} />
                      ) : messageDetail?.channel === 'youtube' ? (
                        <img width={28} height={28} alt={'logo'} src={`/images/logos/youtube-text.png`} />
                      ) : messageDetail?.channel === 'instagram' ? (
                        <img width={28} alt={'logo'} height={28} src={`/images/logos/instagram.png`} />
                      ) : messageDetail?.channel === 'pantip' ? (
                        <img width={28} alt={'logo'} height={28} src={`/images/logos/pantip.png`} />
                      ) : messageDetail?.channel === 'google' ? (
                        <img width={25} alt={'logo'} height={25} src={`/images/logos/google.png`} />
                      ) : messageDetail?.channel === 'tiktok' ? (
                        <img width={28} alt={'logo'} height={28} src={`/images/logos/tiktok.png`} />
                      ) : (
                        <span style={{ textTransform: 'uppercase' }}>{messageDetail?.channel}</span>
                      )}
                    </StyledTableCell>
                    {/* <StyledTableCell
                      align='center'
                      onClick={() => {
                        if (messageDetail.parent) {
                          setMessageId(messageDetail.message_id)
                          setId(messageDetail.id)
                          setShowDialog(true)
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
                    <StyledTableCell
                      align='right'
                      onClick={() => {
                        if (messageDetail.parent) {
                          setMessageId(messageDetail.message_id)
                          setId(messageDetail.id)
                          setShowDialog(true)
                        }
                      }}
                    >
                      {messageDetail.engagement || '-'}
                    </StyledTableCell>
                    <StyledTableCell
                      align='center'
                      onClick={() => {
                        if (messageDetail.parent) {
                          setMessageId(messageDetail.message_id)
                          setId(messageDetail.id)
                          setShowDialog(true)
                        }
                      }}
                    >
                      {messageDetail.sentiment || '-'}
                    </StyledTableCell>
                    <StyledTableCell
                      align='left'
                      onClick={() => {
                        if (messageDetail.parent) {
                          setMessageId(messageDetail.message_id)
                          setId(messageDetail.id)
                          setShowDialog(true)
                        }
                      }}
                    >
                      {messageDetail.bully_level}
                    </StyledTableCell>
                    <StyledTableCell
                      align='left'
                      onClick={() => {
                        if (messageDetail.parent) {
                          setMessageId(messageDetail.message_id)
                          setId(messageDetail.id)
                          setShowDialog(true)
                        }
                      }}
                    >
                      {messageDetail.bully_type}
                    </StyledTableCell>

                    <StyledTableCell align='center'>
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
                        onClick={(e) => {
                          e.stopPropagation()
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

                    <StyledTableCell align='center'>
                      <a
                        href='#'
                        onClick={() => {
                          setDeleteMsgId(messageDetail.id)
                          setShowConfirm(true)
                        }}
                        target='_self'
                        rel='noopener noreferrer'
                      >
                        <TrashCanOutline style={{ color: 'grey' }} />
                      </a>
                    </StyledTableCell>
                  </StyledTableRow>
                ))}
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
            {/* <Button disabled={disableLoadMore} variant="contained" color="primary" onClick={(e) => {handleChangePagination(e, page)}}>
                Load More
              </Button> */}
          </Box>
        </DialogContent>
      </Dialog>

      {messageId && params?.campaign ? (
        <DialogNetworkGraphByFilter
          showDialog={showDialog}
          setShowDialog={setShowDialog}
          setId={id}

          // currentData={current}
          params={params}
          keywordId={paramsId?.keywordId}
          messageId={messageId}
          setKeywordId={setParamsId}
          setMessageId={setMessageId}
          reportNo={reportNo}
          
          // title={networkTitle || 'Daily Messages: Social Network Analysis'}
        />
      ) : (
        ''
      )}

      {showConfirm ? (
        <DeleteConfirmDialog
          showDialog={showConfirm}
          setShowDialog={setShowConfirm}
          id={deleteMsgId}
          reload={reload}
          setReload={setReload}
        />
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

export default MessageDetail
