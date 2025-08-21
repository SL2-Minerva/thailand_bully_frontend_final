import * as React from 'react'
import Card from '@mui/material/Card'
import Typography from '@mui/material/Typography'
import { Avatar, Grid } from '@mui/material'
import SentimentLevelGraph from './SentimentLevelGraph'
import { getSourceIcon } from './TopFiveInfluencers'
import AccountIcon from 'mdi-material-ui/Account';

interface CardInfo {
  influencer: any
  loading: boolean
  setSentimentType: any
  setClickGraph: any
  handleOnClick: any
}

const TopFiveInfluencerCard = (props: CardInfo) => {
  const { influencer, setSentimentType, setClickGraph, handleOnClick } = props

  return (
    <Card sx={{ p: 3 }}>
      <Grid display='flex' justifyContent='center'>
        {/* <Avatar sx={{ width: 80, height: 80 }}>
          <img src={influencer?.cover_image || '/images/default_image.png'} width={80} height={80} alt='' />
        </Avatar> */}
        <Avatar sx={{ width: 80, height: 80 }}>
          {influencer?.cover_image ? (
            <img src={influencer.cover_image} width={80} height={80} alt="profile" />
          ) : (
            <AccountIcon sx={{ fontSize: 50 }} />
          )}
        </Avatar>
      </Grid>
      <Grid display='flex' justifyContent='center'>
        <Typography variant='h6' sx={{ fontWeight: 600 }}>
          {' '}
          {influencer.account_name}{' '}
        </Typography>
      </Grid>

      <Grid display='flex' justifyContent='center' mt={2}>
        <Avatar sx={{ width: 45, height: 45 }}>
          <img src={getSourceIcon(influencer?.source_name)} width={45} height={45} alt='' />
        </Avatar>
      </Grid>

      <Grid container maxHeight={45} minHeight={45} mt={4}>
        <Grid item xs={12} md={1}></Grid>
        <Grid item xs={12} md={5}>
          <Typography variant='caption' sx={{ pl: 2, fontWeight: 600 }}>
            Total Post:
            <span style={{ paddingLeft: 2, fontWeight: 600 }}> {influencer.total_post}</span>
          </Typography>
        </Grid>
        <Grid item xs={12} md={6}>
          <Typography variant='caption' sx={{ fontWeight: 600 }}>
            Total Engagement:
            <span style={{ paddingLeft: 2, fontWeight: 600 }}> {influencer.total_engagement} </span>
          </Typography>
        </Grid>
      </Grid>

      <Grid container spacing={2}>
        <Grid item xs={12} md={1}></Grid>
        <Grid item xs={12} md={5}>
          <Typography variant='caption' sx={{ pl: 2, fontWeight: 600 }}>
            Sentiment:
          </Typography>
        </Grid>
        <Grid item xs={12} md={6}></Grid>
        <Grid
          item
          xs={12}
          md={11}
          ml={3}
          mt={2}
          onClick={event => {
            event.stopPropagation();
            setClickGraph(true);
            handleOnClick(influencer?.account_name)
          }}
        >
          <SentimentLevelGraph
            resultSentimentLevel={influencer}
            setSentimentType={setSentimentType}
            setClickGraph={setClickGraph}
          />
        </Grid>
      </Grid>
    </Card>
  )
}

export default TopFiveInfluencerCard