// ** React Imports
import { useState, useEffect, MouseEvent, useCallback } from 'react'

// ** Next Import
// import Link from 'next/link'

// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Menu from '@mui/material/Menu'
import Grid from '@mui/material/Grid'
import { DataGrid, GridColDef } from '@mui/x-data-grid'
import MenuItem from '@mui/material/MenuItem'

// import { styled } from '@mui/material/styles'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import CardHeader from '@mui/material/CardHeader'
import InputLabel from '@mui/material/InputLabel'
import FormControl from '@mui/material/FormControl'
import CardContent from '@mui/material/CardContent'
import Select, { SelectChangeEvent } from '@mui/material/Select'
import DatePicker from '@mui/lab/DatePicker'
import TextField from '@mui/material/TextField'
import AdapterDateFns from '@mui/lab/AdapterDateFns'
import LocalizationProvider from '@mui/lab/LocalizationProvider'

// ** Icons Imports
import DotsVertical from 'mdi-material-ui/DotsVertical'
import PencilOutline from 'mdi-material-ui/PencilOutline'
import DeleteOutline from 'mdi-material-ui/DeleteOutline'
import Button from '@mui/material/Button'

// ** Store Imports

// ** Custom Components Imports
import CustomChip from 'src/@core/components/mui/chip'
import CustomAvatar from 'src/@core/components/mui/avatar'

// ** Utils Import
import { getInitials } from 'src/@core/utils/get-initials'

// ** Types Imports
import { ThemeColor } from 'src/@core/layouts/types'
import { UsersType } from 'src/types/apps/userTypes'

// ** Custom Components Imports
import DialogEditUserInfo from './DialogUserInfo'
import TableHeader from 'src/views/apps/user/list/TableHeader'
import { Organization } from 'src/services/api/organization/organization'

import axios from 'axios'
import authConfig from '../../../../configs/auth'
import { API_PATH } from 'src/utils/const'
import { UserPermission } from 'src/services/api/users/role'
import moment from 'moment'
import { useRouter } from 'next/router'
import Translations from 'src/layouts/components/Translations'
import { useTranslation } from 'react-i18next'

// interface UserRoleType {
//   [key: string]: ReactElement
// }

interface UserStatusType {
  [key: string]: ThemeColor
}

// ** Vars
// const userRoleObj: UserRoleType = {
//   admin: <Laptop sx={{ mr: 2, color: 'error.main' }} />,
//   author: <CogOutline sx={{ mr: 2, color: 'warning.main' }} />,
//   editor: <PencilOutline sx={{ mr: 2, color: 'info.main' }} />,
//   maintainer: <ChartDonut sx={{ mr: 2, color: 'success.main' }} />,
//   subscriber: <AccountOutline sx={{ mr: 2, color: 'primary.main' }} />
// }

interface CellType {
  row: UsersType
}

const userStatusObj: UserStatusType = {
  active: 'success',
  pending: 'warning',
  inactive: 'secondary'
}

// // ** Styled component for the link for the avatar with image
// const AvatarWithImageLink = styled(Link)(({ theme }) => ({
//   marginRight: theme.spacing(3)
// }))
//
// // ** Styled component for the link for the avatar without image
// const AvatarWithoutImageLink = styled(Link)(({ theme }) => ({
//   textDecoration: 'none',
//   marginRight: theme.spacing(3)
// }))

// ** renders client column
const renderClient = (row: UsersType) => {
  if (row.avatar && row.avatar.length) {
    return <CustomAvatar src={row.avatar} sx={{ mr: 3, width: 34, height: 34 }} />
  } else {
    return (
      <CustomAvatar
        skin='light'
        color={row.avatarColor || 'primary'}
        sx={{ mr: 3, width: 34, height: 34, fontSize: '1rem' }}
      >
        {getInitials(row.name ? row.name : 'John Doe')}
      </CustomAvatar>
    )
  }
}

