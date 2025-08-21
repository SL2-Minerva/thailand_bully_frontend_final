// ** React Imports
import { useState } from 'react'

// ** Third Party Components
// import PerfectScrollbar from 'react-perfect-scrollbar'
// import {Link} from 'react-scroll'

// ** MUI Imports
import Divider from '@mui/material/Divider'
import { styled } from '@mui/material/styles'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import MuiDrawer, { DrawerProps } from '@mui/material/Drawer'

// ** Icons Imports
import Close from 'mdi-material-ui/Close'
import { ArrowLeftDropCircle, ArrowRightDropCircle } from 'mdi-material-ui'
import { Toggler } from '../VoiceDashboard/QuickView'
import { TogglerOpen } from '../EngagementDashboard/QuickView'
import { useSettings } from 'src/@core/hooks/useSettings'

// import Translations from 'src/layouts/components/Translations'

export const Drawer = styled(MuiDrawer)<DrawerProps>(({ theme }) => ({
  width: 250,
  zIndex: theme.zIndex.modal,
  '& .MuiFormControlLabel-root': {
    marginRight: '0.6875rem'
  },
  '& .MuiDrawer-paper': {
    border: 0,
    width: 250,
    zIndex: theme.zIndex.modal,
    boxShadow: theme.shadows[9]
  }
}))

export const CustomizerSpacing = styled('div')(({ theme }) => ({
  padding: theme.spacing(5, 6)
}))

