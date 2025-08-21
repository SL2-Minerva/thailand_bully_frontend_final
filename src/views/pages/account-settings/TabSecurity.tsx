// ** React Imports
import { ChangeEvent, MouseEvent, useState } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'
import InputLabel from '@mui/material/InputLabel'
import IconButton from '@mui/material/IconButton'
import CardContent from '@mui/material/CardContent'
import FormControl from '@mui/material/FormControl'
import OutlinedInput from '@mui/material/OutlinedInput'
import InputAdornment from '@mui/material/InputAdornment'

// ** Icons Imports
// import Key from 'mdi-material-ui/Key'
import EyeOutline from 'mdi-material-ui/EyeOutline'
import EyeOffOutline from 'mdi-material-ui/EyeOffOutline'
import { Typography } from '@mui/material'
import { ChangePassword } from 'src/services/api/users/users'
import { useRouter } from 'next/router'
import Translations from 'src/layouts/components/Translations'

// ** Custom Components Imports
// import CustomAvatar from 'src/@core/components/mui/avatar'
// import LockOpenOutline from 'mdi-material-ui/LockOpenOutline'
// import Typography from '@mui/material/Typography'

interface State {
  newPassword: string
  currentPassword: string
  showNewPassword: boolean
  confirmNewPassword: string
  showCurrentPassword: boolean
  showConfirmNewPassword: boolean
}

