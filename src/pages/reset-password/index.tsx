// ** React Imports
import { ReactNode, SyntheticEvent, useState } from 'react'

// ** Next Imports
import Link from 'next/link'

// ** MUI Components
import MuiLink from '@mui/material/Link'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Box, { BoxProps } from '@mui/material/Box'
import useMediaQuery from '@mui/material/useMediaQuery'
import { styled, useTheme } from '@mui/material/styles'
import Typography from '@mui/material/Typography'

// ** Icons Imports
import ChevronLeft from 'mdi-material-ui/ChevronLeft'
import { EyeOutline, EyeOffOutline } from 'mdi-material-ui'

// ** Configs

// ** Layout Import
import BlankLayout from 'src/@core/layouts/BlankLayout'

// ** Hooks
import { useSettings } from 'src/@core/hooks/useSettings'

// ** Demo Imports
// import FooterIllustrationsV2 from 'src/views/pages/auth/FooterIllustrationsV2'
import { useRouter } from 'next/router'
import { IconButton, InputAdornment } from '@mui/material'
import { ResetPasswordRequest } from 'src/services/api/users/users'

// import { ForgetPassword } from 'src/services/api/users/users'

// Styled Components
// const ForgotPasswordIllustrationWrapper = styled(Box)<BoxProps>(({ theme }) => ({
//   padding: theme.spacing(20),
//   paddingRight: '0 !important',
//   [theme.breakpoints.down('lg')]: {
//     padding: theme.spacing(10)
//   }
// }))

// const ForgotPasswordIllustration = styled('img')(({ theme }) => ({
//   maxWidth: '48rem',
//   [theme.breakpoints.down('xl')]: {
//     maxWidth: '38rem'
//   },
//   [theme.breakpoints.down('lg')]: {
//     maxWidth: '30rem'
//   }
// }))

const RightWrapper = styled(Box)<BoxProps>(({ theme }) => ({
  width: '100%',
  [theme.breakpoints.up('md')]: {
    maxWidth: 400
  },
  [theme.breakpoints.up('lg')]: {
    maxWidth: 450
  }
}))

const BoxWrapper = styled(Box)<BoxProps>(({ theme }) => ({
  width: '100%',
  [theme.breakpoints.down('md')]: {
    maxWidth: 400
  }
}))

// const TypographyStyled = styled(Typography)<TypographyProps>(({ theme }) => ({
//   fontWeight: 600,
//   letterSpacing: '0.18px',
//   marginBottom: theme.spacing(1.5),
//   [theme.breakpoints.down('md')]: { marginTop: theme.spacing(8) }
// }))