const QuickView = ({ setHighlight, setShowQuickView }: { setHighlight?: any; setShowQuickView?: any }) => {
  // ** State
  const [open, setOpen] = useState<boolean>(false)
  const [highlightText, setHightlightText] = useState<string>('')
  const { settings } = useSettings()

  const color = settings.mode === 'dark' ? 'dark' : 'light'
  const greenColor = settings.mode === 'dark' ? '#afffaf' : '#2fd12f'

  const onClose = (chartId?: string) => {
    if (chartId) {
      setHighlight(chartId)
      setHightlightText(chartId)
      setShowQuickView(true)
    }
    setOpen(false)
  }

  return (
    <div className='customizer'>
      <Toggler className='customizer-toggler' sx={{ width: '40px' }} onClick={() => setOpen(true)}>
        <ArrowLeftDropCircle fontSize='small' sx={{ color: 'common.white', ml: 3 }} />
        <p style={{ transform: 'rotate(90deg)', color: 'white', fontSize: '13px' }}>QuickView</p>
      </Toggler>
      <Drawer open={open} hideBackdrop anchor='right' variant='persistent'>
        <TogglerOpen className='customizer-toggler' sx={{ width: '40px' }} onClick={() => setOpen(false)}>
          <ArrowRightDropCircle fontSize='small' sx={{ color: 'common.white', ml: 3 }} />

          <p style={{ transform: 'rotate(90deg)', color: 'white', fontSize: '13px' }}>QuickView</p>
        </TogglerOpen>
        <Box
          className='customizer-header'
          sx={{
            position: 'relative',
            p: theme => theme.spacing(3.5, 5),
            borderBottom: theme => `1px solid ${theme.palette.divider}`
          }}
        >
          <Typography variant='h6' sx={{ fontWeight: 600, textTransform: 'uppercase' }}>
            Quick View
          </Typography>
          <IconButton
            onClick={() => onClose()}
            sx={{
              right: 20,
              top: '50%',
              position: 'absolute',
              color: 'text.secondary',
              transform: 'translateY(-50%)'
            }}
          >
            <Close fontSize='small' />
          </IconButton>
        </Box>
        {/* <PerfectScrollbar options={{ wheelPropagation: false }}> */}
        <CustomizerSpacing className='customizer-body'>
          <Typography
            component='p'
            variant='caption'
            sx={{ mb: 4, mt: 4, color: 'text.disabled', textTransform: 'uppercase' }}
          >
            Charts
          </Typography>

          {/* <Link to="chart1" spy={true} smooth={true}>
                <Box sx={{ mb: 4, mt: 4 }} onClick={() => {onClose("chart1")}}>
                    <Typography sx={{ color : highlightText === 'chart1' ? greenColor : color  }}>Chart 1 : Percentage of  Level</Typography>
                </Box>
              </Link>
              <Divider sx={{ m: 0 }} /> */}

          <Box
            sx={{ mb: 4, mt: 4 }}
            onClick={() => {
              onClose('chart2')
            }}
          >
            <Typography sx={{ color: highlightText === 'chart2' ? greenColor : color }}>
               Level : By Date
            </Typography>
          </Box>
          <Divider sx={{ m: 0 }} />

          <Box
            sx={{ mb: 4, mt: 4 }}
            onClick={() => {
              onClose('chart3')
            }}
          >
            <Typography sx={{ color: highlightText === 'chart3' ? greenColor : color }}>
               Level : By Day
            </Typography>
          </Box>
          <Divider sx={{ m: 0 }} />

          <Box
            sx={{ mb: 4, mt: 4 }}
            onClick={() => {
              onClose('chart4')
            }}
          >
            <Typography sx={{ color: highlightText === 'chart4' ? greenColor : color }}>
               Level : By Time
            </Typography>
          </Box>
          <Divider sx={{ m: 0 }} />

          <Box
            sx={{ mb: 4, mt: 4 }}
            onClick={() => {
              onClose('chart5')
            }}
          >
            <Typography sx={{ color: highlightText === 'chart5' ? greenColor : color }}>
               Level : By Device
            </Typography>
          </Box>
          <Divider sx={{ m: 0 }} />

          <Box
            sx={{ mb: 4, mt: 4 }}
            onClick={() => {
              onClose('chart6')
            }}
          >
            <Typography sx={{ color: highlightText === 'chart6' ? greenColor : color }}>
               Level : By Account
            </Typography>
          </Box>
          <Divider sx={{ m: 0 }} />
          <Box
            sx={{ mb: 4, mt: 4 }}
            onClick={() => {
              onClose('chart7')
            }}
          >
            <Typography sx={{ color: highlightText === 'chart7' ? greenColor : color }}>
               Level : By Channel
            </Typography>
          </Box>
          <Divider sx={{ m: 0 }} />
          <Box
            sx={{ mb: 4, mt: 4 }}
            onClick={() => {
              onClose('chart8')
            }}
          >
            <Typography sx={{ color: highlightText === 'chart8' ? greenColor : color }}>
               Level : By Sentiment
            </Typography>
          </Box>
          <Divider sx={{ m: 0 }} />

          {/* <Link to="chart9" spy={true} smooth={true}>
                <Box sx={{ mb: 4, mt: 4 }} onClick={() => {onClose("chart9")}}>
                    <Typography sx={{ color : highlightText === 'chart9' ? greenColor : color  }}>Chart 9 : Percentage of  Type</Typography>
                </Box>
              </Link>
              <Divider sx={{ m: 0 }} /> */}

          <Box
            sx={{ mb: 4, mt: 4 }}
            onClick={() => {
              onClose('chart10')
            }}
          >
            <Typography sx={{ color: highlightText === 'chart10' ? greenColor : color }}>
               Type : By Date
            </Typography>
          </Box>
          <Divider sx={{ m: 0 }} />

          <Box
            sx={{ mb: 4, mt: 4 }}
            onClick={() => {
              onClose('chart11')
            }}
          >
            <Typography sx={{ color: highlightText === 'chart11' ? greenColor : color }}>
               Type : By Day
            </Typography>
          </Box>
          <Divider sx={{ m: 0 }} />

          <Box
            sx={{ mb: 4, mt: 4 }}
            onClick={() => {
              onClose('chart12')
            }}
          >
            <Typography sx={{ color: highlightText === 'chart12' ? greenColor : color }}>
               Type : By Time
            </Typography>
          </Box>
          <Divider sx={{ m: 0 }} />

          <Box
            sx={{ mb: 4, mt: 4 }}
            onClick={() => {
              onClose('chart13')
            }}
          >
            <Typography sx={{ color: highlightText === 'chart13' ? greenColor : color }}>
               Type : By Device{' '}
            </Typography>
          </Box>
          <Divider sx={{ m: 0 }} />

          <Box
            sx={{ mb: 4, mt: 4 }}
            onClick={() => {
              onClose('chart14')
            }}
          >
            <Typography sx={{ color: highlightText === 'chart14' ? greenColor : color }}>
               Type : By Account
            </Typography>
          </Box>
          <Divider sx={{ m: 0 }} />

          <Box
            sx={{ mb: 4, mt: 4 }}
            onClick={() => {
              onClose('chart15')
            }}
          >
            <Typography sx={{ color: highlightText === 'chart15' ? greenColor : color }}>
               Type : By Channel
            </Typography>
          </Box>
          <Divider sx={{ m: 0 }} />

          <Box
            sx={{ mb: 4, mt: 4 }}
            onClick={() => {
              onClose('chart16')
            }}
          >
            <Typography sx={{ color: highlightText === 'chart16' ? greenColor : color }}>
               Type : By Sentiment
            </Typography>
          </Box>
          <Divider sx={{ m: 0 }} />
        </CustomizerSpacing>
      </Drawer>
    </div>
  )
}

export default QuickView
