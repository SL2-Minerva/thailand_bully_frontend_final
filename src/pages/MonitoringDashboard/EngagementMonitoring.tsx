import { LinearProgress, Typography, Paper, Button, Box, Pagination } from '@mui/material'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import { StyledTooltip } from '../dashboard/overall'
import { Information, LinkVariant, ImageOutline} from 'mdi-material-ui'
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid'
import Translations from 'src/layouts/components/Translations'
import { useEffect, useState } from 'react'
import { GetEngagementPostMonitoring } from 'src/services/api/dashboards/monitoring/MonitoringDashboard'
import DetailPostEgagement from './DetailPostEngagement'
import ExportExcel from '../VoiceDashboard/ExportExcel'
import moment from 'moment'
import ImagePopupDialog from '../dashboard/ImagePopupDialog'

// import { Box, LinearProgress, Pagination, Typography, Paper } from '@mui/material'

const EngagementMonitoring = ({
  apiParams,
  topKeyword,
  params,
  select,
  setAnchorEl,
  setIsLoading
}: {
  topKeyword: string
  params: any
  chartId: string
  highlight: boolean
  page: number
  setPage: any
  pageCount: number
  setPageCount: any
  apiParams: any
  setAnchorEl: any
  select: any
  setIsLoading: any
}) => {
  // const reportNo = '4.2.025'

  const columns: GridColDef[] = [
    {
      field: 'id',
      headerName: 'No.',
      filterable: false,
      type: 'number',
      headerAlign: 'center',
      maxWidth: 60,
      renderCell: params => params.api.getAllRowIds().indexOf(params.id) + 1 + (page - 1) * 10
    },
    {
      field: 'keyword_name',
      headerName: 'keyword',
      flex: 1,
      sortable: false,
      minWidth: 100,
      headerAlign: 'center'
    },
    {
      field: 'account_name',
      headerName: 'Account Name',
      flex: 1,
      sortable: false,
      minWidth: 150,
      headerAlign: 'center'
    },
    {
      field: 'full_message',
      headerName: 'Message Detail',
      flex: 1,
      minWidth: 150,
      headerAlign: 'center'

      //   valueGetter: (params: GridValueGetterParams) => `${params.row.total?.toLocaleString('en-US')}`
    },
    {
      field: 'post_date',
      headerName: 'Post Time',
      flex: 1,
      headerAlign: 'center',
      minWidth: 200,
      valueGetter: (params: GridValueGetterParams) => `${moment(params.row.post_date, 'YYYY/MM/DD').format('DD/MM/YYYY') + ', ' + params.row.post_time}`
    },
    {
      field: 'scrape_time',
      headerName: 'Scraping Time',
      flex: 1,
      headerAlign: 'center',
      minWidth: 200,
      valueGetter: (params: GridValueGetterParams) => `${moment(params.row.scrape_date, 'YYYY/MM/DD').format('DD/MM/YYYY') + ', ' + params.row.scrape_time}`
    },
    {
      field: 'source_name',
      headerName: 'Channel',
      flex: 1,
      headerAlign: 'center',
      renderCell: renderSourceName
    },
    { field: 'total_engagement', headerName: 'Engagement', minWidth: 100, flex: 1, headerAlign: 'center' },
    { field: 'sentiment', headerName: 'Sentiment', minWidth: 100, flex: 1, headerAlign: 'center' },
    
    {
      field: 'bully_level',
      headerName: 'Bully Level',
      flex: 1,
      minWidth: 100,
      headerAlign: 'center',
      valueGetter: (params: GridValueGetterParams) => `${params.row.bully_level}`
    },

    {
      field: 'bully_type',
      headerName: 'Bully Type',
      flex: 1,
      minWidth: 100,
      headerAlign: 'center',
      valueGetter: (params: GridValueGetterParams) => `${params.row.bully_type}`
    },
    {
      field: 'link_message',
      headerName: 'Link',
      flex: 1,
      maxWidth: 60,
      headerAlign: 'center',
      renderCell: openLink
    },
    {
      field: 'image_message',
      headerName: 'image',
      flex: 1,
      maxWidth: 60,
      headerAlign: 'center',
      renderCell: openPopup
    }
  ]

  function renderSourceName(params: any) {
    return (
      <>
        {params.value === 'facebook' ? (
          <img alt={'logo'} width={28} height={28} src={`/images/logos/facebook-round.png`} />
        ) : params.value === 'x' ? (
          <img alt={'logo'} width={25} height={25} src={`/images/logos/x-black.jpg`} />
        ) : params.value === 'youtube' ? (
          <img width={28} height={28} alt={'logo'} src={`/images/logos/youtube-text.png`} />
        ) : params.value === 'instagram' ? (
          <img width={28} alt={'logo'} height={28} src={`/images/logos/instagram.png`} />
        ) : params.value === 'pantip' ? (
          <img width={28} alt={'logo'} height={28} src={`/images/logos/pantip.png`} />
        ) : params.value === 'google' ? (
          <img width={25} alt={'logo'} height={25} src={`/images/logos/google.png`} />
        ) : params.value == 'tiktok' ? (
          <img width={34} alt={'logo'} height={34} src={`/images/logos/tiktok.png`} />
        ) : (
          <span style={{ textTransform: 'uppercase' }}>{params.value}</span>
        )}
      </>
    )
  }

  // function renderSourceName(params: any) {
  //   const sourceImage = params?.row?.source_image;

  //   return (
  //     <>
  //       {sourceImage ? (
  //         <img
  //           alt="logo"
  //           width={28}
  //           height={28}
  //           src={`https://api.cornea-demo.com/storage/${sourceImage}`}
  //           onError={(e) => {
  //             e.currentTarget.style.display = 'none';
  //           }}
  //         />
  //       ) : (
  //         <span style={{ textTransform: 'uppercase' }}>{params.value}</span>
  //       )}
  //     </>
  //   );
  // }


  function openLink(params: any) {
    return (
      <a
        href={params.value}
        onClick={event => {
          event.stopPropagation()
        }}
        target='_blank'
        rel='noopener noreferrer'
      >
        <LinkVariant fontSize='small' sx={{ color: 'blue' }} />
      </a>
    )
  }

  const [showImagePopup, setShowImagePopup] = useState(false)
  const [imageUrl, setImageUrl] = useState('')
  
  function openPopup(params: any) {
    return (
      <span
        onClick={event => {
          event.stopPropagation()
          setImageUrl(params.row.imageUrl)
          setShowImagePopup(true)
        }}
        style={{ cursor: 'pointer' }}
      >
        <ImageOutline fontSize='small' sx={{ color: 'blue' }} />
      </span>
    )
  }
  
  //   function openPopup(params: any) {
  //   return (
  //     <a
  //       href={params.value}
  //       onClick={event => {
  //         event.stopPropagation()
  //       }}
  //       target='_blank'
  //       rel='noopener noreferrer'
  //     >
  //       <ImageOutline fontSize='small' sx={{ color: 'blue' }} />
  //     </a>
  //   )
  // }

  const [pageCount, setPageCount] = useState<number>(0)
  const [page, setPage] = useState(1)

  const { resultSummary, loadingSummary, total } = GetEngagementPostMonitoring(apiParams, topKeyword, page)
  const [showDetail, setShowDetail] = useState<boolean>(false)
  const [messageId, setMessageId] = useState<string>('')

  const handleRowClick = (
    params: any // GridRowParams
    // event: any, // MuiEvent<React.MouseEvent<HTMLElement>>
    // details: any // GridCallbackDetails
  ) => {
    const message_id = params?.row?.id
    if (message_id) {
      setShowDetail(true)
      setMessageId(message_id)
    }
  }
  const handleChangePagination = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value)
  }

  useEffect(() => {
    if (total > 0) {
      const count = Math.ceil(total / 10)
      setPageCount(count)
    }
  }, [total])

  useEffect(() => {
    setPage(1)
  }, [topKeyword])

  return (
    <Paper style={{ border: `3px solid #fff`, borderRadius: 7 }}>
      {loadingSummary && <LinearProgress style={{ width: '100%' }} />}
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
        <span style={{ display: 'flex', justifyContent: 'flex-start' }}>
          <CardHeader
            title={<Translations text='Summary Engagement of Post Monitoring' />}
            titleTypographyProps={{ variant: 'h6' }}
          />
          <StyledTooltip
            arrow
            title={
              <span>
                <span>
                  <Typography variant='h6' sx={{ color: 'white' }}>
                    <Translations text='Engagement of Post Monitoring' />
                  </Typography>
                  <Typography variant='body2' sx={{ color: 'white' }}>
                    <Translations text='Engagement of Post Monitoring' />
                  </Typography>
                </span>
              </span>
            }
          >
            <Information style={{ marginTop: '22px', fontSize: '29px' }} />
          </StyledTooltip>
        </span>

        <Button variant='contained' color='warning' sx={{ m: 2 }} size='small'>
          <ExportExcel
            setIsLoading={setIsLoading}
            params={params}
            apiParams={apiParams}
            reportNo={''}
            setAnchorEl={setAnchorEl}
            select={select}
            fileName='Summary Engagement of Post Monitoring.xlsx'
            apiPath='/dashboard-monitoring/engagements/export'
          />
        </Button>
      </div>

      <CardContent>
        {resultSummary?.length > 0 ? (
          <>
            <DataGrid
              autoHeight
              rows={resultSummary}
              columns={columns}
              pageSize={10}
              rowsPerPageOptions={[10]}
              hideFooterPagination={true}
              getRowId={row => row.message_id}
              sx={{
                '& .MuiDataGrid-cell': {
                  textAlign: 'center',
                  display: 'flex',
                  justifyContent: 'center'
                }
              }}
              onRowClick={handleRowClick}
            />
            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
              <Pagination
                count={pageCount}
                page={page}
                onChange={handleChangePagination}
                variant='outlined'
                color='primary'
              />
            </Box>
          </>
        ) : (
          <>
            <div
              style={{
                height: 300,
                padding: '170px 0',
                textAlign: 'center',
                verticalAlign: 'middle',
                color: '#80808059'
              }}
            >
              <Translations text='no data' />
            </div>
            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
              <Pagination
                count={pageCount}
                page={page}
                onChange={handleChangePagination}
                variant='outlined'
                color='primary'
              />
            </Box>
          </>
        )}
      </CardContent>

      {showDetail && messageId ? (
        <DetailPostEgagement show={showDetail} setShow={setShowDetail} messageId={messageId} params={apiParams} />
      ) : (
        ''
      )}      
        <ImagePopupDialog
          showDialog={showImagePopup}
          setShowDialog={setShowImagePopup}
          imageUrl={imageUrl}
          title='Image'
        />    
    </Paper>
  )
}

export default EngagementMonitoring