const RowOptions = ({
  id,
  current,
  show,
  setShow,
  refreshDelete,
  setRefreshDelete
}: {
  id: any
  current: any
  show: boolean
  setShow: any
  refreshDelete: boolean
  setRefreshDelete: any
}) => {
  // ** Hooks

  const [updateData, setUpdateData] = useState()

  // ** State
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)

  const rowOptionsOpen = Boolean(anchorEl)
  const { resultPermission } = UserPermission()

  const handleRowOptionsClick = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }
  const handleRowOptionsClose = () => {
    setAnchorEl(null)
  }

  const handleDelete = () => {
    axios
      .delete(`${API_PATH}/user/delete/${id}`, {
        headers: {
          Authorization: `Bearer ${window.localStorage.getItem(authConfig.storageTokenKeyName)!}`
        }
      })
      .then(async response => {
        const { data, status } = response.data
        console.log(data, status)
        handleRowOptionsClose()
        setRefreshDelete(!refreshDelete)
      })
      .catch((ex: any) => {
        console.log(ex)
      })
  }

  return (
    <>
      {!resultPermission?.user?.authorized_edit && !resultPermission?.user?.authorized_delete ? (
        <></>
      ) : (
        <>
          <IconButton size='small' onClick={handleRowOptionsClick}>
            <DotsVertical />
          </IconButton>
          <Menu
            keepMounted
            anchorEl={anchorEl}
            open={rowOptionsOpen}
            onClose={handleRowOptionsClose}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'right'
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right'
            }}
            PaperProps={{ style: { minWidth: '8rem' } }}
          >
            {resultPermission?.user?.authorized_edit ? (
              <MenuItem
                onClick={() => {
                  setShow(true)
                  setAnchorEl(null)
                  setUpdateData(current)
                }}
              >
                <PencilOutline fontSize='small' sx={{ mr: 2 }} />
                <Translations text='Edit' />
              </MenuItem>
            ) : (
              <></>
            )}

            {resultPermission?.user?.authorized_delete ? (
              <MenuItem onClick={handleDelete}>
                <DeleteOutline fontSize='small' sx={{ mr: 2 }} />
                <Translations text='Delete' />
              </MenuItem>
            ) : (
              <></>
            )}
          </Menu>
          {updateData ? (
            <DialogEditUserInfo
              show={show}
              setShow={setShow}
              action='edit'
              current={updateData}
              setCurrent={setUpdateData}
            ></DialogEditUserInfo>
          ) : (
            ''
          )}
        </>
      )}
    </>
  )
}

