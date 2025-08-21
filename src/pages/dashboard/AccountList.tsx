import { Avatar, Card, CardHeader, Grid, LinearProgress, Paper, Typography } from '@mui/material'
import { Information } from 'mdi-material-ui'
import { useState } from 'react'
import Translations from 'src/layouts/components/Translations'

//import AccountDetail from './AccountDetail'
import { StyledTooltip } from './overall'

const AccountList = ({
  cardHeader,

  //title,
  // networkTitle,
  accountList,
  loading,

  // params
}: {
  chartId: string
  cardHeader: string
  title: string
  networkTitle: string
  accountList: any
  loading: boolean
  params: any
}) => {

  // const [showDetail, setShowDetail] = useState<boolean>(false)
  // const [current, setCurrent] = useState<any>({})
  // const [keywordId, setKeywordId] = useState<any>()
  // const [authorName, setAuthorName] = useState<string>('')
  // const [messageId, setMessageId] = useState<string>('')

  const [, setShowDetail] = useState<boolean>(false)
  const [, setCurrent] = useState<any>({})
  const [, setAuthorName] = useState<string>('')
  const [, setMessageId] = useState<string>('')

  //const reportNo = '1.2.02'

  // const chartTitle = chartId + ', Report Level 2(' + reportNo + ')'

  return (
    <Paper style={{ border: `3px solid #fff`, borderRadius: 7, maxHeight: 493, minHeight: 499, overflow: 'auto' }}>
      {loading && <LinearProgress style={{ width: '100%' }} />}
      <span style={{ display: 'flex', justifyContent: 'flex-start' }}>
        <CardHeader title={<Translations text={cardHeader} />} titleTypographyProps={{ variant: 'h6' }} />
        <StyledTooltip
          arrow
          title={
            <span>
              <Typography variant='h6' sx={{ color: 'white' }}>
                <Translations text='wordCloudChart4Title' />
              </Typography>
              <Typography variant='body2' sx={{ color: 'white' }}>
                <Translations text='wordCloudChart4Description' />
              </Typography>
            </span>
          }
        >
          <Information style={{ marginTop: '22px', fontSize: '29px' }} />
        </StyledTooltip>
      </span>
      {(accountList || [])?.map((keyword: any, index: any) => {
        return (
          <div key={index}>
            <Card
              sx={{ margin: '1rem'}}
              onClick={() => {
                setShowDetail(true)
                setCurrent({})
                setAuthorName(keyword.author)
                setMessageId(keyword.message_id)
              }}
            >
              <Grid container spacing={2}>
                <Grid item sm={2} xs={2}>
                  <Avatar sx={{ height: 50, width: 50, marginTop: '1rem', ml: 2 }} />
                </Grid>
                <Grid item sm={7} xs={7} mt={2} mb={2}>
                  <Typography variant='h6'>{keyword.author}</Typography>
                  <Typography variant='subtitle1'>
                    {keyword.total_message} <Translations text='Popular Word' />
                  </Typography>
                  <Typography variant='subtitle1'>{keyword.engagements} Engagements/posts</Typography>
                </Grid>
                <Grid item sm={2} xs={2} mt={7}>
                  {keyword?.source_name == 'facebook' ? (
                    <img alt={'logo'} width={34} height={34} src={`/images/logos/facebook-round.png`} />
                  ) : keyword?.source_name == 'x' ? (
                    <img alt={'logo'} width={34} height={34} src={`/images/logos/x-black.jpg`} />
                  ) : keyword?.source_name == 'youtube' ? (
                    <img width={34} height={34} alt={'logo'} src={`/images/logos/youtube-text.png`} />
                  ) : keyword?.source_name == 'instagram' ? (
                    <img width={34} alt={'logo'} height={34} src={`/images/logos/instagram.png`} />
                  ) : keyword?.source_name == 'pantip' ? (
                    <img width={34} alt={'logo'} height={34} src={`/images/logos/pantip.png`} />
                  ) : keyword?.source_name == 'google' ? (
                    <img width={34} alt={'logo'} height={34} src={`/images/logos/google.png`} />
                  ) : keyword?.source_name == 'tiktok' ? (
                    <img width={34} alt={'logo'} height={34} src={`/images/logos/tiktok.png`} />
                  ) : (
                    <span style={{ textTransform: 'uppercase' }}>{keyword?.source_name}</span>
                  )}
                </Grid>

                {/* <Grid item sm={2} xs={2} mt={7}>
                  {keyword?.image ? (
                    <img
                      alt="logo"
                      width={34}
                      height={34}
                      src={`https://api.cornea-demo.com/storage/${keyword.image}`}
                      onError={(e) => {
                        e.currentTarget.style.display = 'none'
                      }}
                    />
                  ) : (
                    <span style={{ textTransform: 'uppercase' }}>
                      {keyword?.source_name}
                    </span>
                  )}
                </Grid> */}
              </Grid>
            </Card>
          </div>
        )
      })}
      {!accountList || accountList?.length == 0 ? (
        <div
          style={{
            padding: '130px 0',
            textAlign: 'center',
            verticalAlign: 'middle',
            color: '#80808059'
          }}
        >
          <Translations text='no data' />
        </div>
      ) : (
        ''
      )}

      {/* {showDetail && params?.campaign ? (
        <AccountDetail
          show={showDetail}
          setShow={setShowDetail}
          current={current}
          title={title}
          networkTitle={networkTitle}
          params={params}
          keywordId={keywordId}
          setKeywordId={setKeywordId}
          reportNo={reportNo}
          authorName={authorName}
          setAuthorName={setAuthorName}
          message_id={messageId}
          setMessage_id={setMessageId}
        />
      ) : (
        ''
      )} */}
    </Paper>
  )
}

export default AccountList
