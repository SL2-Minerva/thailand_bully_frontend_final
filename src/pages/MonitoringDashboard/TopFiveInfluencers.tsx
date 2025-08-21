import React, { useState } from 'react'
import { Avatar, Grid, Paper, Typography } from '@mui/material'

interface MessageData {
  source_name: string
  params: any
  highlight: boolean
  chartId: string
  resultTopFiveInfluencer: any
  loadingTopFiveInfluencer: boolean
  name: string;
  image?: string | null;
  source_image: string
}
import { FacebookIcon, InstagramIcon, PantipIcon, TwitterIcon, YoutubeIcon, googleIcon, tiktokIcon } from 'src/utils/const'
import SentimentLevelGraph from './SentimentLevelGraph'
import InfluencerDetail from './InfluencerDetail'

export const getSourceIcon = (sourceName: string) => {
  const sourceIcon =
    sourceName === 'facebook'
      ? FacebookIcon
      : sourceName === 'x'
      ? TwitterIcon
      : sourceName === 'instagram'
      ? InstagramIcon
      : sourceName === 'youtube'
      ? YoutubeIcon
      : sourceName === 'pantip'
      ? PantipIcon
      : sourceName === 'google'
      ? googleIcon
      : sourceName === 'tiktok'
      ? tiktokIcon
      : '/images/default_image.png'

  return sourceIcon
}

// export const getSourceIcon = (influencerData: any): string => {
//   if (influencerData?.source_image && influencerData.source_image.trim() !== '') {
//     return `https://api.cornea-demo.com/storage/${influencerData.source_image}`
//   }

//   return 'PlatformIcon'
// }

const TopFiveInfluencer = (props: MessageData) => {
  const { resultTopFiveInfluencer, params } = props
  const [accountName, setAccountName] = useState<string>('')
  const [showDetail, setShowDetail] = useState<boolean>(false)

  const handleOnClick = (name: string) => {
    setAccountName(name)
    setShowDetail(true)
  }

  return (
    <Grid container spacing={2} pl={3}>
      {(resultTopFiveInfluencer?.data || [])?.map((influencer: any, index: number) => {
        return (
          <>
            {index < 5 ? (
              <Grid xs={6} md={2.4} key={index} p={2}>
                <Paper
                  onClick={() => {
                    handleOnClick(influencer.account_name)
                  }}
                  sx={{ p: 6 }}
                >
                  <Grid display='flex' justifyContent='center'>
                    <Avatar sx={{ width: 80, height: 80 }}>
                      <img src={influencer?.cover_image || '/images/default_image.png'} width={80} height={80} alt='' />
                    </Avatar>
                  </Grid>
                  <Grid display='flex' justifyContent='center'>
                    <Typography variant='body1' sx={{ fontWeight: 600 }}>
                      {' '}
                      {influencer.account_name}{' '}
                    </Typography>
                  </Grid>

                  <Grid display='flex' justifyContent='center' mt={2}>
                  <Avatar sx={{ width: 35, height: 35, bgcolor: 'transparent'  }}>
                    {influencer?.source_image ? (
                      <img
                        src={getSourceIcon(influencer.source_name,)}
                        width={35}
                        height={35}
                        alt={influencer.source_name}
                        onError={(e) => {
                          e.currentTarget.onerror = null;
                          e.currentTarget.style.display = 'none';
                        }}
                      />
                    ) : (
                      <span
                        style={{fontSize: '10px',fontWeight: 'bold',textAlign: 'center',display: 'block',width: 35,height: 35,lineHeight: '35px',userSelect: 'none',
                        }}
                      >
                        {influencer?.source_name?.toUpperCase() || 'DEFAULT'}
                      </span>
                    )}
                  </Avatar>
                  </Grid>

                  <Grid container maxHeight={45} minHeight={45} mt={3}>
                    <Grid item xs={12} md={4.5}>
                      <Typography sx={{ fontSize: '11px', pl: 2, fontWeight: 600 }}>
                        Total Post: <br/><span style={{ fontSize: '12px', paddingLeft: 2, fontWeight: 600 }}> {influencer.total_post}</span>
                      </Typography>
                    </Grid>
                    <Grid item xs={12} md={7.5}>
                      <Typography sx={{ fontSize: '11px', fontWeight: 600 }}>
                        Total Engagement:<br/> <span style={{ fontSize: '12px', paddingLeft: 2, fontWeight: 600 }}>  {influencer.total_engagement} </span>
                      </Typography>
                    </Grid>
                  </Grid>

                  <Grid container spacing={2}>
                    <Grid item xs={12} md={5} mt={1}>
                      <Typography sx={{ fontSize: '11px', pl: 2, fontWeight: 600 }}>Sentiment:</Typography>
                    </Grid>
                    <SentimentLevelGraph resultSentimentLevel={influencer} />
                  </Grid>
                </Paper>
              </Grid>
            ) : (
              ''
            )}
          </>
        )
      })}

      {showDetail && accountName ? (
        <InfluencerDetail
          show={showDetail}
          setShow={setShowDetail}
          params={params}
          keywordId={accountName}
          setKeywordId={setAccountName}
          reportNo={''}
          title='Post by Influencer'
          networkTitle=''
        />
      ) : (
        ''
      )}
    </Grid>
  )
}

export default TopFiveInfluencer
