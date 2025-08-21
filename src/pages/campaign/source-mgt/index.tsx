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
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import DialogSource from './dialogSource'
import IndexSourceService from 'src/services/api/source/SourceApiAdmin' 
import axios from 'axios'
import authConfig from '../../../configs/auth'
import { UserPermission } from 'src/services/api/users/role'
import { useRouter } from 'next/router'
import Translations from 'src/layouts/components/Translations'

const SourceManagement = () => {
  const [showEdit, setShowEdit] = useState<boolean>(false)
  const [showCreate, setShowCreate] = useState<boolean>(false)

  const [reload, setReload] = useState<boolean>(false)
  const [current, setCurrent] = useState<any>({})
  const [action, setAction] = useState<string>('create')
  const [page, setPage] = useState(0)
  const [pageCount, setPageCount] = useState<number>(0)
  const router = useRouter()
  const toggleCreate = () => {
    setAction('create')
    setShowCreate(!showCreate)
    setCurrent({})
  }

  const { index_source_list, total } = IndexSourceService(reload, page)

  useEffect(() => {
    setReload(!reload)
    setTableData(index_source_list)
  }, [showCreate, showEdit])

  function handleChange(index: number, i: number, event: any) {
    axios.post(
      authConfig.updateSource,
      { id: i, status: event.target.checked },
      {
        headers: {
          Authorization: `Bearer ${window.localStorage.getItem(authConfig.storageTokenKeyName)!}`
        }
      }
    )

    const values = [...index_source_list]
    values[index].status = event.target.checked
    setTableData(values)
    setReload(!reload)
  }

  function handleEdit(i: number) {
    setAction('edit')
    setCurrent(index_source_list[i])
    setShowEdit(true)
    setTableData(index_source_list)
  }
  const [tableData, setTableData] = useState(index_source_list)
  const { resultPermission, errorUserPermission } = UserPermission()

  const handleChangePagination = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value - 1)
  }

  useEffect(() => {
    if (total > 0) {
      setPageCount(Math.ceil(total / 10))
    }
  }, [total])

  useEffect(() => {
    if (errorUserPermission) {
      window.localStorage.removeItem('userData')
      window.localStorage.removeItem(authConfig.storageTokenKeyName)
      localStorage.clear()
      router.push('/login')
      window.location.reload()
    }
  }, [errorUserPermission])

  return (
    <Grid container spacing={6}>
      <Grid item md={12} xs={12}>
        <Card>
          <CardHeader title={<Translations text='Source Management' />} />
          <CardContent>
            <TableContainer component={Paper}>
              {resultPermission?.campaign?.authorized_create ? (
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
                <></>
              )}

              <Table sx={{ minWidth: 650 }} aria-label='simple table'>
                <TableHead>
                  <TableRow>
                    <TableCell><Translations text='Source' /></TableCell>
                    <TableCell align='center'><Translations text='Description' /></TableCell>
                    <TableCell align='center'><Translations text='Status' /></TableCell>
                    {resultPermission?.campaign?.authorized_edit ? <TableCell align='center'><Translations text='Action' /></TableCell> : ''}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {index_source_list &&
                    index_source_list.map((row: any, index: number) => (
                      <TableRow
                        key={index}
                        sx={{
                          '&:last-of-type td, &:last-of-type th': {
                            border: 0
                          }
                        }}
                      >
                        <TableCell component='th' scope='row'>
                          {row.name}
                        </TableCell>
                        <TableCell align='center'>{row.description}</TableCell>
                        {resultPermission?.campaign?.authorized_edit ? (
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
            <DialogSource
              table={tableData}
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

export default SourceManagement
