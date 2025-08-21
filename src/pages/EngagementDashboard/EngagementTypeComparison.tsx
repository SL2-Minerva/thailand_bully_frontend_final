// ** MUI Imports
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import { Grid, LinearProgress, Paper, TableBody, TableContainer, Typography } from '@mui/material'
import { Table, TableRow, TableHead, TableCell } from '@mui/material'

// ** Icons Imports
import ChevronUp from 'mdi-material-ui/ChevronUp'
import ChevronDown from 'mdi-material-ui/ChevronDown'
import { StyledTooltip } from '../dashboard/overall'
import { Information } from 'mdi-material-ui'
import Translations from 'src/layouts/components/Translations'

const EngagementTypeComparison = ({
  
  resultEngagementComparison,
  loadingEngagementComparison
}: {
  params: any
  chartId: string
  highlight: boolean
  resultEngagementComparison: any
  loadingEngagementComparison: boolean
}) => {
  // const reportNo = '4.2.023'

  return (
    <Paper style={{ border: `3px solid #fff`, borderRadius: 7, minHeight: 560 }} >
      {loadingEngagementComparison && <LinearProgress style={{ width: '100%' }} />}
      <span style={{ display: 'flex', justifyContent: 'flex-start' }}>
        <CardHeader
          title={<Translations text='Engagement Type Comparison' />}
          titleTypographyProps={{ variant: 'h6' }}
          subheader='Period over Period'
        />
        <StyledTooltip
          arrow
          title={
            <span>
              <span>
                <Typography variant='h6' sx={{ color: 'white' }}>
                  <Translations text='engagementChart19Title' />
                </Typography>
                <Typography variant='body2' sx={{ color: 'white' }}>
                  <Translations text='engagementChart19Description' />
                </Typography>
              </span>
            </span>
          }
        >
          <Information style={{ marginTop: '22px', fontSize: '29px' }} />
        </StyledTooltip>
      </span>

      <CardContent>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            {resultEngagementComparison?.length > 0 ? (
              <TableContainer style={{ height: 400 }}>
                <Table size='small'>
                  <TableHead>
                    <TableRow>
                      <TableCell variant='head'></TableCell>
                      <TableCell variant='head' align='center'>
                        Total
                      </TableCell>
                      <TableCell variant='head' align='center'>
                        Share
                      </TableCell>
                      <TableCell variant='head' align='center'>
                        Comment
                      </TableCell>
                      <TableCell variant='head' align='center'>
                        Reaction
                      </TableCell>
                      <TableCell variant='head' align='center'>
                        Views
                      </TableCell>

                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {(resultEngagementComparison || []).map((comparison: any, index: number) => {
                      return (
                        <TableRow key={index}>
                          <TableCell>{comparison.keyword_name}</TableCell>
                          <TableCell align='left'>
                            <span style={{ display: 'flex', justifyContent: 'center' }}>
                              {comparison.total?.value == 0 ? (
                                ''
                              ) : (
                                <>
                                  {comparison.total?.type === 'plus' ? (
                                    <ChevronUp
                                      fontSize='medium'
                                      sx={{ color: 'green', marginTop: '10px', marginRight: '10px' }}
                                    />
                                  ) : (
                                    <ChevronDown
                                      fontSize='medium'
                                      sx={{ color: 'red', marginTop: '10px', marginRight: '10px' }}
                                    />
                                  )}
                                </>
                              )}
                              <Typography variant='h6'>
                                {comparison.total?.value?.toLocaleString('en-US')}
                                <Typography variant='body2'>{comparison.total?.percentage} %</Typography>
                              </Typography>
                            </span>
                          </TableCell>
                          <TableCell align='left'>
                            <span style={{ display: 'flex', justifyContent: 'center' }}>
                              {comparison.share?.value == 0 ? (
                                ''
                              ) : (
                                <>
                                  {comparison.share?.type === 'plus' ? (
                                    <ChevronUp
                                      fontSize='medium'
                                      sx={{ color: 'green', marginTop: '10px', marginRight: '10px' }}
                                    />
                                  ) : (
                                    <ChevronDown
                                      fontSize='medium'
                                      sx={{ color: 'red', marginTop: '10px', marginRight: '10px' }}
                                    />
                                  )}
                                </>
                              )}
                              <Typography variant='h6'>
                                {comparison.share?.value?.toLocaleString('en-US')}
                                <Typography variant='body2'>{comparison.share?.percentage} %</Typography>
                              </Typography>
                            </span>
                          </TableCell>
                          <TableCell align='left'>
                            <span style={{ display: 'flex', justifyContent: 'center' }}>
                              {comparison.comment?.value === 0 ? (
                                ''
                              ) : (
                                <>
                                  {comparison.comment?.type === 'plus' ? (
                                    <ChevronUp
                                      fontSize='medium'
                                      sx={{ color: 'green', marginTop: '10px', marginRight: '10px' }}
                                    />
                                  ) : (
                                    <ChevronDown
                                      fontSize='medium'
                                      sx={{ color: 'red', marginTop: '10px', marginRight: '10px' }}
                                    />
                                  )}
                                </>
                              )}

                              <Typography variant='h6'>
                                {comparison.comment?.value?.toLocaleString('en-US')}
                                <Typography variant='body2'>{comparison.comment?.percentage} %</Typography>
                              </Typography>
                            </span>
                          </TableCell>
                          <TableCell align='left'>
                            <span style={{ display: 'flex', justifyContent: 'center' }}>
                              {comparison.reaction?.value == 0 ? (
                                ''
                              ) : (
                                <>
                                  {comparison.reaction?.type === 'plus' ? (
                                    <ChevronUp
                                      fontSize='medium'
                                      sx={{ color: 'green', marginTop: '10px', marginRight: '10px' }}
                                    />
                                  ) : (
                                    <ChevronDown
                                      fontSize='medium'
                                      sx={{ color: 'red', marginTop: '10px', marginRight: '10px' }}
                                    />
                                  )}
                                </>
                              )}

                              <Typography variant='h6'>
                                {comparison.reaction?.value?.toLocaleString('en-US')}
                                <Typography variant='body2'>{comparison.reaction?.percentage} %</Typography>
                              </Typography>
                            </span>
                          </TableCell>
                          <TableCell align='left'>
                            <span style={{ display: 'flex', justifyContent: 'center' }}>
                              {comparison.views?.value == 0 ? (
                                ''
                              ) : (
                                <>
                                  {comparison.views?.type === 'plus' ? (
                                    <ChevronUp
                                      fontSize='medium'
                                      sx={{ color: 'green', marginTop: '10px', marginRight: '10px' }}
                                    />
                                  ) : (
                                    <ChevronDown
                                      fontSize='medium'
                                      sx={{ color: 'red', marginTop: '10px', marginRight: '10px' }}
                                    />
                                  )}
                                </>
                              )}

                              <Typography variant='h6'>
                                {comparison.views?.value?.toLocaleString('en-US')}
                                <Typography variant='body2'>{comparison.views?.percentage} %</Typography>
                              </Typography>
                            </span>
                          </TableCell>

                        </TableRow>
                      )
                    })}
                  </TableBody>
                </Table>
              </TableContainer>
            ) : (
              <div
                style={{
                  height: 300,
                  padding: '170px 0',
                  textAlign: 'center',
                  verticalAlign: 'middle',
                  color: '#80808059'
                }}
              >
                <Translations text='no data' />
              </div>
            )}
          </Grid>
        </Grid>
      </CardContent>
    </Paper>
  )
}

export default EngagementTypeComparison
