import moment from 'moment'
import { CallAPI } from 'src/services/CallAPI'

const getParams = (data: any) => {
  if (!data) return null

  let params: any = {}
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

  if (data?.select) {
    params.select = data?.select
  }

  return params
}

export const FilterByCampaignId = (params: any) => {
  const [{ data: res, loading, error }] = CallAPI<{ data?: any }>({
    url: `/dashboard-engagement/engagement-trnsaction`,
    method: 'GET',
    params: params
  })

  return {
    resultFilterData: res?.data || null,
    loadingFilterData: loading,
    errorFilterData: error
  }
}

export const GetEngagementBy = (params: any) => {
  const [{ data: res, loading, error }] = CallAPI<{ data?: any }>({
    url: `/dashboard-engagement/engagement-by`,
    method: 'GET',
    params: params
  })

  return {
    resultEngagementByDay: res?.data?.EngagementByDay || null,
    resultEngagementByTime: res?.data?.EngagementByTime || null,
    resultEngagementByDevice: res?.data?.EngagementByDevice || null,
    resultEngagementByAccount: res?.data?.EngagementByAccount || null,
    resultEngagementChannel: res?.data?.EngagementChannel || null,
    resultKeywordByEngagementType: res?.data?.keywordByEngagementType || null,
    loadingEngagementBy: loading,
    errorEngagementBy: error
  }
}

export const GetMessagesByDay = (
  campaignId?: string,
  start_date?: any,
  end_date?: any,
  period?: any,
  fillter_keywords?: string,
  previousDate?: any,
  previousEndDate?: any
) => {
  const params = {
    campaign_id: campaignId,
    start_date: start_date ? moment(start_date).format('YYYY-MM-DD') : '',
    end_date: end_date ? moment(end_date).format('YYYY-MM-DD') : '',
    period: period,
    fillter_keywords: fillter_keywords,
    previousDate: previousDate,
    previousEndDate: previousEndDate
  }
  const [{ data: res, loading, error }] = CallAPI<{ data?: any }>({
    url: `/dashboard-engagement/engagement-day`,
    method: 'GET',
    params: getParams(params)
  })

  return {
    resultMessagesByDay: res?.data || null,
    loadingMessagesByDay: loading,
    errorMessagesByDay: error
  }
}

export const GetMessagesByTime = (
  campaignId?: string,
  start_date?: any,
  end_date?: any,
  period?: any,
  fillter_keywords?: string,
  previousDate?: any,
  previousEndDate?: any
) => {
  const params = {
    campaign_id: campaignId,
    start_date: start_date ? moment(start_date).format('YYYY-MM-DD') : '',
    end_date: end_date ? moment(end_date).format('YYYY-MM-DD') : '',
    period: period,
    fillter_keywords: fillter_keywords,
    previousDate: previousDate,
    previousEndDate: previousEndDate
  }
  const [{ data: res, loading, error }] = CallAPI<{ data?: any }>({
    url: `/dashboard-engagement/engagement-time`,
    method: 'GET',
    params: getParams(params)
  })

  return {
    resultMessagesByTime: res?.data || null,
    loadingMessagesByTime: loading,
    errorMessagesByTime: error
  }
}

export const GetMessagesByDevice = (
  campaignId?: string,
  start_date?: any,
  end_date?: any,
  period?: any,
  fillter_keywords?: string,
  previousDate?: any,
  previousEndDate?: any
) => {
  const params = {
    campaign_id: campaignId,
    start_date: start_date ? moment(start_date).format('YYYY-MM-DD') : '',
    end_date: end_date ? moment(end_date).format('YYYY-MM-DD') : '',
    period: period,
    fillter_keywords: fillter_keywords,
    previousDate: previousDate,
    previousEndDate: previousEndDate
  }
  const [{ data: res, loading, error }] = CallAPI<{ data?: any }>({
    url: `/dashboard-engagement/engagement-device`,
    method: 'GET',
    params: getParams(params)
  })

  return {
    resultMessagesByDevice: res?.data || null,
    loadingMessagesByDevice: loading,
    errorMessagesByDevice: error
  }
}