const UserList = () => {
  // ** State

  const [role] = useState<string>('')

  const [userName, setUserName] = useState<string>('')

  const [organization, setOrganization] = useState<string>('')
  const [value, setValue] = useState<string>('')
  const [status, setStatus] = useState<string>('')
  const [pageSize, setPageSize] = useState<number>(10)
  const [addUserOpen, setAddUserOpen] = useState<boolean>(false)
  const [date, setDate] = useState<Date | null>(new Date())
  const [endDate, setEndDate] = useState<Date | null>(new Date())
  const [reload, setReload] = useState<boolean>(false)
  const [users, setUsers] = useState<any[]>([])
  const [show, setShow] = useState<boolean>(false)
  const [refreshDelete, setRefreshDelete] = useState<boolean>(false)

  const [current, setCurrent] = useState<any>()

  //user permission
  const { resultPermission, errorUserPermission } = UserPermission()

  // ** Hooks
  const { list } = Organization.getList(reload)
  const router = useRouter()

  useEffect(() => {
    handleList()
    setReload(!reload)

    setUsers([])
  }, [organization, role, status, value, userName, date, endDate])

  useEffect(() => {
    if (errorUserPermission) {
      window.localStorage.removeItem('userData')
      window.localStorage.removeItem(authConfig.storageTokenKeyName)
      localStorage.clear()
      router.push('/login')
      window.location.reload()
    }
  }, [errorUserPermission])

  const handleList = () => {
    axios
      .get(`${API_PATH}/user/search`, {
        headers: {
          Authorization: `Bearer ${window.localStorage.getItem(authConfig.storageTokenKeyName)!}`
        },

        params: {
          page: 0,
          limit: 100000,
          name: userName,
          status: status,
          organization_id: organization,
          start_at: date ? moment(date).format('YYYY-MM-DD') : '',
          end_at: endDate ? moment(endDate).format('YYYY-MM-DD') : ''
        }
      })
      .then(async response => {
        const { data, status } = response.data
        if (status === 200) {
          setUsers(data)
          setReload(!reload)
        }
      })
      .catch((ex: any) => {
        console.log(ex)
      })
  }

  const handleFilter = useCallback((val: string) => {
    setValue(val)
  }, [])

  const handleOrganization = useCallback((e: SelectChangeEvent) => {
    setOrganization(e.target.value)
  }, [])

  const handleStatusChange = useCallback((e: SelectChangeEvent) => {
    setStatus(e.target.value)
  }, [])

  const toggleAddUserDrawer = () => setAddUserOpen(!addUserOpen)

  useEffect(() => {
    handleList()
  }, [addUserOpen, show, refreshDelete])

  const { t } = useTranslation()

  const columns: GridColDef[] = [
    {
      field: 'id',
      headerName: t('ID'),
      renderCell: index => index.api.getRowIndex(index.row.id) + 1,
      align: 'center',
      headerAlign: 'center'
    },
    {
      flex: 0.2,
      minWidth: 230,
      field: 'name',
      headerName: t('USER'),
      renderCell: ({ row }: CellType) => {
        const { name } = row

        return (
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            {renderClient(row)}
            <Box sx={{ display: 'flex', alignItems: 'flex-start', flexDirection: 'column' }}>
              <Typography
                noWrap
                component='a'
                variant='subtitle2'
                sx={{ color: 'text.primary', textDecoration: 'none' }}
              >
                {name}
              </Typography>
            </Box>
          </Box>
        )
      },
      headerAlign: 'center'
    },
    {
      flex: 0.2,
      minWidth: 250,
      field: 'email',
      headerName: t('EMAIL'),
      renderCell: ({ row }: CellType) => {
        return (
          <Typography noWrap variant='body2'>
            {row.email}
          </Typography>
        )
      },
      align: 'center',
      headerAlign: 'center'
    },
    {
      flex: 0.15,
      field: 'organization_name',
      minWidth: 150,
      headerName: t('ORGANIZATION'),
      align: 'center',
      headerAlign: 'center'
    },
    {
      flex: 0.15,
      minWidth: 120,
      headerName: t('ORGANIZATION GROUP'),
      field: 'organization_group_name',
      align: 'center',
      headerAlign: 'center'
    },
    {
      flex: 0.15,
      minWidth: 120,
      headerName: t('ORGANIZATION TYPE'),
      field: 'organization_type_name',
      align: 'center',
      headerAlign: 'center'
    },
    {
      flex: 0.1,
      minWidth: 110,
      field: 'status',
      headerName: t('STATUS'),
      renderCell: ({ row }: CellType) => {
        return (
          <CustomChip
            skin='light'
            size='small'
            label={
              row.status == '1' ? (
                <Translations text='Active' />
              ) : row.status == '2' ? (
                <Translations text='Pending' />
              ) : (
                <Translations text='Inactive' />
              )
            }
            color={userStatusObj[row.status == '1' ? 'active' : row.status == '2' ? 'pending' : 'inactive']}
            sx={{ textTransform: 'capitalize', '& .MuiChip-label': { lineHeight: '18px' } }}
          />
        )
      },
      align: 'center',
      headerAlign: 'center'
    },
    {
      flex: 0.1,
      minWidth: 90,
      sortable: false,
      field: 'actions',
      headerName: t('ACTIONS'),
      renderCell: ({ row }: CellType) => {
        return (
          <RowOptions
            id={row.id}
            current={row}
            setShow={setShow}
            show={show}
            refreshDelete={refreshDelete}
            setRefreshDelete={setRefreshDelete}
          />
        )
      },
      align: 'center',
      headerAlign: 'center'
    }
  ]

  const handleClear = () => {
    setUserName('')
    setOrganization('')
    setDate(null)
    setEndDate(null)
    setStatus('')
  }

  return (
    <>
      <Grid container spacing={6}>
        <Grid item xs={12}>
          <Card>
            <CardHeader
              title={<Translations text='User Management' />}
              sx={{ pb: 4, '& .MuiCardHeader-title': { letterSpacing: '.15px' } }}
            />
            <CardContent>
              <Grid container spacing={6}>
                <Grid item sm={4} xs={12}>
                  <FormControl fullWidth>
                    <TextField
                      autoComplete='off'
                      id='userName'
                      label={<Translations text='User Name' />}
                      value={userName}
                      onChange={e => setUserName(e.target.value)}
                    />
                  </FormControl>
                </Grid>
                <Grid item sm={4} xs={12}>
                  <FormControl fullWidth>
                    <InputLabel id='plan-select'>
                      <Translations text='Select Organization' />{' '}
                    </InputLabel>
                    <Select
                      fullWidth
                      value={organization}
                      id='select-organization'
                      label={<Translations text='Select Organization' />}
                      labelId='organization-select'
                      onChange={handleOrganization}
                      inputProps={{ placeholder: 'Select Organization' }}
                    >
                      <MenuItem value=''>All</MenuItem>
                      {list &&
                        list.map((item: any, index: number) => {
                          return (
                            <MenuItem key={index} value={item.id}>
                              {item.name}
                            </MenuItem>
                          )
                        })}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item sm={4} xs={12}>
                  <FormControl fullWidth>
                    <InputLabel id='status-select'>
                      <Translations text='Select Status' />
                    </InputLabel>
                    <Select
                      fullWidth
                      value={status}
                      id='select-status'
                      label={<Translations text='Select Status' />}
                      labelId='status-select'
                      onChange={handleStatusChange}
                      inputProps={{ placeholder: 'Select Status' }}
                    >
                      <MenuItem value=''>All</MenuItem>
                      <MenuItem value='1'>
                        <Translations text='Active' />
                      </MenuItem>
                      <MenuItem value='2'>
                        <Translations text='Pending' />
                      </MenuItem>
                      <MenuItem value='0'>
                        <Translations text='Inactive' />
                      </MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
              </Grid>

              <Grid container spacing={6} mt={2}>
                <Grid item sm={4} xs={12}>
                  <FormControl fullWidth>
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                      <DatePicker
                        label={<Translations text='Start Date' />}
                        value={date}
                        inputFormat='dd/MM/yyyy'
                        onChange={newValue => setDate(newValue)}
                        renderInput={params => (
                          <TextField
                            {...params}
                            inputProps={{
                              ...params.inputProps,
                              placeholder: t('dd/mm/yyyy')
                            }}
                          />
                        )}
                      />
                    </LocalizationProvider>
                  </FormControl>
                </Grid>
                <Grid item sm={4} xs={12}>
                  <FormControl fullWidth>
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                      <DatePicker
                        label={<Translations text='End Date' />}
                        value={endDate}
                        inputFormat='dd/MM/yyyy'
                        onChange={newValue => setEndDate(newValue)}
                        renderInput={params => (
                          <TextField
                            {...params}
                            inputProps={{
                              ...params.inputProps,
                              placeholder: t('dd/mm/yyyy')
                            }}
                          />
                        )}
                      />
                    </LocalizationProvider>
                  </FormControl>
                </Grid>
                <Grid item sm={4} xs={12} mt={2}>
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center' }}>
                    <Button
                      sx={{ mb: 2 }}
                      onClick={() => {
                        console.log('search')
                      }}
                      variant='contained'
                    >
                      <Translations text='SEARCH' />
                    </Button>
                    <Button
                      sx={{ mb: 2, ml: 3 }}
                      onClick={() => {
                        handleClear()
                      }}
                      variant='contained'
                    >
                      <Translations text='CLEAR' />
                    </Button>
                  </Box>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12}>
          <Card>
            {resultPermission?.user?.authorized_create ? (
              <TableHeader value={value} handleFilter={handleFilter} toggle={toggleAddUserDrawer} />
            ) : (
              <></>
            )}
            <DataGrid
              autoHeight
              rows={users}
              columns={columns}
              pageSize={pageSize}
              rowsPerPageOptions={[10, 25, 50]}
              sx={{ '& .MuiDataGrid-columnHeaders': { borderRadius: 0 } }}
              onPageSizeChange={(newPageSize: number) => setPageSize(newPageSize)}
              disableColumnMenu={true}
            />
          </Card>
        </Grid>
        <DialogEditUserInfo
          show={addUserOpen}
          setShow={setAddUserOpen}
          action={'create'}
          current={current}
          setCurrent={setCurrent}
        />
      </Grid>
    </>
  )
}

export default UserList
