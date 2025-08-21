import * as React from 'react'
import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import { Avatar, Box, Grid, LinearProgress, Stack } from '@mui/material'
import {
  FacebookIcon,
  InstagramIcon,
  PantipIcon,
  TwitterIcon,
  YoutubeIcon,

  // gitHubIcon,
  googleIcon,
  tiktokIcon
} from 'src/utils/const'
import { CommentOutline, LinkVariant, ShareVariantOutline, ThumbUpOutline, EyeOutline } from 'mdi-material-ui'
import SourceService from 'src/services/api/source/SourceApi'
import AccountIcon from 'mdi-material-ui/Account';

// import Button from '@mui/material/Button'

// import dynamic from 'next/dynamic'

// type tinyLinkProps = { cardSize: string; showGraphic: boolean; maxLine: number; minLine: number; url: string }

// const ReactTinyLink : tinyLinkProps = dynamic(
//   ({cardSize}) => {
//     return import('react-tiny-link').then(mod => mod.ReactTinyLink)
//   },
//   { ssr: false }
// )

// const ReactTinyLink = dynamic(() => import('react-tiny-link'), { ssr: false })

interface CardInfo {
  resultTopEngagement: any
  loadingTopEngagement: boolean
  showFullMsg?: boolean
}

const TopManagementCard = (props: CardInfo) => {
  const { resultTopEngagement, loadingTopEngagement, showFullMsg } = props
  const { result_source_list } = SourceService();

  const imgPath = resultTopEngagement.profile_image;

  const [sourceName, setSourceName] = React.useState('')
  const [showMore, setShowMore] = React.useState(false)

  const [sourceIcon, setSourceIcon] = React.useState('/images/default_image.png');

  // const [showFullMessage, setShowFullMessage] = React.useState(false)

  const getSourceName = (sourceId: number) => {
    if (result_source_list) {
      for (let i = 0; i < result_source_list?.length; i++) {
        if (result_source_list[i].id === sourceId) {
          return result_source_list[i]?.name
        }
      }

      return ''
    }
  }

  React.useEffect(() => {
    if (result_source_list && resultTopEngagement?.source_id) {
      const source_name = getSourceName(resultTopEngagement?.source_id)

      // setShowFullMessage(true)
      // console.log('source name',source_name);
      setSourceName(source_name)
    }
  }, [resultTopEngagement?.source_id, result_source_list])

  React.useEffect(() => {
    if (resultTopEngagement?.source_name) {
      setSourceName(resultTopEngagement?.source_name)
    }
  }, [resultTopEngagement?.source_name])

  React.useEffect(() => {
    if (resultTopEngagement?.source_name || sourceName) {
      const icon =
      resultTopEngagement?.source_name === 'facebook' || sourceName === 'facebook'
        ? FacebookIcon
        : resultTopEngagement.source_name === 'x' || sourceName === 'x'
        ? TwitterIcon
        : resultTopEngagement.source_name === 'instagram' || sourceName === 'instagram'
        ? InstagramIcon
        : resultTopEngagement.source_name === 'youtube' || sourceName === 'youtube'
        ? YoutubeIcon
        : resultTopEngagement.source_name === 'pantip' || sourceName === 'pantip'
        ? PantipIcon
        : resultTopEngagement.source_name === 'google' || sourceName === 'google'
        ? googleIcon
        : resultTopEngagement.source_name === 'tiktok' || sourceName === 'tiktok'
        ? tiktokIcon
        : '/images/default_image.png';

      setSourceIcon(icon);
    }
  }, [resultTopEngagement?.source_name, sourceName])

  // React.useEffect(() => {
  //   if (resultTopEngagement?.source_image) {
  //     const imageUrl = `https://api.cornea-demo.com/storage/${resultTopEngagement.source_image}`;
  //     setSourceIcon(imageUrl);
  //   } else {
  //     setSourceIcon('/images/default_image.png');
  //   }
  // }, [resultTopEngagement?.source_image]);


  // function countLines() {
  //   const el = document.getElementById('content')
  //   console.log('paragraphs', el);
  //   if (el) {
  //     const divHeight = el?.offsetHeight
  //     const lineHeight = parseInt(el.style.lineHeight)
  //     const lines = divHeight / lineHeight
  //     console.log('Lines: ' + lines)
  //   }
  // }

  // React.useEffect(() => {
  //   countLines()
  // }, [])

  return (
    <Card sx={{ minHeight: '335px' }}>
      {loadingTopEngagement && <LinearProgress style={{ width: '100%' }} />}
      {/* <CardMedia sx={{ height: 140 }} image={'images/default_image.png'} title='No Image' /> */}

      <CardContent>
        <Grid container spacing={1}>
          <Grid item xs={2.5}>
            {/* <Avatar sx={{ width: 50, height: 50 }}><img src={imgPath} width={50} height={50} alt='' /></Avatar>  */}
            <Avatar sx={{ width: 50, height: 50 }}>
              {imgPath ? (
                <img src={imgPath} width={50} height={50} alt="profile" />
              ) : (
                <AccountIcon sx={{ fontSize: 40 }}  />
              )}
            </Avatar>
          </Grid>

          <Grid item xs={8.5}>
            <div style={{ display: 'flex' }}>
              <Avatar sx={{ width: 35, height: 35 }}>
                <img src={sourceIcon} width={35} height={35} alt='' />
              </Avatar>
              <Box maxHeight={30}>
                <Typography gutterBottom variant='body1' component='div' ml={2}>
                  <b>{resultTopEngagement.account_name}</b>
                  <Typography gutterBottom variant='caption' component='div'>
                    {resultTopEngagement.post_date + ', ' + resultTopEngagement.post_time}
                  </Typography>
                </Typography>
              </Box>
            </div>
          </Grid>
        </Grid>

        <Typography variant='body2' color='text.secondary' mt={4}>
          <Box sx={{ minHeight: '70px' }}>
            {showFullMsg ? (
              <Stack>
                <span
                  style={{
                    overflow: 'hidden',
                    display: '-webkit-box',
                    WebkitBoxOrient: 'vertical',
                    maxWidth: '400px'
                  }}
                >
                  <span>{resultTopEngagement.message_detail}</span>
                </span>
              </Stack>
            ) : (
              <>
                {showMore ? (
                  <>
                    {resultTopEngagement.message_detail}
                    <a
                      style={{ cursor: 'pointer' }}
                      onClick={(event: any) => {
                        setShowMore(!showMore)
                        event.stopPropagation()
                      }}
                      rel='noopener noreferrer'
                    >
                      <Typography variant='caption' sx={{ pl: 2 }}>
                        ...Show less
                      </Typography>
                    </a>
                  </>
                ) : (
                  <Stack>
                    <span
                      style={{
                        overflow: 'hidden',
                        display: '-webkit-box',
                        WebkitBoxOrient: 'vertical',
                        WebkitLineClamp: 2,
                        maxWidth: '400px'
                      }}
                    >
                      {resultTopEngagement.message_detail}
                    </span>
                    <a
                      onClick={(event: any) => {
                        setShowMore(!showMore)
                        event.stopPropagation()
                      }}
                      rel='noopener noreferrer'
                      style={{ cursor: 'pointer' }}
                    >
                      <Typography variant='caption' sx={{ pl: 2 }}>
                        ... Show More
                      </Typography>
                    </a>
                  </Stack>
                )}
              </>
            )}
          </Box>
        </Typography>

        <Box sx={{ maxWidth: '400px', display: 'flex', justifyContent: 'center', mt: 3, mb: 4 }}>
          <img
            src={resultTopEngagement.cover_image ?? '/images/default_image.png'}
            width={150}
            height={150}
            alt=''
            onError={(event: any) => {
              event.target.src = '/images/default_image.png'
              event.onerror = null
            }}
          />
        </Box>

        <Grid container spacing={2}>
          <Grid item md={10} xs={12} sx={{ display: 'flex' }}>
            <Stack direction='row' spacing={2}>
              <ThumbUpOutline fontSize='medium' sx={{ paddingRight: '3px' }} />{' '}
              {' : ' + resultTopEngagement.number_of_reactions}
            </Stack>

            <Stack direction='row' spacing={2} sx={{ marginLeft: '12px' }}>
              <CommentOutline fontSize='medium' sx={{ paddingRight: '3px' }} />{' '}
              {' : ' + resultTopEngagement.number_of_comments}
            </Stack>

            <Stack direction='row' spacing={2} sx={{ marginLeft: '12px' }}>
              <ShareVariantOutline fontSize='medium' sx={{ paddingRight: '3px' }} />{' '}
              {' : ' + resultTopEngagement.number_of_shares}
            </Stack>

            <Stack direction='row' spacing={2} sx={{ marginLeft: '12px' }}>
              <EyeOutline fontSize='medium' sx={{ paddingRight: '3px' }} />{' '}
              {' : ' + resultTopEngagement.number_of_views}
            </Stack>

          </Grid>
          <Grid item md={2} xs={12} sx={{ display: 'flex', justifyContent: 'end', pr: 3 }}>
            Link:{' '}
            <a href={resultTopEngagement.link_message} target='_blank' rel='noreferrer'>
              <LinkVariant fontSize='small' sx={{ color: 'blue' }} />
            </a>
          </Grid>
        </Grid>

        <Grid container spacing={2} mt={2}>
          <Grid item xs={12}>
            <Typography variant='body1'>
              {' '}
              <b>Sentiment: </b> {resultTopEngagement.sentiment}{' '}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant='body1'>
              {' '}
              <b>Bully Level: </b> {resultTopEngagement.bully_level}{' '}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant='body1'>
              {' '}
              <b>Bully Type: </b> {resultTopEngagement.bully_type}{' '}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant='body1'>
              {' '}
              <b>Scraping Time: </b> {resultTopEngagement.scrape_date + ', ' + resultTopEngagement.scrape_time}{' '}
            </Typography> 
          </Grid>
        </Grid>
      </CardContent>
      <CardActions>
        {/* <Button size='small'>Share</Button>
        <Button size='small'>Learn More</Button> */}
      </CardActions>
    </Card>
  )
}

export default TopManagementCard
