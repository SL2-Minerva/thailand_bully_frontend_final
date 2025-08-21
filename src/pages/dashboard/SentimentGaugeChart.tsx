import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import { Grid, IconButton, LinearProgress, Menu, MenuItem, Paper, Typography } from '@mui/material'
import dynamic from 'next/dynamic'
import { StyledTooltip } from './overall'
import { Information } from 'mdi-material-ui'
import { GetSentimentScore } from 'src/services/api/dashboards/overall/overallDashboardApi'
import Translations from 'src/layouts/components/Translations'
import * as htmlToImage from 'html-to-image'
import { saveAs } from 'file-saver'
import { DotsVertical, Download } from 'mdi-material-ui'
import { MouseEvent, useState } from 'react'

// import GaugeChart from 'react-gauge-chart'
const onCapture = () => {
  const pictureId = document.getElementById('sentimentScore')
  if (pictureId) {
    htmlToImage.toPng(pictureId, { backgroundColor: '#fff' }).then(function (dataUrl) {
      saveAs(dataUrl, 'Sentiment Score (overall).png')
    })
  }
}

const GaugeChart = dynamic(() => import('react-gauge-chart'), { ssr: false })

const SentimentGaugeChart = ({ apiParams }: { apiParams: any; chartId: string }) => {

  const { resultSentimentScore, loadingFilterData } = GetSentimentScore(apiParams)

  // const reportNo = '1.1.018'
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)

  const rowOptionsOpen = Boolean(anchorEl)

  const handleRowOptionsClick = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }
  const handleRowOptionsClose = () => {
    setAnchorEl(null)
  }


  return (
      <Paper sx={{ border: `3px solid #fff`, borderRadius: 1, minHeight: 410, maxHeight: 500 }} >
      {loadingFilterData && <LinearProgress style={{ width: '100%' }} />}
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
        <span style={{ display: 'flex', justifyContent: 'flex-start' }}>
          <CardHeader title={<Translations text='Sentiment Score' />} titleTypographyProps={{ variant: 'h6' }} />
          <StyledTooltip
            arrow
            title={
              <span>
                <Typography variant='h6' sx={{ color: 'white' }}>
                  <Translations text='overallChart10Title' />
                </Typography>
                <Typography variant='body2' sx={{ color: 'white' }}>
                  <Translations text='overallChart10Description' />
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
      <CardContent id='sentimentScore'>
        <Grid container spacing={4}>
          <Grid item xs={8}>
            <GaugeChart
              id='gauge-chart'
              animate={false}
              nrOfLevels={3}
              arcsLength={[0.2, 0.2, 0.2, 0.2, 0.2]}
              colors={['#EA4228', '#ff9800', '#ffc107', '#ffeb3b', '#5BE12C']}
              percent={resultSentimentScore?.sentiment_percentage / 100 || 0}
              arcPadding={0.01}
              needleColor='#4c4e64de'
              hideText={true}
            />
          </Grid>
          <Grid item xs={4}>
            <h1>{resultSentimentScore?.neutral_value}</h1>
            <p style={{ paddingLeft: '13px' }}>{resultSentimentScore?.text || '-'}</p>
          </Grid>
        </Grid>

        <Grid container spacing={1}>
          <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center' }}>
            <h2 style={{ marginTop: '0.5rem', marginRight: '1rem' }}>
              Previous Period Score {resultSentimentScore?.pervious_sentiment}
            </h2>
            <h1></h1>
          </Grid>
        </Grid>
      </CardContent>
    </Paper>
  )
}

export default SentimentGaugeChart
