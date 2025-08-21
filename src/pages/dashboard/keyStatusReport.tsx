// ** React Imports
import { ReactNode } from 'react'

// ** Types
import { ThemeColor } from 'src/@core/layouts/types'

// ** MUI Imports
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import Grid from '@mui/material/Grid'
import Divider from '@mui/material/Divider'

// ** Custom Components Imports
// import CustomChip from 'src/@core/components/mui/chip'

import CustomAvatar from 'src/@core/components/mui/avatar'

// ** Icons Imports
import ChevronUp from 'mdi-material-ui/ChevronUp'
import ChevronDown from 'mdi-material-ui/ChevronDown'
import { StyledTooltip } from './overall'
import { Information } from 'mdi-material-ui'
import { LinearProgress, Paper } from '@mui/material'
import Translations from 'src/layouts/components/Translations'

interface KeyStatusProps {
  title: string
  stats: string
  icon: ReactNode
  chipText: string
  color?: ThemeColor
  trendNumber: string
  trend?: 'positive' | 'negative'
  totalText: string
  totalValue: string
  averageText: string
  averageValue: string
  type?: string
  chartId?: string
  reportNo?: string
  loading?: boolean
}

// Styled Grid component
// const StyledGrid = styled(Grid)<GridProps>(({ theme }) => ({
//     [theme.breakpoints.down('sm')]: {
//       borderBottom: `1px solid ${theme.palette.divider}`
//     },
//     [theme.breakpoints.up('sm')]: {
//       borderRight: `1px solid ${theme.palette.divider}`
//     }
//   }))

const KeyStatusReport = (props: KeyStatusProps) => {
  // ** Props
  const {
    title,
    color,
    icon,
    stats,
    trendNumber,
    totalText,
    totalValue,
    averageText,
    averageValue,
    type,
    chartId,
    reportNo,
    loading
  } = props

  const TrendIcon = type === 'plus' ? ChevronUp : ChevronDown

  return (
    <Paper sx={{ border: `3px solid #fff`, borderRadius: 1, minHeight: 300, maxHeight: 300 }} >
      {loading && <LinearProgress style={{ width: '100%' }} />}
      <CardContent sx={{ display: 'flex', flexDirection: 'column' }}>
        <Box>
          <Grid container spacing={1}>
            <Grid item xs={2} display='flex' justifyContent='center'>
              <CustomAvatar skin='light' variant='rounded' color={color} sx={{ mt: 5 }}>
                {icon}
              </CustomAvatar>
            </Grid>
            <Grid item xs={6} mt={'20px'} display='flex' justifyContent='center'>
              <Typography variant='caption' sx={{ fontWeight: 'bold' }}>
                <Translations text={totalText} />
              </Typography>
            </Grid>
            <Grid item xs={3} display='flex' justifyContent='center'>
              <Typography variant='body1' sx={{ mt: 5, fontWeight: 'bold' }}>
                <b>{totalValue}</b>
              </Typography>
            </Grid>
          </Grid>
          <Grid container spacing={1} mb={1}>
            <Grid item xs={1} display='flex' justifyContent='center'></Grid>
            <Grid item xs={7} display='flex' justifyContent='center'>
              <Typography variant='caption' sx={{ mt: 7, fontWeight: 'bold' }}>
                {averageText}
              </Typography>
            </Grid>
            <Grid item xs={3} display='flex' justifyContent='center'>
              <Typography variant='body1' sx={{ mt: 5, fontWeight: 'bold' }}>
                {averageValue}
              </Typography>
            </Grid>
          </Grid>
        </Box>

        <Divider sx={{ mt: 2, mb: 7.5 }} />

        <Typography variant='body2' sx={{ mb: 5 }}>
          <span style={{ display: 'flex', justifyContent: 'flex-start' }}>
            {title}
            <StyledTooltip
              arrow
              title={
                <>
                  <span>
                    <Typography variant='h6' sx={{ color: 'white' }}>
                      <Translations text={chartId ? chartId : ''} />
                    </Typography>
                    <Typography variant='body2' sx={{ color: 'white' }}>
                      <Translations text={reportNo ? reportNo : ''} />
                    </Typography>
                  </span>
                </>
              }
            >
              <Information fontSize='small' style={{ marginLeft: '13px' }} />
            </StyledTooltip>
          </span>
        </Typography>
        <Grid container>
          <Grid item xs={6} display='flex' justifyContent='center'>
            <Typography variant='h6'>{stats}</Typography>
          </Grid>

          <Grid item xs={6} sx={{ dispaly: 'flex', alignItems: 'center' }}>
            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
              <Typography variant='h6' sx={{ color: type == 'plus' ? 'success.main' : 'error.main' }}>
                {trendNumber + '%'}
              </Typography>
              <TrendIcon fontSize='large' sx={{ color: type == 'plus' ? 'success.main' : 'error.main' }} />
            </Box>
          </Grid>
        </Grid>
        {/* <Box sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}></Box> */}
      </CardContent>
    </Paper>
  )
}

export default KeyStatusReport

KeyStatusReport.defaultProps = {
  color: 'primary',
  trend: 'positive'
}
