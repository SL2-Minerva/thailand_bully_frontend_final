import { CallAPI } from "src/services/CallAPI";

export const GetPublicSourceList = () => {
  const [{data: res, loading, error} ] = CallAPI<{data?: any;}>({
    url: `/source/public-source`,
    method: 'GET',
  });
  
  return{
    publicSourceList: res?.data ||  null,
    loadingPublicSourceList: loading,
    errorPublicSourceList: error,
  }
}

  const IndexSourceService = (reload?: boolean, page?: number) => {
    let params;

    if(page ||  page === 0  ) {
      params = {
        page: page,
        limit : 100
      }
    }

    const [{data: res, loading, error} ] = CallAPI<{data?: any;}>({
      url: `/source/index`,
      method: "GET",
      params : params,
      data: {
        reload: reload
      }
    });

    return{
        index_source_list: res?.data ||  null,
        total : res?.data?.total || 0,
        index_source_list_load: loading,
        error_source_list: error,
    }
  }

  export const ActiveChannel = (reload?: boolean, page?: number) => {
    let params;

    if(page ||  page === 0  ) {
      params = {
        page: page,
        limit : 100
      }
    }

    const [{data: res, loading, error} ] = CallAPI<{data?: any;}>({
      url: `/source/list`,
      method: "GET",
      params : params,
      data: {
        reload: reload
      }
    });

    const responseData = res?.data;
    const activeSource : any = [];
    for (let i = 0; i<responseData?.length; i++) {
      if (responseData[i]?.status) {
        activeSource.push(responseData[i]);
      }
    }

    return{
        result_source_list: activeSource?.length > 0 ? activeSource :  null,
        total : res?.data?.total || 0,
        result_source_list_load: loading,
        error_source_list: error,
    }
  }

  export default  IndexSourceService;