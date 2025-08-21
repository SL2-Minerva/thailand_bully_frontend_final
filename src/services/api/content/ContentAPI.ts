import moment from 'moment'
import { CallAPI } from 'src/services/CallAPI'
import { ContentInput } from 'src/types/content/ContentType'

export type FormInput = {
  file: File
}

export const ContentLists = (params?: any, reload?: boolean) => {
  const [{ data: response, loading, error }] = CallAPI<{ data?: any }>({
    url: `/organization-content`,
    method: 'GET',
    params: params,
    data: {
      reload: reload
    }
  })

  return {
    resultContents: response?.data?.data || [],
    total: response?.data?.total || 0,
    loadingCampaiganList: loading,
    errorCampaiganList: error
  }
}

export const ContentHomepageList = (contentId: any) => {
  const [{ data: response, loading, error }] = CallAPI<{ data?: any }>({
    url: `/organization-content`,
    method: 'GET',
    params: {
      content_id: contentId,
      page: 0, 
      limit : 1000, 
      status: 1
    }
  })

  return {
    resultContents: response?.data?.data || [],
    total: response?.data?.total || 0,
    loadingContents: loading,
    errorContents: error
  }
}
export const ContentTwoLists = () => {
  const [{ data: response, loading, error }] = CallAPI<{ data?: any }>({
    url: `/organization-content`,
    method: 'GET',
    params: {
      content_id: 2,
      page: 0, 
      limit : 1000, 
      status: 1
    }
  })

  return {
    resultContentTwo: response?.data?.data || [],
    total: response?.data?.total || 0,
    loadingContentTwo: loading,
    errorContentTwo: error
  }
}
export const ContentThreeLists = () => {
  const [{ data: response, loading, error }] = CallAPI<{ data?: any }>({
    url: `/organization-content`,
    method: 'GET',
    params: {
      content_id: 3,
      page: 0, 
      limit : 1000, 
      status: 1
    }
  })

  return {
    resultContentThree: response?.data?.data || [],
    total: response?.data?.total || 0,
    loadingContentThree: loading,
    errorContentThree: error
  }
}

export const GetContentLists = (id: number | string) => {
  const [{ data: response, loading, error }] = CallAPI<{ data?: any }>({
    url: `/organization-content/show`,
    method: 'GET',
    params: {
      content_id: id,
      page: 0, 
      limit : 1000, 
      status: 1
    }
  })

  return {
    resultContentList: response?.data?.data || [],
    total: response?.data?.total || 0,
    loadingResultContentList: loading,
    errorResultContentList: error
  }
}

export const CreateContent = () => {
  const [{ data: res, loading, error }, fetch] = CallAPI<{
    code: 0 | 1
    message: string
    data: any
  }>(
    {
      url: `/organization-content`,
      method: 'POST',
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    },
    {
      manual: true
    }
  )

  return {
    resultFileUpload: res?.code === 1 ? res?.data : null,
    loadingFileUpload: loading,
    errorFileUpload: res?.code === 0 ? res?.message : error,
    fileUpload: (FormInput: FormInput, input: ContentInput) => {
      const inputDate = input.date ? moment(input.date).format('YYYY-MM-DD') : ''
      const formData = new FormData()
      if (FormInput?.file) {
        formData.append('picture', FormInput.file)
      }

      if (input.content_id) {
        formData.append('content_id', input.content_id)
      }

      formData.append('title', input.title)
      formData.append('content_text', input.content_text)
      formData.append('date', inputDate?.toString())
      formData.append('status', input.status)

      console.log('contentID', input.content_id)

      return new Promise((resolve, reject) => {
        fetch({
          data: formData
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

export const UpdateContent = () => {
  const [{ data: res, loading, error }, fetch] = CallAPI<{
    code: 0 | 1
    message: string
    data: any
  }>(
    {
      url: `/organization-content/update`,
      method: 'POST',
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    },
    {
      manual: true
    }
  )

  return {
    resultUpdateContent: res?.code === 1 ? res?.data : null,
    loadingUpdateContent: loading,
    errorUpdateContent: res?.code === 0 ? res?.message : error,
    updateContentData: (FormInput: FormInput, input: ContentInput) => {
      const inputDate = input.date ? moment(input.date).format('YYYY-MM-DD') : ''
      const formData = new FormData()
      if (FormInput?.file) {
        formData.append('picture', FormInput.file)
      }
      if (input.content_id) {
        formData.append('content_id', input.content_id)
      }
      formData.append('title', input.title)
      formData.append('content_text', input.content_text)
      formData.append('date', inputDate?.toString())
      formData.append('status', input.status)
      formData.append('id', input.id ? input.id : null)

      return new Promise((resolve, reject) => {
        fetch({
          data: formData
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

export const ContentDelete = () => {
  const [{ data: res, loading, error }, fire] = CallAPI<{
    code: 0 | 1;
    message: string;
    data: any;
  }>(
    {
      url: `/organization-content/delete`,
      method: "POST",
    },
    {
      manual: true,
    }
  );

  return {
    resultContentDelete: res?.data,
    loadingContentDelete: loading,
    errorContentDelete: error,
    removeContent: (id: any) => {
      return fire({
        url: `/organization-content/delete`,
        method: "POST",
        data: {
          id: id
        },
      });
    },
  };
};