const ResetPassword = () => {
  const { query } = useRouter()

  const token = query.token as string
  const email = query.email as string

  // ** Hooks
  const theme = useTheme()
  const { settings } = useSettings()
  const [showText, setShowText] = useState<boolean>(false)
  const [showErrorResponseText, setShowErrorResponseText] = useState<boolean>(false)

  const [password, setPassword] = useState<string>('')
  const [showPassword, setShowPassword] = useState(false)

  const [confirmPassword, setConfirmPassword] = useState<string>('')
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const [showErrorText, setShowErrorText] = useState<boolean>(false)

  const { callResetPassword } = ResetPasswordRequest()

  // ** Vars
  const { skin } = settings
  const hidden = useMediaQuery(theme.breakpoints.down('md'))

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault()
  }

  const handleClickShowPassword = () => setShowPassword(show => !show)

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
  }

  const handleChangePassword = (e: any) => {
    if (e.target.name === 'confirmPassword') {
      setConfirmPassword(e.target.value)
      if (password && password !== e.target.value) {
        setShowErrorText(true)
      } else {
        setShowErrorText(false)
      }
    }

    if (e.target.name === 'password') {
      setPassword(e.target.value)
      if (confirmPassword && confirmPassword !== e.target.value) {
        setShowErrorText(true)
      } else {
        setShowErrorText(false)
      }
    }
  }

  const handleClickShowConfrimPassword = () => setShowConfirmPassword(show => !show)

  const handleMouseDownConfrimPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
  }

  const submitData = () => {
    setShowText(false)
    setShowErrorResponseText(false)

    if (password && confirmPassword && !showErrorText) {
      const data = {
        email: email || '',
        token: token || '',
        password: password
      }
      callResetPassword(data)
        .then(() => {
          setShowText(true)
          setShowErrorResponseText(false)
        })
        .catch(ex => {
          setShowText(false)
          setShowErrorResponseText(true)
          console.log('error sending email', ex)
        })
    }
  }

  return (
    <Box
      className='content-center'
      sx={{
        background:
          ' rgba(55,26,168,1) linear-gradient(to bottom, rgba(102,74,207,1) 0%, rgba(55,26,168,1) 39%,rgba(2,0,36,1) 100%)',
        backgroundImage:
          'linear-gradient(to bottom, rgba(245, 246, 252, 0.24), rgba(2,0,36,1)), url(/images/cornea.png)'
      }}
    >
      <RightWrapper sx={skin === 'bordered' && !hidden ? { borderLeft: `1px solid ${theme.palette.divider}` } : {}}>
        <Box
          sx={{
            p: 7,
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'background.paper'
          }}
        >
          <BoxWrapper>
            <Box sx={{ mb: 18 }}>
              <div className={'logo-login'}>
                <img src='/images/Logo_notext.png' alt='logo' />
              </div>
            </Box>
            <Box sx={{ mb: 7 }}>
              <Typography variant='h5' sx={{ color: '#0a0e3a', textAlign: 'center' }}>
                Reset Password
              </Typography>
            </Box>
            <form noValidate autoComplete='off' onSubmit={handleSubmit}>
              <TextField
                sx={{ display: 'flex', mb: 4 }}
                id='password'
                name='password'
                label='Password'
                variant='outlined'
                onChange={handleChangePassword}
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

              <TextField
                sx={{ display: 'flex', mb: 4 }}
                id='confirm-password'
                name='confirmPassword'
                label='Confirm Password'
                variant='outlined'
                onChange={handleChangePassword}
                value={confirmPassword}
                type={showConfirmPassword ? 'text' : 'password'}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position='end'>
                      <IconButton
                        aria-label='toggle password visibility'
                        onClick={handleClickShowConfrimPassword}
                        onMouseDown={handleMouseDownConfrimPassword}
                        edge='end'
                      >
                        {showConfirmPassword ? <EyeOutline /> : <EyeOffOutline />}
                      </IconButton>
                    </InputAdornment>
                  )
                }}
              />

              {password && confirmPassword && !showErrorText ? (
                <Button
                  onClick={submitData}
                  fullWidth
                  size='large'
                  type='submit'
                  variant='contained'
                  sx={{ mb: 5.25, backgroundColor: '#2F4F94', ':hover': { backgroundColor: '#2F4F94' } }}
                >
                  Reset Password
                </Button>
              ) : (
                <Button
                  fullWidth
                  size='large'
                  variant='contained'
                  color='secondary'
                  sx={{ mb: 5.25, backgroundColor: '#2F4F94', ':hover': { backgroundColor: '#2F4F94' } }}
                >
                  Reset Password
                </Button>
              )}

              {showErrorText ? (
                <Typography sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Typography
                    component={MuiLink}
                    sx={{ display: 'flex', alignItems: 'center', color: 'red', justifyContent: 'center' }}
                  >
                    <span>Password and Confirm Password must be same! </span>
                  </Typography>
                </Typography>
              ) : (
                ''
              )}

              {showText ? (
                <>
                  <Typography sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Typography
                      component={MuiLink}
                      sx={{ display: 'flex', alignItems: 'center', color: '#2F4F94', justifyContent: 'center' }}
                    >
                      <span>Your password is updated successfully</span>
                    </Typography>
                  </Typography>
                  <Typography sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Link passHref href='/login'>
                      <Typography
                        component={MuiLink}
                        sx={{ display: 'flex', alignItems: 'center', color: '#2F4F94', justifyContent: 'center' }}
                      >
                        <span>
                          {' '}
                          Back to{' '}
                          <b>
                            <u>Sign In</u>
                          </b>
                        </span>
                      </Typography>
                    </Link>
                  </Typography>
                </>
              ) : (
                ''
              )}
              {showErrorResponseText ? (
                <>
                  <Typography sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Typography
                      component={MuiLink}
                      sx={{ display: 'flex', alignItems: 'center', color: 'red', justifyContent: 'center' }}
                    >
                      <span>Sorry! Something went wrong while processing</span>
                    </Typography>
                  </Typography>
                  <Typography sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Link passHref href='/login'>
                      <Typography
                        component={MuiLink}
                        sx={{ display: 'flex', alignItems: 'center', color: 'primary.main', justifyContent: 'center' }}
                      >
                        <ChevronLeft sx={{ mr: 1.5, fontSize: '2rem' }} />
                        <span>Back to login</span>
                      </Typography>
                    </Link>
                  </Typography>
                </>
              ) : (
                ''
              )}
            </form>
          </BoxWrapper>
        </Box>
      </RightWrapper>
    </Box>
  )
}

ResetPassword.guestGuard = true
ResetPassword.getLayout = (page: ReactNode) => <BlankLayout>{page}</BlankLayout>

export default ResetPassword
