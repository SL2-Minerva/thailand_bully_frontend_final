import React, { forwardRef, ReactElement, Ref } from 'react'
import Fade, { FadeProps } from '@mui/material/Fade'
import {
  Box, Card, Dialog, DialogContent, IconButton, Typography,
  LinearProgress, Table, TableBody, 
  TableContainer, TableHead, TableRow, Paper,Tooltip,
} from '@mui/material'
import { Close,OpenInNew } from 'mdi-material-ui'
import { styled } from '@mui/material/styles'
import { GetNetworkGraph } from 'src/services/api/dashboards/overall/overallDashboardApi' 
import TableCell, { tableCellClasses } from '@mui/material/TableCell'
import Translations from 'src/layouts/components/Translations'


export const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: '#f6f7f7',
    color: theme.palette.common.black,
    whiteSpace: 'nowrap',
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

const Transition = forwardRef(function Transition(
  props: FadeProps & { children?: ReactElement<any, any> },
  ref: Ref<unknown>
) {
  return <Fade ref={ref} {...props} />
})

interface DialogInfoProps {
  showDialog: boolean
  setShowDialog: (show: boolean) => void
  currentData?: any 
  params?: any
  setId?: boolean
  keywordId?:any
  messageId?: any
  setKeywordId?: any
  setMessageId?: any
  reportNo?: any
  title?: string
}
interface MediaTypeEntry {
  media_type: string
  process_message?: string
  sentiment?: string
  bully_level?: string
  bully_type?: string
}
      
const DialogNetworkGraphByFilter = (props: DialogInfoProps) => {
  const {
    showDialog,
    setShowDialog,
    params,
    keywordId,
    messageId,
    setMessageId,
    setId,
    reportNo,
    title,

    // currentData 
  } = props

  const {
    loadingNetworkGraph,
    currentData, 
    
    //errorNetworkGraph
  } = GetNetworkGraph(
    params?.campaign,
    params?.platformId,
    params?.start_date || params?.date,
    params?.end_date || params?.endDate,
    params?.period,
    params?.start_date_period || params?.previousDate,
    params?.end_date_period || params?.previousEndDate,
    keywordId,
    messageId,
    setId,
    reportNo,
  )

  const dataToDisplay = currentData || {};
  console.log('dataToDisplay', dataToDisplay)

  const onClose = () => {
    setShowDialog(false)
    setMessageId && setMessageId(null)
  }

  const cardTitle = title ? title : 'Message By Media type'

  // เตรียมข้อมูลสำหรับแสดงในตาราง: แปลง media_type object เป็น array
  const formattedMediaTypes = dataToDisplay?.media_type
    ? Object.entries(dataToDisplay.media_type).map(
        ([mediaTypeKey, value]) => ({
          mediaType: mediaTypeKey,
          media_type: (value as MediaTypeEntry).media_type,
          process_message: (value as MediaTypeEntry).process_message,
          sentiment: (value as MediaTypeEntry).sentiment,
          bully_level: (value as MediaTypeEntry).bully_level,
          bully_type: (value as MediaTypeEntry).bully_type,
        })
      )
    : [];

  return (
    <Card>
      <Dialog
        fullWidth
        open={showDialog}
        maxWidth="lg"
        scroll="body"
        onClose={onClose}
        TransitionComponent={Transition}
      >
        <DialogContent sx={{ pb: 6, pt: { xs: 8, sm: '1.5rem' }, position: 'relative' }}>
          <IconButton size='small' onClick={onClose} sx={{ position: 'absolute', right: '1rem', top: '1rem' }}>
            <Close />
          </IconButton>

          {(loadingNetworkGraph || !dataToDisplay?.id) && <LinearProgress style={{ width: '100%' }} />}
          <Box sx={{ mb: 8, textAlign: 'center' }}>
            <Typography variant='h5' sx={{ pt: '0.5rem',lineHeight: '2rem' }}>
              <Translations text={cardTitle} />
            </Typography>
          </Box>
          <TableContainer component={Paper} sx={{ maxHeight: '640px' }}>
            <Table style={{ minWidth: '400px' }} aria-label='customized table' stickyHeader>
                <TableHead>
                  <TableRow style={{ padding: '0px 0px 0px 0px' }}>
                    <StyledTableCell align='center'>No.</StyledTableCell>
                    <StyledTableCell align='left'>
                          <span
                            style={{
                              overflow: 'hidden',
                              display: '-webkit-box',
                              WebkitBoxOrient: 'vertical',
                              WebkitLineClamp: 3,
                              maxWidth: 400,
                            }}
                          >
                            <Translations text='Message Detail' />
                          </span>
                    </StyledTableCell> {/* เปลี่ยนเป็น Message Detail */}
                    <StyledTableCell align='center'>Media Type</StyledTableCell>
                    <StyledTableCell align='left'>Sentiment</StyledTableCell>
                    <StyledTableCell align='left'>Bully Level</StyledTableCell>
                    <StyledTableCell align='left'>Bully Type</StyledTableCell>
                    <StyledTableCell align='center'>Link</StyledTableCell>
                  </TableRow>
              </TableHead>

              <TableBody>
                {/* แสดงข้อมูลในตาราง */}
                {!loadingNetworkGraph && formattedMediaTypes.length > 0 ? (
                  formattedMediaTypes.map((row, index) => (
                    <TableRow key={row.mediaType}>
                      <StyledTableCell align="center">{index + 1}</StyledTableCell>
                      <StyledTableCell align='left'>
                          <span
                            style={{
                              overflow: 'hidden',
                              display: '-webkit-box',
                              WebkitBoxOrient: 'vertical',
                              WebkitLineClamp: 3,
                              maxWidth: 400,
                            }}
                          >
                            {row.process_message || '-'}
                          </span>
                      </StyledTableCell>
                      <StyledTableCell align="center">{row.media_type || '-'}</StyledTableCell>
                      <StyledTableCell align="left">{row.sentiment || '-'}</StyledTableCell>
                      <StyledTableCell align="left">{row.bully_level || '-'}</StyledTableCell>
                      <StyledTableCell align="left">{row.bully_type || '-'}</StyledTableCell>
                      <StyledTableCell align='center'>       
                        {dataToDisplay.link ? (
                          <Tooltip title="Content Link" arrow> 
                          <a
                            href={dataToDisplay.link}
                            onClick={event => {
                              event.stopPropagation()
                            }}
                            target='_blank'
                            rel='noopener noreferrer'
                          >
                            <OpenInNew style={{ color: '#0047ff9e' }} />
                          </a>
                          </Tooltip>
                        ) : (
                          ''
                        )}
                      </StyledTableCell>
                      
                    </TableRow>
                  ))
                ) : (
                  !loadingNetworkGraph && (
                    <TableRow>
                      <StyledTableCell colSpan={7} align="center">
                        No data available
                      </StyledTableCell>
                    </TableRow>
                  )
                )}

                {/* แสดง loading row */}
                {loadingNetworkGraph && (
                  <TableRow>
                    <StyledTableCell colSpan={7} align="center">
                      Loading data...
                    </StyledTableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </DialogContent>
      </Dialog>
    </Card>
  )
}

export default DialogNetworkGraphByFilter