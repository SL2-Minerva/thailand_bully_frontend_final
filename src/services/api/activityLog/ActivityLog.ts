import { CallAPI } from 'src/services/CallAPI'

export const GetActivityLog = (search?: string, statusCode?: string, page?: number) => {
  const params : any = {
    page: page,
    limit: 10
  }

  if (search !== '') {
    params.search = search
  }

  if (statusCode !== '') {
    params.status_code = statusCode
  }

  const [{ data: res, loading, error }] = CallAPI<{ data?: any }>({
    url: `/activity-log`,
    method: 'GET',
    params: params
  })

  return {
    resultActivityLog: res?.data?.activity_log || null,
    total: res?.data?.total || 0,
    loadingActivityLog: loading,
    errorActivityLog: error
  }
}
