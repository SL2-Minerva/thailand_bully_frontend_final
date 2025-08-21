// ** React Imports
import { Ref, forwardRef, ReactElement, useState, useEffect } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import Dialog from '@mui/material/Dialog'
import Button from '@mui/material/Button'
import MenuItem from '@mui/material/MenuItem'
import TextField from '@mui/material/TextField'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import InputLabel from '@mui/material/InputLabel'
import FormControl from '@mui/material/FormControl'
import Fade, { FadeProps } from '@mui/material/Fade'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import Select from '@mui/material/Select'

import { EyeOutline, EyeOffOutline } from 'mdi-material-ui'

import { Organization } from 'src/services/api/organization/organization'
import axios from 'axios'
import authConfig from '../../../../configs/auth'
import { API_PATH } from 'src/utils/const'
import { UserPermission, role_list } from '../../../../services/api/users/role'

// ** Icons Imports
import Close from 'mdi-material-ui/Close'
import { FormControlLabel, InputAdornment, Switch } from '@mui/material'
import { useTranslation } from 'react-i18next'
import Translations from 'src/layouts/components/Translations'

const Transition = forwardRef(function Transition(
  props: FadeProps & { children?: ReactElement<any, any> },
  ref: Ref<unknown>
) {
  return <Fade ref={ref} {...props} />
})

interface DialogInfoProps {
  show: boolean
  setShow: any
  action: string
  current?: any
  setCurrent?: any
}

