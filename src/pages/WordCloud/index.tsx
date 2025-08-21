import { forwardRef, useCallback, useEffect, useState } from 'react'
import {
  Grid,
  CardHeader,
  CardContent,
  InputLabel,
  MenuItem,
  Box,
  Tooltip,
  tooltipClasses,
  TooltipProps,
  Paper
} from '@mui/material'
import Select, { SelectChangeEvent } from '@mui/material/Select'
import FormControl from '@mui/material/FormControl'
import TextField from '@mui/material/TextField'

import DatePicker from 'react-datepicker'
import { DateType } from 'src/types/forms/reactDatepickerTypes'
import format from 'date-fns/format'
import DatePickerWrapper from 'src/@core/styles/libs/react-datepicker'
import { styled } from '@mui/material/styles'

// ** Third Party Styles Imports
// import addDays from 'date-fns/addDays'

import 'chart.js/auto'
import 'react-datepicker/dist/react-datepicker.css'

import { CampaignLists } from 'src/services/api/campaign/CampaignAPI'

import SourceService from 'src/services/api/source/SourceApi'

import { UserPermission } from 'src/services/api/users/role'
import { API_PATH, GraphicColors } from 'src/utils/const'
import Translations from 'src/layouts/components/Translations'
import { useRouter } from 'next/router'
import axios from 'axios'
import authConfig from 'src/configs/auth'
import KeywordFilters from '../dashboard/KeywordFilters'
import WordCloudGraphs from './WordCloudGraphs'
import moment from 'moment'
import { useTranslation } from 'react-i18next'

// import QuickView from "./QuickView"

export const calculateDate = (days: number) => {
  const today = new Date()
  const calcuatedDate = new Date(today)
  calcuatedDate.setDate(calcuatedDate.getDate() - days)

  return calcuatedDate
}

export const get1stAndLastDayOfMonth = (year: number, month: number, type: number) => {
  return new Date(year, month, type)
}

export interface PickerProps {
  label?: string
  end: Date | number
  start: Date | number
}

export const StyledTooltip = styled(({ className, ...props }: TooltipProps) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: '#9e9e9e',
    color: 'white',
    maxWidth: 220,
    fontSize: theme.typography.pxToRem(20),
    border: '1px solid #9e9e9e'
  }
}))

export const wordBreaks = (data: any) => {
  let paragraphs = data
  for (let i = 0; i < paragraphs?.length; i++) {
    paragraphs = paragraphs.replace(/,/g, ' ')
  }

  return paragraphs
}

