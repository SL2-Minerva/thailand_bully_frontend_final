// ** React Imports
import { useState, useCallback, useEffect } from 'react'

// ** MUI Imports
import { Grid, Card, CardHeader, CardContent } from '@mui/material'
import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableRow from '@mui/material/TableRow'
import TableHead from '@mui/material/TableHead'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import Switch from '@mui/material/Switch'
import DialogRoleInfo from './DialogRoleInfo'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import MenuItem from '@mui/material/MenuItem'
import InputLabel from '@mui/material/InputLabel'
import FormControl from '@mui/material/FormControl'
import Select, { SelectChangeEvent } from '@mui/material/Select'
import DatePicker from '@mui/lab/DatePicker'
import TextField from '@mui/material/TextField'
import AdapterDateFns from '@mui/lab/AdapterDateFns'
import LocalizationProvider from '@mui/lab/LocalizationProvider'

import { ThemeColor } from 'src/@core/layouts/types'
import CustomChip from 'src/@core/components/mui/chip'
import { userlist } from '../../../../services/api/users/users'
import { useRouter } from 'next/router'
import axios from 'axios'
import authConfig from '../../../../configs/auth'
import { API_PATH } from 'src/utils/const'
import Translations from 'src/layouts/components/Translations'
import { useTranslation } from 'react-i18next'

interface StatusType {
  [key: string]: ThemeColor
}

const StatusObj: StatusType = {
  New: 'success',
  Expired: 'warning'
}

const RegisterManagement = () => {
  const router = useRouter()
  const [showDialog, setShowDialog] = useState<boolean>(false)
  const [addRoleOpen, setAddRoleOpen] = useState<boolean>(false)

  // const toggleAddRole = () => setAddRoleOpen(!addRoleOpen)

  const [date, setDate] = useState<Date | null>(new Date())
  const [endDate, setEndDate] = useState<Date | null>(new Date())
  const [status, setStatus] = useState<string>('')

  const handleStatusChange = useCallback((e: SelectChangeEvent) => {
    setStatus(e.target.value)
  }, [])

  function handleChange(e: any, id: number) {
    if (e.target.checked) {
      const status = 1

      axios
        .post(
          `${API_PATH}/user/update/${id}`,
          { status },
          {
            headers: {
              Authorization: `Bearer ${window.localStorage.getItem(authConfig.storageTokenKeyName)!}`
            }
          }
        )
        .then(async response => {
          const { data, status } = response.data
          console.log(data, status)
        })
        .catch((ex: any) => {
          console.log(ex)
        })
    } else {
      const status = 2

      axios
        .post(
          `${API_PATH}/user/update/${id}`,
          { status },
          {
            headers: {
              Authorization: `Bearer ${window.localStorage.getItem(authConfig.storageTokenKeyName)!}`
            }
          }
        )
        .then(async response => {
          const { data, status } = response.data
          console.log(data, status)
        })
        .catch((ex: any) => {
          console.log(ex)
        })
    }
  }

  //call service
  // const { update_user } = UserService(userId)

  const { resultUserList, errorUserlist } = userlist()

  useEffect(() => {
    if (errorUserlist) {
      window.localStorage.removeItem('userData')
      window.localStorage.removeItem(authConfig.storageTokenKeyName)
      localStorage.clear()
      router.push('/login')
      window.location.reload()
    }
  }, [errorUserlist])

  const { t } = useTranslation();

  return (
    <Grid container>
      <Grid item xs={12}>
        <Card>
          <CardHeader
            title={<Translations text='Register Management' />}
            sx={{ pb: 4, '& .MuiCardHeader-title': { letterSpacing: '.15px' } }}
          />
          <CardContent>
            <Grid container spacing={6} mt={2}>
              <Grid item sm={3} xs={12}>
                <FormControl fullWidth>
                  <InputLabel id='status-select'><Translations text='Select Status'/></InputLabel>
                  <Select
                    fullWidth
                    value={status}
                    id='select-status'
                    label={<Translations text='Select Status'/>}
                    labelId='status-select'
                    onChange={handleStatusChange}
                    inputProps={{ placeholder: t('Select Status')}}
                  >
                    <MenuItem value=''><Translations text='Select Status'/> </MenuItem>
                    <MenuItem value='new'><Translations text='New'/> </MenuItem>
                    <MenuItem value='expired'><Translations text='Expired'/> </MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item sm={3} xs={12}>
                <FormControl fullWidth>
                  <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DatePicker
                      label={<Translations text='Start Date'/>}
                      value={date}
                      onChange={newValue => setDate(newValue)}
                      renderInput={params => <TextField {...params} />}
                    />
                  </LocalizationProvider>
                </FormControl>
              </Grid>
              <Grid item sm={3} xs={12}>
                <FormControl fullWidth>
                  <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DatePicker
                      label={<Translations text='End Date'/>}
                      value={endDate}
                      onChange={newValue => setEndDate(newValue)}
                      renderInput={params => <TextField {...params} />}
                    />
                  </LocalizationProvider>
                </FormControl>
              </Grid>
              <Grid item sm={3} xs={12} mt={2}>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center' }}>
                  <Button
                    sx={{ mb: 2 }}
                    onClick={() => {
                      console.log('search')
                    }}
                    variant='contained'
                  >
                    <Translations text='SEARCH'/>
                  </Button>
                </Box>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12} mt={3}>
        <Card>
          <CardHeader title={<Translations text='Registered List' />} sx={{ pb: 4, '& .MuiCardHeader-title': { letterSpacing: '.15px' } }} />
          <CardContent>
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 650 }} aria-label='simple table'>
                <TableHead>
                  <TableRow>
                    <TableCell><Translations text='ID'/></TableCell>
                    <TableCell align='center'><Translations text='NAME'/></TableCell>
                    <TableCell align='center'><Translations text='EMAIL'/></TableCell>
                    <TableCell align='center'><Translations text='PHONE NO.'/></TableCell>
                    <TableCell align='center'><Translations text='COMPANY'/></TableCell>
                    <TableCell align='center'><Translations text='DATE'/></TableCell>
                    <TableCell align='center'><Translations text='APPROVED'/></TableCell>
                    <TableCell align='center'><Translations text='STATUS'/></TableCell>
                    {/*<TableCell align='center'>Expired Date</TableCell>*/}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {resultUserList &&
                    resultUserList.map((row: any) => (
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
                        <TableCell align='center'>{row.email}</TableCell>
                        <TableCell align='center'>{row.mobile}</TableCell>
                        <TableCell align='center'>{row.company}</TableCell>
                        <TableCell align='center'>{row.created_at}</TableCell>
                        <TableCell align='center'>
                          <Switch
                            checked={row.approved}
                            onChange={e => {
                              handleChange(e, row.id)
                            }}
                          />
                        </TableCell>
                        {/*<TableCell align='center'>{row.expired_date}</TableCell>*/}
                        <TableCell align='center'>
                          <CustomChip
                            skin='light'
                            size='small'
                            label={'pending'}
                            color={StatusObj[row.status]}
                            sx={{ textTransform: 'capitalize', '& .MuiChip-label': { lineHeight: '18px' } }}
                          />
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </TableContainer>
            <DialogRoleInfo show={showDialog} setShow={setShowDialog} action='edit' />
            <DialogRoleInfo show={addRoleOpen} setShow={setAddRoleOpen} action='create' />
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  )
}

export default RegisterManagement
