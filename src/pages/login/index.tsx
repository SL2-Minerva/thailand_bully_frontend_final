// ** React Imports
import { useState, ReactNode } from 'react'

// ** Next Imports
// import Link from 'next/link'

// ** MUI Components
// import Alert from '@mui/material/Alert'
// import MuiLink from '@mui/material/Link'
import Button from '@mui/material/Button'

// import Divider from '@mui/material/Divider'
// import Checkbox from '@mui/material/Checkbox'
import TextField from '@mui/material/TextField'
import InputLabel from '@mui/material/InputLabel'
import IconButton from '@mui/material/IconButton'
import Box from '@mui/material/Box'
import FormControl from '@mui/material/FormControl'
import OutlinedInput from '@mui/material/OutlinedInput'
import { styled } from '@mui/material/styles'

import FormHelperText from '@mui/material/FormHelperText'
import InputAdornment from '@mui/material/InputAdornment'

// import MuiFormControlLabel, { FormControlLabelProps } from '@mui/material/FormControlLabel'
import Typography from '@mui/material/Typography'

// ** Icons Imports
// import Google from 'mdi-material-ui/Google'
// import Github from 'mdi-material-ui/Github'
// import Twitter from 'mdi-material-ui/Twitter'
// import Facebook from 'mdi-material-ui/Facebook'
import EyeOutline from 'mdi-material-ui/EyeOutline'
import EyeOffOutline from 'mdi-material-ui/EyeOffOutline'

// ** Third Party Imports
import * as yup from 'yup'
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

// ** Hooks
import { useAuth } from 'src/hooks/useAuth'

// import useBgColor from 'src/@core/hooks/useBgColor'
// import { useSettings } from 'src/@core/hooks/useSettings'

// ** Configs
// import themeConfig from 'src/configs/themeConfig'

// ** Layout Import
import BlankLayout from 'src/@core/layouts/BlankLayout'

// ** Demo Imports
// import FooterIllustrationsV2 from 'src/views/pages/auth/FooterIllustrationsV2'
import MuiCard, { CardProps } from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'

// import FooterIllustrationsV1 from 'src/views/pages/auth/FooterIllustrationsV1'

// ** Styled Components
const Card = styled(MuiCard)<CardProps>(({ theme }) => ({
  [theme.breakpoints.up('sm')]: { width: 450 }
}))

const schema = yup.object().shape({
  username: yup.string().email().required(),
  password: yup.string().min(5).required()
})

// const defaultValues = {
//   password: '456123',
//   username: 'admin_007@test.com'
// }

const defaultValues = {
  password: '',
  username: ''
}

