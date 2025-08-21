import moment from 'moment'
import { CallAPI } from 'src/services/CallAPI'

const getParams = (data: any) => {
  if (!data) return null

  let params = {}
  const todayDate = moment(new Date()).format('YYYY-MM-DD')

  const previousDate = data?.previousDate ? moment(data?.previousDate).format('YYYY-MM-DD') : ''
  const previousEndDate = data?.previousEndDate ? moment(data?.previousEndDate).format('YYYY-MM-DD') : ''

  if (data?.period === 'customrange' && previousDate !== todayDate && previousEndDate !== todayDate) {
    params = {
      campaign_id: data?.campaign_id || '',
      start_date: data?.start_date ? moment(data?.start_date).format('YYYY-MM-DD') : '',
      end_date: data?.end_date ? moment(data?.end_date).format('YYYY-MM-DD') : '',
      period: data?.period,
      start_date_period: previousDate,
      end_date_period: previousEndDate,
      fillter_keywords: data?.fillter_keywords
    }
  } else {
    params = {
      campaign_id: data?.campaign_id || '',
      start_date: data?.start_date ? moment(data?.start_date).format('YYYY-MM-DD') : '',
      end_date: data?.end_date ? moment(data?.end_date).format('YYYY-MM-DD') : '',
      period: data?.period,
      fillter_keywords: data?.fillter_keywords
    }
  }

  return params
}

export const GetPercentageChannel = (
  campaignId?: string,
  start_date?: any,
  end_date?: any,
  period?: any,
  fillter_keywords?: string,
  previousDate?: any, 
  previousEndDate? : any
) => {
  const params = {
    campaign_id: campaignId || '',
    start_date: start_date ? moment(start_date).format('YYYY-MM-DD') : '',
    end_date: end_date ? moment(end_date).format('YYYY-MM-DD') : '',
    period: period,
    fillter_keywords: fillter_keywords,
    previousDate : previousDate,
    previousEndDate : previousEndDate
  }
  const [{ data: response, loading, error }] = CallAPI<{ data?: any }>({
    url: `/dashboard-channel/percentage-of-channel`,
    method: 'GET',
    params: getParams(params)
  })

  return {
    resultPercentageChannel: response?.data || null,
    loadingPercentageChannel: loading,
    errorPercentageChannel: error
  }
}

export const GetDailyChannel = (
  campaignId?: string,
  start_date?: any,
  end_date?: any,
  period?: any,
  fillter_keywords?: string,
  previousDate?: any, 
  previousEndDate? : any
) => {
  const params = {
    campaign_id: campaignId || '',
    start_date: start_date ? moment(start_date).format('YYYY-MM-DD') : '',
    end_date: end_date ? moment(end_date).format('YYYY-MM-DD') : '',
    period: period,
    fillter_keywords: fillter_keywords,
    previousDate : previousDate,
    previousEndDate : previousEndDate
  }
  const [{ data: res, loading, error }] = CallAPI<{ data?: any }>({
    url: `/dashboard-channel/daily-channel`,
    method: 'GET',
    params: getParams(params)
  })

  return {
    resultDailyChannel: res?.data || null,
    loadingDailyChannel: loading,
    errorDailyChannel: error
  }
}

export const GetDailyBy = (
  params : any
) => {
  const [{ data: res, loading, error }] = CallAPI<{ data?: any }>({
    url: `/dashboard-channel/daily-by`,
    method: 'GET',
    params: params
  })

  return {
    resultPercentageChannelPrevious: res?.data?.prcentage_of_messages_previous || null,
    resultPercentageChannelCurrent: res?.data?.prcentage_of_messages_current || null,
    resultDailyChannel: res?.data?.daily_message || null,
    loadingDailyChannel: loading,
    errorDailyChannel: error
  }
}