export const GetMessagesByEngagementType = (
  campaignId?: string,
  start_date?: any,
  end_date?: any,
  period?: any,
  fillter_keywords?: string,
  previousDate?: any,
  previousEndDate?: any
) => {
  const params = {
    campaign_id: campaignId,
    start_date: start_date ? moment(start_date).format('YYYY-MM-DD') : '',
    end_date: end_date ? moment(end_date).format('YYYY-MM-DD') : '',
    period: period,
    fillter_keywords: fillter_keywords,
    previousDate: previousDate,
    previousEndDate: previousEndDate
  }
  const [{ data: res, loading, error }] = CallAPI<{ data?: any }>({
    url: `/dashboard-engagement/keyword-by-engagement-type`,
    method: 'GET',
    params: getParams(params)
  })

  return {
    resultMessagesByDevice: res?.data || null,
    loadingMessagesByDevice: loading,
    errorMessagesByDevice: error
  }
}

export const GetMessagesByAccount = (
  campaignId?: string,
  start_date?: any,
  end_date?: any,
  period?: any,
  fillter_keywords?: string,
  previousDate?: any,
  previousEndDate?: any
) => {
  const params = {
    campaign_id: campaignId,
    start_date: start_date ? moment(start_date).format('YYYY-MM-DD') : '',
    end_date: end_date ? moment(end_date).format('YYYY-MM-DD') : '',
    period: period,
    fillter_keywords: fillter_keywords,
    previousDate: previousDate,
    previousEndDate: previousEndDate
  }

  const [{ data: res, loading, error }] = CallAPI<{ data?: any }>({
    url: `/dashboard-engagement/engagement-account`,
    method: 'GET',
    params: getParams(params)
  })

  return {
    resultMessagesByAccount: res?.data || null,
    loadingMessagesByAccount: loading,
    errorMessagesByAccount: error
  }
}

export const GetMessagesByChannel = (
  campaignId?: string,
  start_date?: any,
  end_date?: any,
  period?: any,
  fillter_keywords?: string,
  previousDate?: any,
  previousEndDate?: any
) => {
  const params = {
    campaign_id: campaignId,
    start_date: start_date ? moment(start_date).format('YYYY-MM-DD') : '',
    end_date: end_date ? moment(end_date).format('YYYY-MM-DD') : '',
    period: period,
    fillter_keywords: fillter_keywords,
    previousDate: previousDate,
    previousEndDate: previousEndDate
  }
  const [{ data: res, loading, error }] = CallAPI<{ data?: any }>({
    url: `/dashboard-engagement/engagement-channel`,
    method: 'GET',
    params: getParams(params)
  })

  return {
    resultMessagesByChannel: res?.data || null,
    loadingMessagesByChannel: loading,
    errorMessagesByChannel: error
  }
}

export const EngagementTypeBy = (params: any) => {
  const [{ data: res, loading, error }] = CallAPI<{ data?: any }>({
    url: `/dashboard-engagement/engagement-type-by`,
    method: 'GET',
    params: params
  })

  return {
    resultEngagementPercentage: res?.data?.EngagementType || null,
    resultEngagementTypeByDay: res?.data?.EngagementByDayKey || null,
    resultEngagementTypeByTime: res?.data?.EngagementByTimeKey || null,
    resultEngagementTypeByDevice: res?.data?.EngagementByDeviceKey || null,
    resultEngagementTypeByAccount: res?.data?.EngagementByAccountKey || null,
    resultEngagementTypeByChannel: res?.data?.EngagementChannelKey || null,
    loadingEngagementType: loading,
    errorEngagementType: error
  }
}

