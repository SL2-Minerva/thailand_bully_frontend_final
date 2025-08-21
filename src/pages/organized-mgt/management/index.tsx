// ** React Imports
import { useState, useCallback, useEffect } from 'react'

// ** MUI Imports
import { Grid, Card, CardHeader, CardContent, Pagination } from '@mui/material'
import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableRow from '@mui/material/TableRow'
import TableHead from '@mui/material/TableHead'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import Switch from '@mui/material/Switch'
import { PencilOutline } from 'mdi-material-ui'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import MenuItem from '@mui/material/MenuItem'
import InputLabel from '@mui/material/InputLabel'
import FormControl from '@mui/material/FormControl'
import Select, { SelectChangeEvent } from '@mui/material/Select'
import TextField from '@mui/material/TextField'

import DialogOrganization from './dialogOrganization'
import { OrganzationGroupServiceList } from 'src/services/api/organization/OrganizationApi'
import OrganizationTypeService from 'src/services/api/organization/OrganizationApi'
import { OrganizationSearchList } from 'src/services/api/organization/organization'
import axios from 'axios'
import authConfig from '../../../configs/auth'
import { useRouter } from 'next/router'
import { UserPermission } from 'src/services/api/users/role'
import Translations from 'src/layouts/components/Translations'

const OrganizedManagement = () => {
  const [showEdit, setShowEdit] = useState<boolean>(false)
  const [showCreate, setShowCreate] = useState<boolean>(false)
  const [name, setName] = useState<string>('')
  const [organization, setOrganization] = useState<string>('')
  const [organizationType, setOrganizationType] = useState<string>('')
  const [status, setStatus] = useState<string>('')
  const [reload, setReload] = useState<boolean>(false)
  const [current, setCurrent] = useState<any>({})
  const [action, setAction] = useState<string>('create')
  const [page, setPage] = useState(0)
  const [pageCount, setPageCount] = useState<number>(0)
  const router = useRouter()

  // const { list, total } = Organization.getList(reload, page)
  const { resultPermission, errorUserPermission, resultIsAdmin } = UserPermission()

  const { result_organization_group_list } = OrganzationGroupServiceList(reload)
  const { result_organization_type_list } = OrganizationTypeService(reload)
  const { resultOrganizationSearch, total } = OrganizationSearchList(
    reload,
    page,
    name,
    organization,
    organizationType,
    status
  )

  const [tableData, setTableData] = useState(resultOrganizationSearch)

  const handleOrganization = useCallback((e: SelectChangeEvent) => {
    setOrganization(e.target.value)
  }, [])

  const handleOrganizationType = useCallback((e: SelectChangeEvent) => {
    setOrganizationType(e.target.value)
  }, [])

  const handleStatusChange = useCallback((e: SelectChangeEvent) => {
    setStatus(e.target.value)
  }, [])

  const toggleCreate = () => {
    setAction('create')
    setShowCreate(!showCreate)
    setCurrent({})
  }

  const handleChangePagination = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value - 1)
  }

  useEffect(() => {
    if (total > 0) {
      setPageCount(Math.ceil(total / 10))
    }
  }, [total])

  // useEffect(() => {
  //   if (errorOrganizationSearch || errorUserPermission) {
  //     window.localStorage.removeItem('userData')
  //     window.localStorage.clear()
  //     localStorage.clear()
  //     router.push('/login')
  //     window.location.reload()
  //   }
  // }, [errorOrganizationSearch, errorUserPermission])

  useEffect(() => {
    if (errorUserPermission) {
      window.localStorage.removeItem('userData')
      window.localStorage.clear()
      localStorage.clear()
      router.push('/login')
      window.location.reload()
    }
  }, [errorUserPermission])

  useEffect(() => {
    setReload(!reload)

    setTableData(resultOrganizationSearch)
  }, [showCreate, showEdit])

  function handleChange(index: number, i: number, event: any) {
    axios.put(
      authConfig.updateOrganization,
      { id: i, status: event.target.checked },
      {
        headers: {
          Authorization: `Bearer ${window.localStorage.getItem(authConfig.storageTokenKeyName)!}`
        }
      }
    )

    const values = [...resultOrganizationSearch]
    values[index].status = event.target.checked
    setTableData(values)
    setReload(!reload)
  }

  function handleEdit(i: number) {
    setAction('edit')
    setCurrent(resultOrganizationSearch[i])
    setShowEdit(true)
    setTableData(resultOrganizationSearch)
  }

  const handleClear = () => {
    setName('')
    setOrganization('')
    setOrganizationType('')
    setStatus('')
    setPage(0)
  }

  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Card>
          <CardHeader
            title={<Translations text='Organization Management' />}
            sx={{ pb: 4, '& .MuiCardHeader-title': { letterSpacing: '.15px' } }}
          />
          <CardContent>
            <Grid container spacing={6}>
              <Grid item sm={4} xs={12}>
                <FormControl fullWidth>
                  <TextField
                    id='name'
                    value={name}
                    onChange={e => {
                      setName(e.target.value)
                    }}
                    label={<Translations text='Organization Name' />}
                  />
                </FormControl>
              </Grid>
              <Grid item sm={4} xs={12}>
                <FormControl fullWidth>
                  <InputLabel id='plan-select'>
                    <Translations text='Select Organization Group' />
                  </InputLabel>
                  <Select
                    fullWidth
                    value={organization}
                    id='select-organization'
                    label={<Translations text='Select Organization Group' />}
                    labelId='organization-select'
                    onChange={handleOrganization}
                    inputProps={{ placeholder: 'Select Organization' }}
                  >
                    <MenuItem value=''>All</MenuItem>
                    {result_organization_group_list &&
                      result_organization_group_list.map((item: any, index: number) => {
                        return (
                          <MenuItem key={index} value={item.id}>
                            {item.organization_group_name}
                          </MenuItem>
                        )
                      })}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item sm={4} xs={12}>
                <FormControl fullWidth>
                  <InputLabel id='plan-select'>
                    <Translations text='Organization Type' />
                  </InputLabel>
                  <Select
                    fullWidth
                    value={organizationType}
                    id='select-organizationType'
                    label={<Translations text='Organization Type' />}
                    labelId='organizationType-select'
                    onChange={handleOrganizationType}
                    inputProps={{ placeholder: 'Select Organization' }}
                  >
                    <MenuItem value=''>All</MenuItem>
                    {result_organization_type_list &&
                      result_organization_type_list.map((item: any, index: number) => {
                        return (
                          <MenuItem key={index} value={item.id}>
                            {item.organization_type_name}
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
                    <MenuItem value='2'>
                      <Translations text='Pending' />
                    </MenuItem>
                    <MenuItem value='1'>
                      <Translations text='Active' />
                    </MenuItem>
                    <MenuItem value='0'>
                      <Translations text='Inactive' />
                    </MenuItem>
                  </Select>
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

      <Grid item md={12} xs={12}>
        <Card>
          <CardContent>
            {resultIsAdmin || resultPermission?.organized_mgt?.authorized_create ? (
              <Box
                sx={{ p: 5, pb: 3, display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'right' }}
              >
                <Box sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center' }}>
                  <Button sx={{ mb: 2 }} onClick={toggleCreate} variant='contained'>
                    <Translations text='ADD' />
                  </Button>
                </Box>
              </Box>
            ) : (
              ''
            )}

            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 650 }} aria-label='simple table'>
                <TableHead>
                  <TableRow>
                    <TableCell>
                      <Translations text='ID' />
                    </TableCell>
                    <TableCell align='center'>
                      <Translations text='NAME' />
                    </TableCell>
                    <TableCell align='center'>
                      <Translations text='Organization Group' />
                    </TableCell>
                    <TableCell align='center'>
                      <Translations text='ORGANIZATION TYPE' />
                    </TableCell>
                    <TableCell align='center'>
                      <Translations text='Status' />
                    </TableCell>
                    {resultIsAdmin || resultPermission?.organized_mgt?.authorized_edit ? (
                      <TableCell align='center'>
                        <Translations text='Action' />
                      </TableCell>
                    ) : (
                      ''
                    )}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {resultOrganizationSearch &&
                    resultOrganizationSearch.map((row: any, index: number) => (
                      <TableRow
                        key={row.id}
                        sx={{
                          '&:last-of-type td, &:last-of-type th': {
                            border: 0
                          }
                        }}
                      >
                        <TableCell component='th' scope='row'>
                          {row.id}
                        </TableCell>
                        <TableCell align='center'>{row.name}</TableCell>
                        <TableCell align='center'>{row.group}</TableCell>
                        <TableCell align='center'>{row.type}</TableCell>
                        {resultIsAdmin || resultPermission?.organized_mgt?.authorized_edit ? (
                          <>
                            <TableCell align='center'>
                              <Switch
                                key={index}
                                checked={row.status === 1 ? true : row.status ? true : false}
                                onChange={e => handleChange(index, row.id, e)}
                              />
                            </TableCell>
                            <TableCell align='center'>
                              <a href='#' style={{ color: 'grey' }}>
                                <PencilOutline
                                  onClick={() => {
                                    handleEdit(index)
                                  }}
                                />
                              </a>
                            </TableCell>
                          </>
                        ) : (
                          <TableCell align='center'>
                            <Switch key={index} checked={row.status === 1 ? true : row.status ? true : false} />
                          </TableCell>
                        )}
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </TableContainer>
            <Box sx={{ mt: 4, display: 'flex', justifyContent: 'center' }}>
              {total > 0 ? (
                <Pagination
                  count={pageCount}
                  page={page + 1}
                  onChange={handleChangePagination}
                  variant='outlined'
                  color='primary'
                />
              ) : (
                ''
              )}
            </Box>
            <DialogOrganization
              table={tableData}
              types={result_organization_type_list}
              groups={result_organization_group_list}
              show={action === 'create' ? showCreate : showEdit}
              setShow={action === 'create' ? setShowCreate : setShowEdit}
              action={action}
              current={current}
            />
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  )
}

export default OrganizedManagement