const TabSecurity = () => {
  // ** States
  const [values, setValues] = useState<State>({
    newPassword: '',
    currentPassword: '',
    showNewPassword: false,
    confirmNewPassword: '',
    showCurrentPassword: false,
    showConfirmNewPassword: false
  })

  const router = useRouter()

  const [showErrorMessage, setShowErrorMessage] = useState<boolean>(false)
  const [errorText, setErrorText] = useState<string>('')
  const { callChangePassword } = ChangePassword()

  // Handle Current Password
  const handleCurrentPasswordChange = (prop: keyof State) => (event: ChangeEvent<HTMLInputElement>) => {
    setValues({ ...values, [prop]: event.target.value })
  }
  const handleClickShowCurrentPassword = () => {
    setValues({ ...values, showCurrentPassword: !values.showCurrentPassword })
  }
  const handleMouseDownCurrentPassword = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
  }

  // Handle New Password
  const handleNewPasswordChange = (prop: keyof State) => (event: ChangeEvent<HTMLInputElement>) => {
    setValues({ ...values, [prop]: event.target.value })
  }
  const handleClickShowNewPassword = () => {
    setValues({ ...values, showNewPassword: !values.showNewPassword })
  }
  const handleMouseDownNewPassword = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
  }

  // Handle Confirm New Password
  const handleConfirmNewPasswordChange = (prop: keyof State) => (event: ChangeEvent<HTMLInputElement>) => {
    setValues({ ...values, [prop]: event.target.value })
  }
  const handleClickShowConfirmNewPassword = () => {
    setValues({ ...values, showConfirmNewPassword: !values.showConfirmNewPassword })
  }
  const handleMouseDownConfirmNewPassword = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
  }

  const submitChanges = () => {
    if (values.newPassword === values.confirmNewPassword && values.currentPassword != values.newPassword) {
      //call api
      const formData = {
        id: localStorage.getItem('id'),
        new_password: values.newPassword,
        old_password: values.currentPassword
      }
      setShowErrorMessage(false)

      callChangePassword(formData)
        .then(data => {
          if (data) {
            router.push('/dashboard/overall')
          }
        })
        .catch((ex: any) => {
          if (ex) {
            setShowErrorMessage(true)
            setErrorText(ex?.response?.data?.msg)
          }
        })
    } else if (values.currentPassword === values.newPassword){
      setShowErrorMessage(true)
      setErrorText('Current Password and New Password cant be the same! Please check again.')
    } else {
      setShowErrorMessage(true)
      setErrorText('New Password and Confirm Password must be the same! Please check again.')
    }
  }

  return (
    <form>
      <CardContent>
        <Grid container spacing={6}>
          <Grid item xs={12} sm={6} sx={{ mt: 5, mb: [0, 6] }}>
            <Grid container spacing={6}>
              <Grid item xs={12}>
                <FormControl fullWidth>
                  <InputLabel htmlFor='account-settings-current-password'>
                    {' '}
                    <Translations text='Current Password' />{' '}
                  </InputLabel>
                  <OutlinedInput
                    required
                    label={<Translations text='Current Password' />}
                    value={values.currentPassword}
                    id='account-settings-current-password'
                    type={values.showCurrentPassword ? 'text' : 'password'}
                    onChange={handleCurrentPasswordChange('currentPassword')}
                    endAdornment={
                      <InputAdornment position='end'>
                        <IconButton
                          edge='end'
                          aria-label='toggle password visibility'
                          onClick={handleClickShowCurrentPassword}
                          onMouseDown={handleMouseDownCurrentPassword}
                        >
                          {values.showCurrentPassword ? <EyeOutline /> : <EyeOffOutline />}
                        </IconButton>
                      </InputAdornment>
                    }
                  />
                </FormControl>
              </Grid>

              <Grid item xs={12}>
                <FormControl fullWidth>
                  <InputLabel htmlFor='account-settings-new-password'>
                    <Translations text='New Password' />
                  </InputLabel>
                  <OutlinedInput
                    required
                    label={<Translations text='New Password' />}
                    value={values.newPassword}
                    id='account-settings-new-password'
                    onChange={handleNewPasswordChange('newPassword')}
                    type={values.showNewPassword ? 'text' : 'password'}
                    endAdornment={
                      <InputAdornment position='end'>
                        <IconButton
                          edge='end'
                          onClick={handleClickShowNewPassword}
                          aria-label='toggle password visibility'
                          onMouseDown={handleMouseDownNewPassword}
                        >
                          {values.showNewPassword ? <EyeOutline /> : <EyeOffOutline />}
                        </IconButton>
                      </InputAdornment>
                    }
                  />
                </FormControl>
              </Grid>

              <Grid item xs={12}>
                <FormControl fullWidth>
                  <InputLabel htmlFor='account-settings-confirm-new-password'>
                    <Translations text='Confirm New Password' />
                  </InputLabel>
                  <OutlinedInput
                    required
                    label={<Translations text='Confirm New Password' />}
                    value={values.confirmNewPassword}
                    id='account-settings-confirm-new-password'
                    type={values.showConfirmNewPassword ? 'text' : 'password'}
                    onChange={handleConfirmNewPasswordChange('confirmNewPassword')}
                    endAdornment={
                      <InputAdornment position='end'>
                        <IconButton
                          edge='end'
                          aria-label='toggle password visibility'
                          onClick={handleClickShowConfirmNewPassword}
                          onMouseDown={handleMouseDownConfirmNewPassword}
                        >
                          {values.showConfirmNewPassword ? <EyeOutline /> : <EyeOffOutline />}
                        </IconButton>
                      </InputAdornment>
                    }
                  />
                </FormControl>
              </Grid>

              <Grid item xs={12}>
                {showErrorMessage ? (
                  <Typography variant='body2' sx={{ color: 'red' }}>
                    <Translations text='Old Password' />
                  </Typography>
                ) : (
                  ''
                )}
              </Grid>
            </Grid>
          </Grid>

          <Grid item sm={6} xs={12} sx={{ display: 'flex', mt: 2.5, alignItems: 'flex-end', justifyContent: 'center' }}>
            {/* <img alt='avatar' src='/images/pages/account-settings-security-illustration.png' /> */}
          </Grid>
        </Grid>

        <Divider sx={{ mt: 0, mb: 6 }} />

        {/* <Box sx={{ mb: 11, display: 'flex', alignItems: 'center' }}>
          <Key sx={{ mr: 4 }} />
          <Typography variant='h5'>Two-factor authentication</Typography>
        </Box>

        <Box sx={{ mb: 11, display: 'flex', justifyContent: 'center' }}>
          <Box
            sx={{
              maxWidth: 440,
              display: 'flex',
              textAlign: 'center',
              alignItems: 'center',
              flexDirection: 'column'
            }}
          >
            <CustomAvatar skin='light' variant='rounded' sx={{ mb: 4, width: 48, height: 48 }}>
              <LockOpenOutline />
            </CustomAvatar>
            <Typography variant='h6' sx={{ mb: 4 }}>
              Two factor authentication is not enabled yet.
            </Typography>
            <Typography variant='body2'>
              Two-factor authentication adds an additional layer of security to your account by requiring more than just
              a password to log in. Learn more.
            </Typography>
          </Box>
        </Box> */}

        <Box>
          {values.confirmNewPassword && values.newPassword && values.currentPassword ? (
            <Button variant='contained' sx={{ mr: 4 }} onClick={submitChanges}>
              <Translations text='SAVE CHANGES' />
            </Button>
          ) : (
            <Button variant='contained' sx={{ mr: 4 }} color='secondary'>
              <Translations text='SAVE CHANGES' />
            </Button>
          )}

          <Button
            type='reset'
            variant='outlined'
            color='secondary'
            onClick={() => setValues({ ...values, currentPassword: '', newPassword: '', confirmNewPassword: '' })}
          >
            <Translations text='RESET' />
          </Button>
        </Box>
      </CardContent>
    </form>
  )
}
export default TabSecurity
