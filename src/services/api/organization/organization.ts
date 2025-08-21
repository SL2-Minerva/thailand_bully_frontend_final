import { CallAPI } from 'src/services/CallAPI'


export const Organization = {
	getList: (reload? :any, page?: number) => {
    let params;

    if(page ||  page === 0  ) {
      params = {
        page: page,
        limit : 1000000
      }
    }
    const [{ data: res, error }] = CallAPI<{ data?: any }>({
      url: `/organization/list`,
      method: 'GET',
      params : params,
      data: {
        reload: reload
      }
    })

    return {
      list: res?.data || null,
      total: res?.data?.total || 0,
      error,
     
    }
  },
  
};

export const OrganizationSearchList = (reload?: boolean, page?: number, name? : string, group?: string, type?: string, status?: string) => {
  const [{ data: res, loading, error }] = CallAPI<{ data?: any }>({
    url: `/organization/search`,
    method: 'GET',
    params: {
      page: page, 
      limit: 10,
      name : name, 
      group : group,
      type : type,
      status: status, 
    },
    data: {
      reload: reload
    }
  })

  return {
    resultOrganizationSearch: res?.data || null,
    total: res?.data?.total || 0,
    resultOrganizationLoading: loading,
    errorOrganizationSearch: error
  }
}