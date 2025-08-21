import moment from 'moment'
import { CallAPI } from 'src/services/CallAPI'

const CreateCampaign = () => {
  const [{ data, loading, error }, store] = CallAPI<{
    code: 0 | 1
    message: string
    data: any
  }>(
    {
      url: `/campaign/create`,
      method: 'POST'
    },
    { manual: true }
  )

  return {
    result_campaign_create: data?.data,
    loading_campaign_create: loading,
    error_campaign_create: error,
    create_campaign: (userInput: any) => {
      const inputData = userInput

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

export const CampaignDelete = () => {
  const [{ data: res, loading, error }, fire] = CallAPI<{
    code: 0 | 1;
    message: string;
    data: any;
  }>(
    {
      url: `/campaign/delete`,
      method: "PUT",
    },
    {
      manual: true,
    }
  );

  return {
    resultCampaignDelete: res?.data,
    loadingCampaignDelete: loading,
    errorCampaignDelete: error,
    removeCampaign: (campaign: any) => {
      return fire({
        url: `/campaign/delete?${campaign.id}`,
        method: "PUT",
        data: campaign,
      });
    },
  };
};

export const CampaignList = (reload?: boolean, is_fillter?: boolean, fillter?: any, page?: number) => {
  let query = ''
  
  if (is_fillter) {
    query = `?${Object.keys(fillter)
      .map(key => `${key}=${fillter[key]}`)
      .join('&')}`
  }
  let params : any;

    if(page ||  page === 0  ) {
      params = {
        page: page,
        limit : 10
      }
    }

  const [{ data: res, loading, error }] = CallAPI<{ data?: any }>({
    url: `/campaign/list/${query}`,
    method: 'GET',
    params: params,
    data: {
      reload: reload
    }
  })
  
  return {
    resultCampaiganList: res?.data || null,
    total: res?.data?.total || 0,
    loadingCampaiganList: loading,
    errorCampaiganList: error
  }
}

export const CampaignLists = (status?: string) => {

  const [{ data: res, loading, error }] = CallAPI<{ data?: any }>({
    url: `/campaign/list`,
    method: 'GET',
    params: {
      status : status
    }
  })
  
  return {
    resultCampaiganList: res?.data || null,
    total: res?.data?.total || 0,
    loadingCampaiganList: loading,
    errorCampaiganList: error
  }
}

export const CampaignSearchList = (reload?: boolean, page?: number, name?: string, status?: string, organization_id?: string, start_at?: any, end_at?:any) => {
  const params = {
    page: page,
    limit : 100,
    name : name, 
    status : status, 
    organization_id : organization_id,
    start_at : start_at ? moment(start_at).format('YYYY-MM-DD') : "",
    end_at :end_at ?  moment(end_at).format('YYYY-MM-DD') : "",

  }
    

  const [{ data: res, loading, error }] = CallAPI<{ data?: any }>({
    url: `/campaign/search`,
    method: 'GET',
    params: params,
    data: {
      reload: reload
    }
  })
  
  return {
    resultCampaiganList: res?.data?.list || null,
    total: res?.data?.total || 0,
    keyword_limit : res?.data?.keyword_limit || 10,
    frequencyDefault: res?.data?.frequency_default || 0,
    loadingCampaiganList: loading,
    errorCampaiganList: error
  }
}
export default CreateCampaign
