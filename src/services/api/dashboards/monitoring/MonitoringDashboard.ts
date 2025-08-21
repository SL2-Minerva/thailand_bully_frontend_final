// import moment from 'moment'
import { CallAPI } from 'src/services/CallAPI'

// const getParams = (data: any) => {
//   if (!data) return null

//   let params = {}
//   const todayDate = moment(new Date()).format('YYYY-MM-DD')

//   const previousDate = data?.previousDate ? moment(data?.previousDate).format('YYYY-MM-DD') : ''
//   const previousEndDate = data?.previousEndDate ? moment(data?.previousEndDate).format('YYYY-MM-DD') : ''

//   if (data?.period === 'customrange' && previousDate !== todayDate && previousEndDate !== todayDate) {
//     params = {
//       campaign_id: data?.campaign_id || '',
//       start_date: data?.start_date ? moment(data?.start_date).format('YYYY-MM-DD') : '',
//       end_date: data?.end_date ? moment(data?.end_date).format('YYYY-MM-DD') : '',
//       period: data?.period,
//       source: data?.source,
//       start_date_period: previousDate,
//       end_date_period: previousEndDate,
//       fillter_keywords: data?.fillter_keywords
//     }
//   } else {
//     params = {
//       campaign_id: data?.campaign_id || '',
//       start_date: data?.start_date ? moment(data?.start_date).format('YYYY-MM-DD') : '',
//       end_date: data?.end_date ? moment(data?.end_date).format('YYYY-MM-DD') : '',
//       period: data?.period,
//       source: data?.source,
//       fillter_keywords: data?.fillter_keywords
//     }
//   }

//   return params
// }

export const GetDailyMonitoring = (params: any) => {
  const [{ data: res, loading, error }] = CallAPI<{ data?: any }>({
    url: `/dashboard-monitoring/daily-by`,
    method: 'GET',
    params: params
  })

  return {
    resultDailyMonitoring: res?.data || null,
    loadingDailyMonitoring: loading,
    errorDailyMonitoring: error
  }
}

export const GetTopEngagementMonitoring = (params: any) => {
  const [{ data: res, loading, error }] = CallAPI<{ data?: any }>({
    url: `/dashboard-monitoring/top-engagement`,
    method: 'GET',
    params: params
  })

  return {
    resultTopEngagement: res?.data || null,
    loadingTopEngagement: loading,
    errorDailyMonitoring: error
  }
}

export const GetEngagementPostMonitoring = (params: any, select?: any, page?: number) => {
  if (select) {
    params.select = select
  }

  const [{ data: res, loading, error }] = CallAPI<{ data?: any; meta?: any }>({
    url: `/dashboard-monitoring/engagement-post`,
    method: 'GET',
    params: {
      ...params,
      page: page,
      limit: 10
    }
  })

  return {
    resultSummary: res?.data || null,
    loadingSummary: loading,
    errorSummary: error,
    total: res?.meta?.total_rows || 0
  }
}

export const EngagementDetails = (messageId: string) => {
  const [{ data: res, loading, error }] = CallAPI<{ data?: any }>({
    url: `/dashboard-monitoring/post-detail`,
    method: 'GET',
    params: {
      message_id: messageId

      // message_id : '1743293708840407247',
      // message_id: 'qu1kh08-3gI',
      // ...params,
    }
  })

  return {
    resultEngagementDetail: res?.data || null,
    loadingEngagementDetail: loading,
    errorEngagementDetail: error
  }
}

export const GetTopFiveInfluencers = (params: any) => {
  const [{ data: res, loading, error }] = CallAPI<{ data?: any }>({
    url: `/dashboard-monitoring/influencers/top`,
    method: 'GET',
    params: params
  })

  return {
    resultTopFiveInfluencers: res || null,
    loadingTopFiveInfluencers: loading,
    errorTopFiveInfluencers: error
  }
}

export const GetInfluencersSocialMedia = (params: any, select?: string, page?: number) => {
  if (params && select) {
    params.select = select
  }

  const [{ data: res, loading, error }] = CallAPI<{ data?: any; meta?: any }>({
    url: `/dashboard-monitoring/influencers`,
    method: 'GET',
    params: {
      ...params,
      page: page,
      limit: 10
    }
  })

  return {
    resultInfluencers: res?.data || null,
    loadingInfluencers: loading,
    total: res?.meta?.total_rows || 0,
    errorInfluencers: error
  }
}

interface DetailProps {
  campaign_id: string
  source: string
  start_date: any
  end_date: any
  period: any
  filter_keywords: string
  page: number
  limit: number
  author: string
  fieldName: string
  sortSelect: string
  page_name?: string
  sentiment_type?: string
}

export const GetInfluencerByAuthor = ({
  campaign_id,
  source,
  start_date,
  end_date,
  period,
  filter_keywords,
  page,
  limit,
  author,
  fieldName,
  sortSelect,
  page_name,
  sentiment_type
}: DetailProps) => {
  const params = {
    campaign_id: campaign_id,
    source: source,
    start_date: start_date,
    end_date: end_date,
    period: period,
    filter_keywords: filter_keywords,
    page: page,
    limit: limit,
    author: author,
    field: fieldName,
    sortSelect: sortSelect,
    page_name: page_name,
    sentiment_type: sentiment_type ? sentiment_type?.toLowerCase() : ''
  }
  const [{ data: response, loading, error }] = CallAPI<{ data?: any; meta?: any }>({
    url: `/dashboard-monitoring/influencers/author`,
    method: 'GET',
    params: params
  })

  return {
    resultMessageDetail: response?.data || null,
    totalMessage: response?.meta?.total_rows || 0,
    loadingMessageDetail: loading,
    errorMessageDetail: error
  }
}
