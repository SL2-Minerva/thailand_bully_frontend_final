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

export const GetSortBullyData = (data: any, value?: boolean) => {
  if(value) {
    data?.value?.sort(function(a:any, b :any){
      if(a.bully_level < b.bully_level) { return -1; }
      if(a.bully_level > b.bully_level) { return 1; } 
    })
  } else {
    data?.sort(function(a:any, b :any){
      if(a.bully_level < b.bully_level) { return -1; }
      if(a.bully_level > b.bully_level) { return 1; } 
    })
  }
  
  
  return data;
}

export const GetBullyDailyBy = (
  params : any
) => {
  const [{ data: res, loading, error }] = CallAPI<{ data?: any }>({
    url: `/dashboard-bully/daily-by`,
    method: 'GET',
    params: params
  })

  return {
    resultFilterData: res?.data?.daily_bully || null,
    resultBullyLevelPercentage: res?.data?.percentage_bully || null,
    loadingFilterData: loading,
    errorFilterData: error
  }
}

export const FilterByCampaignId = (
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
    url: `/dashboard-bully/bully-daily`,
    method: 'GET',
    params: getParams(params)
  })

  return {
    resultFilterData: res?.data || null,
    loadingFilterData: loading,
    errorFilterData: error
  }
}

export const BullyLevelPercentage = (
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
    url: `/dashboard-bully/bully-percentage`,
    method: 'GET',
    params: getParams(params)
  })

  return {
    resultBullyLevelPercentage: res?.data || null,
    loadingBullyLevelPercentage: loading,
    errorBullyLevelPercentage: error
  }
}

export const GetBullyBy = (
  params : any
) => {
  const [{ data: res, loading, error }] = CallAPI<{ data?: any }>({
    url: `/dashboard-bully/bully-by`,
    method: 'GET',
    params: params
  })

  return {
    resultBullyByDay: res?.data?.bully_by_day || null,
    resultBullyByTime: res?.data?.bully_by_time || null,
    resultBullyByDevice: res?.data?.bully_by_device || null,
    resultBullyByAccount: res?.data?.bully_by_account || null,
    resultBullyByChannel: res?.data?.bully_by_channel || null,
    resultBullyBySentiment: res?.data?.bully_by_sentiment || null,
    loadingBullyBy: loading,
    errorBullyBy: error
  }
}

export const GetDailyTypeBy = (
  params : any
) => {
  
  const [{ data: res, loading, error }] = CallAPI<{ data?: any }>({
    url: `/dashboard-bully/daily-type-by`,
    method: 'GET',
    params: params
  })

  return {
    resultBullyTypeByDaily: res?.data?.bully_type_daily || null,
    resultBullyTypeByPercentage : res?.data?.bully_type_percentage || null,
    resultBullyTypeByDay: res?.data?.bully_type_by_day || null,
    resultBullyTypeByTime: res?.data?.bully_type_by_time || null,
    resultBullyTypeByDevice: res?.data?.bully_type_by_device || null,
    resultBullyTypeByAccount: res?.data?.bully_type_by_account || null,
    resultBullyTypeByChannel: res?.data?.bully_type_by_channel || null,
    resultBullyTypeBySenitment: res?.data?.bully_type_by_sentiment || null,

    loadingBullyTypeBy: loading,
    errorBullyTypeBy: error
  }
}

export const GetBullyByDay = (
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
    url: `/dashboard-bully/bully-day`,
    method: 'GET',
    params:getParams(params)
  })

  return {
    resultBullyByDay: res?.data || null,
    loadingBullyByDay: loading,
    errorBullyByDay: error
  }
}

export const GetBullyByTime = (
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
    url: `/dashboard-bully/bully-time`,
    method: 'GET',
    params: getParams(params)
  })

  return {
    resultBullyByTime: res?.data || null,
    loadingBullyByTime: loading,
    errorBullyByTime: error
  }
}

export const GetBullyByDevice = (
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
    url: `/dashboard-bully/bully-device`,
    method: 'GET',
    params: getParams(params)
  })

  return {
    resultBullyByDevice: res?.data || null,
    loadingBullyByDevice: loading,
    errorBullyByDevice: error
  }
}

export const GetBullyByAccount = (
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
    url: `/dashboard-bully/bully-account`,
    method: 'GET',
    params: getParams(params)
  })

  return {
    resultBullyByAccount: res?.data || null,
    loadingBullyByAccount: loading,
    errorBullyByAccount: error
  }
}

export const GetBullyByChannel = (
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
    url: `/dashboard-bully/bully-channel`,
    method: 'GET',
    params: getParams(params)
  })

  return {
    resultBullyByChannel: res?.data || null,
    loadingBullyByChannel: loading,
    errorBullyByChannel: error
  }
}

export const GetBullyBySentiment = (
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
    url: `/dashboard-bully/bully-sentiment`,
    method: 'GET',
    params: getParams(params)
  })

  return {
    resultBullyBySentiment: res?.data || null,
    loadingBullyBySentiment: loading,
    errorBullyBySentiment: error
  }
}