export const EngagementTypePercetage = (
  campaignId?: string,
  start_date?: any,
  end_date?: any,
  period?: any,
  fillter_keywords?: string,
  previousDate?: any,
  previousEndDate?: any
) => {
  const params = {
    campaign_id: campaignId,
    start_date: start_date ? moment(start_date).format('YYYY-MM-DD') : '',
    end_date: end_date ? moment(end_date).format('YYYY-MM-DD') : '',
    period: period,
    fillter_keywords: fillter_keywords,
    previousDate: previousDate,
    previousEndDate: previousEndDate
  }

  const [{ data: res, loading, error }] = CallAPI<{ data?: any }>({
    url: `/dashboard-engagement/engagement-type`,
    method: 'GET',
    params: getParams(params)
  })

  return {
    resultEngagementType: res?.data || null,
    loadingEngagementType: loading,
    errorEngagementType: error
  }
}

export const GetEngagementTypeByDay = (
  campaignId?: string,
  start_date?: any,
  end_date?: any,
  period?: any,
  fillter_keywords?: string,
  previousDate?: any,
  previousEndDate?: any
) => {
  const params = {
    campaign_id: campaignId,
    start_date: start_date ? moment(start_date).format('YYYY-MM-DD') : '',
    end_date: end_date ? moment(end_date).format('YYYY-MM-DD') : '',
    period: period,
    fillter_keywords: fillter_keywords,
    previousDate: previousDate,
    previousEndDate: previousEndDate
  }

  const [{ data: res, loading, error }] = CallAPI<{ data?: any }>({
    url: `/dashboard-engagement/engagement-type-by-day`,
    method: 'GET',
    params: getParams(params)
  })

  return {
    resultEngagementTypeByDay: res?.data || null,
    loadingEngagementTypeByDay: loading,
    errorEngagementTypeByDay: error
  }
}

export const GetEngagementTypeByTime = (
  campaignId?: string,
  start_date?: any,
  end_date?: any,
  period?: any,
  fillter_keywords?: string,
  previousDate?: any,
  previousEndDate?: any
) => {
  const params = {
    campaign_id: campaignId,
    start_date: start_date ? moment(start_date).format('YYYY-MM-DD') : '',
    end_date: end_date ? moment(end_date).format('YYYY-MM-DD') : '',
    period: period,
    fillter_keywords: fillter_keywords,
    previousDate: previousDate,
    previousEndDate: previousEndDate
  }
  const [{ data: res, loading, error }] = CallAPI<{ data?: any }>({
    url: `/dashboard-engagement/engagement-type-by-time`,
    method: 'GET',
    params: getParams(params)
  })

  return {
    resultEngagementTypeByTime: res?.data || null,
    loadingEngagementTypeByTime: loading,
    errorEngagementTypeByTime: error
  }
}

export const GetEngagementTypeByDevice = (
  campaignId?: string,
  start_date?: any,
  end_date?: any,
  period?: any,
  fillter_keywords?: string,
  previousDate?: any,
  previousEndDate?: any
) => {
  const params = {
    campaign_id: campaignId,
    start_date: start_date ? moment(start_date).format('YYYY-MM-DD') : '',
    end_date: end_date ? moment(end_date).format('YYYY-MM-DD') : '',
    period: period,
    fillter_keywords: fillter_keywords,
    previousDate: previousDate,
    previousEndDate: previousEndDate
  }

  const [{ data: res, loading, error }] = CallAPI<{ data?: any }>({
    url: `/dashboard-engagement/engagement-type-by-device`,
    method: 'GET',
    params: getParams(params)
  })

  return {
    resultEngagementTypeByDevice: res?.data || null,
    loadingEngagementTypeByDevice: loading,
    errorEngagementTypeByDevice: error
  }
}

export const GetEngagementTypeByAccount = (
  campaignId?: string,
  start_date?: any,
  end_date?: any,
  period?: any,
  fillter_keywords?: string,
  previousDate?: any,
  previousEndDate?: any
) => {
  const params = {
    campaign_id: campaignId,
    start_date: start_date ? moment(start_date).format('YYYY-MM-DD') : '',
    end_date: end_date ? moment(end_date).format('YYYY-MM-DD') : '',
    period: period,
    fillter_keywords: fillter_keywords,
    previousDate: previousDate,
    previousEndDate: previousEndDate
  }

  const [{ data: res, loading, error }] = CallAPI<{ data?: any }>({
    url: `/dashboard-engagement/engagement-type-by-account`,
    method: 'GET',
    params: getParams(params)
  })

  return {
    resultEngagementTypeByAccount: res?.data || null,
    loadingEngagementTypeByAccount: loading,
    errorEngagementTypeByAccount: error
  }
}

