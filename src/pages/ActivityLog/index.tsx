import {
  Grid,
  Card,
  CardHeader,
  CardContent,
  FormControl,
  TextField,
  SelectChangeEvent,
  InputLabel,
  Select,
  MenuItem,
  Chip,
  Pagination,
  Box
} from '@mui/material'
import { useCallback, useEffect, useState } from 'react'
import { GetActivityLog } from 'src/services/api/activityLog/ActivityLog'
import { useRouter } from 'next/router'
import Translations from 'src/layouts/components/Translations'
import moment from 'moment'
import { DataGrid, GridColDef, GridRenderCellParams, GridValueGetterParams } from '@mui/x-data-grid'
import { useTranslation } from 'react-i18next'

const ActivityLog = () => {
  const router = useRouter()

  const [keyword, setKeyword] = useState('')
  const [statusCode, setStatusCode] = useState('')
  const [page, setPage] = useState(1)
  const [pageCount, setPageCount] = useState<number>(0)
  const { resultActivityLog, errorActivityLog, total } = GetActivityLog(keyword, statusCode, page)
  const {t} = useTranslation();

  const handleChangePagination = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value)
  }

  useEffect(() => {
    if (errorActivityLog) {
      window.localStorage.removeItem('userData')
      window.localStorage.clear()
      localStorage.clear()
      router.push('/login')
      window.location.reload()
    }
  }, [errorActivityLog])

  const handleStatusCode = useCallback((e: SelectChangeEvent) => {
    setStatusCode(e.target.value)
    setPage(1)
  }, [])

  function renderStatusCode(params: any) {
    return params.value === 200 ? (
      <Chip label={params.value} variant='outlined' color='success' />
    ) : (
      <Chip label={params.value} variant='outlined' color='error' />
    )
  }

  function renderMethod(params: any) {
    return <span style={{ color: '#4e1eec' }}>{params.value}</span>
  }

  function renderStatusText(params: any) {
    return params.value === 'สถานะปกติ' ? (
      <span style={{ color: '#4fac24' }}>{params.value}</span>
    ) : (
      <span style={{ color: '#FF4D49' }}>{params.value}</span>
    )
  }

  const columns: GridColDef[] = [
    {
      field: 'id',
      headerName: '#',
      sortable: false,
      renderCell: (params: GridRenderCellParams<any>) =>
          params.api.getRowIndexRelativeToVisibleRows(params.row.id) + 1 + (page * 10)
    },
    {
      field: 'feature',
      headerName: t('FEATURE'),
      flex: 1,
      sortable: false
    },
    {
      field: 'method',
      headerName: t('METHOD'),
      flex: 1,
      renderCell: renderMethod,
      sortable: false
    },
    {
      field: 'end_point',
      headerName: t('ENDPOINT'),
      flex: 1,
      sortable: false
    },
    {
      field: 'status',
      headerName: t('STATUS'),
      flex: 1,
      renderCell: renderStatusText,
      sortable: false
    },
    {
      field: 'status_code',
      headerName: t('Status Code'),
      flex: 1,
      renderCell: renderStatusCode,
      sortable: false
    },
    {
      field: 'request_by_name',
      headerName: t('REQUESTED BY'),
      flex: 1,
      sortable: false
    },
    {
      field: 'created_at',
      headerName: t('TIMESTAMP'),
      flex: 1,
      valueGetter: (params: GridValueGetterParams) => `${moment(params.row.created_at).format('DD-MM-YYYY HH:mm')}`,
      sortable: false
    }
  ]

  useEffect(() => {
    if (total > 0) {
      setPageCount(Math.ceil(total / 10))
    }
  }, [total])

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Card>
          <CardHeader title={<Translations text='Filter' />} />
          <CardContent>
            <Grid container spacing={6}>
              <Grid item sm={4} xs={12}>
                <FormControl fullWidth>
                  <TextField
                    fullWidth
                    value={keyword}
                    label={<Translations text='SEARCH'/>}
                    onChange={e => {
                      setKeyword(e.target.value)
                      setPage(0)
                    }}
                    placeholder={t('SEARCH')}
                    autoComplete='off'
                  />
                </FormControl>
              </Grid>
              <Grid item sm={4} xs={12}>
                <FormControl fullWidth>
                  <InputLabel id='plan-select'>
                    <Translations text='Status Code' />
                  </InputLabel>
                  <Select
                    fullWidth
                    value={statusCode}
                    id='select-status'
                    label='Select Status Code'
                    labelId='statusCode-select'
                    onChange={e => {
                      handleStatusCode(e)
                    }}
                    inputProps={{ placeholder: 'Select Status Code' }}
                  >
                    <MenuItem value=''>All</MenuItem>
                    <MenuItem value='200'>200</MenuItem>
                    <MenuItem value='400'>400</MenuItem>
                    <MenuItem value='401'>401</MenuItem>
                    <MenuItem value='403'>403</MenuItem>
                    <MenuItem value='404'>404</MenuItem>
                    <MenuItem value='500'>500</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Grid>

      <Grid item xs={12}>
        <Card>
          <CardHeader title={<Translations text='Activity Log'/>} />
          <CardContent>
            {resultActivityLog ? (
              <DataGrid
                autoHeight
                rows={resultActivityLog}
                columns={columns}
                getRowId={row => row.id}
                hideFooterPagination={true}
                pageSize={10}
                rowsPerPageOptions={[10]}
                disableColumnMenu={true}
              />
            ) : (
              ''
            )}
            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
              {total > 0 ? (
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
        </Card>
      </Grid>
    </Grid>
  )
}

export default ActivityLog