export const FilterBullyTypeByCampaignId = (
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
    url: `/dashboard-bully/bully-type-daily`,
    method: 'GET',
    params: getParams(params)
  })

  return {
    resultBullyTypeFilterData: res?.data || null,
    loadingBullyTypeFilterData: loading,
    errorBullyTypeFilterData: error
  }
}

export const BullyTypePercentage = (
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
    url: `/dashboard-bully/bully-type-percentage-daily`,
    method: 'GET',
    params: getParams(params)
  })

  return {
    resultBullyTypePercentage: res?.data || null,
    loadingBullyTypePercentage: loading,
    errorBullyTypePercentage: error
  }
}

export const GetBullyTypeByDay = (
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
    url: `/dashboard-bully/bully-type-day`,
    method: 'GET',
    params: getParams(params)
  })

  return {
    resultBullyTypeByDay: res?.data || null,
    loadingBullyTypeByDay: loading,
    errorBullyTypeByDay: error
  }
}

export const GetBullyTypeByTime = (
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
    url: `/dashboard-bully/bully-type-time`,
    method: 'GET',
    params: getParams(params)
  })

  return {
    resultBullyTypeByTime: res?.data || null,
    loadingBullyTypeByTime: loading,
    errorBullyTypeByTime: error
  }
}

export const GetBullyTypeByDevice = (
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
    url: `/dashboard-bully/bully-type-device`,
    method: 'GET',
    params: getParams(params)
  })

  return {
    resultBullyTypeByDevice: res?.data || null,
    loadingBullyTypeByDevice: loading,
    errorBullyTypeByDevice: error
  }
}

export const GetBullyTypeByAccount = (
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
    url: `/dashboard-bully/bully-type-account`,
    method: 'GET',
    params: getParams(params)
  })

  return {
    resultBullyTypeByAccount: res?.data || null,
    loadingBullyTypeByAccount: loading,
    errorBullyTypeByAccount: error
  }
}

export const GetBullyTypeByChannel = (
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
    url: `/dashboard-bully/bully-type-channel`,
    method: 'GET',
    params: getParams(params)
  })

  return {
    resultBullyTypeByChannel: res?.data || null,
    loadingBullyTypeByChannel: loading,
    errorBullyTypeByChannel: error
  }
}

export const GetBullyTypeBySentiment = (
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
    url: `/dashboard-bully/bully-type-sentiment`,
    method: 'GET',
    params: getParams(params)
  })

  return {
    resultBullyTypeBySentiment: res?.data || null,
    loadingBullyTypeBySentiment: loading,
    errorBullyTypeBySentiment: error
  }
}

// $data['bully_type_by_level'] = $this->BullyChartLevelGroup();
//       $data['bully_chart_type'] = $this->BullyChartTypeGroup();
//       $data['bully_chart_level'] = $this->BullyLevelLevelGroup();
//       $data['bully_table_type'] = $this->BullyTableTypeGroup();

export const GetBullyTypeBy = (
  params : any
) => {
  const [{ data: res, loading, error }] = CallAPI<{ data?: any }>({
    url: `/dashboard-bully/bully-type-by`,
    method: 'GET',
    params: params
  })

  return {
    Response: res?.data,
    resultShareOfChannelChart: res?.data?.bully_chart_level || null,
    resultShareOfChannelPlatform: res?.data?.bully_type_by_level || null,
    resultShareOfChannelChartBullyLevel: res?.data?.bully_chart_type || null,
    resultShareOfChannelBullyLevels: res?.data?.bully_table_type || null,
    loadingShareOfChannelChart: loading,
    errorShareOfChannelChart: error
  }
}

export const GetShareOfChannelChart = (
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
    url: `/dashboard-bully/bully-chart-level`,
    method: 'GET',
    params: getParams(params)
  })

  return {
    resultShareOfChannelChart: res?.data || null,
    loadingShareOfChannelChart: loading,
    errorShareOfChannelChart: error
  }
}

export const GetShareOfChannelPlatforms = (
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
    url: `/dashboard-bully/bully-table-level`,
    method: 'GET',
    params: getParams(params)
  })

  return {
    resultShareOfChannelPlatform: res?.data || null,
    loadingShareOfChannelPlatform: loading,
    errorShareOfChannelPlatform: error
  }
}

export const GetShareOfChannelChartBullyLevel = (
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
    url: `/dashboard-bully/bully-chart-type`,
    method: 'GET',
    params: getParams(params)
  })

  return {
    resultShareOfChannelChartBullyLevel: res?.data || null,
    loadingShareOfChannelChartBullyLevel: loading,
    errorShareOfChannelChartBullyLevel: error
  }
}

export const GetShareOfChannelBullyLevels = (
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
    url: `/dashboard-bully/bully-table-type`,
    method: 'GET',
    params: getParams(params)
  })

  return {
    resultShareOfChannelBullyLevels: res?.data || null,
    loadingShareOfChannelBullyLevel: loading,
    errorShareOfChannelBullyLevel: error
  }
}
