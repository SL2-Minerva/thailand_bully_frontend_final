// ** React Imports
import { ReactNode } from 'react'


// ** MUI Imports
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import Grid from '@mui/material/Grid'

// ** Custom Components Imports
// import CustomChip from 'src/@core/components/mui/chip'
// import CustomAvatar from 'src/@core/components/mui/avatar'

// ** Icons Imports
import ChevronUp from 'mdi-material-ui/ChevronUp'
import ChevronDown from 'mdi-material-ui/ChevronDown'
import { Avatar, Chip, LinearProgress, Paper } from '@mui/material'

import { FacebookIcon, googleIcon, InstagramIcon, PantipIcon, tiktokIcon, TwitterIcon, YoutubeIcon } from 'src/utils/const'

interface InfluencerComparisonProps {
  icon?: ReactNode
  color?: string
  trendNumber: number
  trend?: string
  totalText: string
  totalValue: number
  loading?: boolean
  source_image?: string | null
}


const ChannelComparison = (props: InfluencerComparisonProps) => {
  // ** Props
  const { color, trend, trendNumber, totalText, totalValue, loading } = props

  const TrendIcon = trend === 'plus' ? ChevronUp : ChevronDown
  const imgPath =
    totalText === 'Facebook'
      ? FacebookIcon
      : totalText === 'X'
      ? TwitterIcon
      : totalText === 'Instagram'
      ? InstagramIcon
      : totalText === 'Youtube'
      ? YoutubeIcon
      : totalText === 'Pantip'
      ? PantipIcon
      : totalText === 'Google'
      ? googleIcon
      : totalText === 'Tiktok'
      ? tiktokIcon
      : FacebookIcon

  const percentageValue = trendNumber ? trendNumber + '%' : ''

  return (
    <>
      <Paper style={{ border: `3px solid #fff`, borderRadius: 7 }} >
        {loading && <LinearProgress style={{ width: '100%' }} />}
        <CardContent>
          <Box>
            <Grid container spacing={6}>
              <Grid item xs={12}>
                <span style={{ display: 'flex', justifyContent: 'center' }}>
                  <Avatar sx={{ width: 30, height: 30 }}>
                    <img src={imgPath} width={30} height={30} alt='' />
                  </Avatar>
                  <Chip
                    label={totalText}
                    sx={{
                      ml: 2,
                      display: 'flex',
                      justifyContent: 'center',
                      backgroundColor: color,
                      color: 'white',
                      fontSize: '12px'
                    }}
                  />
                  {/* <Typography variant='h4'>
                                    
                  </Typography> */}
                </span>
                <Grid mt={4}>
                  {totalValue != 0 ? (
                    <Typography variant='h6' sx={{ display: 'flex', justifyContent: 'center' }}>
                      {trend === 'plus' ? '+' : ''}
                      {totalValue}
                    </Typography>
                  ) : (
                    <Typography variant='h6' sx={{ display: 'flex', justifyContent: 'center' }}>
                      {totalValue}
                    </Typography>
                  )}
                </Grid>
                <Grid mt={4}>
                  <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      {trendNumber != 0 ? (
                        <>
                          <TrendIcon
                            fontSize='large'
                            sx={{ color: trend === 'plus' ? 'success.main' : 'error.main' }}
                          />

                          <Typography variant='h6' sx={{ color: trend === 'plus' ? 'success.main' : 'error.main' }}>
                            {percentageValue}
                          </Typography>
                        </>
                      ) : (
                        <Typography variant='h6'>{0 + '%'}</Typography>
                      )}
                    </Box>
                  </Box>
                </Grid>
              </Grid>
            </Grid>
          </Box>
        </CardContent>
      </Paper>
    </>
  )
}

// const ChannelComparison = (props: InfluencerComparisonProps) => {
//   const { color, trend, trendNumber, totalText, totalValue, loading, source_image } = props
//   const TrendIcon = trend === 'plus' ? ChevronUp : ChevronDown
//   const percentageValue = trendNumber ? trendNumber + '%' : '0%'
//   const imgPath = source_image && source_image.trim() !== '' ? `https://api.cornea-demo.com/storage/${source_image}` : null 

//   return (
//     <Paper style={{ border: `3px solid #fff`, borderRadius: 7 }}>
//       {loading && <LinearProgress style={{ width: '100%' }} />}
//       <CardContent>
//         <Box>
//           <Grid container spacing={6}>
//             <Grid item xs={12}>
//               <Box display='flex' justifyContent='center' alignItems='center'>
//                 {imgPath ? (
//                   <Avatar sx={{ width: 30, height: 30 }}>
//                     <img
//                       src={imgPath}
//                       width={30}
//                       height={30}
//                       alt={totalText}
//                       onError={(e) => {
//                         const parent = e.currentTarget.parentElement
//                         if (parent) {
//                           parent.innerHTML = `<div style="display:flex;align-items:center;justify-content:center;width:30px;height:30px;background:#ccc;border-radius:50%;font-size:12px;">${totalText}</div>`
//                         }
//                       }}
//                     />
//                   </Avatar>
//                 ) : (
//                   <Avatar
//                     sx={{
//                       width: 30,
//                       height: 30,
//                       backgroundColor: '#ccc',
//                       fontSize: '12px'
//                     }}
//                   >
//                     {totalText}
//                   </Avatar>
//                 )}

//                 <Chip
//                   label={totalText}
//                   sx={{
//                     ml: 2,
//                     backgroundColor: color,
//                     color: 'white',
//                     fontSize: '12px'
//                   }}
//                 />
//               </Box>

//               <Box mt={4}>
//                 <Typography variant='h6' sx={{ display: 'flex', justifyContent: 'center' }}>
//                   {trend === 'plus' ? '+' : ''}
//                   {totalValue}
//                 </Typography>
//               </Box>

//               <Box mt={4} display='flex' justifyContent='center'>
//                 {trendNumber !== 0 ? (
//                   <Box display='flex' alignItems='center'>
//                     <TrendIcon
//                       fontSize='large'
//                       sx={{ color: trend === 'plus' ? 'success.main' : 'error.main' }}
//                     />
//                     <Typography variant='h6' sx={{ color: trend === 'plus' ? 'success.main' : 'error.main' }}>
//                       {percentageValue}
//                     </Typography>
//                   </Box>
//                 ) : (
//                   <Typography variant='h6'>{percentageValue}</Typography>
//                 )}
//               </Box>
//             </Grid>
//           </Grid>
//         </Box>
//       </CardContent>
//     </Paper>
//   )
// }

export default ChannelComparison

ChannelComparison.defaultProps = {
  color: 'primary',
  trend: 'plus'
}
