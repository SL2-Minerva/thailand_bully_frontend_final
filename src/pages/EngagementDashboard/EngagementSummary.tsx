import { Box, LinearProgress, Pagination, Typography, Paper } from '@mui/material'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import { StyledTooltip } from '../dashboard/overall'
import { Information } from 'mdi-material-ui'
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid'
import Translations from 'src/layouts/components/Translations'
import { useEffect } from 'react'
import { GetEngagementSummary } from 'src/services/api/dashboards/engagement/EngagementApi'

const EngagementSummary = ({
  page,
  setPage,
  pageCount,
  setPageCount,
  apiParams,
  params
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
}) => {
  // const reportNo = '4.2.025'

  const columns: GridColDef[] = [
    {
      field: 'infulencer',
      headerName: 'Influencer',
      flex: 1,
      sortable: false,
      headerAlign: 'center'
    },
    {
      field: 'total',
      headerName: 'Total',
      flex: 1,
      headerAlign: 'center',
      valueGetter: (params: GridValueGetterParams) => `${params.row.total?.toLocaleString('en-US')}`
    },
    {
      field: 'share',
      headerName: 'Share',
      flex: 1,
      headerAlign: 'center',
      valueGetter: (params: GridValueGetterParams) => `${params.row.share?.toLocaleString('en-US')}`
    },
    {
      field: 'comment',
      headerName: 'Comment',
      flex: 1,
      headerAlign: 'center',
      valueGetter: (params: GridValueGetterParams) => `${params.row.comment?.toLocaleString('en-US')}`
    },
    {
      field: 'reaction',
      headerName: 'Reaction',
      flex: 1,
      headerAlign: 'center',
      valueGetter: (params: GridValueGetterParams) => `${params.row.reaction?.toLocaleString('en-US')}`
    },
    {
      field: 'Views',
      headerName: 'Views',
      flex: 1,
      headerAlign: 'center',
      valueGetter: (params: GridValueGetterParams) => `${params.row.views?.toLocaleString('en-US')}`
    },

    {
      field: 'period_over_preiod',
      headerName: 'Period over Period',
      flex: 1,
      headerAlign: 'center',
      valueGetter: (params: GridValueGetterParams) => `${params.row.period_over_preiod?.toLocaleString('en-US')}`
    },

    {
      field: 'period_over_period_percentage',
      headerName: 'Period over Period (%)',
      flex: 1,
      headerAlign: 'center',
      valueGetter: (params: GridValueGetterParams) => `${params.row.period_over_period_percentage?.toLocaleString('en-US')}`
    }
  ]

  const { resultSummary, loadingSummary } = GetEngagementSummary(apiParams, params?.topKeyword, page)

  const handleChangePagination = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value)
  }

  useEffect(() => {
    if (resultSummary?.total > 0) {
      setPageCount(Math.ceil(resultSummary?.total / 10))
    }
  }, [resultSummary])

  return (
    <Paper style={{ border: `3px solid #fff`, borderRadius: 7 }}>
      {loadingSummary && <LinearProgress style={{ width: '100%' }} />}
      <span style={{ display: 'flex', justifyContent: 'flex-start' }}>
        <CardHeader
          title={<Translations text='Summary Engagement By Account' />}
          titleTypographyProps={{ variant: 'h6' }}
        />
        <StyledTooltip
          arrow
          title={
            <span>
              <span>
                <Typography variant='h6' sx={{ color: 'white' }}>
                  <Translations text='engagementChart21Title' />
                </Typography>
                <Typography variant='body2' sx={{ color: 'white' }}>
                  <Translations text='engagementChart21Description' />
                </Typography>
              </span>
            </span>
          }
        >
          <Information style={{ marginTop: '22px', fontSize: '29px' }} />
        </StyledTooltip>
      </span>
      <CardContent>
        {resultSummary ? (
          <>
            <DataGrid
              autoHeight
              rows={resultSummary?.data}
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
            />
          </>
        ) : (
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
        )}

        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          {resultSummary?.total > 0 ? (
            <Pagination
              count={pageCount}
              page={page}
              onChange={handleChangePagination}
              variant='outlined'
              color='primary'
            />
          ) : (
            ''
          )}
        </Box>
      </CardContent>
    </Paper>
  )
}

export default EngagementSummary
