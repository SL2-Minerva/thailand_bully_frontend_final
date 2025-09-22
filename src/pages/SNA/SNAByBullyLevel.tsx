import { forwardRef, useCallback, useEffect, useState } from 'react'
import {
  Grid,
  CardHeader,
  CardContent,
  InputLabel,
  MenuItem,
  Box,
  LinearProgress,
  Typography,
  Button,
  Paper
} from '@mui/material'
import Select, { SelectChangeEvent } from '@mui/material/Select'
import FormControl from '@mui/material/FormControl'
import TextField from '@mui/material/TextField'

import DatePicker from 'react-datepicker'
import { DateType } from 'src/types/forms/reactDatepickerTypes'
import format from 'date-fns/format'
import DatePickerWrapper from 'src/@core/styles/libs/react-datepicker'
import { GetKeyWordsList } from 'src/services/api/dashboards/overall/overallDashboardApi'

// ** Third Party Styles Imports
// import addDays from 'date-fns/addDays'
import { CampaignLists } from 'src/services/api/campaign/CampaignAPI'
import SourceService from 'src/services/api/source/SourceApi'
import Translations from 'src/layouts/components/Translations'
import { useRouter } from 'next/router'
import { calculateDate, get1stAndLastDayOfMonth, PickerProps, wordBreaks } from '../dashboard/overall'
import { UserPermission } from 'src/services/api/users/role'
import Graph from 'react-graph-vis'

import 'react-graph-vis/node_modules/vis-network/dist/dist/vis-network.css'

// import 'vis-network/styles/vis-network.css'

import { initialGraph } from '.'
import { GraphicColors, BullyLevelSummaryColors } from 'src/utils/const'
import moment from 'moment'
import { useTranslation } from 'react-i18next'
import { GetSNA } from 'src/services/api/dashboards/sna/snaApi'

