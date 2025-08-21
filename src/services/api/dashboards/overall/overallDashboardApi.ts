import { idID } from '@mui/material/locale'
import { id } from 'chartjs-plugin-doughnutlabel-rebourne'
import moment from 'moment'
import { CallAPI } from 'src/services/CallAPI'

// import Words from 'src/types/dashboard/words'

export const GetParams = (data: any) => {
  if (!data) return null
  let params = {}

  // const todayDate = moment(new Date()).format('YYYY-MM-DD')

  const previousDate = data?.previousDate ? moment(data?.previousDate).format('YYYY-MM-DD') : ''
  const previousEndDate = data?.previousEndDate ? moment(data?.previousEndDate).format('YYYY-MM-DD') : ''

  if (
    data?.period === 'customrange' &&
    data?.end_date &&
    previousEndDate &&
    data?.start_date !== data?.end_date &&
    data?.previousDate !== data?.previousEndDate
  ) {
    params = {
      campaign_id: data?.campaignId || '',
      source: data?.platformId || '',
      start_date: data?.start_date ? moment(data?.start_date).format('YYYY-MM-DD') : '',
      end_date: data?.end_date ? moment(data?.end_date).format('YYYY-MM-DD') : '',
      period: data?.period,
      start_date_period: previousDate,
      end_date_period: previousEndDate,
      fillter_keywords: data?.fillter_keywords
    }
  } else {
    params = {
      campaign_id: data?.campaignId || '',
      source: data?.platformId || '',
      start_date: data?.start_date ? moment(data?.start_date).format('YYYY-MM-DD') : '',
      end_date: data?.end_date ? moment(data?.end_date).format('YYYY-MM-DD') : '',
      period: data?.period,
      fillter_keywords: data?.fillter_keywords
    }
  }

  return params
}

export const FilterByCampaignId = (apiParams?: any) => {
  const params = apiParams

  const [{ data: res, loading, error }] = CallAPI<{ data?: any }>({
    url: `/dashboard-overall`,
    method: 'GET',
    params: params
  })

  return {
    resultFilterData: res?.data || null,
    loadingFilterData: loading,
    errorFilterData: error
  }
}

export const EngagementTransactionReport = (apiParams?: any) => {
  const params = apiParams

  const [{ data: res, loading, error }] = CallAPI<{ data?: any }>({
    url: `/dashboard-overall/engagement-trnsaction`,
    method: 'GET',
    params: params
  })

  return {
    resultEngagementTransaction: res?.data || null,
    loadingEngagementTransaction: loading,
    errorEngagementTransaction: error
  }
}

export const TotalKeyStats = (apiParams: any) => {
  const params = apiParams

  const [{ data: response, loading, error }] = CallAPI<{ data?: any }>({
    url: `/dashboard-overall/key-stats`,
    method: 'GET',
    params: params
  })

  return {
    resultTotalMessagePerDay: response?.data?.total_messages || null,
    resultTotalEngagement: response?.data?.total_engagement || null,
    resultTotalAccount: response?.data?.total_accounts || null,
    loadingTotalKeystats: loading,
    errorTotalKeystats: error
  }
}

export const GetKeyWords = (params: any) => {
  const [{ data: response, loading, error }] = CallAPI<{ data: any }>({
    url: `/dashboard-overall/keyword-summary`,
    method: 'GET',
    params: params
  })

  return {
    resultKeywords: response?.data || null,
    loadingFilterData: loading,
    errorFilterData: error
  }
}

export const GetTopKeywords = (apiParams: any) => {
  const [{ data: response, loading, error }] = CallAPI<{ data?: any }>({
    url: `/dashboard-overall/keyword-summary-top`,
    method: 'GET',
    params: apiParams
  })

  return {
    resultTopKeywords: response?.data || null,
    loadingTopKeywords: loading,
    errorFilterData: error
  }
}

export const GetSentimentScore = (params: any) => {
  const [{ data: response, loading, error }] = CallAPI<{ data?: any }>({
    url: `/dashboard-overall/sentiment-score`,
    method: 'GET',
    params: params
  })

  return {
    resultSentimentScore: response?.data || null,
    loadingFilterData: loading,
    errorFilterData: error
  }
}

export const GetSentimentType = (params: any) => {
  const [{ data: response, loading, error }] = CallAPI<{ data?: any }>({
    url: `/dashboard-overall/sentiment-type`,
    method: 'GET',
    params: params
  })

  return {
    resultSentimentType: response?.data || null,
    loadingFilterData: loading,
    errorFilterData: error
  }
}

