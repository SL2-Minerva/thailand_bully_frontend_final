// ** React Imports
import React, { useState, SyntheticEvent, Fragment } from 'react'

// ** Next Import
import { useRouter } from 'next/router'

// ** MUI Imports
// import Box from '@mui/material/Box'
import Menu from '@mui/material/Menu'
import Badge from '@mui/material/Badge'
import Avatar from '@mui/material/Avatar'
import clsx from 'clsx'

// import Divider from '@mui/material/Divider'
import MenuItem from '@mui/material/MenuItem'
import { styled } from '@mui/material/styles'
import LogoutVariant from 'mdi-material-ui/LogoutVariant'

// import Typography from '@mui/material/Typography'

// ** Icons Imports
// import CogOutline from 'mdi-material-ui/CogOutline'
// import CurrencyUsd from 'mdi-material-ui/CurrencyUsd'
// import EmailOutline from 'mdi-material-ui/EmailOutline'
// import AccountOutline from 'mdi-material-ui/AccountOutline'
// import MessageOutline from 'mdi-material-ui/MessageOutline'
// import HelpCircleOutline from 'mdi-material-ui/HelpCircleOutline'

// ** Context
import { useAuth } from 'src/hooks/useAuth'
import { GetInfoTransaction } from 'src/services/api/users/users'

// ** Type Imports
import { Settings } from 'src/@core/context/settingsContext'
import { Box, Divider, Typography } from '@mui/material'
import { CogOutline } from 'mdi-material-ui'
import { createStyles, makeStyles } from '@mui/styles'
import { createTheme } from '@mui/material'
import Translations from 'src/layouts/components/Translations'

const defaultTheme = createTheme()

export const useStyles = makeStyles(
  () =>
    createStyles({
      root: {
        position: 'relative',
        overflow: 'hidden',
        width: '100%',
        height: 24,
        borderRadius: 2
      },
      value: {
        position: 'absolute',
        lineHeight: '19px',
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        fontSize: '14px'
      },
      bar: {
        height: '100%'
      }
    }),
  { defaultTheme }
)

interface Props {
  settings: Settings
}

interface ProgressBarProps {
  value: number
  color: string
}

// ** Styled Components
const BadgeContentSpan = styled('span')(({ theme }) => ({
  width: 8,
  height: 8,
  borderRadius: '50%',
  backgroundColor: theme.palette.success.main,
  boxShadow: `0 0 0 2px ${theme.palette.background.paper}`
}))

const ProgressBar = React.memo(function ProgressBar(props: ProgressBarProps) {
  const { value, color } = props
  const valueInPercent = value
  const classes = useStyles()

  return (
    <div
      className={classes.root}
      style={{
        border: `1px solid ` + color
      }}
    >
      {valueInPercent ? (
        <>
          <div className={classes.value}>{`${valueInPercent ? valueInPercent.toLocaleString() : ''}`}</div>
          <div
            className={clsx(classes.bar, {
              low: valueInPercent < 30,
              medium: valueInPercent >= 30 && valueInPercent <= 70,
              high: valueInPercent > 70
            })}
            style={{
              maxWidth: `${valueInPercent ? valueInPercent : ''}`,
              backgroundColor: color
            }}
          />
        </>
      ) : (
        ''
      )}
    </div>
  )
})

