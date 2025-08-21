import { CallAPI } from 'src/services/CallAPI'

const OrganizationTypeService = (reload?: boolean, page?: number) => {
  const [{ data: res, loading, error }, refetch] = CallAPI<{ data?: any }>({
    url: `/organization-type/list`,
    method: 'GET',
    params : {
      page : page, 
      limit : 10
    },
    data: {
      reload: reload
    }
  })

  return {
    result_organization_type_list: res?.data || null,
    total : res?.data?.total || 0 , 
    result_organization_type_list_load: loading,
    error_domain_list: error
  }
}

export const OrganzationGroupServiceList = (reload?: boolean, page?: number) => {
  const [{ data: res, loading, error }, refetch] = CallAPI<{ data?: any }>({
    url: `/organization-group/list`,
    method: 'GET',
    params: {
      page: page, 
      limit: 10
    },
    data: {
      reload: reload
    }
  })

  return {
    result_organization_group_list: res?.data || null,
    total: res?.data?.total || 0,
    result_organization_group_list_load: loading,
    error_organization_group_list: error
  }
}




export default OrganizationTypeService
