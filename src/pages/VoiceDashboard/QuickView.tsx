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
import Box, { BoxProps } from '@mui/material/Box'
import MuiDrawer, { DrawerProps } from '@mui/material/Drawer'

// ** Icons Imports
import Close from 'mdi-material-ui/Close'
import { ArrowLeftDropCircle, ArrowRightDropCircle } from 'mdi-material-ui'
import { useSettings } from 'src/@core/hooks/useSettings'

export const Toggler = styled(Box)<BoxProps>(({ theme }) => ({
  right: 0,
  top: '50%',
  display: 'block',
  cursor: 'pointer',
  position: 'fixed',
  zIndex: theme.zIndex.modal,
  padding: '10px 0px 30px 0px',
  transform: 'translateY(-50%)',
  backgroundColor: theme.palette.primary.main,
  borderTopLeftRadius: theme.shape.borderRadius,
  borderBottomLeftRadius: theme.shape.borderRadius
}))

export const TogglerOpen = styled(Box)<BoxProps>(({ theme }) => ({
  right: '200px',
  top: '50%',
  display: 'block',
  cursor: 'pointer',
  position: 'fixed',
  zIndex: theme.zIndex.modal,
  padding: '10px 0px 30px 0px',
  transform: 'translateY(-50%)',
  backgroundColor: theme.palette.primary.main,
  borderTopLeftRadius: theme.shape.borderRadius,
  borderBottomLeftRadius: theme.shape.borderRadius
}))

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

  const onClose = (chartId?: string) => {
    if (chartId) {
      setHighlight(chartId)
      setHightlightText(chartId)
      setShowQuickView(true)
    }
    setOpen(false)
  }

  const color = settings.mode === 'dark' ? 'dark' : 'light'
  const greenColor = settings.mode === 'dark' ? '#afffaf' : 'green'

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
                <Box sx={{ mb: 2 }} onClick={() => {onClose("chart1")}}>
                    <Typography sx={{ color : highlightText === 'chart1' ? greenColor : '#4c4e64de'  }}>Chart 1 : Percentage Of Messages</Typography>
                </Box>
              </Link>
              <Divider sx={{ m: 0 }} />  */}
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
            <Typography sx={{ color: highlightText === 'chart3' ? greenColor : color }}>By Day</Typography>
          </Box>
          <Divider sx={{ m: 0 }} />
          <Box
            sx={{ mb: 6, mt: 6 }}
            onClick={() => {
              onClose('chart4')
            }}
          >
            <Typography sx={{ color: highlightText === 'chart4' ? greenColor : color }}>By Time</Typography>
          </Box>
          <Divider sx={{ m: 0 }} />
          <Box
            sx={{ mb: 6, mt: 6 }}
            onClick={() => {
              onClose('chart5')
            }}
          >
            <Typography sx={{ color: highlightText === 'chart5' ? greenColor : color }}>By Devices</Typography>
          </Box>
          <Divider sx={{ m: 0 }} />
          <Box
            sx={{ mb: 6, mt: 6 }}
            onClick={() => {
              onClose('chart6')
            }}
          >
            <Typography sx={{ color: highlightText === 'chart6' ? greenColor : color }}>By Account </Typography>
          </Box>
          <Divider sx={{ m: 0 }} />
          <Box
            sx={{ mb: 6, mt: 6 }}
            onClick={() => {
              onClose('chart7')
            }}
          >
            <Typography sx={{ color: highlightText === 'chart7' ? greenColor : color }}>By Channel</Typography>
          </Box>
          <Divider sx={{ m: 0 }} />
          <Box
            sx={{ mb: 6, mt: 6 }}
            onClick={() => {
              onClose('chart8')
            }}
          >
            <Typography sx={{ color: highlightText === 'chart8' ? greenColor : color }}>By Sentiment</Typography>
          </Box>
          <Divider sx={{ m: 0 }} />
          <Box
            sx={{ mb: 6, mt: 6 }}
            onClick={() => {
              onClose('chart9')
            }}
          >
            <Typography sx={{ color: highlightText === 'chart9' ? greenColor : color }}>By Bully Level </Typography>
          </Box>
          <Divider sx={{ m: 0 }} />
          <Box
            sx={{ mb: 6, mt: 6 }}
            onClick={() => {
              onClose('chart10')
            }}
          >
            <Typography sx={{ color: highlightText === 'chart10' ? greenColor : color }}>By Bully Type</Typography>
          </Box>
          <Divider sx={{ m: 0 }} />

          {/* <Link to="chart11" spy={true} smooth={true}>
                <Box sx={{ mb: 6, mt: 6 }} onClick={() => {onClose("chart11")}}>
                    <Typography sx={{ color : highlightText === 'chart11' ? greenColor : '#4c4e64de'  }}>Chart 11 : Number of Accounts </Typography>
                </Box>
              </Link>
              <Divider sx={{ m: 0 }} />

              <Link to="chart12" spy={true} smooth={true}>
                <Box sx={{ mb: 6, mt: 6 }} onClick={() => {onClose("chart12")}}>
                    <Typography sx={{ color : highlightText === 'chart12' ? greenColor : '#4c4e64de'  }}>Chart 12 : Number of Messages: Period over Period Comparison </Typography>
                </Box>
              </Link>
              <Divider sx={{ m: 0 }} />

              <Link to="chart13" spy={true} smooth={true}>
                <Box sx={{ mb: 6, mt: 6 }} onClick={() => {onClose("chart13")}}>
                    <Typography sx={{ color : highlightText === 'chart13' ? greenColor : '#4c4e64de'  }}>Chart 13 :Number of Accounts: Period over Period Comparison </Typography>
                </Box>
              </Link>
              <Divider sx={{ m: 0 }} />

              <Link to="chart14" spy={true} smooth={true}>
                <Box sx={{ mb: 6, mt: 6 }} onClick={() => {onClose("chart14")}}>
                    <Typography sx={{ color : highlightText === 'chart14' ? greenColor : '#4c4e64de'  }}>Chart 14 : Day & Time Comparison</Typography>
                </Box>
              </Link>
              <Divider sx={{ m: 0 }} />

              <Link to="chart15" spy={true} smooth={true}>
                <Box sx={{ mb: 6, mt: 6 }} onClick={() => {onClose("chart15")}}>
                    <Typography sx={{ color : highlightText === 'chart15' ? greenColor : '#4c4e64de'  }}>Chart 15 : Day&Time Comparison by Sentiment </Typography>
                </Box>
              </Link>
              <Divider sx={{ m: 0 }} />

              <Link to="chart16" spy={true} smooth={true}>
                <Box sx={{ mb: 6, mt: 6 }} onClick={() => {onClose("chart16")}}>
                    <Typography sx={{ color : highlightText === 'chart16' ? greenColor : '#4c4e64de'  }}>Chart 16 : Day&Time Comparison by Bully Level </Typography>
                </Box>
              </Link>
              <Divider sx={{ m: 0 }} />

              <Link to="chart17" spy={true} smooth={true}>
                <Box sx={{ mb: 6, mt: 6 }} onClick={() => {onClose("chart17")}}>
                    <Typography sx={{ color : highlightText === 'chart17' ? greenColor : '#4c4e64de'  }}>Chart 17 : Day&Time Comparison by Bully Type </Typography>
                </Box>
              </Link>
              <Divider sx={{ m: 0 }} />

              <Link to="chart18" spy={true} smooth={true}>
                <Box sx={{ mb: 6, mt: 6 }} onClick={() => {onClose("chart18")}}>
                    <Typography sx={{ color : highlightText === 'chart18' ? greenColor : '#4c4e64de'  }}>Chart 18 : Channel/Platforms: Period over Period Comparison</Typography>
                </Box>
              </Link>
              <Divider sx={{ m: 0 }} />

              <Link to="chart19" spy={true} smooth={true}>
                <Box sx={{ mb: 6, mt: 6 }} onClick={() => {onClose("chart19")}}>
                    <Typography sx={{ color : highlightText === 'chart19' ? greenColor : '#4c4e64de'  }}>Chart 19 : Devices: Period over Period Comparison</Typography>
                </Box>
              </Link>
              <Divider sx={{ m: 0 }} />

              <Link to="chart20" spy={true} smooth={true}>
                <Box sx={{ mb: 6, mt: 6 }} onClick={() => {onClose("chart20")}}>
                    <Typography sx={{ color : highlightText === 'chart20' ? greenColor : '#4c4e64de'  }}>Chart 20 : Channel vs. Device: Period over Period Comparison </Typography>
                </Box>
              </Link>
              <Divider sx={{ m: 0 }} />

              <Link to="chart21" spy={true} smooth={true}>
                <Box sx={{ mb: 6, mt: 6 }} onClick={() => {onClose("chart21")}}>
                    <Typography sx={{ color : highlightText === 'chart21' ? greenColor : '#4c4e64de'  }}>Chart 21 : Percentage of Keyword Comparison By Channel</Typography>
                </Box>
              </Link>
              <Divider sx={{ m: 0 }} />

              <Link to="chart22" spy={true} smooth={true}>
                <Box sx={{ mb: 6, mt: 6 }} onClick={() => {onClose("chart22")}}>
                    <Typography sx={{ color : highlightText === 'chart22' ? greenColor : '#4c4e64de'  }}>Chart 22 : Percentage of Keyword Comparison By Sentiment </Typography>
                </Box>
              </Link>
              <Divider sx={{ m: 0 }} />

              <Link to="chart23" spy={true} smooth={true}>
                <Box sx={{ mb: 6, mt: 6 }} onClick={() => {onClose("chart23")}}>
                    <Typography sx={{ color : highlightText === 'chart23' ? greenColor : '#4c4e64de'  }}>Chart 23 : Percentage of Keyword Comparison By Bully Level </Typography>
                </Box>
              </Link>
              <Divider sx={{ m: 0 }} />

              <Link to="chart24" spy={true} smooth={true}>
                <Box sx={{ mb: 6, mt: 6 }} onClick={() => {onClose("chart24")}}>
                    <Typography sx={{ color : highlightText === 'chart24' ? greenColor : '#4c4e64de'  }}>Chart 24 : Percentage of Keyword Comparison By Bully Type </Typography>
                </Box>
              </Link>
              <Divider sx={{ m: 0 }} /> */}
        </CustomizerSpacing>
      </Drawer>
    </div>
  )
}

export default QuickView
