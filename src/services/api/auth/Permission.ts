import { CallAPI } from 'src/services/CallAPI'

export const getPermission = (reload?: boolean) => {
    // let query = ''
    
    // if (is_fillter) {
    //   query = `?${Object.keys(fillter)
    //     .map(key => `${key}=${fillter[key]}`)
    //     .join('&')}`
    // }
  
    // const [{ data: res, loading, error }, fetch] = CallAPI<{ data?: any }>({
    //   url: `/campaign/list/${query}`,
    //   method: 'GET',
    //   data: {
    //     reload: reload
    //   }
    // })
    
    const response =  {
        "user": {
            "authorized_create": 1,
            "authorized_view": 1,
            "authorized_edit": 1,
            "authorized_delete": 1,
            "authorized_export": 0,
            "id": 5
        },
        "campaign": {
            "authorized_create": 1,
            "authorized_view": 1,
            "authorized_edit": 1,
            "authorized_delete": 1,
            "authorized_export": 1,
            "id": 6
        },
        "dashboard": {
            "authorized_create": 1,
            "authorized_view": 1,
            "authorized_edit": 1,
            "authorized_delete": 1,
            "authorized_export": 1,
            "id": 7
        },
        "report": {
            "authorized_create": 1,
            "authorized_view": 1,
            "authorized_edit": 1,
            "authorized_delete": 1,
            "authorized_export": 1,
            "id": 8
        }
    }

    return {
        resultPermission : response || null

    //   resultCampaiganList: res?.data || null,
    //   loadingCampaiganList: loading,
    //   errorCampaiganList: error
    }
}