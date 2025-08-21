import { forwardRef, ReactElement, Ref, useEffect, useState } from 'react'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import Fade, { FadeProps } from '@mui/material/Fade'
import { Box, Card, Dialog, DialogContent, IconButton, LinearProgress, Pagination, Typography } from '@mui/material'
import Close from 'mdi-material-ui/Close'
import Translations from 'src/layouts/components/Translations'
import { GetDetailMessage } from 'src/services/api/dashboards/overall/overallDashboardApi'
import DialogNetworkGraphByFilter from './DialogNetworkGraphByFilter'

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
  keywordId?: number
  setKeywordId?: any
  reportNo?: any
  title?: any
  networkTitle?: any
  authorName: string
  setAuthorName: any
  message_id: string
  setMessage_id: any
}

const AccountDetail = (props: DialogInfoProps) => {
  const {
    show,
    setShow,
    current,
    title,
    networkTitle,
    params,
    reportNo,
    keywordId,
    setKeywordId,
    authorName,
    setAuthorName,
    message_id,
    setMessage_id
  } = props
  const [showDialog, setShowDialog] = useState<boolean>(false)
  const [messageId, setMessageId] = useState<number | string>()
  const [id, setId] = useState<boolean>()

  // const [showDialog, setShowDialog] = useState<boolean>(false)
  // const [messageId, setMessageId] = useState<number | string>()
  
  const [pageCount, setPageCount] = useState<number>(0)
  const [page, setPage] = useState(0)
  const platformId = params?.platformId || ''

  const { resultMessageDetail, totalMessage, loadingMessageDetail } = GetDetailMessage(
    params?.campaign,
    platformId,
    params?.date,
    params?.endDate,
    params?.period,
    params?.previousDate,
    params?.previousEndDate,
    params?.keywordId,
    page,
    10,
    reportNo,
    params?.page,
    params?.label,
    params?.ylabel,
    'level3',
    authorName,
    message_id
  )

  const handleChangePagination = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value - 1)
  }

  const onCloseDialog = () => {
    setShow(false)
    setShowDialog(false)
    setPage(0)
    setPageCount(0)
    if (keywordId) {
      setKeywordId('')
    }
    setAuthorName('')
    setMessage_id('')
  }

  useEffect(() => {
    if (totalMessage > 0) {
      setPageCount(Math.ceil(totalMessage / 10))
    }
  }, [totalMessage])

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
        <DialogContent sx={{ pb: 6, pt: { xs: 8, sm: 12.5 }, position: 'relative' }}>
          <IconButton size='small' onClick={onCloseDialog} sx={{ position: 'absolute', right: '1rem', top: '1rem' }}>
            <Close />
          </IconButton>
          {loadingMessageDetail && <LinearProgress style={{ width: '100%' }} />}
          <Box sx={{ mb: 8, textAlign: 'center' }}>
            <Typography variant='h5' sx={{ mb: 3, lineHeight: '2rem' }}>
              <Translations text={title || ''} />
            </Typography>
          </Box>
          <TableContainer component={Paper} sx={{ minHeight: 450, maxHeight: 450 }}>
            <Table aria-label='customized table'>
              <TableHead sx={{ backgroundColor: '#e8d63aa1 !important' }}>
                <TableRow>
                  <TableCell variant='head' align='center'>
                    {' '}
                    Message Detail{' '}
                  </TableCell>
                  <TableCell variant='head' align='center'> Account Name </TableCell>
                  <TableCell variant='head' align='center'> Channel/Platform </TableCell>
                  <TableCell variant='head' align='center'> Post Date </TableCell>
                  <TableCell variant='head' align='center'> Post Time </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {(resultMessageDetail || []).map((messageDetail: any, index: number) => (
                  <TableRow
                    key={index}
                    onClick={() => {
                      setShowDialog(true),
                      setId(messageDetail.id)
                      setMessageId(messageDetail.message_id)
                    }}
                  >
                    <TableCell style={{ whiteSpace: 'normal', width: 800 }}  align='left'>{messageDetail.message_detail}</TableCell>
                    <TableCell  align='center'>{messageDetail.account_name}</TableCell>
                    <TableCell  align='center'>
                      {messageDetail?.channel == 'facebook' ? (
                        <img alt={'logo'} width={34} height={34} src={`/images/logos/facebook-round.png`} />
                      ) : messageDetail?.channel == 'x' ? (
                        <img alt={'logo'} width={34} height={34} src={`/images/logos/x-black.jpg`} />
                      ) : messageDetail?.channel == 'youtube' ? (
                        <img width={34} height={34} alt={'logo'} src={`/images/logos/youtube-text.png`} />
                      ) : messageDetail?.channel == 'instagram' ? (
                        <img width={34} alt={'logo'} height={34} src={`/images/logos/instagram.png`} />
                      ) : messageDetail?.channel == 'pantip' ? (
                        <img width={34} alt={'logo'} height={34} src={`/images/logos/pantip.png`} />
                      ) : messageDetail?.channel == 'google' ? (
                        <img width={34} alt={'logo'} height={34} src={`/images/logos/google.png`} />
                      ) :messageDetail?.channel == 'tiktok' ? (
                        <img width={34} alt={'logo'} height={34} src={`/images/logos/tiktok.png`} />
                      ) : (
                        <span style={{ textTransform: 'uppercase' }}>{messageDetail?.channel}</span>
                      )}
                    </TableCell>
                    <TableCell  align='center'>{messageDetail.post_date}</TableCell>
                    <TableCell align='center'> {messageDetail.post_time}</TableCell>
                    {/* <TableCell style={{ whiteSpace: 'normal', width: 800 }} align='left'>{messageDetail.message_detail}</TableCell>
                    <TableCell 
                    align='center'
                      onClick={() => {
                        if (messageDetail.parent) {
                          setMessageId(messageDetail.message_id)
                          setId(messageDetail.id)
                          setShowDialog(true)
                        }
                      }}
                      style={{ cursor: messageDetail.parent ? 'pointer' : 'default' }}
                    >{messageDetail.account_name}
                    </TableCell>
                    <TableCell
                      align='center'
                      onClick={() => {
                        if (messageDetail.parent) {
                          setMessageId(messageDetail.message_id)
                          setId(messageDetail.id)
                          setShowDialog(true)
                        }
                      }}
                      style={{ cursor: messageDetail.parent ? 'pointer' : 'default' }}
                    >
                      {messageDetail?.image ? (
                        <img
                          alt='logo'
                          width={28}
                          height={28}
                          src={`https://api.cornea-demo.com/storage/${messageDetail.image}`}
                          onError={(e) => {
                            console.error('Image failed to load:', e.currentTarget.src)
                            e.currentTarget.style.display = 'none'
                          }}
                        />
                      ) : (
                        <span style={{ textTransform: 'uppercase' }}>
                          {messageDetail?.name || messageDetail?.channel || messageDetail?.source_name}
                        </span>
                      )}
                    </TableCell>
                    <TableCell align='center'>{messageDetail.post_date}</TableCell>
                    <TableCell align='center'>{messageDetail.post_time}</TableCell> */}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <Box sx={{ mt: 4, display: 'flex', justifyContent: 'center' }}>
            <Pagination
              count={pageCount}
              page={page + 1}
              onChange={handleChangePagination}
              variant='outlined'
              color='primary'
            />
          </Box>
        </DialogContent>
      </Dialog>
      {showDialog && messageId && params?.campaign ? (
        <DialogNetworkGraphByFilter
          showDialog={showDialog}
          setShowDialog={setShowDialog}
          setId={id}
          currentData={current}
          params={params}
          keywordId={keywordId}
          messageId={messageId}
          setKeywordId={setKeywordId}
          setMessageId={setMessageId}
          reportNo={reportNo}
          title={networkTitle}
        />
      ) : (
        ''
      )}
    </Card>
  )
}

export default AccountDetail