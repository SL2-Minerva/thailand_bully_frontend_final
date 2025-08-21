// ** React Imports
import { useState, useEffect } from 'react'

// ** MUI Imports
import { Grid, Card, CardHeader, CardContent, Pagination } from '@mui/material'
import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableRow from '@mui/material/TableRow'
import TableHead from '@mui/material/TableHead'
import axios from 'axios'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import Switch from '@mui/material/Switch'
import { PencilOutline } from 'mdi-material-ui'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import DialogOrganizationInfo from './dialogOrganizationInfo'
import { OrganzationGroupServiceList } from 'src/services/api/organization/OrganizationApi'
import authConfig from '../../../configs/auth'
import { useRouter } from 'next/router'
import { UserPermission } from 'src/services/api/users/role'
import Translations from 'src/layouts/components/Translations'

const OrganizationGroup = () => {
  const router = useRouter()
  const [showEdit, setShowEdit] = useState<boolean>(false)
  const [showCreate, setShowCreate] = useState<boolean>(false)
  const [reload, setReload] = useState<boolean>(false)
  const [current, setCurrent] = useState<any>({})
  const [action, setAction] = useState<string>('create')
  const [page, setPage] = useState(0)
  const [pageCount, setPageCount] = useState<number>(0)

  const toggleCreate = () => {
    setAction('create')
    setShowCreate(true)
    setCurrent({})
  }
  const { resultPermission, errorUserPermission, resultIsAdmin } = UserPermission()

  const { result_organization_group_list, total, error_organization_group_list } = OrganzationGroupServiceList(
    reload,
    page
  )

  const handleChangePagination = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value - 1)
  }

  useEffect(() => {
    if (total > 0) {
      setPageCount(Math.ceil(total / 10))
    }
  }, [total])

  useEffect(() => {
    setReload(!reload)
  }, [showCreate, showEdit])

  function handleEdit(i: number) {
    setAction('edit')
    setCurrent(result_organization_group_list[i])
    setShowEdit(true)
  }

  function handleChange(index: number, i: number, event: any) {
    axios
      .put(
        authConfig.updateOrgGroup,
        { id: i, status: event.target.checked },
        {
          headers: {
            Authorization: `Bearer ${window.localStorage.getItem(authConfig.storageTokenKeyName)!}`
          }
        }
      )
      .then(() => {
        {
          setReload(!reload)
        }
      })

    // const values = [...result_organization_group_list]
    // values[index].status = event.target.checked
  }

  useEffect(() => {
    if (error_organization_group_list || errorUserPermission) {
      window.localStorage.removeItem('userData')
      window.localStorage.clear()
      localStorage.clear()
      router.push('/login')
      window.location.reload()
    }
  }, [error_organization_group_list, errorUserPermission])

  return (
    <Grid container spacing={6}>
      <Grid item md={12} xs={12}>
        <Card>
          <CardHeader title={<Translations text='Organization Group Management' />} />
          <CardContent>
            <TableContainer component={Paper}>
              {resultIsAdmin || resultPermission?.organized_group_mgt?.authorized_create ? (
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

              <Table sx={{ minWidth: 650 }} aria-label='simple table'>
                <TableHead>
                  <TableRow>
                    <TableCell>
                      <Translations text='ID' />
                    </TableCell>
                    <TableCell align='center'>
                      <Translations text='Organization Group' />
                    </TableCell>
                    <TableCell align='center'>
                      <Translations text='Description' />
                    </TableCell>
                    <TableCell align='center'>
                      <Translations text='Status' />
                    </TableCell>
                    {resultIsAdmin || resultPermission?.organized_group_mgt?.authorized_edit ? (
                      <TableCell align='center'>
                        <Translations text='Action' />
                      </TableCell>
                    ) : (
                      ''
                    )}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {result_organization_group_list &&
                    result_organization_group_list.map((row: any, index: number) => (
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
                        <TableCell align='center'>{row.organization_group_name}</TableCell>
                        <TableCell align='center'>{row.organization_group_description}</TableCell>
                        {resultIsAdmin || resultPermission?.organized_group_mgt?.authorized_edit ? (
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
            <DialogOrganizationInfo
              show={action === 'create' ? showCreate : showEdit}
              setShow={action === 'create' ? setShowCreate : setShowEdit}
              action={action}
              current={current}
              setCurrent={setCurrent}
            />
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  )
}

export default OrganizationGroup