const DialogEditUserInfo = (props: DialogInfoProps) => {
  const { show, setShow, action, current, setCurrent } = props

  const { resultIsAdmin } = UserPermission()

  const [organization, setOrganization] = useState<any>(current?.organization_id ?? '')
  const [name, setName] = useState<string>(current?.name ?? '')
  const [email, setEmail] = useState<string>(current?.email ?? '')
  const [password, setPassword] = useState<string>(current?.password ?? '')
  const [company, setCompany] = useState<string>(current?.company ?? '')
  const [role_id, setRole] = useState<any>(current?.role_id ?? '')
  const [status, setStatus] = useState<string>(current?.status ?? '')
  const [showPassword, setShowPassword] = useState(false)
  const [isAdmin, setIsAdmin] = useState<boolean | number>(current?.is_admin ?? false)

  const handleClickShowPassword = () => setShowPassword(show => !show)

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
  }

  const { list } = Organization.getList()
  const { resultRoleList } = role_list()

  const handleSummit = () => {
    if (action === 'edit') {
      axios
        .post(
          `${API_PATH}/user/update/${current?.id}`,
          { name, email, company, organization_id: organization, role_id, status, is_admin: isAdmin },
          {
            headers: {
              Authorization: `Bearer ${window.localStorage.getItem(authConfig.storageTokenKeyName)!}`
            }
          }
        )
        .then(async response => {
          const { data, status } = response.data
          console.log(data, status)

          setShow(false)
          setCurrent()
          onClose()
        })
        .catch((ex: any) => {
          console.log(ex)
          setCurrent()
        })
    } else {
      axios
        .post(
          `${API_PATH}/user/create/`,
          { name, password, email, company, organization_id: organization, role_id, status, is_admin: isAdmin },
          {
            headers: {
              Authorization: `Bearer ${window.localStorage.getItem(authConfig.storageTokenKeyName)!}`
            }
          }
        )
        .then(async response => {
          const { data, status } = response.data
          console.log(data, status)

          setCurrent()
          onClose()
          setShow(false)
        })
        .catch((ex: any) => {
          console.log(ex)

          setCurrent()
        })
    }
  }

  const onClose = () => {
    setOrganization('')
    setName('')
    setEmail('')
    setCompany('')
    setRole('')
    setStatus('')
    setPassword('')
    setIsAdmin(current?.is_admin ?? false)
  }

  const handleChangeAdmin = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsAdmin(event.target.checked ? 1 : 0)
  }

  useEffect(() => {
    if (action === 'create') {
      onClose()
    }
  }, [action])

  const { t } = useTranslation()

  return (
    <Card>
      <Dialog
        fullWidth
        open={show}
        maxWidth='md'
        scroll='body'
        onClose={() => {
          setShow(false)
          onClose()
          setCurrent()
        }}
        TransitionComponent={Transition}
        onBackdropClick={() => {
          setShow(false)
          onClose()
          setCurrent()
        }}
      >
        <DialogContent sx={{ pb: 6, px: { xs: 8, sm: 15 }, pt: { xs: 8, sm: 12.5 }, position: 'relative' }}>
          <IconButton
            size='small'
            onClick={() => {
              setShow(false)
              onClose()
              setCurrent()
            }}
            sx={{ position: 'absolute', right: '1rem', top: '1rem' }}
          >
            <Close />
          </IconButton>
          <Box sx={{ mb: 8, textAlign: 'center' }}>
            <Typography variant='h5' sx={{ mb: 3, lineHeight: '2rem' }}>
              {action === 'edit' ? <> {t('Edit User Information')} </> : <> {t('Create User Information')} </>}
            </Typography>
          </Box>
          <Grid container spacing={6}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                value={name}
                label={<Translations text='Full Name' />}
                onChange={e => setName(e.target.value)}
                placeholder='johnDoe'
                autoComplete='off'
              />
            </Grid>
            {action === 'edit' ? (
              ''
            ) : (
              <Grid item sm={6} xs={12}>
                <TextField
                  fullWidth
                  id='filled-password-input'
                  label={<Translations text='Password' />}
                  autoComplete='new-password'
                  variant='outlined'
                  onChange={e => setPassword(e.target.value)}
                  value={password}
                  type={showPassword ? 'text' : 'password'}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position='end'>
                        <IconButton
                          aria-label='toggle password visibility'
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                          edge='end'
                        >
                          {showPassword ? <EyeOutline /> : <EyeOffOutline />}
                        </IconButton>
                      </InputAdornment>
                    )
                  }}
                />
              </Grid>
            )}

            <Grid item sm={6} xs={12}>
              <TextField
                fullWidth
                label={<Translations text='EMAIL' />}
                onChange={e => setEmail(e.target.value)}
                value={email}
                placeholder='johnDoe@email.com'
              />
            </Grid>
            <Grid item sm={6} xs={12}>
              <TextField
                fullWidth
                label={<Translations text='Company' />}
                onChange={e => setCompany(e.target.value)}
                value={company}
                placeholder=''
              />
            </Grid>
            <Grid item sm={6} xs={12}>
              <FormControl fullWidth>
                <InputLabel id='role-select'>{<Translations text='Role' />}</InputLabel>
                <Select
                  fullWidth
                  labelId='role-select'
                  label={<Translations text='Role' />}
                  value={role_id}
                  onChange={e => setRole(e.target.value)}
                >
                  {resultRoleList &&
                    resultRoleList.map((item: any, index: number) => {
                      return (
                        <MenuItem key={index} value={item.id}>
                          {item.user_role_name}
                        </MenuItem>
                      )
                    })}
                </Select>
              </FormControl>
            </Grid>
            <Grid item sm={6} xs={12}>
              <FormControl fullWidth>
                <InputLabel id='organization-select'>{<Translations text='Organization' />}</InputLabel>
                <Select
                  fullWidth
                  labelId='organization-select'
                  value={organization}
                  label={<Translations text='Organization' />}
                  onChange={e => setOrganization(e.target.value)}
                >
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
            <Grid item sm={6} xs={12}>
              <FormControl fullWidth>
                <InputLabel id='status-select'>
                  <Translations text='Select Status' />
                </InputLabel>
                <Select
                  fullWidth
                  id='select-status'
                  label={<Translations text='Select Status' />}
                  labelId='status-select'
                  value={status}
                  onChange={e => setStatus(e.target.value)}
                  inputProps={{ placeholder: t('Select status') }}
                >
                  <MenuItem value=''>
                    <Translations text='Select Status' />
                  </MenuItem>
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

            {resultIsAdmin === 1 || resultIsAdmin ? (
              <Grid item sm={6} xs={12} mt={3}>
                <FormControl>
                  <FormControlLabel
                    control={<Switch checked={isAdmin == 1 ? true : false} onChange={handleChangeAdmin} />}
                    label={<Translations text='Is Admin ?' />}
                    labelPlacement='start'
                  />
                </FormControl>
              </Grid>
            ) : (
              ''
            )}
          </Grid>
        </DialogContent>
        <DialogActions sx={{ pb: { xs: 8, sm: 12.5 }, justifyContent: 'center' }}>
          <Button variant='contained' sx={{ mr: 2 }} onClick={() => handleSummit()}>
            <Translations text='SUBMIT' />
          </Button>
          <Button
            variant='outlined'
            color='secondary'
            onClick={() => {
              setShow(false)
              setCurrent()
              onClose()
            }}
          >
            <Translations text='DISCARD' />
          </Button>
        </DialogActions>
      </Dialog>
    </Card>
  )
}

export default DialogEditUserInfo
