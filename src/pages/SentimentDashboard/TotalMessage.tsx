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
import { ThumbUp, ThumbDown, ThumbsUpDown } from 'mdi-material-ui'
import { LinearProgress, Paper } from '@mui/material'

interface InfluencerComparisonProps {
  totalMessage?: any
  loadingTotalSentiment?: boolean
  apiParams: any
}

const TotalMessage = (props: InfluencerComparisonProps) => {
  // ** Props
  const { totalMessage, loadingTotalSentiment } = props

  return (
    <>
      <Paper sx={{ border: `3px solid #fff`, borderRadius: 1 }} >
        {loadingTotalSentiment && <LinearProgress style={{ width: '100%' }} />}
        <CardContent>
          <Grid container spacing={2}>
            <Grid item xs={6} md={3}>
              <span style={{ display: 'flex', justifyContent: 'center' }}>
                <Typography sx={{ fontSize: '1.4vw', fontWeight: 'bold', mt: 1 }}>Total Message</Typography>
              </span>
              <Grid container mt={8}>
                <Grid item xs={6}>
                  <Typography variant='h5' sx={{ pt: '5px', display: 'flex', justifyContent: 'center' }}>
                    {totalMessage?.totalSentiment?.totalValue}
                  </Typography>
                </Grid>
                <Grid item xs={6} sx={{ display: 'flex', justifyContent: 'center' }}>
                  <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                    {totalMessage?.totalSentiment?.comparison ? (
                      <>
                        <Typography variant='h6' mt={1}>
                          {totalMessage?.totalSentiment?.type === 'plus' ? (
                            <ChevronUp fontSize='medium' sx={{ color: 'success.main' }} />
                          ) : (
                            <ChevronDown fontSize='medium' sx={{ color: 'error.main' }} />
                          )}
                        </Typography>

                        <Typography
                          variant='h6'
                          sx={{
                            color: totalMessage?.totalSentiment?.type === 'plus' ? 'success.main' : 'error.main'
                          }}
                        >
                          {totalMessage?.totalSentiment?.comparison}%
                        </Typography>
                      </>
                    ) : (
                      <Typography variant='h6'>{totalMessage?.totalSentiment?.comparison}</Typography>
                    )}
                  </Box>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={6} md={3}>
              <span style={{ display: 'flex', justifyContent: 'center', marginTop: '4px' }}>
                <ThumbUp fontSize='medium' />
                <Typography variant='h6' sx={{ marginLeft: '20px' }}>
                  Positive
                </Typography>
              </span>
              <Grid container mt={8}>
                <Grid item xs={6}>
                  <Typography variant='h5' sx={{ pt: '5px', display: 'flex', justifyContent: 'center' }}>
                    {totalMessage?.positive?.totalValue}
                  </Typography>
                </Grid>
                <Grid item xs={6} sx={{ display: 'flex', justifyContent: 'center' }}>
                  <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                    {totalMessage?.positive?.comparison ? (
                      <>
                        <Typography variant='h6' mt={1}>
                          {totalMessage?.positive?.type === 'plus' ? (
                            <ChevronUp fontSize='medium' sx={{ color: 'success.main' }} />
                          ) : (
                            <ChevronDown fontSize='medium' sx={{ color: 'error.main' }} />
                          )}
                        </Typography>

                        <Typography
                          variant='h6'
                          sx={{
                            color: totalMessage?.positive?.type === 'plus' ? 'success.main' : 'error.main'
                          }}
                        >
                          {totalMessage?.positive?.comparison}%
                        </Typography>
                      </>
                    ) : (
                      <Typography variant='h6'>{totalMessage?.positive?.comparison}</Typography>
                    )}
                  </Box>
                </Grid>
              </Grid>
            </Grid>

            <Grid item xs={6} md={3}>
              <span style={{ display: 'flex', justifyContent: 'center', marginTop: '4px' }}>
                <ThumbsUpDown fontSize='medium' />
                <Typography variant='h6' sx={{ marginLeft: '20px' }}>
                  Neutral
                </Typography>
              </span>
              <Grid mt={8} sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Grid item xs={6}>
                  <Typography variant='h5' sx={{ display: 'flex', justifyContent: 'center' }}>
                    {totalMessage?.neutral?.totalValue}
                  </Typography>
                </Grid>

                <Grid item xs={6} sx={{ display: 'flex', justifyContent: 'center' }}>
                  <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                    {totalMessage?.neutral?.comparison ? (
                      <>
                        <Typography variant='h6' mt={1}>
                          {totalMessage?.neutral?.type === 'plus' ? (
                            <ChevronUp fontSize='medium' sx={{ color: 'success.main' }} />
                          ) : (
                            <ChevronDown fontSize='medium' sx={{ color: 'error.main' }} />
                          )}
                        </Typography>

                        <Typography
                          variant='h6'
                          sx={{
                            color: totalMessage?.neutral?.type === 'plus' ? 'success.main' : 'error.main'
                          }}
                        >
                          {totalMessage?.neutral?.comparison}%
                        </Typography>
                      </>
                    ) : (
                      <Typography variant='h6'>{totalMessage?.neutral?.comparison}</Typography>
                    )}
                  </Box>
                </Grid>
              </Grid>
            </Grid>

            <Grid item xs={6} md={3}>
              <span style={{ display: 'flex', justifyContent: 'center', marginTop: '4px' }}>
                <ThumbDown fontSize='medium' />
                <Typography variant='h6' sx={{ marginLeft: '20px' }}>
                  Negative
                </Typography>
              </span>
              <Grid mt={8} container>
                <Grid item xs={6}>
                  <Typography variant='h5' sx={{ pt: '5px', display: 'flex', justifyContent: 'center' }}>
                    {totalMessage?.negative?.totalValue}
                  </Typography>
                </Grid>

                <Grid item xs={6} sx={{ display: 'flex', justifyContent: 'center' }}>
                  <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                    {totalMessage?.negative?.comparison ? (
                      <>
                        <Typography variant='h6' mt={1}>
                          {totalMessage?.neutral?.type === 'plus' ? (
                            <ChevronUp fontSize='medium' sx={{ color: 'success.main' }} />
                          ) : (
                            <ChevronDown fontSize='medium' sx={{ color: 'error.main' }} />
                          )}
                        </Typography>

                        <Typography
                          variant='h6'
                          sx={{
                            color: totalMessage?.negative?.type === 'plus' ? 'success.main' : 'error.main'
                          }}
                        >
                          {totalMessage?.negative?.comparison}%
                        </Typography>
                      </>
                    ) : (
                      <Typography variant='h6'>{totalMessage?.negative?.comparison}</Typography>
                    )}
                  </Box>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </CardContent>
      </Paper>
    </>
  )
}

export default TotalMessage