const WordCloudDashboard = () => {
  const { t } = useTranslation()

  const [date, setDate] = useState<DateType>(new Date(localStorage.getItem('startDate') || calculateDate(6)))
  const [endDate, setEndDate] = useState<DateType>(new Date(localStorage.getItem('endDate') || new Date()))
  const [previousDate, setPreviousDate] = useState<DateType>(
    new Date(localStorage.getItem('previousStartDate') || new Date())
  )
  const [previousEndDate, setPreviousEndDate] = useState<DateType>(
    new Date(localStorage.getItem('previousEndDate') || new Date())
  )
  const [campaign, setCampaign] = useState<string>('')
  const [platformId, setPlatformId] = useState<string>(localStorage.getItem('platformId') || 'all')
  const [dateSelect, setDateSelect] = useState<string>(localStorage.getItem('dateSelect') || '3')

  const [status, setStatus] = useState(localStorage.getItem('status') || '1')

  // const [reload] = useState<boolean>(false)
  const [topKeyword, setTopKeyword] = useState<string>('all')

  const [period, setPeriod] = useState<string>('last7days')

  const [showPreviousDatepicker, setShowPreviousDatepicker] = useState<boolean>(false)
  const [keyword, setKeyword] = useState<string>('all')
  const [filterKeyword, setFilterKeyword] = useState<any>([])

  const [keywordGraphColors, setKeywordGraphColor] = useState<any>(null)
  const [loadingKeyword, setLoadingKeyword] = useState<boolean>(true)

  const router = useRouter()

  const { resultCampaiganList } = CampaignLists(status)

  const { resultReportPermission, errorUserPermission } = UserPermission()

  const { result_source_list } = SourceService()

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

  const params = {
    campaign: campaign,
    platformId: platformId,
    date: date ? moment(date).format('YYYY-MM-DD') : '',
    endDate: endDate ? moment(endDate).format('YYYY-MM-DD') : '',
    period: period,
    previousDate: previousDate ? moment(previousDate).format('YYYY-MM-DD') : '',
    previousEndDate: previousEndDate ? moment(previousEndDate).format('YYYY-MM-DD') : '',
    topKeyword: topKeyword,
    keywordIds: keyword,
    label: '',
    page: 'overallDashboard'
  }

  const handleSelectList = useCallback((e: SelectChangeEvent, type: string) => {
    if (type === 'campaign') {
      setCampaign(e.target.value)
      localStorage.setItem('campaign', e.target.value)
    } else {
      setPlatformId(e.target.value)
      localStorage.setItem('platformId', e.target.value);
    }
  }, [])

  const handleSelectStatus = useCallback((e: SelectChangeEvent) => {
    setStatus(e.target.value)
    localStorage.setItem('status', e.target.value)
  }, [])

  const handleDateSelect = useCallback((e: any) => {
    const value = e.target?.value ? e.target?.value : e
    setDateSelect(value)
    setShowPreviousDatepicker(false)
    localStorage.setItem('dateSelect', value)
    periodSet(value)
  }, [])

  const periodSet = (value: any) => {
    if (value === '1') {
      setPeriod('daily')
      setDate(new Date())
      setEndDate(new Date())
    } else if (value === '2') {
      // const yesterday = moment().add(-1, 'days');
      setPeriod('yesterday')
      const yesterday = calculateDate(1)
      setDate(yesterday)
      setEndDate(yesterday)
    } else if (value === '3') {
      setPeriod('last7days')
      const lastSevenDays = calculateDate(6)
      setDate(lastSevenDays)
      setEndDate(new Date())
    } else if (value === '4') {
      setPeriod('last30days')
      const last30Days = calculateDate(29)
      setDate(last30Days)
      setEndDate(new Date())
    } else if (value === '5') {
      setPeriod('thismonth')
      const date = new Date()
      const firstDayofMonth = get1stAndLastDayOfMonth(date.getFullYear(), date.getMonth(), 1)
      setDate(firstDayofMonth)
      setEndDate(date)
    } else if (value === '6') {
      setPeriod('lastmonth')
      const date = new Date()
      const lastDayofMonth = get1stAndLastDayOfMonth(date.getFullYear(), date.getMonth(), 0)

      const firstDayofLastMonth = get1stAndLastDayOfMonth(date.getFullYear(), date.getMonth() - 1, 1)

      setDate(firstDayofLastMonth)
      setEndDate(lastDayofMonth)
    } else {
      setPeriod('customrange')
      const startDate = new Date(localStorage.getItem('previousStartDate') || date || new Date())
      const end_Date = new Date(localStorage.getItem('previousEndDate') || endDate || new Date())

      setPreviousDate(startDate)
      setPreviousEndDate(end_Date)
      setShowPreviousDatepicker(true)
    }
  }

  const handleOnChangeDate = (dates: any) => {
    handleDateSelect('7')
    const [start, end] = dates
    setDate(start)
    setEndDate(end)
    localStorage.setItem('startDate', moment(start)?.format('YYYY-MM-DD'))
    localStorage.setItem('endDate', moment(end)?.format('YYYY-MM-DD'))
  }

  const handleOnChangePreviousDates = (dates: any) => {
    const [start, end] = dates
    setPreviousDate(start)
    setPreviousEndDate(end)
    localStorage.setItem('previousStartDate', moment(start)?.format('YYYY-MM-DD'))
    localStorage.setItem('previousEndDate', moment(end)?.format('YYYY-MM-DD'))
  }

  const CustomInput = forwardRef((props: PickerProps, ref) => {
    const startDate = format(props.start, 'dd/MM/yyyy')
    const endDate = props.end !== null ? ` - ${format(props.end, 'dd/MM/yyyy')}` : null

    const value = `${startDate}${endDate !== null ? endDate : ''}`

    return (
      <FormControl fullWidth>
        <TextField inputRef={ref} label={props.label || ''} {...props} value={value} size='small' />
      </FormControl>
    )
  })

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
    if (localStorage.getItem('dateSelect')) {
      const value = localStorage.getItem('dateSelect')
      periodSet(value)
    }
  }, [])

  const getKeywords = (campaignId: string) => {
    setLoadingKeyword(true)

    axios
      .get(`${API_PATH}/keywords?campaing_id=${campaignId}`, {
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

  useEffect(() => {
    if (resultCampaiganList?.length > 0) {
      const value = localStorage.getItem('campaign')
      if (value) {
        setCampaign(value)
        getKeywords(value)
      } else {
        setCampaign(resultCampaiganList[0]?.id)
        getKeywords(resultCampaiganList[0]?.id)
      }
    }
  }, [resultCampaiganList])

  useEffect(() => {
    if (campaign) {
      getKeywords(campaign)
    }
  }, [campaign])

  return (
    <>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Paper style={{ border: `3px solid #fff`, borderRadius: 7 }}>
            <CardHeader title={<Translations text='Word Clouds' />} />
            <CardContent>
              <Grid container spacing={6}>
                <Grid item sm={3} xs={12}>
                  <FormControl fullWidth>
                    <InputLabel id='plan-select'>
                      <Translations text='Period of time' />
                    </InputLabel>
                    <Select
                      size='small'
                      fullWidth
                      value={dateSelect}
                      id='select-date'
                      label={<Translations text='Period of time' />}
                      labelId='date-select'
                      onChange={(e: SelectChangeEvent) => {
                        handleDateSelect(e)
                      }}
                      inputProps={{ placeholder: 'Select Period' }}
                    >
                      <MenuItem value='1'>
                        <Translations text='Today' />
                      </MenuItem>
                      <MenuItem value='2'>
                        <Translations text='Yesterday' />
                      </MenuItem>
                      <MenuItem value='3'>
                        <Translations text='Last 7 Days' />
                      </MenuItem>
                      <MenuItem value='4'>
                        <Translations text='Last 30 Days' />
                      </MenuItem>
                      <MenuItem value='5'>
                        <Translations text='This Month' />
                      </MenuItem>
                      <MenuItem value='6'>
                        <Translations text='Last Month' />
                      </MenuItem>
                      <MenuItem value='7'>Custom Date Range</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item sm={3} xs={12}>
                  <FormControl fullWidth>
                    <InputLabel id='plan-select'>
                      <Translations text='Status' />
                    </InputLabel>
                    <Select
                      size='small'
                      fullWidth
                      value={status}
                      id='select-date'
                      label={<Translations text='Status' />}
                      labelId='date-select'
                      onChange={(e: SelectChangeEvent) => {
                        handleSelectStatus(e)
                      }}
                      inputProps={{ placeholder: 'Select Status' }}
                    >
                      <MenuItem value='all'>
                        <Translations text='All' />
                      </MenuItem>
                      <MenuItem value='1'>
                        <Translations text='Active' />
                      </MenuItem>
                      <MenuItem value='0'>
                        <Translations text='InActive' />
                      </MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item sm={3} xs={12}>
                  <FormControl fullWidth>
                    <InputLabel id='plan-select'>
                      <Translations text='Campaign Name' />
                    </InputLabel>
                    <Select
                      size='small'
                      fullWidth
                      value={campaign}
                      id='select-campaign'
                      label='Select campaign'
                      labelId='campaign-select'
                      onChange={e => {
                        handleSelectList(e, 'campaign')
                      }}
                      inputProps={{ placeholder: 'Select Campaign' }}
                    >
                      {resultCampaiganList &&
                        (resultCampaiganList || [])?.map((item: any, index: number) => {
                          return (
                            <MenuItem key={index} value={item.id}>
                              {item.name}
                            </MenuItem>
                          )
                        })}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item sm={3} xs={12}>
                  <FormControl fullWidth>
                    <InputLabel id='plan-select'>
                      <Translations text='Channel' />
                    </InputLabel>
                    <Select
                      size='small'
                      fullWidth
                      value={platformId}
                      id='select-platform'
                      label='Select Paltform'
                      labelId='platform-select'
                      onChange={e => {
                        handleSelectList(e, 'platform')
                      }}
                      inputProps={{ placeholder: 'Select Platform' }}
                    >
                      <MenuItem value='all'>ALL</MenuItem>
                      {result_source_list &&
                        result_source_list?.map((item: any, index: number) => {
                          return (
                            <MenuItem key={index} value={item.id}>
                              {item.name}
                            </MenuItem>
                          )
                        })}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item sm={3} xs={12}>
                  <Box>
                    <DatePickerWrapper>
                      <DatePicker
                        selectsRange
                        monthsShown={2}
                        endDate={endDate}
                        selected={date}
                        startDate={date}
                        shouldCloseOnSelect={false}
                        id='date-range-picker-months'
                        onChange={handleOnChangeDate}
                        customInput={
                          <CustomInput
                            label={t('Current Period')}
                            end={endDate as Date | number}
                            start={date as Date | number}
                          />
                        }
                      />
                    </DatePickerWrapper>
                  </Box>
                </Grid>
                {showPreviousDatepicker ? (
                  <Grid item sm={3} xs={12}>
                    <Box>
                      <DatePickerWrapper>
                        <DatePicker
                          selectsRange
                          monthsShown={2}
                          endDate={previousEndDate}
                          selected={previousDate}
                          startDate={previousDate}
                          shouldCloseOnSelect={false}
                          id='date-range-picker-months'
                          onChange={handleOnChangePreviousDates}
                          customInput={
                            <CustomInput
                              label={t('Previous Period')}
                              end={previousEndDate as Date | number}
                              start={previousDate as Date | number}
                            />
                          }
                        />
                      </DatePickerWrapper>
                    </Box>
                  </Grid>
                ) : (
                  ''
                )}
              </Grid>
            </CardContent>
          </Paper>
        </Grid>
      </Grid>

      {campaign ? (
        <Grid container spacing={3} pl={3} pt={2}>
          <KeywordFilters
            campaign={campaign}
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
        <WordCloudGraphs
          params={params}
          setTopKeyword={setTopKeyword}
          resultReportPermission={resultReportPermission}
          keywordGraphColors={keywordGraphColors}
          topKeyword={topKeyword}
        />
      ) : (
        ''
      )}
    </>
  )
}

export default WordCloudDashboard
