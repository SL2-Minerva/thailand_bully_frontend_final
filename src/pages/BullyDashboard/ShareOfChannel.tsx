// ** MUI Imports
import Paper from '@mui/material/Paper'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import { Grid, IconButton, LinearProgress, Menu, MenuItem, TableBody, Typography } from '@mui/material'
import { Table, TableRow, TableHead, TableCell } from '@mui/material'

// ** Third Party Imports
// import { Bar } from 'react-chartjs-2'
import { StyledTooltip } from '../dashboard/overall'
import { Information } from 'mdi-material-ui'
import { BullyLevelSummaryColors, BullyTypeSummaryColors } from 'src/utils/const'
import { useTranslation } from 'react-i18next'
import { MouseEvent, useEffect, useState } from 'react'
import Translations from 'src/layouts/components/Translations'
import ShareOfChannelGraph from './ShareOfChannelGraph'
import * as htmlToImage from 'html-to-image'
import { saveAs } from 'file-saver'
import { DotsVertical, Download } from 'mdi-material-ui'

//import { StyledTableCell } from '../dashboard/DailyMessageDetail'

const getMaxValue = (data: any) => {
  if (!data) return 1000

  const total = data?.map((object: any) => {
    return object.total
  })

  const max = Math.max(...total) + 3000

  return max
}

const getKeywordColor = (shareofVoiceData: any, color: any) => {
  if (!shareofVoiceData) return ['#fff']

  const colors = []
  for (let i = 0; i < color?.length; i++) {
    if (color[i].name === shareofVoiceData?.keyword_name) {
      colors.push(color[i].color)
    }
  }

  return colors
}