export const GetShareOfVoiceChart = (
  campaignId?: string,
  platformId?: string,
  start_date?: any,
  end_date?: any,
  period?: any,
  previousDate?: any,
  previousEndDate?: any,
  fillter_keywords?: string
) => {
  const params = {
    campaignId: campaignId,
    platformId: platformId,
    start_date: start_date,
    end_date: end_date,
    period: period,
    previousDate: previousDate,
    previousEndDate: previousEndDate,
    fillter_keywords: fillter_keywords
  }

  const [{ data: response, loading, error }] = CallAPI<{ data?: any }>({
    url: `/dashboard-overall/share-of-voice-number`,
    method: 'GET',
    params: GetParams(params)
  })

  return {
    resultShareOfVoiceChart: response?.data || null,
    loadingShareOfVoiceChart: loading,
    errorShareOfVoiceChart: error
  }
}

export const GetShareOfVoice = (params: any) => {
  const [{ data: response, loading, error }] = CallAPI<{ data?: any }>({
    url: `/dashboard-overall/share-of-voice`,
    method: 'GET',
    params: params
  })

  return {
    resultShareOfVoice: response?.data || null,
    loadingShareOfVoice: loading,
    errorShareOfVoice: error
  }
}

export const GetSentimentLevel = (params: any) => {
  const [{ data: response, loading, error }] = CallAPI<{ data?: any }>({
    url: `/dashboard-overall/sentiment-level`,
    method: 'GET',
    params: params
  })

  return {
    resultSentimentLevel: response?.data || null,
    loadingSentimentLevel: loading,
    errorSentimentLevel: error
  }
}

export const GetWordClouds = (params: any) => {
  const [{ data: response, loading, error }] = CallAPI<{ data?: any }>({
    url: `/dashboard-overall/word-clouds`,
    method: 'GET',
    params: params
  })

  return {
    resultWordClouds: response?.data || null,
    total: response?.data?.word_total || 0,
    loadingWordClouds: loading,
    errorWordClouds: error
  }
}

export const GetWordCloudsPlatform = (params: any) => {
  const [{ data: response, loading, error }] = CallAPI<{ data?: any }>({
    url: `/dashboard-overall/word-clouds-platform`,
    method: 'GET',
    params: params
  })

  // const response = {
  //   data: {
  //     word_clouds_platform : Words
  //   }
  // }

  return {
    resultWordCloudsPlatform: response?.data || null,
    loadingWordCloudsPlatform: loading,
    errorWordCloudsPlatform: error
  }
}

export const GetWordCloudsSentiment = (params: any) => {
  const [{ data: response, loading, error }] = CallAPI<{ data?: any }>({
    url: `/dashboard-overall/word-clouds-position`,
    method: 'GET',
    params: params
  })

  return {
    resultWordCloudsSentiment: response?.data || null,
    loadingWordCloudsSentiment: loading,
    errorWordCloudsSentiment: error
  }
}

export const GetDetailMessage = (
  campaignId?: string,
  platformId?: string,
  start_date?: any,
  end_date?: any,
  period?: any,
  previousDate?: any,
  previousEndDate?: any,
  keywordId?: any,
  page?: number,
  limit?: number,
  reportNo?: string,
  pageName?: string,
  label?: string,
  ylabel?: string,
  wordCloud?: string,
  authorName?: string,
  messageId?: any,
  setId?: boolean,
  
) => {
  let params: any = {
    id: setId || '',
    campaign_id: campaignId || '',
    message_id: messageId || '',
    keyword_id: keywordId || '',
    report_number: reportNo || ''
  }
  const todayDate = new Date()

  if (period === 'customrange' && previousDate !== todayDate && previousEndDate !== todayDate) {
    params = {
      campaign_id: campaignId || '',
      source: platformId || '',
      start_date: start_date ? moment(start_date).format('YYYY-MM-DD') : '',
      end_date: end_date ? moment(end_date).format('YYYY-MM-DD') : '',
      period: period,
      keyword_id: keywordId || '',
      start_date_period: previousDate ? moment(previousDate).format('YYYY-MM-DD') : '',
      end_date_period: previousEndDate ? moment(previousEndDate).format('YYYY-MM-DD') : '',
      page: page,
      limit: limit,
      report_number: reportNo,
      page_name: pageName?.toString(),
      label: label?.toString(),
      message_id: messageId
    }
  } else {
    params = {
      campaign_id: campaignId || '',
      source: platformId || '',
      start_date: start_date ? moment(start_date).format('YYYY-MM-DD') : '',
      end_date: end_date ? moment(end_date).format('YYYY-MM-DD') : '',
      period: period,
      keyword_id: keywordId || '',
      page: page,
      limit: limit,
      report_number: reportNo,
      page_name: pageName?.toString(),
      label: label?.toString(),
      message_id: messageId
    }
  }

  if (ylabel) {
    params.ylabel = encodeURI(ylabel)
  }
  if (wordCloud) {
    params.wordColud = wordCloud
  }
  if (authorName) {
    params.author_name = authorName
  }
  const [{ data: response, loading, error }] = CallAPI<{ data?: any }>({
    // url: `/dashboard-overall/level-three/`,

    url: `/level-three-table/`,
    method: 'GET',
    params: params
  })

  const responseData = []
  const res = response?.data?.message
  if (res) {
    for (let i = 0; i < res?.length; i++) {
      responseData.push({
        ...res[i],
        // id: i + 1
      })
    }
  }

  return {
    resultMessageDetail: response?.data?.message ? responseData : null,
    totalMessage: response?.data?.total || 0,
    loadingMessageDetail: loading,
    errorMessageDetail: error
  }
}



