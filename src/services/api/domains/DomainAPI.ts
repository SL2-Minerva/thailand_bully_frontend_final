import { CallAPI } from "src/services/CallAPI";

const DomainList = (reload?: boolean, page?: number) => {
  let params;

    if(page ||  page === 0  ) {
      params = {
        page: page,
        limit : 10
      }
    }
    
  const [{data: res, loading, error}, refetch ] = CallAPI<{data?: any;}>({
    url: `/domain/list`,
    method: "GET",
    params : params,
      data: {
      reload: reload
    }
  });

    return{
      result_domain_list: res?.data ||  null,
      total : res?.data?.total || 0,
      loading_domain_list: loading,
      error_domain_list: error,
    }
  }

export default DomainList