export const GetEngagementTypeByChannel = (
  campaignId?: string,
  start_date?: any,
  end_date?: any,
  period?: any,
  fillter_keywords?: string,
  previousDate?: any,
  previousEndDate?: any
) => {
  const params = {
    campaign_id: campaignId,
    start_date: start_date ? moment(start_date).format('YYYY-MM-DD') : '',
    end_date: end_date ? moment(end_date).format('YYYY-MM-DD') : '',
    period: period,
    fillter_keywords: fillter_keywords,
    previousDate: previousDate,
    previousEndDate: previousEndDate
  }
  const [{ data: res, loading, error }] = CallAPI<{ data?: any }>({
    url: `/dashboard-engagement/engagement-type-by-channel`,
    method: 'GET',
    params: getParams(params)
  })

  return {
    resultEngagementTypeByChannel: res?.data || null,
    loadingEngagementTypeByChannel: loading,
    errorEngagementTypeByChannel: error
  }
}

export const GetTotalEngagment = (
  campaignId?: string,
  start_date?: any,
  end_date?: any,
  period?: any,
  fillter_keywords?: string,
  previousDate?: any,
  previousEndDate?: any
) => {
  const params = {
    campaign_id: campaignId,
    start_date: start_date ? moment(start_date).format('YYYY-MM-DD') : '',
    end_date: end_date ? moment(end_date).format('YYYY-MM-DD') : '',
    period: period,
    fillter_keywords: fillter_keywords,
    previousDate: previousDate,
    previousEndDate: previousEndDate
  }
  const [{ data: res, loading, error }] = CallAPI<{ data?: any }>({
    url: `/dashboard-engagement/engagement-comparison`,
    method: 'GET',
    params: getParams(params)
  })

  return {
    resultTotalEngagement: res?.data || null,
    loadingTotalEngagement: loading,
    errorTotalEngagement: error
  }
}

export const GetPeriodComparisonByChannel = (
  campaignId?: string,
  start_date?: any,
  end_date?: any,
  period?: any,
  fillter_keywords?: string,
  previousDate?: any,
  previousEndDate?: any
) => {
  const params = {
    campaign_id: campaignId,
    start_date: start_date ? moment(start_date).format('YYYY-MM-DD') : '',
    end_date: end_date ? moment(end_date).format('YYYY-MM-DD') : '',
    period: period,
    fillter_keywords: fillter_keywords,
    previousDate: previousDate,
    previousEndDate: previousEndDate
  }

  const [{ data: res, loading, error }] = CallAPI<{ data?: any }>({
    url: `/dashboard-engagement/engagement-period-platform`,
    method: 'GET',
    params: getParams(params)
  })

  return {
    resultPeriodComparisonByChannel: res?.data || null,
    loadingPeriodComparisonByChannel: loading,
    errorPeriodComparisonByChannel: error
  }
}

export const GetEngagementComparisonBy = (params: any) => {
  const [{ data: res, loading, error }] = CallAPI<{ data?: any }>({
    url: `/dashboard-engagement/engagement-comparison-by`,
    method: 'GET',
    params: params
  })

  return {
    resultTotalEngagement: res?.data?.EngagementComparison || null,
    resultPeriodComparisonByChannel: res?.data?.EngagementPeriodPlarform || null,
    resultPeriodComparisonBySenitment: res?.data?.EngagementPeriodSentiment || null,
    resultEngagementComparison: res?.data?.EngagementTypeComparison || null,
    resultComparison: res?.data?.EngagementActionComparison || null,
    loadingPeriodComparisonBySenitment: loading,
    errorPeriodComparisonBySenitment: error
  }
}