export const GetDetailMessageOverall = (
  campaignId?: string,
  platformId?: string,
  start_date?: any,
  end_date?: any,
  period?: any,
  previousDate?: any,
  previousEndDate?: any,
  keywordId?: any,
  page?: number,
  limit?: number,
  reportNo?: string,
  pageName?: string,
  label?: string,
  ylabel?: string,
  field?: string,
  sort?: string,
  reload?: boolean
) => {
  let params: any = {}
  const todayDate = new Date()
  
  // const startDate = moment(start_date, "DD/MM/YYYY");
  // const endDate = moment(end_date, "DD/MM/YYYY");
  let startDate = moment(start_date, "YYYY-MM-DD");
  let endDate = moment(end_date, "YYYY-MM-DD");
  

  if (reportNo !== '2.2.016' && reportNo !== '2.2.017' && reportNo !== '2.2.018' && reportNo !== '2.2.019') {
    startDate = moment(start_date, "DD/MM/YYYY");  
    endDate = moment(end_date, "DD/MM/YYYY");  
  } 
  

  if (period === 'customrange' && previousDate !== todayDate && previousEndDate !== todayDate) {
    params = {
      campaign_id: campaignId || '',
      source: platformId || '',
      start_date: start_date ? moment(startDate).format('YYYY-MM-DD') : '',
      end_date: end_date ? moment(endDate).format('YYYY-MM-DD') : '',
      period: period,
      keyword_id: keywordId || '',
      start_date_period: previousDate ? moment(previousDate).format('YYYY-MM-DD') : '',
      end_date_period: previousEndDate ? moment(previousEndDate).format('YYYY-MM-DD') : '',
      page: page,
      limit: limit,
      report_number: reportNo,
      page_name: pageName?.toString(),
      label: label?.toString(),
      ylabel: ylabel?.toString(),
      field: field,
      sort: sort
    }
  } else {
    params = {
      campaign_id: campaignId || '',
      source: platformId || '',
      start_date: start_date ? moment(startDate).format('YYYY-MM-DD') : '',
      end_date: end_date ? moment(endDate).format('YYYY-MM-DD') : '',
      period: period,
      keyword_id: keywordId || '',
      page: page,
      limit: limit,
      report_number: reportNo,
      page_name: pageName?.toString(),
      label: label?.toString(),
      ylabel: ylabel?.toString(),
      field: field,
      sort: sort
    }
  }

  // if (ylabel) {
  //   params.ylabel = encodeURI(ylabel)
  // }
  const [{ data: response, loading, error }] = CallAPI<{ data?: any }>({
    // url: `/dashboard-overall/level-three/`,

    url: `/level-three-table/`,
    method: 'GET',
    params: params,
    data: {
      reload: reload
    }
  })

  return {
    resultMessageDetail: response?.data?.message ?? null,
    totalMessage: response?.data?.total || 0,
    loadingMessageDetail: loading,
    errorMessageDetail: error
  }
}

