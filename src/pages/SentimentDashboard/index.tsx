import { Grid } from '@mui/material'
import { useEffect, useState } from 'react'
import Filter from '../VoiceDashboard/Filter'
import { DateType } from 'src/types/forms/reactDatepickerTypes'
import { calculateDate } from '../dashboard/overall'

import { UserPermission } from 'src/services/api/users/role'
import { useRouter } from 'next/router'
import KeywordFilters from '../dashboard/KeywordFilters'
import SentimentGraph from './SentimentGraphs'
import moment from 'moment'
import Translations from 'src/layouts/components/Translations'

const SentimentDashboard = () => {
  const router = useRouter()

  const [date, setDate] = useState<DateType>(new Date(localStorage.getItem('startDate') || calculateDate(6)))
  const [endDate, setEndDate] = useState<DateType>(new Date(localStorage.getItem('endDate') || new Date()))
  const [status, setStatus] = useState(localStorage.getItem('status') || '1')

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

  const { resultReportPermission, errorUserPermission } = UserPermission()

  const params = {
    campaign: campaign,
    platformId: platformId,
    date: date ? moment(date).format('YYYY-MM-DD') : '',
    endDate: endDate ? moment(endDate).format('YYYY-MM-DD') : '',
    period: period,
    previousDate: previousDate ? moment(previousDate).format('YYYY-MM-DD') : '',
    previousEndDate: previousEndDate ? moment(previousEndDate).format('YYYY-MM-DD') : '',
    keywordIds: keyword,
    page: 'sentimentDashboard',
    label: '',
    filterKeyword: filterKeyword
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
    }
  }, [errorUserPermission])

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Filter
          tilte={<Translations text='Sentiment Dashboard' />}
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
        <Grid container spacing={3} ml={2} pt={2}>
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

      <Grid container ml={2}>
        {!loadingKeyword ? <SentimentGraph params={params} resultReportPermission={resultReportPermission} /> : ''}
      </Grid>
    </Grid>
  )
}

export default SentimentDashboard