export const GetEngagementSummary = (params: any, select?: any, page?: number) => {
  if (select) {
    params.select = select
  }

  const [{ data: res, loading, error }] = CallAPI<{ data?: any }>({
    url: `/dashboard-engagement/engagement-comparison-account`,
    method: 'GET',
    params: {
      ...params,
      page: page,
      limit: 10
    }
  })

  return {
    resultSummary: res?.data?.EngagementByInfulencer || null,
    loadingSummary: loading,
    errorSummary: error
  }
}

export const GetPeriodComparisonBySenitment = (
  campaignId?: string,
  start_date?: any,
  end_date?: any,
  period?: any,
  fillter_keywords?: string,
  previousDate?: any,
  previousEndDate?: any
) => {
  const params = {
    campaign_id: campaignId,
    start_date: start_date ? moment(start_date).format('YYYY-MM-DD') : '',
    end_date: end_date ? moment(end_date).format('YYYY-MM-DD') : '',
    period: period,
    fillter_keywords: fillter_keywords,
    previousDate: previousDate,
    previousEndDate: previousEndDate
  }
  const [{ data: res, loading, error }] = CallAPI<{ data?: any }>({
    url: `/dashboard-engagement/engagement-period-sentiment`,
    method: 'GET',
    params: getParams(params)
  })

  return {
    resultPeriodComparisonBySenitment: res?.data || null,
    loadingPeriodComparisonBySenitment: loading,
    errorPeriodComparisonBySenitment: error
  }
}

export const GetEngagementComparison = (
  campaignId?: string,
  start_date?: any,
  end_date?: any,
  period?: any,
  fillter_keywords?: string,
  previousDate?: any,
  previousEndDate?: any
) => {
  const params = {
    campaign_id: campaignId,
    start_date: start_date ? moment(start_date).format('YYYY-MM-DD') : '',
    end_date: end_date ? moment(end_date).format('YYYY-MM-DD') : '',
    period: period,
    fillter_keywords: fillter_keywords,
    previousDate: previousDate,
    previousEndDate: previousEndDate
  }
  const [{ data: res, loading, error }] = CallAPI<{ data?: any }>({
    url: `/dashboard-engagement/engagement-type-comparison`,
    method: 'GET',
    params: getParams(params)
  })

  return {
    resultEngagementComparison: res?.data || null,
    loadingEngagementComparison: loading,
    errorEngagementComparison: error
  }
}

export const GetComparisonEngagement = (
  campaignId?: string,
  start_date?: any,
  end_date?: any,
  period?: any,
  fillter_keywords?: string,
  previousDate?: any,
  previousEndDate?: any
) => {
  const params = {
    campaign_id: campaignId,
    start_date: start_date ? moment(start_date).format('YYYY-MM-DD') : '',
    end_date: end_date ? moment(end_date).format('YYYY-MM-DD') : '',
    period: period,
    fillter_keywords: fillter_keywords,
    previousDate: previousDate,
    previousEndDate: previousEndDate
  }

  const [{ data: response, loading, error }] = CallAPI<{ data?: any }>({
    url: `/dashboard-engagement/engagement-action-comparison`,
    method: 'GET',
    params: getParams(params)
  })

  return {
    resultComparison: response?.data || null,
    loadingComparison: loading,
    errorComparison: error
  }
}

export const GetSummary = (
  topKeyword: string,
  campaignId?: string,
  start_date?: any,
  end_date?: any,
  period?: any,
  page?: any,
  fillter_keywords?: string
) => {
  const [{ data: res, loading, error }] = CallAPI<{ data?: any }>({
    url: `/dashboard-engagement/engagement-infulencer`,
    method: 'GET',
    params: {
      campaign_id: campaignId || '',
      start_date: start_date ? moment(start_date).format('YYYY-MM-DD') : '',
      end_date: end_date ? moment(end_date).format('YYYY-MM-DD') : '',
      period: period,
      fillter_keywords: fillter_keywords,
      page: page,
      limit: 10,
      select: topKeyword
    }
  })

  return {
    resultSummary: res?.data || null,
    totalSummary: res?.data?.total || 0,
    loadingSummary: loading,
    errorSummary: error
  }
}