export const GetNetworkGraph = (
  campaignId?: string,
  platformId?: string,
  start_date?: any,
  end_date?: any,
  period?: any,
  previousDate?: any,
  previousEndDate?: any,
  keywordId?: any,
  messageId?: any,
  setId?: boolean,
  reportNo?: string,
  type?: string,
  fillter_keywords?: any,
  limit?: any
) => {
  let params: any = {}

  params = {
    id: setId || '',
    campaign_id: campaignId || '',
    message_id: messageId || '',
    keyword_id: keywordId || '',
    report_number: reportNo || ''
  }

  if (
    period === 'customrange' &&
    end_date &&
    previousEndDate &&
    start_date !== end_date &&
    previousDate !== previousEndDate
  ) {
    params.start_date = start_date ? moment(start_date).format('YYYY-MM-DD') : ''
    params.end_date = end_date ? moment(end_date).format('YYYY-MM-DD') : ''
    params.period = period
    params.start_date_period = previousDate ? moment(previousDate).format('YYYY-MM-DD') : ''
    params.end_date_period = previousEndDate ? moment(previousEndDate).format('YYYY-MM-DD') : ''
    params.fillter_keywords = fillter_keywords
    params.sna_type = type
  } else {
    params.start_date = start_date ? moment(start_date).format('YYYY-MM-DD') : ''
    params.end_date = end_date ? moment(end_date).format('YYYY-MM-DD') : ''
    params.period = period
    params.fillter_keywords = fillter_keywords
    params.sna_type = type
  }

  if (platformId) {
    params.source = platformId
  }

  if (fillter_keywords) {
    params.fillter_keywords = fillter_keywords
  }

  if (limit) {
    params.limit = limit
  }

  const [{ data: response, loading, error }] = CallAPI<{ data?: any }>({
    url: `/level-four-table/`,
    method: 'GET',
    params: params
  })

  // const snaData = {
  //   nodes: response?.data?.nodes ?? [],
  //   edges: response?.data?.edges ?? []
  // }

  const messageData = response?.data
    ? {
        id: response.data.id,
        messageId: response.data.message_id,
        messageDetail: response.data.message_detail,
        link: response.data.link,
        mediaType: response.data.media_type
      }
    : null

  return {
    currentData: response?.data || null,
    // resultNetworkGraph: snaData,
    loadingNetworkGraph: loading,
    errorNetworkGraph: error,
    mediaTypeAnalysis: response?.data?.media_type || {}
  }
}

// export const GetNetworkGraph = (
//   campaignId?: string,
//   platformId?: string,
//   start_date?: any,
//   end_date?: any,
//   period?: any,
//   previousDate?: any,
//   previousEndDate?: any,
//   keywordId?: any,
//   messageId?: any,
//   setId?: boolean,
//   reportNo?: string,
//   type?: string,
//   fillter_keywords?: any,
//   limit?: any
// ) => {
//   let params: any = {}
//   params = {
//     id: setId ||'',
//     campaign_id: campaignId || '',
//     message_id: messageId || '',
//     keyword_id: keywordId || '',
//     report_number: reportNo || ''
//   }

//   if (
//     period === 'customrange' &&
//     end_date &&
//     previousEndDate &&
//     start_date !== end_date &&
//     previousDate !== previousEndDate
//   ) {
//     params.start_date = start_date ? moment(start_date).format('YYYY-MM-DD') : ''
//     params.end_date = end_date ? moment(end_date).format('YYYY-MM-DD') : ''
//     params.period = period
//     params.start_date_period = previousDate ? moment(previousDate).format('YYYY-MM-DD') : ''
//     params.end_date_period = previousEndDate ? moment(previousEndDate).format('YYYY-MM-DD') : ''
//     params.fillter_keywords = fillter_keywords
//     params.sna_type = type
//   } else {
//     params.start_date = start_date ? moment(start_date).format('YYYY-MM-DD') : ''
//     params.end_date = end_date ? moment(end_date).format('YYYY-MM-DD') : ''
//     params.period = period
//     params.fillter_keywords = fillter_keywords
//     params.sna_type = type
//   }

//   if (platformId) {
//     params.source = platformId
//   }

//   if (fillter_keywords) {
//     params.fillter_keywords = fillter_keywords
//   }

//   if (limit) {
//     params.limit = limit
//   }

//   const [{ data: response, loading, error }] = CallAPI<{ data?: any }>({
//     // url: `/dashboard-overall/daily-message/level-four`,
//     url: `/level-four-table/`,
//     method: 'GET',
//     params: params
//   })

//   const snaData = {
//     nodes: response?.data?.nodes ?? [],
//     edges: response?.data?.edges ?? []
//   }

//   return {
//     resultNetworkGraph: snaData,
//     loadingNetworkGraph: loading,
//     errorNetworkGraph: error
//   }
// }

export const GetMessageDetail = (paramData: any) => {
  const [{ data: response, loading, error }] = CallAPI<{ data?: any }>({
    url: `/dashboard-overall/daily-message/level-three/`,
    method: 'GET',
    params: paramData
  })

  return {
    resultMessageDetail: response?.data?.message || null,
    totalMessage: response?.data?.total || 0,
    loadingMessageDetail: loading,
    errorMessageDetail: error
  }
}

