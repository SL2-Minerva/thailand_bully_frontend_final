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
// import ChevronLeft from 'mdi-material-ui/ChevronLeft'

// ** Layout Import
import BlankLayout from 'src/@core/layouts/BlankLayout'

// ** Hooks
import { useSettings } from 'src/@core/hooks/useSettings'

// ** Demo Imports
// import FooterIllustrationsV2 from 'src/views/pages/auth/FooterIllustrationsV2'
import { ForgetPassword } from 'src/services/api/users/users'

// Styled Components

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

const ForgotPassword = () => {
  // ** Hooks
  const theme = useTheme()
  const { settings } = useSettings()

  const [email, setEmail] = useState<string>('')
  const [showText, setShowText] = useState<boolean>(false)
  const [showErrorText, setShowErrorText] = useState<boolean>(false)

  const { call_forgotPassword } = ForgetPassword()

  // ** Vars
  const { skin } = settings
  const hidden = useMediaQuery(theme.breakpoints.down('md'))

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault()
  }

  const handleChangeEmail = (e: any) => {
    setEmail(e.target.value)
  }

  const submitData = () => {
    setShowText(false)
    setShowErrorText(false)

    if (email) {
      call_forgotPassword(email)
        .then(() => {
          setShowText(true)
          setShowErrorText(false)
        })
        .catch(ex => {
          setShowText(false)
          setShowErrorText(true)
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
                Recover Password
              </Typography>
            </Box>
            <form noValidate autoComplete='off' onSubmit={handleSubmit}>
              <TextField
                autoFocus
                type='email'
                label='Email'
                value={email}
                onChange={handleChangeEmail}
                sx={{ display: 'flex', mb: 4 }}
              />
              <Button
                onClick={submitData}
                fullWidth
                size='large'
                type='submit'
                variant='contained'
                sx={{ mb: 5.25, backgroundColor: '#311699', ':hover': { backgroundColor: '#311699' } }}
              >
                Send reset link
              </Button>
              {showText ? (
                <Typography sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                  <Link passHref href='/login'>
                    <Typography
                      component={MuiLink}
                      sx={{ display: 'flex', alignItems: 'center', color: '#311699', justifyContent: 'center' }}
                    >
                      <span>We've already set reset link to your email.</span> <br />
                    </Typography>
                  </Link>
                </Typography>
              ) : (
                ''
              )}
              {showErrorText ? (
                <Typography sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Typography
                    component={MuiLink}
                    sx={{ display: 'flex', alignItems: 'center', color: 'red', justifyContent: 'center' }}
                  >
                    <span>
                      Sorry! We can't find your email in our system. <br />
                      Please kindly check your email again that is correct or not.{' '}
                    </span>
                  </Typography>
                </Typography>
              ) : (
                ''
              )}
              <Typography sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Link passHref href='/login'>
                  <Typography
                    component={MuiLink}
                    sx={{ display: 'flex', alignItems: 'center', color: '#311699', justifyContent: 'center' }}
                  >
                    {/* <ChevronLeft sx={{ mr: 1.5, fontSize: '2rem' }} /> */}
                   <span> Back to <b><u>Sign In</u></b></span>
                  </Typography>
                </Link>
              </Typography>
            </form>
          </BoxWrapper>
        </Box>
      </RightWrapper>
    </Box>
  )
}

ForgotPassword.guestGuard = true
ForgotPassword.getLayout = (page: ReactNode) => <BlankLayout>{page}</BlankLayout>

export default ForgotPassword