const UserDropdown = (props: Props) => {
  // ** Props
  const { settings } = props
  const { userInfoTransaction } = GetInfoTransaction()

  // ** States
  const [anchorEl, setAnchorEl] = useState<Element | null>(null)

  // ** Hooks
  const router = useRouter()
  const { logout } = useAuth()

  // ** Vars
  const { direction } = settings

  const handleDropdownOpen = (event: SyntheticEvent) => {
    setAnchorEl(event.currentTarget)
  }

  const handleDropdownClosed = (url?: string) => {
    if (url) {
      router.push(url)
    }
    setAnchorEl(null)
  }

  const styles = {
    py: 2,
    px: 4,
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    color: 'text.primary',
    textDecoration: 'none',
    '& svg': {
      fontSize: '1.375rem',
      color: 'text.secondary'
    }
  }

  const handleLogout = () => {
    logout()
    handleDropdownClosed()
    localStorage.removeItem('language')
  }

  return (
    <Fragment>
      <Badge
        overlap='circular'
        onClick={handleDropdownOpen}
        sx={{ ml: 2, cursor: 'pointer' }}
        badgeContent={<BadgeContentSpan />}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right'
        }}
      >
        <Avatar alt='User' onClick={handleDropdownOpen} sx={{ width: 40, height: 40 }} />
      </Badge>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={() => handleDropdownClosed()}
        sx={{ '& .MuiMenu-paper': { width: 300, mt: 4 } }}
        anchorOrigin={{ vertical: 'bottom', horizontal: direction === 'ltr' ? 'right' : 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: direction === 'ltr' ? 'right' : 'left' }}
      >
        <Box sx={{ pt: 2, pb: 3, px: 4 }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Badge
              overlap='circular'
              badgeContent={<BadgeContentSpan />}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right'
              }}
            >
              <Avatar alt='UserIcon' sx={{ width: '2.5rem', height: '2.5rem' }} />
            </Badge>
            <Box sx={{ display: 'flex', ml: 3, alignItems: 'flex-start', flexDirection: 'column' }}>
              <Typography sx={{ fontWeight: 600 }}>{localStorage.getItem('userName')}</Typography>
              <Typography variant='body2' sx={{ fontSize: '0.8rem', color: 'text.disabled' }}>
                {localStorage.getItem('organizationName')}
              </Typography>
            </Box>
          </Box>
        </Box>
        <Divider sx={{ mt: 0, mb: 1 }} />
        <MenuItem sx={{ p: 2 }}>
          {userInfoTransaction ? (
            <Box sx={{width: '400px'}}>
              <Typography variant='caption' sx={{fontSize: '12px'}}>
                Transaction per month start({userInfoTransaction?.transaction_start_at})
              </Typography>
              <Box sx={{ display: 'flex', mt: 2 }}>
                <ProgressBar value={Number(userInfoTransaction?.transaction_reamining)!} color='#cccc00' />
                <ProgressBar value={Number(userInfoTransaction?.transaction_limit)!} color='#666cff08' />
              </Box>
            </Box>
          ) : (
            ''
          )}
        </MenuItem>
        <Divider sx={{ mt: 0, mb: 1 }} />
        <MenuItem sx={{ p: 0 }} onClick={() => handleDropdownClosed('/pages/account-settings')}>
          <Box sx={styles}>
            <CogOutline sx={{ mr: 2 }} />
            <Translations text='Change Password' />
          </Box>
        </MenuItem>
        <MenuItem sx={{ py: 2 }} onClick={handleLogout}>
          <LogoutVariant sx={{ mr: 2, fontSize: '1.375rem', color: 'text.secondary' }} />
          <Translations text='Logout' />
        </MenuItem>

        {/* <MenuItem sx={{ p: 0 }} onClick={() => handleDropdownClosed('/apps/user/view/12')}>
          <Box sx={styles}>
            <AccountOutline sx={{ mr: 2 }} />
            Profile
          </Box>
        </MenuItem>
        <MenuItem sx={{ p: 0 }} onClick={() => handleDropdownClosed('/apps/email')}>
          <Box sx={styles}>
            <EmailOutline sx={{ mr: 2 }} />
            Inbox
          </Box>
        </MenuItem>
        <MenuItem sx={{ p: 0 }} onClick={() => handleDropdownClosed('/apps/chat')}>
          <Box sx={styles}>
            <MessageOutline sx={{ mr: 2 }} />
            Chat
          </Box>
        </MenuItem>
        <Divider />
        <MenuItem sx={{ p: 0 }} onClick={() => handleDropdownClosed('/pages/pricing')}>
          <Box sx={styles}>
            <CurrencyUsd sx={{ mr: 2 }} />
            Pricing
          </Box>
        </MenuItem>
        <MenuItem sx={{ p: 0 }} onClick={() => handleDropdownClosed('/pages/faq')}>
          <Box sx={styles}>
            <HelpCircleOutline sx={{ mr: 2 }} />
            FAQ
          </Box>
        </MenuItem>
        <Divider /> */}
      </Menu>
    </Fragment>
  )
}

export default UserDropdown
