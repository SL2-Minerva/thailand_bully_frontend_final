// ** React Imports
import { useState, useEffect } from 'react'

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
import DialogRoleInfo from './DialogRoleInfo'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import { role_list, UserPermission } from '../../../../services/api/users/role'
import axios from 'axios'
import authConfig from '../../../../configs/auth'
import { useRouter } from 'next/router'
import Translations from 'src/layouts/components/Translations'

const RoleManagement = () => {
  const router = useRouter()
  const [showDialog, setShowDialog] = useState<boolean>(false)
  const [current, setCurrent] = useState<any>({})
  const [action, setAction] = useState<string>('create')
  const [reload, setReload] = useState<boolean>(false)
  const [page, setPage] = useState(1)
  const [pageCount, setPageCount] = useState<number>(0)

  const { resultPermission, errorUserPermission, resultIsAdmin } = UserPermission()
  const { resultRoleList, total } = role_list(showDialog, page)

  const handleChangePagination = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value)
  }

  useEffect(() => {
    if (total > 0) {
      setPageCount(Math.ceil(total / 10))
    }
  }, [total])

  useEffect(() => {
    setReload(!reload)

    setTableData(resultRoleList)
  }, [showDialog])

  useEffect(() => {
    if (errorUserPermission) {
      window.localStorage.removeItem('userData')
      window.localStorage.removeItem(authConfig.storageTokenKeyName)
      localStorage.clear()
      router.push('/login')
      window.location.reload()
    }
  }, [errorUserPermission])

  function handleChange(index: number, i: number, event: any) {
    axios.put(
      authConfig.updateRole,
      { id: i, status: event.target.checked },
      {
        headers: {
          Authorization: `Bearer ${window.localStorage.getItem(authConfig.storageTokenKeyName)!}`
        }
      }
    )

    const values = [...resultRoleList]
    values[index].status = event.target.checked
    setTableData(values)
    setReload(!reload)
  }
  function handleEdit(i: number) {
    setAction('edit')
    setCurrent(resultRoleList[i])
    setShowDialog(true)
  }
  const [tableData, setTableData] = useState(resultRoleList)

  return (
    <Grid container sx={{ overflow: 'auto', minHeight: '100vh' }}>
      <Grid item xs={12}>
        <Card>
          <CardHeader
            title={<Translations text='Role Management' />}
            sx={{ pb: 4, '& .MuiCardHeader-title': { letterSpacing: '.15px' } }}
          />
          <CardContent>
            <TableContainer component={Paper}>
              {resultIsAdmin || resultPermission?.user_role?.authorized_create ? (
                <Box
                  sx={{ p: 5, pb: 3, display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'right' }}
                >
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center' }}>
                    <Button
                      sx={{ mb: 2 }}
                      onClick={() => {
                        setCurrent({})
                        setAction('create')
                        setShowDialog(true)
                      }}
                      variant='contained'
                    >
                      <Translations text='ADD ROLE' />
                    </Button>
                  </Box>
                </Box>
              ) : (
                ''
              )}

              <Table sx={{ minWidth: 650 }} aria-label='simple table'>
                <TableHead>
                  <TableRow>
                    <TableCell><Translations text='Role Name' /></TableCell>
                    <TableCell align='center'><Translations text='Description' /></TableCell>
                    <TableCell align='center'><Translations text='Status' /> </TableCell>
                    {resultIsAdmin || resultPermission?.user_role?.authorized_edit ? (
                      <TableCell align='center'><Translations text='Action' /></TableCell>
                    ) : (
                      ''
                    )}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {resultRoleList &&
                    resultRoleList.map((row: any, index: number) => (
                      <TableRow
                        key={row.id}
                        sx={{
                          '&:last-of-type td, &:last-of-type th': {
                            border: 0
                          }
                        }}
                      >
                        <TableCell component='th' scope='row'>
                          {row.user_role_name}
                        </TableCell>
                        <TableCell align='center'>{row.user_role_description}</TableCell>
                        {resultIsAdmin || resultPermission?.user_role?.authorized_edit ? (
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
                  page={page}
                  onChange={handleChangePagination}
                  variant='outlined'
                  color='primary'
                />
              ) : (
                ''
              )}
            </Box>

            {/* <DialogRoleInfo show={showDialog} setShow={setShowDialog} action='edit'  />
            <DialogRoleInfo show={addRoleOpen} setShow={setAddRoleOpen} action='create' /> */}

            <DialogRoleInfo
              show={showDialog}
              action={action}
              tableData={resultRoleList}
              table={tableData}
              current={current}
              setShow={setShowDialog}
            />
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  )
}

export default RoleManagement
