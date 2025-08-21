// ** MUI Imports
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import { useTheme } from '@mui/material/styles'
import { Grid, IconButton, LinearProgress, Menu, MenuItem, Paper, Typography } from '@mui/material'

// ** Third Party Imports

import { Doughnut } from 'react-chartjs-2'
import { ThumbUp, ThumbDown, ThumbsUpDown, Information } from 'mdi-material-ui'
import { StyledTooltip } from './overall'
import { GetSentimentType } from 'src/services/api/dashboards/overall/overallDashboardApi'
import Translations from 'src/layouts/components/Translations'
import * as htmlToImage from 'html-to-image'
import { saveAs } from 'file-saver'
import { DotsVertical, Download } from 'mdi-material-ui'
import { MouseEvent, useState } from 'react'

const onCapture = () => {
  const pictureId = document.getElementById('commentSentiment')
  if (pictureId) {
    htmlToImage.toPng(pictureId, { backgroundColor: '#fff' }).then(function (dataUrl) {
      saveAs(dataUrl, 'Comment Sentiment (overall).png')
    })
  }
}

const CommentSentiment = ({ apiParams }: { apiParams: any; chartId: string }) => {

  const { resultSentimentType, loadingFilterData } = GetSentimentType(apiParams)

  // const reportNo = '1.1.019'

  const theme = useTheme()
  const labelColor = theme.palette.text.primary

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)

  const rowOptionsOpen = Boolean(anchorEl)

  const handleRowOptionsClick = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }
  const handleRowOptionsClose = () => {
    setAnchorEl(null)
  }

  const options = {
    responsive: true,
    backgroundColor: false,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        align: 'end',
        position: 'top',
        labels: {
          padding: 25,
          boxWidth: 10,
          color: labelColor,
          usePointStyle: true
        }
      },
      tooltip: {
        callbacks: {
          label: (context: any) => context?.label + ': ' + context?.formattedValue + '%'
        }
      }
    }
  }

  const data = {
    labels: ['Negative', 'Neutral', 'Positive'],
    datasets: [
      {
        data: [
          resultSentimentType?.negative_percentage || 0,
          resultSentimentType?.neutral_percentage || 0,
          resultSentimentType?.positive_percentage || 0
        ],
        backgroundColor: ['#C73E1D', '#FEB95F', '#63A375'],
        hoverOffset: 3
      }
    ]
  }

  return (
    <Paper style={{ border: `3px solid #fff`, borderRadius: 7  , minHeight: 410, maxHeight: 500, }} >
      {loadingFilterData && <LinearProgress style={{ width: '100%' }} />}

      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
        <span style={{ display: 'flex', justifyContent: 'flex-start' }}>
          <CardHeader title={<Translations text='Comment Sentiment' />} titleTypographyProps={{ variant: 'h6' }} />
          <StyledTooltip
            arrow
            title={
              <span>
                <Typography variant='h6' sx={{ color: 'white' }}>
                  <Translations text='overallChart11Title' />
                </Typography>
                <Typography variant='body2' sx={{ color: 'white' }}>
                  <Translations text='overallChart11Description' />
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
      <CardContent id='commentSentiment'>
        <Grid container spacing={3}>
          <Grid item xs={8}>
            {resultSentimentType?.negative_percentage ||
            resultSentimentType?.neutral_percentage ||
            resultSentimentType?.positive_percentage ? (
              <Doughnut data={data} options={options as any} height={194} />
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
          <Grid item xs={4} mt={14}>
            {resultSentimentType?.negative_percentage ||
            resultSentimentType?.neutral_percentage ||
            resultSentimentType?.positive_percentage ? (
              <>
                <span style={{ display: 'flex' }}>
                  <span style={{ paddingTop: '5px' }}>
                    <ThumbUp style={{ fontSize: '20px' }} />
                  </span>
                  <span style={{ paddingTop: '3px', paddingLeft: '9px', fontSize: '13px' }}>
                    {resultSentimentType?.positive_percentage
                      ? 'Positive ' + resultSentimentType?.positive_percentage + '%'
                      : ''}
                  </span>
                </span>

                <span style={{ display: 'flex' }}>
                  <span style={{ paddingTop: '5px' }}>
                    <ThumbsUpDown style={{ fontSize: '24px' }} />
                  </span>
                  <span style={{ padding: '6px', fontSize: '13px' }}>
                    {resultSentimentType?.neutral_percentage
                      ? 'Neutral ' + resultSentimentType?.neutral_percentage + '%'
                      : ''}
                  </span>
                </span>
                <span style={{ display: 'flex' }}>
                  <span style={{ paddingTop: '5px' }}>
                    <ThumbDown style={{ fontSize: '20px' }} />
                  </span>
                  <span style={{ paddingTop: '3px', paddingLeft: '9px', fontSize: '13px' }}>
                    {resultSentimentType?.negative_percentage
                      ? 'Negative ' + resultSentimentType?.negative_percentage + '%'
                      : ''}
                  </span>
                </span>
              </>
            ) : (
              ''
            )}
          </Grid>
        </Grid>
      </CardContent>
    </Paper>
  )
}

export default CommentSentiment