export const GetMessageDetailOverall = (paramData: any) => {
  const [{ data: response, loading, error }] = CallAPI<{ data?: any }>({
    url: `/dashboard-overall/level-three/`,
    method: 'GET',
    params: paramData
  })

  return {
    resultMessageDetail: response?.data?.message || null,
    totalMessage: response?.data?.total || 0,
    loadingMessageDetail: loading,
    errorMessageDetail: error
  }
}

export const GetMessageDetailVoiceDashboard = (paramData: any, reload: boolean) => {
  const [{ data: response, loading, error }] = CallAPI<{ data?: any }>({
    // url: `/dashboard-voice/level-three/`,
    url: `/level-three-table/`,
    method: 'GET',
    params: paramData,
    data: {
      reload: reload
    }
  })

  return {
    resultMessageDetail: response?.data?.message ?? null,
    totalMessage: response?.data?.total || 0,
    loadingMessageDetail: loading,
    errorMessageDetail: error
  }
}

export const GetMessageDetailChannelDashboard = (paramData: any, reload: boolean) => {
  const [{ data: response, loading, error }] = CallAPI<{ data?: any }>({
    // url: `/dashboard-channel/level-three/`,
    url: `/level-three-table/`,
    method: 'GET',
    params: paramData,
    data: {
      reload: reload
    }
  })

  return {
    resultMessageDetail: response?.data?.message ?? null,
    totalMessage: response?.data?.total || 0,
    loadingMessageDetail: loading,
    errorMessageDetail: error
  }
}

export const GetMessageDetailEngagementDashboard = (paramData: any, reload: boolean) => {
  const [{ data: response, loading, error }] = CallAPI<{ data?: any }>({
    // url: `/dashboard-engagement/level-three/`,
    url: `/level-three-table/`,
    method: 'GET',
    params: paramData,
    data : {
      reload: reload
    }
  })

  return {
    resultMessageDetail: response?.data?.message ?? null,
    totalMessage: response?.data?.total || 0,
    loadingMessageDetail: loading,
    errorMessageDetail: error
  }
}

export const GetMessageDetailSentimentDashboard = (paramData: any, reload:boolean) => {
  const [{ data: response, loading, error }] = CallAPI<{ data?: any }>({
    // url: `/dashboard-sentiment/level-three/`,
    url: `/level-three-table/`,
    method: 'GET',
    params: paramData,
    data: {
      reload: reload
    }
  })

  return {
    resultMessageDetail: response?.data?.message ?? null,
    totalMessage: response?.data?.total || 0,
    loadingMessageDetail: loading,
    errorMessageDetail: error
  }
}

export const GetMessageDetailBullyDashboard = (paramData: any, reload: boolean) => {
  const [{ data: response, loading, error }] = CallAPI<{ data?: any }>({
    // url: `/dashboard-bully/level-three/`,
    url: `/level-three-table/`,
    method: 'GET',
    params: paramData,
    data: {
      reload: reload
    }
  })

  return {
    resultMessageDetail: response?.data?.message ?? null,
    totalMessage: response?.data?.total || 0,
    loadingMessageDetail: loading,
    errorMessageDetail: error
  }
}

export const GetKeyWordsList = (campaignId: any) => {
  const [{ data: response, loading, error }] = CallAPI<{ data?: any }>({
    url: `/keywords`,
    method: 'GET',
    params: {
      campaing_id: campaignId
    }
  })

  const resultData = response?.data
  const keywordsColor = []
  if (resultData && resultData?.length > 0) {
    for (let i = 0; i < resultData?.length; i++) {
      if (resultData[i]?.color) {
        keywordsColor.push(resultData[i]?.color)
      }

      // keywordsColor.push(SentimentAllColors[i])
    }
  }

  return {
    resultKeywordList: response?.data || [],
    keywordsColor: keywordsColor?.length > 0 ? keywordsColor : null,
    loadingKeywordList: loading,
    errorKeywordList: error
  }
}


export const DeleteMessage = () => {
  const [{ data, loading, error }, store] = CallAPI<{
    code: 0 | 1
    message: string
    data: any
  }>(
    {
      url: `/delete/message`,
      method: 'POST'
    },
    { manual: true }
  )

  return {
    resultDeleteMessage: data?.data,
    laodingDeleteMessage: loading,
    errorDeleteMessage: error,
    deleteMessages: (messageId: any) => {
      const inputData = {
        id: messageId
      }

      return new Promise((resolve, reject) => {
        store({
          data: inputData
        })
          .then(({ data: { data, code, message } }) => {
            if (code === 0) {
              reject(message)
            } else {
              resolve(data)
            }
          })
          .catch(ex => {
            reject(ex.toString())
          })
      })
    }
  }
}