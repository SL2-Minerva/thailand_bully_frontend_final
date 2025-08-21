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
import { Share, StickerEmoji, Message, Eye} from 'mdi-material-ui'
import { StyledTooltip } from '../dashboard/overall'
import { Information } from 'mdi-material-ui'
import { LinearProgress, Paper } from '@mui/material'
import Translations from 'src/layouts/components/Translations'
import { useSettings } from 'src/@core/hooks/useSettings'

interface InfluencerComparisonProps {
  totalEngagement?: any
  highlight: boolean
  loading?: boolean
}

const TotalEngagement = (props: InfluencerComparisonProps) => {
  // ** Props
  const { totalEngagement, highlight, loading } = props
  const {settings} = useSettings();
  
  return (
    <>
      <Paper style={{ border: `3px solid #fff`, borderRadius: 7 }}>
        {loading && <LinearProgress style={{ width: '100%' }} />}
        <CardContent>
          <Grid container spacing={2}>
            <Grid item xs={6} md={2.4}>
              <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' , marginTop: '4px'}}>
                <Typography
                  sx={{
                    color: highlight ? 'green' : settings.mode === 'dark' ? 'white' : '#4c4e64de',
                    fontSize: '1.4vw',
                    fontWeight: 'bold',

                    // mt: 1
                  }}
                >
                  <Translations text='Total Engagement' />
                </Typography>
                <StyledTooltip
                  arrow
                  title={
                    <span>
                      <Typography variant='h6' sx={{ color: 'white' }}>
                        <Translations text='engagementChart16Title' />
                      </Typography>
                      <Typography variant='body2' sx={{ color: 'white' }}>
                        <Translations text='engagementChart16Description' />
                      </Typography>
                    </span>
                  }
                >
                  <Information style={{ margin: '2px 0px 0px 5px', fontSize: '29px' }} />
                </StyledTooltip>
              </span>
              <Grid mt={8} sx={{ display: 'flex', justifyContent: 'space-between' , paddingX: '10px'}}>
                <Typography variant='h5' sx={{ display: 'flex', justifyContent: 'center'  }}>
                  {totalEngagement?.totalEngagement?.totalValue}
                </Typography>

                <Box>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    {totalEngagement?.totalEngagement?.comparison == 0 ? (
                      <Typography variant='h6' mt={2}>
                        {totalEngagement?.totalEngagement?.comparison}%
                      </Typography>
                    ) : (
                      <>
                        <Typography variant='h6'>
                          {totalEngagement?.totalEngagement?.type === 'plus' ? (
                            <ChevronUp fontSize='medium' sx={{ color: 'success.main' }} />
                          ) : (
                            <ChevronDown fontSize='medium' sx={{ color: 'error.main' }} />
                          )}
                        </Typography>

                        <Typography
                          variant='h6'
                          sx={{
                            color: totalEngagement?.totalEngagement?.type === 'plus' ? 'success.main' : 'error.main'
                          }}
                        >
                          {totalEngagement?.totalEngagement?.comparison}%
                        </Typography>
                      </>
                    )}
                  </Box>
                </Box>
              </Grid>
            </Grid>
            <Grid item xs={6} md={2.3}>
              <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: '4px'}}>
                <Share fontSize='medium' />
                <Typography variant='h6' sx={{ marginLeft: '20px' }}>
                  Share
                </Typography>
              </span>

              <Grid mt={8} sx={{ display: 'flex', justifyContent: 'space-between', paddingX: '10px'}}>
                <Typography variant='h5' sx={{ display: 'flex', justifyContent: 'center' }}>
                  {totalEngagement?.share?.totalValue}
                </Typography>

                <Box>
                  <Box sx={{ display: 'flex', alignItems: 'center'}}>
                    {totalEngagement?.share?.comparison == 0 ? (
                      <Typography variant='h6' mt={2}>
                        {totalEngagement?.share?.comparison}%
                      </Typography>
                    ) : (
                      <>
                        <Typography variant='h6'>
                          {totalEngagement?.share?.type === 'plus' ? (
                            <ChevronUp fontSize='medium' sx={{ color: 'success.main' }} />
                          ) : (
                            <ChevronDown fontSize='medium' sx={{ color: 'error.main' }} />
                          )}
                        </Typography>

                        <Typography
                          variant='h6'
                          sx={{ color: totalEngagement?.share?.type === 'plus' ? 'success.main' : 'error.main' }}
                        >
                          {totalEngagement?.share?.comparison}%
                        </Typography>
                      </>
                    )}
                  </Box>
                </Box>
              </Grid>
            </Grid>

            <Grid item xs={6} md={2.3}>
              <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' , marginTop: '4px'}}>
                <Message fontSize='medium' />
                <Typography variant='h6' sx={{ marginLeft: '20px' }}>
                  Comment
                </Typography>
              </span>
              <Grid mt={8} sx={{ display: 'flex', justifyContent: 'space-between' , paddingX: '10px'}}>
                <Typography variant='h5' sx={{ display: 'flex', justifyContent: 'center'  }}>
                  {totalEngagement?.comment?.totalValue}
                </Typography>

                <Box>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    {totalEngagement?.comment?.comparison == 0 ? (
                      <Typography variant='h6' mt={2}>
                        {totalEngagement?.comment?.comparison}%
                      </Typography>
                    ) : (
                      <>
                        <Typography variant='h6'>
                          {totalEngagement?.comment?.type === 'plus' ? (
                            <ChevronUp fontSize='medium' sx={{ color: 'success.main' }} />
                          ) : (
                            <ChevronDown fontSize='medium' sx={{ color: 'error.main' }} />
                          )}
                        </Typography>

                        <Typography
                          variant='h6'
                          sx={{ color: totalEngagement?.comment?.type === 'plus' ? 'success.main' : 'error.main' }}
                        >
                          {totalEngagement?.comment?.comparison}%
                        </Typography>
                      </>
                    )}
                  </Box>
                </Box>
              </Grid>
            </Grid>

            <Grid item xs={6} md={2.3}>
              <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' , marginTop: '4px'}}>
                <StickerEmoji fontSize='medium' />
                <Typography variant='h6' sx={{ marginLeft: '20px' }}>
                  Reaction
                </Typography>
              </span>
              <Grid mt={8} sx={{ display: 'flex', justifyContent: 'space-between' , paddingX: '10px'}}>
                <Typography variant='h5' sx={{ display: 'flex', justifyContent: 'center'  }}>
                  {totalEngagement?.reaction?.totalValue}
                </Typography>

                <Box>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    {totalEngagement?.reaction?.comparison == 0 ? (
                      <Typography variant='h6' mt={2}>
                        {totalEngagement?.reaction?.comparison}%
                      </Typography>
                    ) : (
                      <>
                        <Typography variant='h6'>
                          {totalEngagement?.reaction?.type === 'plus' ? (
                            <ChevronUp fontSize='medium' sx={{ color: 'success.main' }} />
                          ) : (
                            <ChevronDown fontSize='medium' sx={{ color: 'error.main' }} />
                          )}
                        </Typography>

                        <Typography
                          variant='h6'
                          sx={{ color: totalEngagement?.reaction?.type === 'plus' ? 'success.main' : 'error.main' }}
                        >
                          {totalEngagement?.reaction?.comparison}%
                        </Typography>
                      </>
                    )}
                  </Box> 
                </Box>
              </Grid>
            </Grid>

            <Grid item xs={6} md={2.3}>
              <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' , marginTop: '4px'}}>
                <Eye fontSize='medium' />
                <Typography variant='h6' sx={{ marginLeft: '20px' }}>
                  Views
                </Typography>
              </span>
              <Grid mt={8} sx={{ display: 'flex', justifyContent: 'space-between' , paddingX: '10px'}}>
                <Typography variant='h5' sx={{ display: 'flex', justifyContent: 'center'  }}>
                  {totalEngagement?.views?.totalValue}
                </Typography>

                <Box>
                  <Box sx={{ display: 'flex', alignItems: 'center'}}>
                    {totalEngagement?.views?.comparison == 0 ? (
                      <Typography variant='h6' mt={2}>
                        {totalEngagement?.views?.comparison}%
                      </Typography>
                    ) : (
                      <>
                        <Typography variant='h6'>
                          {totalEngagement?.views?.type === 'plus' ? (
                            <ChevronUp fontSize='medium' sx={{ color: 'success.main' }} />
                          ) : (
                            <ChevronDown fontSize='medium' sx={{ color: 'error.main' }} />
                          )}
                        </Typography>

                        <Typography
                          variant='h6'
                          sx={{ color: totalEngagement?.views?.type === 'plus' ? 'success.main' : 'error.main' }}
                        >
                          {totalEngagement?.views?.comparison}%
                        </Typography>
                      </>
                    )}
                  </Box>
                </Box>
              </Grid>
            </Grid>

          </Grid>
        </CardContent>
      </Paper>
    </>
  )
}

export default TotalEngagement
