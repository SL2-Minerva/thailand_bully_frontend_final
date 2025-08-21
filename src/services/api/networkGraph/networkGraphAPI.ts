import { CallAPI } from 'src/services/CallAPI'

export const GetNetworkGraph = (campaign_id?: string, reload?: boolean) => {

    const [{ data: res, loading, error }] = CallAPI<{ data?: any }>({
      url: `/dashboard/sna/`,
      method: 'GET',
      params : {
        campaign_id: campaign_id || ""
      },
      data: {
        reload: reload
      }
    })
    
    return {
      resultNetworkGraph: res?.data || null,
      loadingNetworkGraph: loading,
      errorNetworkGraph: error
    }
  }