import { Grid } from '@mui/material'
import { useEffect, useState } from 'react'

import Filter from '../VoiceDashboard/Filter'
import { DateType } from 'src/types/forms/reactDatepickerTypes'
import { UserPermission } from 'src/services/api/users/role'
import { API_PATH, EngagementTransChartColor } from 'src/utils/const'
import { useRouter } from 'next/router'
import { calculateDate } from '../dashboard/overall'
import axios from 'axios'
import authConfig from 'src/configs/auth'
import KeywordFilters from '../dashboard/KeywordFilters'
import EngagementGraphs from './EngagamentGraphs'
import moment from 'moment'
import Translations from 'src/layouts/components/Translations'

const EngagementDashboard = () => {
  const router = useRouter()

  const [date, setDate] = useState<DateType>(calculateDate(6))
  const [endDate, setEndDate] = useState<DateType>(new Date())
  const [previousDate, setPreviousDate] = useState<DateType>(new Date())
  const [previousEndDate, setPreviousEndDate] = useState<DateType>(new Date())
  const [period, setPeriod] = useState<string>('last7days')
  const [dateSelect, setDateSelect] = useState<string>(localStorage.getItem('dateSelect') || '3')
  const [campaignType, setCampaignType] = useState<string>('')
  const [keyword, setKeyword] = useState<string>('all')
  const [filterKeyword, setFilterKeyword] = useState<any>([])
  const [loadingKeyword, setLoadingKeyword] = useState<boolean>(true)
  const [platformId, setPlatformId] = useState<string>(localStorage.getItem('platformId') || 'all')
  const [status, setStatus] = useState(localStorage.getItem('status') || '1')

  const [keywordGraphColors, setKeywordGraphColor] = useState<any>(null)

  const { resultReportPermission, errorUserPermission } = UserPermission()

  const params = {
    campaign: campaignType,
    platformId: platformId,
    date: date ? moment(date).format('YYYY-MM-DD') : '',
    endDate: endDate ? moment(endDate).format('YYYY-MM-DD') : '',
    period: period,
    previousDate: previousDate ? moment(previousDate).format('YYYY-MM-DD') : '',
    previousEndDate: previousEndDate ? moment(previousEndDate).format('YYYY-MM-DD') : '',
    keywordIds: keyword,
    page: 'engagementDashboard',
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
    const savedDate = localStorage.getItem('startDate')
    const savedEndDate = localStorage.getItem('endDate')
    const savedPreviousDate = localStorage.getItem('previousStartDate')
    const savedPreviousEndDate = localStorage.getItem('previousEndDate')
    const savedPeriod = localStorage.getItem('period')
    const savedDateSelect = localStorage.getItem('dateSelect')
    const savedCampaign = localStorage.getItem('campaign')
    const savedPlatform = localStorage.getItem('platformId')
    const savedStatus = localStorage.getItem('status')

    if (savedDate) setDate(moment(savedDate, 'YYYY-MM-DD').toDate())
    if (savedEndDate) setEndDate(moment(savedEndDate, 'YYYY-MM-DD').toDate())
    if (savedPreviousDate) setPreviousDate(moment(savedPreviousDate, 'YYYY-MM-DD').toDate())
    if (savedPreviousEndDate) setPreviousEndDate(moment(savedPreviousEndDate, 'YYYY-MM-DD').toDate())
    if (savedPeriod) setPeriod(savedPeriod)
    if (savedDateSelect) setDateSelect(savedDateSelect)
    if (savedCampaign) setCampaignType(savedCampaign)
    if (savedPlatform) setPlatformId(savedPlatform)
    if (savedStatus) setStatus(savedStatus)
  }, [router.asPath])  

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
    if (campaignType) {
      setLoadingKeyword(true)
      axios
        .get(`${API_PATH}/keywords?campaing_id=${campaignType}`, {
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
            setKeywordGraphColor(EngagementTransChartColor)
          }
        })
        .catch((ex: any) => {
          setLoadingKeyword(true)

          console.log(ex)
        })
    }
  }, [campaignType])

  return (
    <>
      <Grid container spacing={3}>
        <Filter
          tilte={<Translations text='Engagement Dashboard' />}
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
          campaign={campaignType}
          setCampaign={setCampaignType}
          setPlatformId={setPlatformId}
          platformId={platformId}
          setStatus={setStatus}
          status={status}
        />
      </Grid>

      {campaignType ? (
        <Grid container spacing={3} pl={3} pt={2}>
          <KeywordFilters
            campaign={campaignType}
            keyword={keyword}
            setKeyword={setKeyword}
            filterKeyword={filterKeyword}
            setFilterKeyword={setFilterKeyword}
            checkKeywordId={checkKeywordId}
          />
        </Grid>
      ) : (
        ''
      )}

      {!loadingKeyword && keywordGraphColors ? (
        <Grid container spacing={3} pl={3} pt={2}>
          <EngagementGraphs
            params={params}
            resultReportPermission={resultReportPermission}
            keywordGraphColors={keywordGraphColors}
          />
        </Grid>
      ) : (
        ''
      )}
    </>
  )
}

export default EngagementDashboard
