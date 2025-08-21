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
import { PencilOutline, TrashCanOutline } from 'mdi-material-ui'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import TextField from '@mui/material/TextField'
import Select, { SelectChangeEvent } from '@mui/material/Select'
import DatePicker from '@mui/lab/DatePicker'
import MenuItem from '@mui/material/MenuItem'
import LocalizationProvider from '@mui/lab/LocalizationProvider'
import AdapterDateFns from '@mui/lab/AdapterDateFns'
import DialogCampaign from './dialogCampaign'
import { CampaignDelete, CampaignSearchList } from 'src/services/api/campaign/CampaignAPI'
import { Organization } from 'src/services/api/organization/organization'
import DomainList from 'src/services/api/domains/DomainAPI'
import axios from 'axios'
import authConfig from '../../../configs/auth'
import { UserPermission } from 'src/services/api/users/role'
import { useRouter } from 'next/router'
import Swal from 'sweetalert2'
import Translations from 'src/layouts/components/Translations'
import { useTranslation } from 'react-i18next'

const CampaignManagement = () => {
  // const [campaignName, setCampaignName] = useState<string>('')
  const router = useRouter()
  const [campaignName, setCampaignName] = useState<string>('')

  const [organization, setOrganization] = useState<string>(localStorage.getItem('organizationId') || '')
  const [status, setStatus] = useState<string>('')
  const [date, setDate] = useState<Date | null>(null)
  const [endDate, setEndDate] = useState<Date | null>(null)
  const [showEdit, setShowEdit] = useState<boolean>(false)
  const [showCreate, setShowCreate] = useState<boolean>(false)
  const [reload, setReload] = useState<boolean>(false)
  const [current, setCurrent] = useState<any>({})
  const [action, setAction] = useState<string>('create')
  const [page, setPage] = useState(0)
  const [pageCount, setPageCount] = useState<number>(0)

  const toggleCreate = () => {
    setAction('create')
    setShowCreate(!showCreate)
    setCurrent({})
  }

  const { resultCampaiganList, total, keyword_limit, frequencyDefault } = CampaignSearchList(
    reload,
    page,
    campaignName,
    status,
    organization,
    date,
    endDate
  )

  const { result_domain_list } = DomainList()

  const { list } = Organization.getList(reload)

  const { resultPermission, resultIsAdmin, errorUserPermission, resultUserInfo } = UserPermission(reload)

  const { removeCampaign } = CampaignDelete()

  const handleOrganization = useCallback((e: SelectChangeEvent) => {
    setOrganization(e.target.value)
  }, [])

  const handleStatusChange = useCallback((e: SelectChangeEvent) => {
    setStatus(e.target.value)
  }, [])

  function handleChange(index: number, i: number, event: any) {
    axios
      .put(
        authConfig.updateCampaign,
        { id: i, status: event.target.checked },
        {
          headers: {
            Authorization: `Bearer ${window.localStorage.getItem(authConfig.storageTokenKeyName)!}`
          }
        }
      )
      .then(() => {
        const values = [...resultCampaiganList]
        values[index].status = event.target.checked
        setTableData(values)
        setReload(!reload)
      })
  }

  function handleEdit(i: number) {
    setAction('edit')
    setCurrent(resultCampaiganList[i])
    setShowEdit(true)
  }
  const [tableData, setTableData] = useState(resultCampaiganList)

  function handleSubmitSearch() {
    setReload(!reload)
    setPage(0)
  }
  const handleChangePagination = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value - 1)
  }

  const handleClear = () => {
    setCampaignName('')
    setOrganization('')
    setDate(null)
    setEndDate(null)
    setStatus('')
    setPage(0)
  }

  useEffect(() => {
    if (total > 0) {
      setPageCount(Math.ceil(total / 10))
    }
  }, [total])

  useEffect(() => {
    if (!showCreate) {
      setReload(!reload)
    }
  }, [showCreate])

  useEffect(() => {
    if (!showEdit) {
      setReload(!reload)
    }
  }, [showEdit])

  useEffect(() => {
    if (errorUserPermission) {
      window.localStorage.removeItem('userData')
      window.localStorage.removeItem(authConfig.storageTokenKeyName)
      localStorage.clear()
      router.push('/login')
      window.location.reload()
    }
  }, [errorUserPermission])

  useEffect(() => {
    setTableData(resultCampaiganList)
  }, [resultCampaiganList])

  const { t } = useTranslation()

  return (
    <Grid container spacing={6}>
      <Grid item md={12} xs={12}>
        <Card>
          <CardHeader title={<Translations text='Campaign Management' />} />
          <CardContent>
            <Grid container spacing={6}>
              <Grid item sm={4} xs={12}>
                <FormControl fullWidth>
                  <TextField
                    id='campaign'
                    onChange={e => setCampaignName(e.target.value)}
                    label={<Translations text='Campaign Name' />}
                    value={campaignName}
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
                    inputProps={{ placeholder: t('Select Organization Group') }}
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
                    inputProps={{ placeholder: t('Select Status') }}
                  >
                    <MenuItem value=''>All</MenuItem>
                    <MenuItem value='1'>
                      <Translations text='Active' />
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
                      handleSubmitSearch()
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
          <CardContent>
            <TableContainer component={Paper}>
              {resultPermission?.campaign?.authorized_create ? (
                <Box
                  sx={{ p: 5, pb: 3, display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'right' }}
                >
                  {resultUserInfo?.campaign_per_organize === null || resultUserInfo?.campaign_per_user === null ? (
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center' }}>
                      <Button sx={{ mb: 2 }} onClick={toggleCreate} variant='contained'>
                        <Translations text='ADD' />
                      </Button>
                    </Box>
                  ) : (
                    <>
                      {resultUserInfo?.campaign_per_organize > 0 && resultUserInfo?.campaign_per_user > 0 ? (
                        <Box sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center' }}>
                          <Button sx={{ mb: 2 }} onClick={toggleCreate} variant='contained'>
                            <Translations text='ADD' />
                          </Button>
                        </Box>
                      ) : (
                        ''
                      )}
                    </>
                  )}
                </Box>
              ) : (
                <></>
              )}

              <Table sx={{ minWidth: 650 }} aria-label='simple table'>
                <TableHead>
                  <TableRow>
                    <TableCell>
                      <Translations text='Campaign Name' />
                    </TableCell>
                    <TableCell align='center'>
                      <Translations text='Keyword' />
                    </TableCell>
                    <TableCell align='center'>
                      <Translations text='Domains' />
                    </TableCell>
                    <TableCell align='center'>
                      <Translations text='ORGANIZATION' />
                    </TableCell>
                    <TableCell align='center'>
                      <Translations text='Status' />
                    </TableCell>
                    <TableCell align='center'>
                      <Translations text='Created By' />
                    </TableCell>
                    {resultPermission?.campaign?.authorized_edit ? (
                      <TableCell align='center'>
                        <Translations text='Action' />
                      </TableCell>
                    ) : (
                      <></>
                    )}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {resultCampaiganList &&
                    resultCampaiganList.map((campaignList: any, index: number) => (
                      <TableRow
                        key={index}
                        sx={{
                          '&:last-of-type td, &:last-of-type th': {
                            border: 0
                          }
                        }}
                      >
                        <TableCell component='th' scope='row'>
                          {campaignList.name}
                        </TableCell>
                        <TableCell align='center'>
                          {(campaignList.keyword || []).map((keyword: any, i: number) => (
                            <div key={i}>
                              <span>
                                <b>{keyword.name} :</b>
                                {' ' + keyword.keyword_or + ', ' + keyword.keyword_and + ', ' + keyword.keyword_exclude}
                              </span>
                            </div>
                          ))}
                        </TableCell>
                        <TableCell align='center'>
                          {(result_domain_list || []).map((domain: any, domainIndex: number) => (
                            <span key={domainIndex}>
                              {domain.id === campaignList.domain_id && <span>{domain.name}</span>}
                            </span>
                          ))}
                        </TableCell>
                        <TableCell align='center'>{campaignList.organization}</TableCell>
                        {resultPermission?.campaign?.authorized_edit ? (
                          <>
                            <TableCell align='center'>
                              <Switch
                                key={index}
                                checked={campaignList.status === 1 ? true : campaignList.status ? true : false}
                                onChange={e => handleChange(index, campaignList.id, e)}
                              />
                            </TableCell>
                            <TableCell align='center'>
                              {campaignList.created_by ? campaignList.created_by : '-'}
                            </TableCell>
                            <TableCell align='center'>
                              <a href='#' style={{ color: 'grey' }}>
                                <PencilOutline
                                  onClick={() => {
                                    handleEdit(index)
                                  }}
                                />
                              </a>
                              <a href='#' style={{ color: 'grey', marginLeft: '5px' }}>
                                <TrashCanOutline
                                  onClick={() => {
                                    Swal.fire({
                                      title: 'Are you sure?',
                                      text: "You won't be able to revert this!",
                                      icon: 'warning',
                                      showCancelButton: true,
                                      confirmButtonColor: '#3085d6',
                                      cancelButtonColor: '#d33',
                                      confirmButtonText: 'Yes, delete it!'
                                    })
                                      .then(result => {
                                        if (result.isConfirmed) {
                                          removeCampaign(campaignList)
                                            .then(result => {
                                              if (result) {
                                                setReload(!reload)
                                                Swal.fire('Deleted!', 'Your file has been deleted.', 'success')
                                              } else {
                                                Swal.fire('Somenthing went wrong!', 'Please try again.', 'error')
                                              }
                                            })
                                            .catch(ex => {
                                              if (ex) {
                                                Swal.fire(
                                                  'Somenthing went wrong!',
                                                  ex?.message ? ex?.message : 'Please try again.',
                                                  'error'
                                                )
                                              }
                                            })
                                        }
                                      })
                                      .catch(ex => {
                                        if (ex) {
                                          Swal.fire('Somenthing went wrong!', 'Please try again.', 'error')
                                        }
                                      })
                                  }}
                                />
                              </a>
                            </TableCell>
                          </>
                        ) : (
                          <>
                            <TableCell align='center'>
                              <Switch
                                key={index}
                                checked={campaignList.status === 1 ? true : campaignList.status ? true : false}
                              />
                            </TableCell>
                            <TableCell align='center'>
                              {campaignList?.created_by ? campaignList?.created_by : '-'}
                            </TableCell>
                          </>
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
          </CardContent>
        </Card>
        <DialogCampaign
          table={tableData}
          show={action === 'create' ? showCreate : showEdit}
          setShow={action === 'create' ? setShowCreate : setShowEdit}
          action={action}
          current={current}
          keywordLimit={keyword_limit}
          resultIsAdmin={resultIsAdmin}
          frequencyDefault={frequencyDefault}
          reload={reload}
          setReload={setReload}
        />
      </Grid>
    </Grid>
  )
}

export default CampaignManagement