export const GetChannelBy = (
  params : any
) => {
  
  const [{ data: res, loading, error }] = CallAPI<{ data?: any }>({
    url: `/dashboard-channel/channel-by`,
    method: 'GET',
    params: params
  })

  return {
    resultChannelByDay: res?.data?.channel_by_day || null,
    resultChannelByTime: res?.data?.channel_by_time || null,
    resultChannelByDevice: res?.data?.channel_by_device || null,
    resultChannelByAccount: res?.data?.channel_by_account || null,
    resultChannelBySentiment: res?.data?.channel_by_sentiment || null,
    resultChannelByBullyLevel: res?.data?.channel_by_level || null,
    resultChannelByBullyType: res?.data?.channel_by_bully_type || null,
    loadingChannelBy: loading,
    errorChannelBy: error
  }
}

export const GetChannelByDay = (
  campaignId?: string,
  start_date?: any,
  end_date?: any,
  period?: any,
  fillter_keywords?: string,
  previousDate?: any, 
  previousEndDate? : any
) => {
  const params = {
    campaign_id: campaignId || '',
    start_date: start_date ? moment(start_date).format('YYYY-MM-DD') : '',
    end_date: end_date ? moment(end_date).format('YYYY-MM-DD') : '',
    period: period,
    fillter_keywords: fillter_keywords,
    previousDate : previousDate,
    previousEndDate : previousEndDate
  }
  const [{ data: res, loading, error }] = CallAPI<{ data?: any }>({
    url: `/dashboard-channel/channel-day`,
    method: 'GET',
    params: getParams(params)
  })

  return {
    resultChannelByDay: res?.data || null,
    loadingChannelByDay: loading,
    errorChannelByDay: error
  }
}

export const GetChannelByTime = (
  campaignId?: string,
  start_date?: any,
  end_date?: any,
  period?: any,
  fillter_keywords?: string,
  previousDate?: any, 
  previousEndDate? : any
) => {
  const params = {
    campaign_id: campaignId || '',
    start_date: start_date ? moment(start_date).format('YYYY-MM-DD') : '',
    end_date: end_date ? moment(end_date).format('YYYY-MM-DD') : '',
    period: period,
    fillter_keywords: fillter_keywords,
    previousDate : previousDate,
    previousEndDate : previousEndDate
  }
  const [{ data: res, loading, error }] = CallAPI<{ data?: any }>({
    url: `/dashboard-channel/channel-time`,
    method: 'GET',
    params: getParams(params)
  })

  return {
    resultChannelByTime: res?.data || null,
    loadingChannelByDay: loading,
    errorChannelByDay: error
  }
}

export const GetChannelByDevice = (
  campaignId?: string,
  start_date?: any,
  end_date?: any,
  period?: any,
  fillter_keywords?: string,
  previousDate?: any, 
  previousEndDate? : any
) => {
  const params = {
    campaign_id: campaignId || '',
    start_date: start_date ? moment(start_date).format('YYYY-MM-DD') : '',
    end_date: end_date ? moment(end_date).format('YYYY-MM-DD') : '',
    period: period,
    fillter_keywords: fillter_keywords,
    previousDate : previousDate,
    previousEndDate : previousEndDate
  }
  const [{ data: res, loading, error }] = CallAPI<{ data?: any }>({
    url: `/dashboard-channel/channel-device`,
    method: 'GET',
    params: getParams(params)
  })

  return {
    resultChannelByDevice: res?.data || null,
    loadingChannelByDevice: loading,
    errorChannelByDevice: error
  }
}

