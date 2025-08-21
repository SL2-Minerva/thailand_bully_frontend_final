// ** MUI Imports
import Box from '@mui/material/Box'
import Link from '@mui/material/Link'
import Typography from '@mui/material/Typography'

// import useMediaQuery from '@mui/material/useMediaQuery'
// import { Theme } from '@mui/material/styles'

const FooterContent = () => {
  // ** Var
  // const hidden = useMediaQuery((theme: Theme) => theme.breakpoints.down('md'))

  return (
    <Box sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between' }}>
      <Typography sx={{ mr: 2 }}>
        {`Copyright © 2025 by MINERVA CONSULTANT CO.,LTD. All right reserved.`}
        {/* <Box component='span' sx={{ color: 'error.main' }}>
          
        </Box> */}
        <Link target='_blank' href='https://cornea-ai.com/'></Link>
      </Typography>
    </Box>
  )
}

export default FooterContent
