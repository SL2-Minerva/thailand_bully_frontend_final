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
import { Toggler, TogglerOpen } from '../VoiceDashboard/QuickView'
import { useSettings } from 'src/@core/hooks/useSettings'

export const Drawer = styled(MuiDrawer)<DrawerProps>(({ theme }) => ({
  width: 200,
  zIndex: theme.zIndex.modal,
  '& .MuiFormControlLabel-root': {
    marginRight: '0.6875rem'
  },
  '& .MuiDrawer-paper': {
    border: 0,
    width: 200,
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
        <CustomizerSpacing className='customizer-body'>
          <Typography
            component='p'
            variant='caption'
            sx={{ mb: 6, mt: 6, color: 'text.disabled', textTransform: 'uppercase' }}
          >
            Charts
          </Typography>

          {/* <Link to="chart1" spy={true} smooth={true}>
                <Box sx={{ mb: 6, mt: 6 }} onClick={() => {onClose("chart1")}}>
                    <Typography sx={{ color : highlightText === 'chart1' ? greenColor : color  }}>Chart 1 : Percentage Of Channel</Typography>
                </Box>
              </Link>
              <Divider sx={{ m: 0 }} /> */}

          <Box
            sx={{ mb: 6, mt: 6 }}
            onClick={() => {
              onClose('chart2')
            }}
          >
            <Typography sx={{ color: highlightText === 'chart2' ? greenColor : color }}>By Date </Typography>
          </Box>
          <Divider sx={{ m: 0 }} />
          <Box
            sx={{ mb: 6, mt: 6 }}
            onClick={() => {
              onClose('chart3')
            }}
          >
            <Typography sx={{ color: highlightText === 'chart3' ? greenColor : color }}>By Day </Typography>
          </Box>
          <Divider sx={{ m: 0 }} />
          <Box
            sx={{ mb: 6, mt: 6 }}
            onClick={() => {
              onClose('chart4')
            }}
          >
            <Typography sx={{ color: highlightText === 'chart4' ? greenColor : color }}>By Time </Typography>
          </Box>
          <Divider sx={{ m: 0 }} />
          <Box
            sx={{ mb: 6, mt: 6 }}
            onClick={() => {
              onClose('chart5')
            }}
          >
            <Typography sx={{ color: highlightText === 'chart5' ? greenColor : color }}>By Devices </Typography>
          </Box>
          <Divider sx={{ m: 0 }} />
          <Box
            sx={{ mb: 6, mt: 6 }}
            onClick={() => {
              onClose('chart6')
            }}
          >
            <Typography sx={{ color: highlightText === 'chart6' ? greenColor : color }}>By Account</Typography>
          </Box>
          <Divider sx={{ m: 0 }} />
          <Box
            sx={{ mb: 6, mt: 6 }}
            onClick={() => {
              onClose('chart7')
            }}
          >
            <Typography sx={{ color: highlightText === 'chart7' ? greenColor : color }}>By Sentiment</Typography>
          </Box>
          <Divider sx={{ m: 0 }} />
          <Box
            sx={{ mb: 6, mt: 6 }}
            onClick={() => {
              onClose('chart8')
            }}
          >
            <Typography sx={{ color: highlightText === 'chart8' ? greenColor : color }}>By Bully Level</Typography>
          </Box>
          <Divider sx={{ m: 0 }} />
          <Box
            sx={{ mb: 6, mt: 6 }}
            onClick={() => {
              onClose('chart9')
            }}
          >
            <Typography sx={{ color: highlightText === 'chart9' ? greenColor : color }}>By Bully Type</Typography>
          </Box>
          <Divider sx={{ m: 0 }} />

          {/* <Link to="chart10" spy={true} smooth={true}>
                <Box sx={{ mb: 6, mt: 6 }} onClick={() => {onClose("chart10")}}>
                    <Typography sx={{ color : highlightText === 'chart10' ? greenColor : color  }}>Chart 10 : Channel Comparison: Period over Period</Typography>
                </Box>
              </Link>
              <Divider sx={{ m: 0 }} />

              <Link to="chart11" spy={true} smooth={true}>
                <Box sx={{ mb: 6, mt: 6 }} onClick={() => {onClose("chart11")}}>
                    <Typography sx={{ color : highlightText === 'chart11' ? greenColor : color  }}>Chart 11 : Engagement Rate</Typography>
                </Box>
              </Link>
              <Divider sx={{ m: 0 }} />

              <Link to="chart12" spy={true} smooth={true}>
                <Box sx={{ mb: 6, mt: 6 }} onClick={() => {onClose("chart12")}}>
                    <Typography sx={{ color : highlightText === 'chart12' ? greenColor : color  }}>Chart 12 : Sentiment Score</Typography>
                </Box>
              </Link>
              <Divider sx={{ m: 0 }} />

              <Link to="chart13" spy={true} smooth={true}>
                <Box sx={{ mb: 6, mt: 6 }} onClick={() => {onClose("chart13")}}>
                    <Typography sx={{ color : highlightText === 'chart13' ? greenColor : color  }}>Chart 13 : Channel By Sentiment</Typography>
                </Box>
              </Link>
              <Divider sx={{ m: 0 }} /> */}
        </CustomizerSpacing>
      </Drawer>
    </div>
  )
}

export default QuickView
