import {
  Box,
  Paper,
  CardContent,
  CardHeader,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField
} from '@mui/material'
import { CampaignLists } from 'src/services/api/campaign/CampaignAPI'
import { calculateDate, get1stAndLastDayOfMonth, PickerProps } from '../dashboard/overall'

import DatePicker from 'react-datepicker'
import format from 'date-fns/format'
import DatePickerWrapper from 'src/@core/styles/libs/react-datepicker'
import { forwardRef, useCallback, useEffect, useState } from 'react'
import { DateType } from 'src/types/forms/reactDatepickerTypes'
import Translations from 'src/layouts/components/Translations'
import moment from 'moment'
import SourceService from 'src/services/api/source/SourceApi'
import { useTranslation } from 'react-i18next'

interface Props {
  date: DateType
  setDate: any
  endDate: DateType
  setEndDate: any
  previousDate: DateType
  setPreviousDate: any
  previousEndDate: DateType
  setPreviousEndDate: any
  period: string
  setPeriod: any
  dateSelect: string
  setDateSelect: any
  campaign: string
  setCampaign: any
  tilte: any
  platformId: string
  setPlatformId: any
  status: string
  setStatus: any
}

const Filter = (props: Props) => {
  const {
    date,
    setDate,
    endDate,
    setEndDate,
    previousDate,
    setPreviousDate,
    previousEndDate,
    setPreviousEndDate,
    setPeriod,
    dateSelect,
    setDateSelect,
    campaign,
    setCampaign,
    tilte,
    setPlatformId,
    platformId,
    status,
    setStatus
  } = props
  const { resultCampaiganList } = CampaignLists(status)
  const { result_source_list } = SourceService()

  const [showPreviousDatepicker, setShowPreviousDatepicker] = useState<boolean>(false)
  const { t } = useTranslation();

  const handleDateSelect = (e: any) => {
    const value = e.target?.value ? e.target?.value : e
    setDateSelect(value)
    setShowPreviousDatepicker(false)
    localStorage.setItem('dateSelect', value)
    periodSet(value)
  }

  const periodSet = (value: any) => {
    if (value === '1') {
      setPeriod('daily')
      setDate(new Date())
      setEndDate(new Date())
    } else if (value === '2') {
      const yesterday = calculateDate(1)
      setPeriod('yesterday')
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

  // const handleSelectList = useCallback((e: SelectChangeEvent) => {
  //   setCampaign(e.target.value)
  //   localStorage.setItem('campaign', e.target.value)
  // }, [])

  const handleSelectList = useCallback((e: SelectChangeEvent, type: string) => {
    if (type === 'campaign') {
      setCampaign(e.target.value)
      localStorage.setItem('campaign', e.target.value)
    } else {
      setPlatformId(e.target.value)
      localStorage.setItem('platformId', e.target.value)
    }
  }, [])

  const handleOnChangeDate = (dates: any) => {
    handleDateSelect('7')
    const [start, end] = dates
    setDate(start)
    setEndDate(end)
    localStorage.setItem('startDate', moment(start)?.format('YYYY-MM-DD'))
    localStorage.setItem('endDate', moment(end)?.format('YYYY-MM-DD'))
  }

  const handleSelectStatus = useCallback((e: SelectChangeEvent) => {
    setStatus(e.target.value)
    localStorage.setItem('status', e.target.value)
  }, [])

  const handleOnChangePreviousDate = (dates: any) => {
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
        <TextField inputRef={ref} label={props.label || ''} {...props} value={value} size='small'/>
      </FormControl>
    )
  })

  useEffect(() => {
    if (localStorage.getItem('dateSelect')) {
      const value = localStorage.getItem('dateSelect')
      periodSet(value)
    }
  }, [])

  useEffect(() => {
    if (resultCampaiganList?.length > 0) {
      const value = localStorage.getItem('campaign')
      if (value) {
        setCampaign(value)
      } else {
        setCampaign(resultCampaiganList[0]?.id)
      }
    }
  }, [resultCampaiganList])

  return (
    <Grid item xs={12}>
      <Paper sx={{ border: `3px solid #fff`, borderRadius: 1 }} >
        <CardHeader title={tilte} />
        <CardContent>
          <Grid container spacing={2}>
            <Grid item sm={3} xs={12} mb={3}>
              <FormControl fullWidth>
                <InputLabel id='plan-select'>
                  <Translations text='Period of time' />
                </InputLabel>
                <Select
                  fullWidth
                  value={dateSelect}
                  id='select-date'
                  label={<Translations text='Period of time' />}
                  labelId='date-select'
                  onChange={handleDateSelect}
                  inputProps={{ placeholder: 'Select Period' }}
                  size='small'
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
                    resultCampaiganList.map((item: any, index: number) => {
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
                      <CustomInput label={t('Period Range')} end={endDate as Date | number} start={date as Date | number} />
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
                      onChange={handleOnChangePreviousDate}
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
  )
}

export default Filter