const ShareOfChannel = ({
  resultShareOfChannel,
  resultShareofChannelPlatform,
  
  type,
  loading,
  loadingChannel,
  title
}: {
  resultShareOfChannel: any
  resultShareofChannelPlatform: any
  chartId: any
  highlight: boolean
  type: string
  loading: boolean
  loadingChannel: boolean
  title?: string
}) => {
  const { t } = useTranslation()
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)

  const rowOptionsOpen = Boolean(anchorEl)

  const handleRowOptionsClick = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }
  const handleRowOptionsClose = () => {
    setAnchorEl(null)
  }

  useEffect(() => {
    if (resultShareofChannelPlatform) {
      resultShareofChannelPlatform?.sort((a: any, b: any) => {
        const fa = a?.keyword_name?.toLowerCase(),
          fb = b?.keyword_name?.toLowerCase()

        if (fa < fb) {
          return -1
        }
        if (fa > fb) {
          return 1
        }

        return 0
      })
    }
  }, [t, resultShareOfChannel])

  const onCapture = () => {
    const pictureId = document.getElementById('shareOfChannel')
    if (pictureId) {
      htmlToImage.toPng(pictureId, { backgroundColor: '#fff' }).then(function (dataUrl) {
        saveAs(dataUrl, title + '.png')
      })
    }
  }

  return (
    <Paper sx={{ border: `3px solid #fff`, borderRadius: 1 }} >
      {loading && loadingChannel && <LinearProgress style={{ width: '100%' }} />}
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
        <span style={{ display: 'flex', justifyContent: 'flex-start' }}>
          <CardHeader
            title={<Translations text={title || ''} />}
            titleTypographyProps={{ variant: 'h6' }}
          />
          <StyledTooltip
            arrow
            title={
              <span>
                <Typography variant='h6' sx={{ color: 'white' }}>
                  <Translations text='bullyChart17Title' />
                </Typography>
                <Typography variant='body2' sx={{ color: 'white' }}>
                  <Translations text='bullyChart17Description' />
                </Typography>
              </span>
            }
          >
            <Information style={{ marginTop: '22px', fontSize: '29px' }} />
          </StyledTooltip>
        </span>
        <span style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <IconButton size='large' onClick={handleRowOptionsClick} sx={{ m: 2 }}>
            <DotsVertical />
          </IconButton>
          <Menu
            keepMounted
            anchorEl={anchorEl}
            open={rowOptionsOpen}
            onClose={handleRowOptionsClose}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'right'
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right'
            }}
            PaperProps={{ style: { minWidth: '8rem' } }}
          >
            <MenuItem
              onClick={() => {
                onCapture()
                setAnchorEl(null)
              }}
            >
              <Download fontSize='medium' sx={{ mr: 2 }} />
              PNG
            </MenuItem>
          </Menu>
        </span>
      </div>
      <CardContent id='shareOfChannel'>
        <Grid container spacing={3}>
          {/* <Grid item md={5} xs={12}>
            {resultShareOfChannel ? (
              <Bar data={data} options={{ indexAxis: 'y', plugins: { legend: { display: false } } }} height={150} />
            ) : (
              ''
            )}
          </Grid> */}
          <Grid item xs={12}>
            {resultShareofChannelPlatform?.length > 0 ? (
              <Table size='small'>
                <TableHead>
                  {(resultShareofChannelPlatform || []).map((shareVoice: any, index: number) => {
                    return (
                      <TableRow key={index}>
                        {index == 0 ? (
                          <>
                            <TableCell sx={{ maxWidth: 100 }}></TableCell>
                            <TableCell sx={{ maxWidth: 200 }}></TableCell>
                            {(shareVoice.value || []).map((value: any, key: number) => {
                              return (
                                <TableCell variant='head' key={key} align='center'>
                                  {value?.channel === 'facebook' ? (
                                    <img alt={'logo'} width={34} height={34} src={`/images/logos/facebook-round.png`} />
                                  ) : value?.channel === 'x' ? (
                                    <img alt={'logo'} width={34} height={34} src={`/images/logos/x-black.jpg`} />
                                  ) : value?.channel === 'youtube' ? (
                                    <img width={34} height={34} alt={'logo'} src={`/images/logos/youtube-text.png`} />
                                  ) : value?.channel === 'instagram' ? (
                                    <img width={34} alt={'logo'} height={34} src={`/images/logos/instagram.png`} />
                                  ) : value?.channel === 'pantip' ? (
                                    <img width={34} alt={'logo'} height={34} src={`/images/logos/pantip.png`} />
                                  ) : value?.channel === 'google' ? (
                                    <img width={34} alt={'logo'} height={34} src={`/images/logos/google.png`} />
                                  ) : value?.channel === 'tiktok' ? (
                                    <img width={34} alt={'logo'} height={34} src={`/images/logos/tiktok.png`} />
                                  ) : (
                                    <span style={{ textTransform: 'uppercase' }}>{value?.channel}</span>
                                  )}
                                </TableCell>
                              )
                            })}
                          </>
                        ) : (
                          ''
                        )}
                      </TableRow>
                    )
                  })}
                </TableHead>
                <TableBody>
                  {(resultShareofChannelPlatform || []).map((shareVoice: any, index: number) => {
                    return (
                      <TableRow key={index}>
                        <TableCell sx={{ textAlign: 'right', maxWidth: 80, paddingRight: '0px' }}>
                          {shareVoice?.keyword_name}
                        </TableCell>
                        <TableCell sx={{ maxWidth: 150, paddingLeft: '0px' }}>
                          <ShareOfChannelGraph
                            max={getMaxValue(resultShareofChannelPlatform)}
                            keywordsColor={
                              type === 'level'
                                ? getKeywordColor(shareVoice, BullyLevelSummaryColors)
                                : getKeywordColor(shareVoice, BullyTypeSummaryColors)
                            }
                            resultShareOfVoiceChart={shareVoice}
                          />
                        </TableCell>
                        {(shareVoice.value || []).map((value: any, key: number) => {
                          return (
                            <TableCell key={key} align='center'>
                              <span style={{ border: value?.highlight ? '1px solid red' : '', padding: '4px' }}>
                                {value?.percentage > 0 ? <>{value?.percentage?.toFixed(2) + '%'}</> : '0%'}
                              </span>
                            </TableCell>
                          )
                        })}
                      </TableRow>
                    )
                  })}
                </TableBody>
              </Table>
            ) : (
              <div
                style={{
                  height: 300,
                  padding: '70px 0',
                  textAlign: 'center',
                  verticalAlign: 'middle',
                  color: '#80808059'
                }}
              >
                <Translations text='no data' />
              </div>
            )}
          </Grid>
        {/* <Grid item xs={12}>
          {resultShareofChannelPlatform?.length > 0 ? (
            <Table size='small'>
              <TableHead>
                {(resultShareofChannelPlatform || []).map((shareVoice: any, index: number) => (
                  <TableRow key={index}>
                    {index === 0 && (
                      <>
                        <TableCell sx={{ maxWidth: 100 }}></TableCell>
                        <TableCell sx={{ maxWidth: 200 }}></TableCell>
                        {(shareVoice.value || []).map((value: any, key: number) => (
                          <StyledTableCell align='center' key={key}>
                            {value?.image ? (
                              <img
                                alt='logo'
                                width={28}
                                height={28}
                                src={`https://api.cornea-demo.com/storage/${value.image}`}
                                onError={(e) => {
                                  e.currentTarget.style.display = 'none';
                                }}
                              />
                            ) : (
                              <span style={{ textTransform: 'uppercase' }}>
                                {value?.channel || value?.source_name}
                              </span>
                            )}
                          </StyledTableCell>
                        ))}
                      </>
                    )}
                  </TableRow>
                ))}
              </TableHead>

              <TableBody>
                {(resultShareofChannelPlatform || []).map((shareVoice: any, index: number) => (
                  <TableRow key={index}>
                    <TableCell sx={{ textAlign: 'right', maxWidth: 80, paddingRight: '0px' }}>
                      {shareVoice?.keyword_name}
                    </TableCell>

                    <TableCell sx={{ maxWidth: 150, paddingLeft: '0px' }}>
                      <ShareOfChannelGraph
                        max={getMaxValue(resultShareofChannelPlatform)}
                        keywordsColor={
                          type === 'level'
                            ? getKeywordColor(shareVoice, BullyLevelSummaryColors)
                            : getKeywordColor(shareVoice, BullyTypeSummaryColors)
                        }
                        resultShareOfVoiceChart={shareVoice}
                      />
                    </TableCell>

                    {(shareVoice.value || []).map((value: any, key: number) => (
                      <TableCell key={key} align='center'>
                        <span
                          style={{
                            border: value?.highlight ? '1px solid red' : '',
                            padding: '4px'
                          }}
                        >
                          {value?.percentage > 0 ? `${value?.percentage?.toFixed(2)}%` : '0%'}
                        </span>
                      </TableCell>
                    ))}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            <div
              style={{
                height: 300,
                padding: '70px 0',
                textAlign: 'center',
                verticalAlign: 'middle',
                color: '#80808059'
              }}
            >
              <Translations text='no data' />
            </div>
          )}
        </Grid> */}
        </Grid>
      </CardContent>
    </Paper>
  )
}

export default ShareOfChannel
