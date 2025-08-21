import { Grid } from '@mui/material'
import moment from 'moment'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { UserPermission } from 'src/services/api/users/role'
import { DateType } from 'src/types/forms/reactDatepickerTypes'
import KeywordFilters from '../dashboard/KeywordFilters'
import { calculateDate } from '../dashboard/overall'
import Filter from '../VoiceDashboard/Filter'
import MonitoringCharts from './MonitoringCharts'
import axios from 'axios'
import { API_PATH, GraphicColors } from 'src/utils/const'
import authConfig from 'src/configs/auth'
import Translations from 'src/layouts/components/Translations'

const MonitoringDashboard = () => {
  const router = useRouter()

  const [date, setDate] = useState<DateType>(new Date(localStorage.getItem('startDate') || calculateDate(6)))
  const [endDate, setEndDate] = useState<DateType>(new Date(localStorage.getItem('endDate') || new Date()))
  const [previousDate, setPreviousDate] = useState<DateType>(
    new Date(localStorage.getItem('previousStartDate') || new Date())
  )
  const [previousEndDate, setPreviousEndDate] = useState<DateType>(
    new Date(localStorage.getItem('previousEndDate') || new Date())
  )
  const [period, setPeriod] = useState<string>('last7days')
  const [dateSelect, setDateSelect] = useState<string>(localStorage.getItem('dateSelect') || '3')
  const [campaign, setCampaign] = useState<string>('')
  const [keyword, setKeyword] = useState<string>('all')
  const [filterKeyword, setFilterKeyword] = useState<any>([])
  const [loadingKeyword, setLoadingKeyword] = useState<boolean>(true)
  const [platformId, setPlatformId] = useState<string>(localStorage.getItem('platformId') || 'all')
  const [status, setStatus] = useState(localStorage.getItem('status') || '1')
  const [keywordGraphColors, setKeywordGraphColor] = useState<any>(null)

  const { errorUserPermission } = UserPermission()

  const params = {
    campaign: campaign,
    platformId: platformId,
    date: date ? moment(date).format('YYYY-MM-DD') : '',
    endDate: endDate ? moment(endDate).format('YYYY-MM-DD') : '',
    period: period,
    previousDate: previousDate ? moment(previousDate).format('YYYY-MM-DD') : '',
    previousEndDate: previousEndDate ? moment(previousEndDate).format('YYYY-MM-DD') : '',
    keywordIds: keyword,
    page: 'monitoringDashboard',
    label: ''
  }

  const checkKeywordId = (data: any, keywordId: string | number) => {
    const index = data.indexOf(keywordId)
    if (index > -1) {
      data.splice(index, 1)
    } else {
      data.push(keywordId)
    }

    setFilterKeyword(data)

    if (data.length === 0) {
      setKeyword('all')
    } else {
      setKeyword(data.join(','))
    }

    return data
  }

  useEffect(() => {
    if (errorUserPermission) {
      window.localStorage.removeItem('userData')
      window.localStorage.clear()
      localStorage.clear()
      router.push('/login')
      window.location.reload()
    }
  }, [errorUserPermission])

  useEffect(() => {
    if (campaign) {
      setLoadingKeyword(true)

      axios
        .get(`${API_PATH}/keywords?campaing_id=${campaign}`, {
          headers: {
            Authorization: `Bearer ${window.localStorage.getItem(authConfig.storageTokenKeyName)!}`
          }
        })
        .then(async response => {
          const resultData = response?.data?.data
          const keywordsColor = []
          if (resultData && resultData?.length > 0) {
            for (let i = 0; i < resultData?.length; i++) {
              if (resultData[i]?.color) {
                keywordsColor.push({
                  keywordName: resultData[i]?.name,
                  color: resultData[i]?.color
                })
              }
            }
          }
          setKeywordGraphColor(keywordsColor)
          setLoadingKeyword(false)

          if (keywordsColor.length == 0) {
            setKeywordGraphColor(GraphicColors)
          }
        })
        .catch((ex: any) => {
          setLoadingKeyword(true)

          console.log(ex)
        })
    }
  }, [campaign])

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Filter
          tilte={<Translations text='Monitoring Dashboard' />}
          date={date}
          setDate={setDate}
          endDate={endDate}
          setEndDate={setEndDate}
          previousDate={previousDate}
          setPreviousDate={setPreviousDate}
          previousEndDate={previousEndDate}
          setPreviousEndDate={setPreviousEndDate}
          period={period}
          setPeriod={setPeriod}
          dateSelect={dateSelect}
          setDateSelect={setDateSelect}
          campaign={campaign}
          setCampaign={setCampaign}
          setPlatformId={setPlatformId}
          platformId={platformId}
          status={status}
          setStatus={setStatus}
        />
      </Grid>
      {campaign ? (
        <Grid container spacing={3} ml={3} pt={2}>
          <KeywordFilters
            campaign={campaign}
            keyword={keyword}
            setKeyword={setKeyword}
            filterKeyword={filterKeyword}
            setFilterKeyword={setFilterKeyword}
            checkKeywordId={checkKeywordId}
            setKeywordLoading={setLoadingKeyword}
          />
        </Grid>
      ) : (
        ''
      )}

      {!loadingKeyword ? (
        <Grid container spacing={3} ml={1} pt={2}>
          {' '}
          <MonitoringCharts params={params} keywordGraphColors={keywordGraphColors}/>{' '}
        </Grid>
      ) : (
        ''
      )}
    </Grid>
  )
}

export default MonitoringDashboard