const SNAByBullyLevel = () => {
  const { t } = useTranslation()

  const [date, setDate] = useState<DateType>(new Date(localStorage.getItem('startDate') || calculateDate(6)))
  const [endDate, setEndDate] = useState<DateType>(new Date(localStorage.getItem('endDate') || new Date()))
  const [previousDate, setPreviousDate] = useState<DateType>(
    new Date(localStorage.getItem('previousStartDate') || new Date())
  )
  const [previousEndDate, setPreviousEndDate] = useState<DateType>(
    new Date(localStorage.getItem('previousEndDate') || new Date())
  )

  const [status, setStatus] = useState(localStorage.getItem('status') || '1')
  const [network, setNetwork] = useState<any>({})

  const [campaign, setCampaign] = useState<string>('1')
  const [platformId, setPlatformId] = useState<string>(localStorage.getItem('platformId') || 'all')
  const [limit, setLimit] = useState<string>('1000')
  const [dateSelect, setDateSelect] = useState<string>(localStorage.getItem('dateSelect') || '3')
  const [period, setPeriod] = useState<string>('last7days')
  const [showPreviousDatepicker, setShowPreviousDatepicker] = useState<boolean>(false)
  const [keyword, setKeyword] = useState<string>('all')
  const [filterKeyword, setFilterKeyword] = useState<any>([])
  const [graphData, setGraphData] = useState<any>(initialGraph)

  const router = useRouter()

  const { errorUserPermission } = UserPermission()
  const { resultCampaiganList } = CampaignLists(status)
  const { result_source_list } = SourceService()

  // const { resultNetworkGraph, loadingNetworkGraph } = GetNetworkGraph(
  //   campaign,
  //   platformId,
  //   date,
  //   endDate,
  //   period,
  //   previousDate,
  //   previousEndDate,
  //   '',
  //   '',
  //   'sna',
  //   'bullyLevel',
  //   keyword,
  //   limit
  // )

  const { resultSNAGraph, loadingSNAGraph } = GetSNA(
    campaign,
    platformId,
    date,
    endDate,
    period,
    previousDate,
    previousEndDate,
    '',
    '',
    'sna',
    'bully-level',
    keyword,
    limit
  )

  const levels = BullyLevelSummaryColors.filter(l => l.name !== 'all')

  const { resultKeywordList, keywordsColor } = GetKeyWordsList(campaign)

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

  const handleSelectList = useCallback((e: SelectChangeEvent, type: string) => {
    if (type === 'campaign') {
      setCampaign(e.target.value)
      localStorage.setItem('campaign', e.target.value)
    } else if (type === 'limit') {
      setLimit(e.target.value)
    } else {
      setPlatformId(e.target.value)
      localStorage.setItem('platformId', e.target.value)
    }
  }, [])
  const handleDateSelect = useCallback((e: any) => {
    const value = e.target?.value ? e.target?.value : e
    setDateSelect(value)
    setShowPreviousDatepicker(false)
    localStorage.setItem('dateSelect', value)
    periodSet(value)
  }, [])

  const handleSelectStatus = useCallback((e: SelectChangeEvent) => {
    setStatus(e.target.value)
    localStorage.setItem('status', e.target.value)
  }, [])

  const handleOnChangeDate = (dates: any) => {
    handleDateSelect('7')
    const [start, end] = dates
    setDate(start)
    setEndDate(end)
    localStorage.setItem('startDate', moment(start)?.format('YYYY-MM-DD'))
    localStorage.setItem('endDate', moment(end)?.format('YYYY-MM-DD'))
  }

  const handleOnChangePreviousDate = (dates: any) => {
    const [start, end] = dates
    setPreviousDate(start)
    setPreviousEndDate(end)
    localStorage.setItem('previousStartDate', moment(start)?.format('YYYY-MM-DD'))
    localStorage.setItem('previousEndDate', moment(end)?.format('YYYY-MM-DD'))
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

  const options = {
    layout: {
      hierarchical: false
    },
    edges: {
      color: '#000000',
      dashes: false
    },
    height: '700px',
    autoResize: false
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
    if (resultCampaiganList?.length > 0) {
      const value = localStorage.getItem('campaign')
      if (value) {
        setCampaign(value)
      } else {
        setCampaign(resultCampaiganList[0]?.id)
      }
    }
  }, [resultCampaiganList])

  useEffect(() => {
    if (!loadingSNAGraph && resultSNAGraph) {
      setGraphData(resultSNAGraph)
    } else {
      setGraphData(initialGraph)
    }
  }, [loadingSNAGraph])

  // useEffect(() => {
  //   if (!loadingNetworkGraph && resultNetworkGraph) {
  //     setGraphData(resultNetworkGraph)
  //   } else {
  //     setGraphData(initialGraph)
  //   }
  // }, [loadingNetworkGraph])

  useEffect(() => {
    if (localStorage.getItem('dateSelect')) {
      const value = localStorage.getItem('dateSelect')
      periodSet(value)
    }
  }, [])

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Paper style={{ border: `3px solid #fff`, borderRadius: 7 }}>
          <CardHeader title={<Translations text='Filter' />} />
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
                      result_source_list.map((item: any, index: number) => {
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
                    <Translations text='Limit' />
                  </InputLabel>
                  <Select
                    size='small'
                    fullWidth
                    value={limit}
                    id='select-limit'
                    label='Select Limit'
                    labelId='limit-select'
                    onChange={e => {
                      handleSelectList(e, 'limit')
                    }}
                    inputProps={{ placeholder: 'Select Limit' }}
                  >
                    <MenuItem value='1000'>1000</MenuItem>
                    <MenuItem value='2000'>2000</MenuItem>
                    <MenuItem value='3000'>3000</MenuItem>
                    <MenuItem value='4000'>4000</MenuItem>
                    <MenuItem value='5000'>5000</MenuItem>
                    <MenuItem value='6000'>6000</MenuItem>
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
      <Grid container spacing={2} mt={1}>
        <Grid item xs={12} ml={2}>
          <Paper style={{ border: `3px solid #fff`, borderRadius: 7 }}>
            <CardHeader title='Keyword Filter'></CardHeader>
            <CardContent>
              <Grid container spacing={2}>
                <Grid item xs={6} md={1}>
                  <Button
                    fullWidth
                    onClick={() => {
                      if (keyword === 'all') {
                        setKeyword('')
                      } else {
                        setKeyword('all')
                        setFilterKeyword([])
                      }
                    }}
                    variant='contained'
                    color={keyword === 'all' ? 'primary' : 'secondary'}
                  >
                    ALL
                  </Button>
                </Grid>

                {resultKeywordList &&
                  (resultKeywordList || []).map((keywords: any, index: number) => {
                    return (
                      <Grid item xs={6} md={1.2} key={index}>
                        <Button
                          fullWidth
                          sx={{
                            bgcolor:
                              filterKeyword?.indexOf(keywords?.id) > -1
                                ? (keywordsColor && keywordsColor[index]) || GraphicColors[index]
                                : keyword === 'all'
                                ? (keywordsColor && keywordsColor[index]) || GraphicColors[index]
                                : 'grey',
                            ':hover': {
                              bgcolor:
                                filterKeyword?.indexOf(keywords?.id) > -1
                                  ? (keywordsColor && keywordsColor[index]) || GraphicColors[index]
                                  : keyword === 'all'
                                  ? (keywordsColor && keywordsColor[index]) || GraphicColors[index]
                                  : 'grey'
                            }
                          }}
                          onClick={() => {
                            checkKeywordId(filterKeyword, keywords?.id)
                          }}
                          variant='contained'
                        >
                          <span style={{ wordWrap: 'break-word' }}>{wordBreaks(keywords.name)}</span>
                        </Button>
                      </Grid>
                    )
                  })}
              </Grid>
            </CardContent>
          </Paper>
        </Grid>
      </Grid>
      <Grid item xs={12} mt={1}>
        <Paper style={{ border: `3px solid #fff`, borderRadius: 7 }}>
          {loadingSNAGraph && <LinearProgress style={{ width: '100%' }} />}

          <Box sx={{ mb: 8, textAlign: 'center' }}>
            <Typography variant='h5' sx={{ mt: 4, mb: 3, lineHeight: '2rem' }}>
              <Translations text='Social Network Analysis' /> By Bully Level
            </Typography>
          </Box>

          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 1, marginRight: 3 }}>
                {levels.map(({ name, color }) => (
                  <Box key={name} sx={{ display: 'flex', alignItems: 'center', gap: 1, marginLeft: 3 }}>
                    <Box sx={{ width: 16, height: 16, bgcolor: color, borderRadius: '50%' }} />
                    <Typography variant='body2'>{name}</Typography>
                  </Box>
                ))}
              </Box>
            </Grid>

            <Grid item xs={12}>
              {resultSNAGraph?.nodes?.length > 0 ? (
                <>
                  <Graph
                    graph={graphData}
                    options={options}
                    events={{
                      selectNode: event => {
                        const { nodes } = event
                        if (nodes.length == 1) {
                          const nodesData = resultSNAGraph?.nodes

                          for (let i = 0; i < nodesData?.length; i++) {
                            if (nodes[0] === nodesData[i].id) {
                              window.open(nodesData[i].link_message, '_blank')
                              break
                            }
                          }
                        }
                      },
                      stabilized: function () {
                        network?.fit()
                      }
                    }}
                    getNetwork={setNetwork}
                  />
                </>
              ) : (
                <div
                  style={{
                    height: 400,
                    padding: '70px 0',
                    textAlign: 'center',
                    verticalAlign: 'middle',
                    color: '#80808059'
                  }}
                >
                  There is no data
                </div>
              )}
            </Grid>
          </Grid>
        </Paper>
      </Grid>
    </Grid>
  )
}

export default SNAByBullyLevel