export const GetChannelBySentiment = (
  campaignId?: string,
  start_date?: any,
  end_date?: any,
  period?: any,
  fillter_keywords?: string,
  previousDate?: any, 
  previousEndDate? : any
) => {
  const params = {
    campaign_id: campaignId || '',
    start_date: start_date ? moment(start_date).format('YYYY-MM-DD') : '',
    end_date: end_date ? moment(end_date).format('YYYY-MM-DD') : '',
    period: period,
    fillter_keywords: fillter_keywords,
    previousDate : previousDate,
    previousEndDate : previousEndDate
  }
  const [{ data: res, loading, error }] = CallAPI<{ data?: any }>({
    url: `/dashboard-channel/channel-sentiment`,
    method: 'GET',
    params: getParams(params)
  })

  return {
    resultChannelBySentiment: res?.data || null,
    loadingChannelBySentiment: loading,
    errorChannelBySentiment: error
  }
}

export const GetChannelByAccount = (
  campaignId?: string,
  start_date?: any,
  end_date?: any,
  period?: any,
  fillter_keywords?: string,
  previousDate?: any, 
  previousEndDate? : any
) => {
  const params = {
    campaign_id: campaignId || '',
    start_date: start_date ? moment(start_date).format('YYYY-MM-DD') : '',
    end_date: end_date ? moment(end_date).format('YYYY-MM-DD') : '',
    period: period,
    fillter_keywords: fillter_keywords,
    previousDate : previousDate,
    previousEndDate : previousEndDate
  }
  const [{ data: res, loading, error }] = CallAPI<{ data?: any }>({
    url: `/dashboard-channel/channel-account`,
    method: 'GET',
    params: getParams(params)
  })

  return {
    resultChannelByAccount: res?.data || null,
    loadingChannelByAccount: loading,
    errorChannelByAccount: error
  }
}

export const GetChannelByBullyLevel = (
  campaignId?: string,
  start_date?: any,
  end_date?: any,
  period?: any,
  fillter_keywords?: string,
  previousDate?: any, 
  previousEndDate? : any
) => {
  const params = {
    campaign_id: campaignId || '',
    start_date: start_date ? moment(start_date).format('YYYY-MM-DD') : '',
    end_date: end_date ? moment(end_date).format('YYYY-MM-DD') : '',
    period: period,
    fillter_keywords: fillter_keywords,
    previousDate : previousDate,
    previousEndDate : previousEndDate
  }
  const [{ data: res, loading, error }] = CallAPI<{ data?: any }>({
    url: `/dashboard-channel/channel-bully-level`,
    method: 'GET',
    params: getParams(params)
  })

  return {
    resultChannelByBullyLevel: res?.data || null,
    loadingChannelByBullyLevel: loading,
    errorChannelByBullyLevel: error
  }
}

export const GetChannelByBullyTypes = (
  campaignId?: string,
  start_date?: any,
  end_date?: any,
  period?: any,
  fillter_keywords?: string,
  previousDate?: any, 
  previousEndDate? : any
) => {
  const params = {
    campaign_id: campaignId || '',
    start_date: start_date ? moment(start_date).format('YYYY-MM-DD') : '',
    end_date: end_date ? moment(end_date).format('YYYY-MM-DD') : '',
    period: period,
    fillter_keywords: fillter_keywords,
    previousDate : previousDate,
    previousEndDate : previousEndDate
  }
  const [{ data: res, loading, error }] = CallAPI<{ data?: any }>({
    url: `/dashboard-channel/channel-bully-type`,
    method: 'GET',
    params: getParams(params)
  })

  return {
    resultChannelByBullyType: res?.data || null,
    loadingChannelByBullyType: loading,
    errorChannelByBullyType: error
  }
}

export const GetEngagementBy = (
  params : any
) => {

  const [{ data: response, loading, error }] = CallAPI<{ data?: any }>({
    url: `/dashboard-channel/engagement-by`,
    method: 'GET',
    params: params
  })

  return {
    resultEngagementRate: response?.data?.engagement_rate || null,
    resultEngagementRatePrevious: response?.data?.engagement_rate_previous || null,
    resultFacebookComparison: response?.data?.period_over_period?.facebook || null,
    resultInstagramComparison: response?.data?.period_over_period?.instagram || null,
    resultTwitterComparison: response?.data?.period_over_period?.x || null,
    resultYoutubeComparison: response?.data?.period_over_period?.youtube || null,
    resultPantipComparison: response?.data?.period_over_period?.pantip || null,
    resultGoogleComparison: response?.data?.period_over_period?.google || null,
    resultTiktokComparison: response?.data?.period_over_period?.tiktok || null,
    loadingEngagementBy: loading,
    errorEngagementBy: error
  }
}

