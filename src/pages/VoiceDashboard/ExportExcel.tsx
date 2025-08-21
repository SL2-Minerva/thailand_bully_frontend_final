// excel export
import axios, { AxiosRequestConfig } from 'axios'
import { API_PATH } from 'src/utils/const'
import authConfig from 'src/configs/auth'
import toast from 'react-hot-toast'

import { saveAs } from 'file-saver'
import { MenuItem } from '@mui/material'
import { MicrosoftExcel } from 'mdi-material-ui'
import { useEffect, useState } from 'react'
import moment from 'moment'

interface Props {
  params: any
  apiParams: any
  setIsLoading: any
  reportNo: string
  setAnchorEl: any
  fileName: string
  apiPath: string
  select?: string
}

const ExportExcel = (props: Props) => {
  const { params, setIsLoading, apiParams, reportNo, setAnchorEl, fileName, apiPath, select } = props

  const [paramsData, setParamsData] = useState<any>()

  const excelExport = () => {
    setIsLoading(true)
    const instance = axios.create({ baseURL: API_PATH })
    const method = 'GET'
    const url = apiPath
    const headers = {
      Authorization: `Bearer ${window.localStorage.getItem(authConfig.storageTokenKeyName)!}`
    }

    // const params = apiParams
    const options: AxiosRequestConfig = {
      url,
      method,
      responseType: 'blob',
      headers,
      params: paramsData
    }

    return instance
      .request<any>(options)
      .then(response => {
        const url = window.URL.createObjectURL(new Blob([response.data]))
        setIsLoading(false)
        saveAs(url, fileName)
        toast.success('Successfully Downloaded!')
      })
      .catch(() => {
        setIsLoading(false)
        toast.error('Somenthing went wrong')
      })
  }

  useEffect(() => {
    if (params) {
      let paramData: any = {}
      const todayDate = new Date()

      if (params && select) {
        params.select = select
      }

      if (
        params?.period === 'customrange' &&
        params?.previousDate !== todayDate &&
        params?.previousEndDate !== todayDate
      ) {
        paramData = {
          campaign_id: params?.campaign || '',
          source: apiParams?.source || params?.platformId || '',
          start_date: params?.date ? moment(params?.date).format('YYYY-MM-DD') : '',
          end_date: params?.endDate ? moment(params?.endDate).format('YYYY-MM-DD') : '',
          period: params?.period,
          start_date_period: params?.previousDate ? moment(params?.previousDate).format('YYYY-MM-DD') : '',
          end_date_period: params?.previousEndDate ? moment(params?.previousEndDate).format('YYYY-MM-DD') : '',
          report_number: reportNo,
          page_name: params?.page
        }
      } else {
        paramData = {
          campaign_id: params?.campaign || '',
          source: apiParams?.source || params?.platformId || '',
          start_date: params?.date ? moment(params?.date).format('YYYY-MM-DD') : '',
          end_date: params?.endDate ? moment(params?.endDate).format('YYYY-MM-DD') : '',
          period: params?.period,
          report_number: reportNo,
          page_name: params?.page

          // keyword_id: paramsId?.keywordId || keywordId || '',
          // classification_id: paramsId?.classification_id || '',
          // organization_id: paramsId?.organization_id || ''
        }
      }
      if (params.select) {
        paramData.select = params.select
      }
      setParamsData(paramData)
    }
  }, [params, apiParams, select])

  return (
    <MenuItem
      onClick={() => {
        excelExport()
        setAnchorEl(null)
      }}
    >
      <MicrosoftExcel fontSize='medium' sx={{ mr: 2 }} />
      Excel
    </MenuItem>
  )
}

export default ExportExcel
