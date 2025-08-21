import React, { forwardRef, ReactElement, Ref } from 'react'

import Fade, { FadeProps } from '@mui/material/Fade'
import { Box, Card, Dialog, DialogContent, Grid, IconButton, LinearProgress, Typography } from '@mui/material'
import Close from 'mdi-material-ui/Close'
import Translations from 'src/layouts/components/Translations'
import { DataGrid } from '@mui/x-data-grid'
import { withStyles } from '@mui/styles'
import { styled } from '@mui/material/styles'
import TableCell, { tableCellClasses } from '@mui/material/TableCell'
import TableRow from '@mui/material/TableRow'
import { EngagementDetails } from 'src/services/api/dashboards/monitoring/MonitoringDashboard'
import TopManagementCard from './TopManagementCard'
import CommentDetail from './CommentDetail'

// import SourceService from 'src/services/api/source/SourceApi'

const Transition = forwardRef(function Transition(
  props: FadeProps & { children?: ReactElement<any, any> },
  ref: Ref<unknown>
) {
  return <Fade ref={ref} {...props} />
})

interface DialogInfoProps {
  messageId: string
  show: boolean
  setShow: any
  params?: any
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
  date: '',
  device: '',
  source: '',
  engagement: '',
  sentiment: '',
  bully_level: '',
  bully_type: ''
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

const DetailPostEgagement = (props: DialogInfoProps) => {
  const { messageId, show, setShow } = props

  const { loadingEngagementDetail, resultEngagementDetail } = EngagementDetails(messageId)

  // const { result_source_list } = SourceService()

  const onCloseDialog = () => {
    setShow(false)
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
          {loadingEngagementDetail && <LinearProgress style={{ width: '100%' }} />}
          <Box sx={{ mb: 8 }}>
            <Typography variant='h5' sx={{ mb: 3, lineHeight: '2rem', textAlign: 'center' }}>
              <Translations text={'Post Engagement Detail'} />
              {/* {excelExport ? (
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
              )} */}
            </Typography>
          </Box>

          <Grid container spacing={5} sx={{ maxHeight: 650, overflow: 'auto' }}>
            <Grid item xs={12} md={4} mt={5} mb={4}>
              {resultEngagementDetail ? (
                <TopManagementCard
                  key={messageId}
                  loadingTopEngagement={loadingEngagementDetail}
                  resultTopEngagement={resultEngagementDetail}
                  showFullMsg={true}
                />
              ) : (
                ''
              )}
            </Grid>
            <Grid item xs={8} sx={{ maxHeight: 650, overflow: 'auto' }}>
              {(resultEngagementDetail?.comments || []).map((comment: any, index: number) => (
                <CommentDetail key={index} loadingTopEngagement={loadingEngagementDetail} comment={comment} />
              ))}

              {resultEngagementDetail?.comments?.length === 0 ? (
                <Typography
                  variant='h6'
                  sx={{
                    color: 'rgba(76, 78, 100, 0.42)',
                    display: 'flex',
                    justifyContent: 'center',
                    padding: '180px 0'
                  }}
                >
                  {' '}
                  There is no comments
                </Typography>
              ) : (
                ''
              )}
            </Grid>
          </Grid>
        </DialogContent>
      </Dialog>
    </Card>
  )
}

export default DetailPostEgagement