export const GetComparison = (
  campaignId?: string,
  start_date?: any,
  end_date?: any,
  period?: any,
  fillter_keywords?: string,
  previousDate?: any, 
  previousEndDate? : any
) => {
  const params = {
    campaign_id: campaignId || '',
    start_date: start_date ? moment(start_date).format('YYYY-MM-DD') : '',
    end_date: end_date ? moment(end_date).format('YYYY-MM-DD') : '',
    period: period,
    fillter_keywords: fillter_keywords,
    previousDate : previousDate,
    previousEndDate : previousEndDate
  }

  const [{ data: response, loading, error }] = CallAPI<{ data?: any }>({
    url: `/dashboard-channel/period-over-period`,
    method: 'GET',
    params: getParams(params)
  })

  return {
    resultFacebookComparison: response?.data?.facebook || null,
    resultInstagramComparison: response?.data?.instagram || null,
    resultTwitterComparison: response?.data?.x || null,
    resultYoutubeComparison: response?.data?.youtube || null,
    resultPantipComparison: response?.data?.pantip || null,
    loadingTotalComparison: loading,
    errorTotalComparison: error
  }
}

export const GetEngagementRate = (
  campaignId?: string,
  start_date?: any,
  end_date?: any,
  period?: any,
  fillter_keywords?: string,
  previousDate?: any, 
  previousEndDate? : any
) => {
  const params = {
    campaign_id: campaignId || '',
    start_date: start_date ? moment(start_date).format('YYYY-MM-DD') : '',
    end_date: end_date ? moment(end_date).format('YYYY-MM-DD') : '',
    period: period,
    fillter_keywords: fillter_keywords,
    previousDate : previousDate,
    previousEndDate : previousEndDate
  }
  const [{ data: res, loading, error }] = CallAPI<{ data?: any }>({
    url: `/dashboard-channel/engagement-rate`,
    method: 'GET',
    params: getParams(params)
  })

  return {
    resultEngagementRate: res?.data || null,
    loadingEngagementRate: loading,
    errorEngagementRate: error
  }
}

export const GetEngagementRatePrevious = (
  campaignId?: string,
  start_date?: any,
  end_date?: any,
  period?: any,
  fillter_keywords?: string,
  previousDate?: any, 
  previousEndDate? : any
) => {
  const params = {
    campaign_id: campaignId || '',
    start_date: start_date ? moment(start_date).format('YYYY-MM-DD') : '',
    end_date: end_date ? moment(end_date).format('YYYY-MM-DD') : '',
    period: period,
    fillter_keywords: fillter_keywords,
    previousDate : previousDate,
    previousEndDate : previousEndDate
  }
  const [{ data: res, loading, error }] = CallAPI<{ data?: any }>({
    url: `/dashboard-channel/engagement-rate-previous`,
    method: 'GET',
    params: getParams(params)
  })

  return {
    resultEngagementRatePrevious: res?.data || null,
    loadingEngagementRatePrevious: loading,
    errorEngagementRatePrevious: error
  }
}

export const GetSentimentScore = (
  campaignId?: string,
  start_date?: any,
  end_date?: any,
  period?: any,
  fillter_keywords?: string,
  previousDate?: any, 
  previousEndDate? : any
) => {
  const params = {
    campaign_id: campaignId || '',
    start_date: start_date ? moment(start_date).format('YYYY-MM-DD') : '',
    end_date: end_date ? moment(end_date).format('YYYY-MM-DD') : '',
    period: period,
    fillter_keywords: fillter_keywords,
    previousDate : previousDate,
    previousEndDate : previousEndDate
  }
  const [{ data: res, loading, error }] = CallAPI<{ data?: any }>({
    url: `/dashboard-channel/sentiment-score`,
    method: 'GET',
    params: getParams(params)
  })

  return {
    resultSentimentScore: res?.data || null,
    loadingSentimentScore: loading,
    errorSentimentScore: error
  }
}