interface FormData {
  username: string
  password: string
}

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState<boolean>(false)

  // ** Hooks
  const auth = useAuth()

  // const theme = useTheme()
  // const bgClasses = useBgColor()
  // const { settings } = useSettings()

  // ** Vars
  // const { skin } = settings

  const {
    control,
    setError,
    handleSubmit,
    formState: { errors }
  } = useForm({
    defaultValues,
    mode: 'onBlur',
    resolver: yupResolver(schema)
  })

  const onSubmit = (data: FormData) => {
    const { username, password } = data

    auth.login({ username, password }, () => {
      setError('username', {
        type: 'manual',
        message: 'Email or Password is invalid'
      })
    })
  }

  // const imageSource = skin === 'bordered' ? 'auth-v2-login-illustration-bordered' : 'auth-v2-login-illustration'

  return (
    <>
      <Box
        className='content-center'
        sx={{
          // background: ' #122E6F linear-gradient(to bottom, #456FCA, #2F4F94,#1F3D80)'

          background: 'linear-gradient(to bottom, #FFFFFF 40%, #1F3D80 40%)'

          // backgroundImage:
          //   'linear-gradient(to bottom, rgba(245, 246, 252, 0.24), rgba(2,0,36,1)), url(/images/cornea.png)'
        }}
      >
        <Card sx={{ zIndex: 1, borderRadius: '0px', height: '70vh', alignContent: 'center' }}>
          <CardContent sx={{ p: theme => `${theme.spacing(13, 7, 6.5)} !important` }}>
            {/* <Box sx={{ mb: 17 }}>
              <div className={'logo-login'}>
                <img src='/images/Logo_notext.png' alt='logo' />
              </div>
            </Box> */}
            {/* <Box sx={{ mb: 7 }}>
              <Typography variant='h5' sx={{ color: '#122E6F', textAlign: 'center', fontWeight: '600' }}>
                Log in
              </Typography>
            </Box> */}
            <Box>
              <Typography variant='h4' sx={{ color: '#122E6F', textAlign: 'center', fontWeight: '700' }}>
                WELCOME
              </Typography>
            </Box>
            <Box sx={{ mb: 7 }}>
              <Typography sx={{ color: '#122E6F', textAlign: 'center', fontWeight: '500' }}>
                Log in to SocialGuard
              </Typography>
            </Box>

            <form noValidate autoComplete='off' onSubmit={handleSubmit(onSubmit)}>
              <FormControl fullWidth sx={{ mb: 8 }}>
                <Controller
                  name='username'
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { value, onChange, onBlur } }) => (
                    <TextField
                      autoFocus
                      label='Email'
                      value={value}
                      onBlur={onBlur}
                      onChange={onChange}
                      error={Boolean(errors.username)}
                      placeholder='user@gmail.com'
                    />
                  )}
                />
                {errors.username && (
                  <FormHelperText sx={{ color: 'error.main' }}>{errors.username.message}</FormHelperText>
                )}
              </FormControl>
              <FormControl fullWidth>
                <InputLabel htmlFor='auth-login-v2-password' error={Boolean(errors.password)}>
                  Password
                </InputLabel>
                <Controller
                  name='password'
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { value, onChange, onBlur } }) => (
                    <OutlinedInput
                      value={value}
                      onBlur={onBlur}
                      label='Password'
                      onChange={onChange}
                      id='auth-login-v2-password'
                      error={Boolean(errors.password)}
                      type={showPassword ? 'text' : 'password'}
                      endAdornment={
                        <InputAdornment position='end'>
                          <IconButton
                            edge='end'
                            onMouseDown={e => e.preventDefault()}
                            onClick={() => setShowPassword(!showPassword)}
                          >
                            {showPassword ? <EyeOutline /> : <EyeOffOutline />}
                          </IconButton>
                        </InputAdornment>
                      }
                    />
                  )}
                />
                {errors.password && (
                  <FormHelperText sx={{ color: 'error.main' }} id=''>
                    {errors.password.message}
                  </FormHelperText>
                )}
              </FormControl>

              <Box
                sx={{
                  mb: 2,
                  mt: 3,
                  display: 'flex',
                  alignItems: 'center',
                  flexWrap: 'wrap',
                  justifyContent: 'space-between'
                }}
              >
                <span></span>

                {/* <Link passHref href='/forgot-password'>
                  <Typography component={MuiLink} variant='body2' sx={{ color: '#2F4F94' }}>
                    <u>Forgot my password</u>
                  </Typography>
                </Link> */}
              </Box>

              <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                <Button
                  size='large'
                  type='submit'
                  variant='contained'
                  sx={{
                    mb: 7,
                    mt: 3,
                    backgroundColor: '#2F4F94',
                    ':hover': { backgroundColor: '#2F4F94' },
                    width: '8vw',
                    textTransform: 'none'
                  }}
                >
                  Log in
                </Button>
              </Box>
            </form>
          </CardContent>
        </Card>
        <Card sx={{ backgroundColor: '#2F4F94', height: '70vh', alignContent: 'center', borderRadius: '0px' }}>
          <CardContent sx={{ p: theme => `${theme.spacing(13, 7, 6.5)} !important` }}>
            <Box style={{ display: 'Flex', justifyContent: 'center' }}>
              {/* <img src='' alt='' /> */}
              {/* <img src='/images/Logo_notext_dark.png' alt='logo' style={{ width: '30%', paddingBottom: '10px' }} /> */}
              <img
                src='/images/Logo_Horizontal2_dark.png'
                alt='logo'
                style={{ width: '100%', paddingBottom: '10px', paddingRight: '20px' }}
              />
            </Box>
            {/* <Box>
              <Typography variant='h4' sx={{ color: '#FFFFFF', textAlign: 'center', mb: '10px' }}>
                WELCOME
              </Typography>
            </Box>
            <Box sx={{ mb: 7 }}>
              <Typography sx={{ color: '#FFFFFF', textAlign: 'center', fontSize: '15px' }}>
                Log in to SocialGuard
              </Typography>
            </Box> */}
          </CardContent>
        </Card>
        {/* <FooterIllustrationsV1 /> */}
      </Box>

      <Box
        sx={{
          position: 'absolute',
          bottom: '1%',
          left: '2%'
        }}
        className='desktop'
      >
        <Typography
          sx={{ mr: 2, color: 'white', mb: '8px' }}
        >{`Copyright © 2025 by MINERVA CONSULTANT CO.,LTD. All right reserved.`}</Typography>

        <Box sx={{ position: 'absolute', bottom: '2px', right: '4%' }}>
          <Box className='logo-login-footer' sx={{ display: 'flex', justifyContent: 'center' }}>
            <img src='/images/footerLogo.png' alt='logo' />
            <Typography variant='body2' sx={{ color: 'white', ml: 4, mt: 5 }}>
              Granted by Thai Media Fund
              {/* <Typography variant='caption' sx={{ color: 'white', display: 'flex', justifyContent: 'center' }}>
              มอบให้โดยกองทุนสื่อไทย
            </Typography> */}
            </Typography>
            <br />
          </Box>
        </Box>
      </Box>

      <Box
        sx={{
          position: 'absolute',
          bottom: '2%'
        }}
        className='mobile table'
      >
        <Typography
          sx={{ mr: 2, color: 'white', textAlign: 'center' }}
        >{`Copyright © 2025 by MINERVA CONSULTANT CO.,LTD. All right reserved.`}</Typography>

        <Box className='logo-login-footer mobile table'>
          <img
            src='/images/footerLogo.png'
            alt='logo'
            style={{ display: 'block', marginLeft: 'auto', marginRight: 'auto' }}
          />
          <br />
          <Typography variant='body2' sx={{ color: 'white', ml: 4, display: 'flex', justifyContent: 'center' }}>
            Granted by Thai Media Fund
            {/* <Typography variant='caption' sx={{ color: 'white', display: 'flex', justifyContent: 'center' }}>
              มอบให้โดยกองทุนสื่อไทย
            </Typography> */}
          </Typography>
        </Box>
      </Box>
    </>
  )
}

LoginPage.getLayout = (page: ReactNode) => <BlankLayout>{page}</BlankLayout>

LoginPage.guestGuard = true

export default LoginPage