export const GetSentimentScorePrevious = (
  campaignId?: string,
  start_date?: any,
  end_date?: any,
  period?: any,
  fillter_keywords?: string,
  previousDate?: any, 
  previousEndDate? : any
) => {
  const params = {
    campaign_id: campaignId || '',
    start_date: start_date ? moment(start_date).format('YYYY-MM-DD') : '',
    end_date: end_date ? moment(end_date).format('YYYY-MM-DD') : '',
    period: period,
    fillter_keywords: fillter_keywords,
    previousDate : previousDate,
    previousEndDate : previousEndDate
  }

  const [{ data: res, loading, error }] = CallAPI<{ data?: any }>({
    url: `/dashboard-channel/sentiment-score-previous`,
    method: 'GET',
    params: getParams(params)
  })

  return {
    resultSentimentScorePrevious: res?.data || null,
    loadingSentimentScorePrevious: loading,
    errorSentimentScorePrevious: error
  }
}

export const GetChannelSentimentLevel = (
  campaignId?: string,
  start_date?: any,
  end_date?: any,
  period?: any,
  fillter_keywords?: string,
  previousDate?: any,
  previousEndDate?: any
) => {
  const params = {
    campaign_id: campaignId || '',
    start_date: start_date ? moment(start_date).format('YYYY-MM-DD') : '',
    end_date: end_date ? moment(end_date).format('YYYY-MM-DD') : '',
    period: period,
    fillter_keywords: fillter_keywords,
    previousDate : previousDate,
    previousEndDate : previousEndDate
  }
  const [{ data: response, loading, error }] = CallAPI<{ data?: any }>({
    url: `/dashboard-channel/channel-by-sentiment`,
    method: 'GET',
    params: getParams(params)
  })

  return {
    resultChannelSentimentLevel: response?.data || null,
    loadingChannelSentimentLevel: loading,
    errorChannelSentimentLevel: error
  }
}

export const GetSentimentLevel = (
  campaignId?: string,
  start_date?: any,
  end_date?: any,
  period?: any,
  fillter_keywords?: string,
  previousDate?: any,
  previousEndDate?: any
) => {
  const params = {
    campaign_id: campaignId || '',
    start_date: start_date ? moment(start_date).format('YYYY-MM-DD') : '',
    end_date: end_date ? moment(end_date).format('YYYY-MM-DD') : '',
    period: period,
    fillter_keywords: fillter_keywords,
    previousDate : previousDate,
    previousEndDate : previousEndDate
  }
  const [{ data: response, loading, error }] = CallAPI<{ data?: any }>({
    url: `/dashboard-channel/sentiment-level`,
    method: 'GET',
    params: getParams(params)
  })

  return {
    resultSentimentLevel: response?.data || null,
    loadingSentimentLevel: loading,
    errorSentimentLevel: error
  }
}

export const GetSentimentBy = (
  params : any
) => {
  const [{ data: response, loading, error }] = CallAPI<{ data?: any }>({
    url: `/dashboard-channel/sentiment-by`,
    method: 'GET',
    params: params
  })

  return {
    resultSentimentScore: response?.data?.sentiment_score || null,
    resultSentimentScorePrevious: response?.data?.sentiment_score_previous || null,
    resultChannelSentimentLevel: response?.data?.channel_by_sentiment || null,
    resultSentimentLevel: response?.data?.sentiment_by_level || null,
    loadingSentimentBy: loading,
    errorSentimentBy: error
  }
}
