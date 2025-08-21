import { Ref, useState, forwardRef, ReactElement, useCallback, useEffect } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import Switch from '@mui/material/Switch'
import Dialog from '@mui/material/Dialog'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import FormControl from '@mui/material/FormControl'
import Fade, { FadeProps } from '@mui/material/Fade'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import FormControlLabel from '@mui/material/FormControlLabel'
import InputLabel from '@mui/material/InputLabel'
import Select, { SelectChangeEvent } from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import CardContent, { CardContentProps } from '@mui/material/CardContent'
import { styled } from '@mui/material/styles'
import Repeater from 'src/@core/components/repeater'
import LocalizationProvider from '@mui/lab/LocalizationProvider'
import AdapterDateFns from '@mui/lab/AdapterDateFns'
import DatePicker from '@mui/lab/DatePicker'
import { format } from 'date-fns'

// ** Icons Imports
import Plus from 'mdi-material-ui/Plus'
import Close from 'mdi-material-ui/Close'
import DomainList from 'src/services/api/domains/DomainAPI'
import KeywordForm, { GenerateRandomColor } from './KeywordForm'
import axios from 'axios'
import authConfig from '../../../configs/auth'
import { API_PATH } from 'src/utils/const'
import { useTranslation } from 'react-i18next'
import { FormHelperText, FormLabel, Radio, RadioGroup } from '@mui/material'
import SourceList from 'src/services/api/source/SourceApi'
import Translations from 'src/layouts/components/Translations'

const Transition = forwardRef(function Transition(
  props: FadeProps & { children?: ReactElement<any, any> },
  ref: Ref<unknown>
) {
  return <Fade ref={ref} {...props} />
})

interface DialogInfoProps {
  show: boolean
  setShow: any
  action: string
  current?: any
  table: any
  keywordLimit: number
  resultIsAdmin: any
  frequencyDefault: number
  reload: boolean
  setReload: any
}

const RepeaterWrapper = styled(CardContent)<CardContentProps>(({ theme }) => ({
  paddingTop: theme.spacing(12),
  paddingBottom: theme.spacing(5.5),
  '& .repeater-wrapper + .repeater-wrapper': {
    marginTop: theme.spacing(12)
  }
}))

const DialogCampaign = (props: DialogInfoProps) => {
  const { show, setShow, action, current, keywordLimit, resultIsAdmin, frequencyDefault, reload, setReload } = props
  const { t } = useTranslation()
  const { result_source_list } = SourceList()

  const [domain, setDomain] = useState<string>('')
  const [originalFrequency, setOriginalFrequency] = useState<number>(0)
  const [frequency, setFrequency] = useState<number>(0)

  // const [msgTransaction, setMsgTransaction] = useState<number>(0);

  const [showErrorFrequency, setShowErrorFrequency] = useState<string>('')
  const [date, setDate] = useState<Date | null>(new Date())
  const [endDate, setEndDate] = useState<Date | null>(new Date())

  const [campaignName, setCampaignName] = useState<string>('')
  const [description, setDescription] = useState<string>('')
  const [status, setStatus] = useState<boolean>(false)
  const [checkKeyword, setCheckKeyword] = useState<boolean>(false)
  const [checkKeywordAnd, setCheckKeywordAnd] = useState<boolean>(false)
  const [checkKeywordOr, setCheckKeywordOr] = useState<boolean>(false)
  const [checkKeywordExclude, setCheckKeywordExclude] = useState<boolean>(false)
  const [keywordCount, setKeywordCount] = useState<number>(1)
  const [remainingKeywordCount, setRemainingKeywordCount] = useState<number>(keywordLimit)
  const [sourceList, setSourceList] = useState<any>([])
  const [removeKeywords, setRemoveKeywords] = useState<any>([])

  const initailAndColor = GenerateRandomColor()
  const [selectedValue, setSelectedValue] = useState('private')

  const [keywords, setKeywords] = useState([
    {
      id: 1,
      name: '',
      keyword_or: [''],
      keyword_and: [''],
      keyword_exclude: [''],
      colors: GenerateRandomColor(),
      keyword_or_color: [GenerateRandomColor()],
      keyword_and_color: [initailAndColor],
      delete_keyword_or: [''],
      delete_keyword_and: [''],
      delete_keyword_exclude: [''],
      color: GenerateRandomColor(),
      color_and: initailAndColor
    }
  ])

  function addKeyword() {
    const andColor = GenerateRandomColor()
    const news = [
      ...keywords,
      {
        id: keywords.length + 1,
        name: '',
        keyword_or: [''],
        keyword_and: [''],
        keyword_exclude: [''],
        colors: GenerateRandomColor(),
        keyword_or_color: [GenerateRandomColor()],
        keyword_and_color: [andColor],
        delete_keyword_or: [''],
        delete_keyword_and: [''],
        delete_keyword_exclude: [''],
        color: GenerateRandomColor(),
        color_and: andColor
      }
    ]
    setKeywordCount(keywordCount + 1)
    setKeywords(news)
  }

  function removeKeyword(current: any) {
    let keywordsCount = 1

    if (current?.keyword_and?.length > 0) {
      const keywordAnd = current.keyword_and

      for (let i = 0; i < keywordAnd.length; i++) {
        if (keywordAnd[i] !== '') {
          keywordsCount = keywordsCount + 1
        }
      }
    }

    if (current?.keyword_or?.length > 0) {
      const keywordOr = current.keyword_or

      for (let i = 0; i < keywordOr.length; i++) {
        if (keywordOr[i] !== '') {
          keywordsCount = keywordsCount + 1
        }
      }
    }

    if (current.id) {
      setRemoveKeywords([...removeKeywords, current.id])
    }
    const results = keywords.filter(keyword => keyword.id !== current.id)
    setKeywordCount(keywordCount - keywordsCount)
    setKeywords(results)
  }

  const { result_domain_list } = DomainList()
  const handleDomain = useCallback((e: SelectChangeEvent) => {
    setDomain(e.target.value)
  }, [])

  function handleCampaignName(event: any) {
    setCampaignName(event.target.value)
  }

  function handleDescription(event: any) {
    setDescription(event.target.value)
  }

  // function handleMsgTransaction(event: any) {
  //   setMsgTransaction(event.target.value)
  // }

  function handleFrequency(event: any) {
    const frequencyValue = event.target.value
    if (resultIsAdmin) {
      setFrequency(frequencyValue)
    } else {
      if (frequencyValue < originalFrequency) {
        setShowErrorFrequency('Frequncy value must be greater than ' + originalFrequency)
      } else {
        setShowErrorFrequency('')
      }

      setFrequency(frequencyValue)
    }
  }

  function closeDialogBox() {
    const andColor = GenerateRandomColor()
    setShow(false)
    setKeywords([
      {
        id: 1,
        name: '',
        keyword_or: [''],
        keyword_and: [''],
        keyword_exclude: [''],
        colors: GenerateRandomColor(),
        keyword_or_color: [GenerateRandomColor()],
        keyword_and_color: [andColor],
        delete_keyword_or: [''],
        delete_keyword_and: [''],
        delete_keyword_exclude: [''],
        color: GenerateRandomColor(),
        color_and: andColor
      }
    ])
    setRemoveKeywords([])
  }

  // const checkKeywordName = (values: any) => {
  //   if (values?.length > 0) {
  //     for (let j = 0; j < values.length; j++) {
  //       if (values[j]?.name === '') {
  //         return true
  //         break
  //       }
  //     }

  //     return false
  //   }
  // }

  const createNewCampaign = async () => {
    // const startdate = new Date(date);

    // var formattedDate =
    const values = [...keywords]

    if (values?.length > 0) {
      for (let i = 0; i < keywords?.length; i++) {
        let changeDataType: any
        if (typeof values[i]?.keyword_and_color == 'string') {
          changeDataType = [values[i]?.keyword_and_color]
          values[i].keyword_and_color = changeDataType
        }
        values[i].colors = values[i]?.color
      }
    }

    const input_data = {
      name: campaignName,
      organization_id: localStorage.getItem('organizationId'),
      domain_id: parseInt(domain),
      status: status ? 1 : 0,
      description: description,
      frequency: frequency,
      privacy_campaign: selectedValue,
      start_at: format(date ? date : new Date(), 'yyyy-MM-dd'),
      end_at: format(endDate ? endDate : new Date(), 'yyyy-MM-dd'),
      keywords: keywords,
      id: current.id ?? undefined,
      delete_keyword: [],
      platform: sourceList

      // msg_transaction: msgTransaction
    }

    if (action === 'edit') {
      input_data.id = current.id
      input_data.delete_keyword = removeKeywords
      axios
        .put(`${API_PATH}/campaign/update`, input_data, {
          headers: {
            Authorization: `Bearer ${window.localStorage.getItem(authConfig.storageTokenKeyName)!}`
          }
        })
        .then(async response => {
          const { data, status } = response.data
          console.log('response', status, data)

          closeDialogBox()
          setReload(!reload)
        })
        .catch((ex: any) => {
          console.log(ex)
        })
    } else {
      axios
        .post(`${API_PATH}/campaign/create`, input_data, {
          headers: {
            Authorization: `Bearer ${window.localStorage.getItem(authConfig.storageTokenKeyName)!}`
          }
        })
        .then(async response => {
          const { data, status } = response.data
          console.log(data, status)

          closeDialogBox()
          setReload(!reload)
        })
        .catch((ex: any) => {
          console.log(ex)
        })
    }
  }

  useEffect(() => {
    if (action === 'edit') {
      if (current) {
        setCampaignName(current.name)
        setDescription(current.description)
        setDomain(current.domain_id)
        setDate(new Date(current.start_at))
        setEndDate(new Date(current.end_at))
        setFrequency(current.frequency)
        setOriginalFrequency(frequencyDefault)
        setSelectedValue(current.privacy_campaign)
        setSourceList(current.platform ?? [])

        // setMsgTransaction(current.msg_transaction)

        if (current.keyword && current.keyword.length > 0) {
          setKeywords(current.keyword)
          const keywords = current.keyword
          let keywordCounts = keywords.length

          for (let i = 0; i < keywords.length; i++) {
            let keywordAndCount = 0
            let keywordOrCount = 0
            for (let j = 0; j < keywords[i]?.keyword_and?.length; j++) {
              if (keywords[i]?.keyword_and[j] !== '') {
                keywordAndCount = keywordAndCount + 1
              }
            }

            for (let j = 0; j < keywords[i]?.keyword_or?.length; j++) {
              if (keywords[i]?.keyword_or[j] !== '') {
                keywordOrCount = keywordOrCount + 1
              }
            }

            keywordCounts = keywordCounts + keywordAndCount + keywordOrCount
            setKeywordCount(keywordCounts)
          }
        }

        const campaignStatus = current.status === 1 ? true : false
        setStatus(campaignStatus)
      }
    } else {
      const andColor = GenerateRandomColor()
      setKeywordCount(1)
      setCampaignName('')
      setDescription('')
      setDomain('')
      setSourceList([])
      setFrequency(frequencyDefault)
      setOriginalFrequency(frequencyDefault)
      setKeywords([
        {
          id: 1,
          name: '',
          keyword_or: [''],
          keyword_and: [''],
          keyword_exclude: [''],
          colors: GenerateRandomColor(),
          keyword_or_color: [GenerateRandomColor()],
          keyword_and_color: [andColor],
          delete_keyword_or: [''],
          delete_keyword_and: [''],
          delete_keyword_exclude: [''],
          color: GenerateRandomColor(),
          color_and: andColor
        }
      ])
      setDate(null)
      setEndDate(null)
      setStatus(true)
      setSelectedValue('')

      // setMsgTransaction(0);
    }
  }, [current, action])

  // useEffect(() => {
  //   setRemainingKeywordCount(keywordLimit - keywordCount)
  // }, [keywordCount])

  useEffect(() => {
    if (keywordLimit !== undefined && keywordCount !== undefined) {
      setRemainingKeywordCount(keywordLimit - keywordCount)
    }
  }, [keywordLimit, keywordCount])

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedValue(event.target.value)
  }

  const handleChangeSource = (event: SelectChangeEvent) => {
    const {
      target: { value }
    } = event
    setSourceList(typeof value === 'string' ? value.split(',') : value)
  }

  return (
    <Card>
      <Dialog
        fullWidth
        open={show}
        maxWidth='md'
        scroll='body'
        onClose={closeDialogBox}
        TransitionComponent={Transition}
        onBackdropClick={closeDialogBox}
      >
        <DialogContent sx={{ pb: 6, px: { xs: 8, sm: 15 }, pt: { xs: 8, sm: 12.5 }, position: 'relative' }}>
          <IconButton size='small' onClick={closeDialogBox} sx={{ position: 'absolute', right: '1rem', top: '1rem' }}>
            <Close />
          </IconButton>
          <Box sx={{ mb: 8, textAlign: 'center' }}>
            <Typography variant='h5' sx={{ mb: 3, lineHeight: '2rem' }}>
              {action === 'edit' ? (
                <Translations text='Edit Campaign Information' />
              ) : (
                <Translations text='Create Campaign Information' />
              )}
            </Typography>
          </Box>
          <div id={`campaign-master`}>
            <Grid container spacing={6} style={{ paddingLeft: '1.5rem' }}>
              <Grid item sm={12} xs={12}>
                <TextField
                  fullWidth
                  label={<Translations text='Campaign Name' />}
                  value={campaignName}
                  onChange={handleCampaignName}
                  placeholder=''
                />
              </Grid>
              <Grid item sm={12} xs={12}>
                <TextField
                  fullWidth
                  multiline
                  rows={3}
                  label={<Translations text='Description' />}
                  value={description}
                  onChange={handleDescription}
                  id='textarea-outlined-controlled'
                />
              </Grid>
              <Grid item sm={12} xs={12}>
                <FormControl fullWidth>
                  <InputLabel id='plan-select'>
                    <Translations text='Select Domain' />
                  </InputLabel>
                  <Select
                    fullWidth
                    value={domain}
                    id='select-domain'
                    label={<Translations text='Select Domain' />}
                    labelId='domain-select'
                    onChange={handleDomain}
                    inputProps={{ placeholder: t('Select Domain') }}
                  >
                    {(result_domain_list || []).map((domain: any, index: number) => (
                      <MenuItem key={index} value={domain?.id?.toString()}>
                        {domain.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>

              <Grid item sm={12} xs={12}>
                {/* <Typography sx={{ mb: 2, fontWeight: 500 }}>Social Visualization</Typography> */}
                <FormControl fullWidth>
                  <InputLabel id='demo-multiple-name-label'>
                    <Translations text='Platform' />
                  </InputLabel>
                  <Select
                    displayEmpty
                    value={sourceList}
                    multiple
                    label={<Translations text='Platform' />}
                    onChange={handleChangeSource}
                    name='platform'
                    id='demo-multiple-name'
                    labelId='demo-multiple-name-label'
                  >
                    {result_source_list &&
                      result_source_list.map((sns_platform: any) => (
                        <MenuItem key={sns_platform.id} value={sns_platform.name}>
                          {sns_platform.name}
                        </MenuItem>
                      ))}
                  </Select>
                </FormControl>
              </Grid>

              <Grid item sm={12} xs={12}>
                <FormControl fullWidth>
                  <TextField
                    fullWidth
                    type='number'
                    label={<Translations text='Frequency' />}
                    value={frequency}
                    onChange={handleFrequency}
                    placeholder={t('frequencyPlaceHolder')}
                    inputProps={{ min:240 }}
                  />
                  {showErrorFrequency ? <p style={{ color: 'red', fontSize: '14px' }}>{showErrorFrequency}</p> : ''}
                  <p style={{ marginLeft: '10px', color: 'red' ,fontSize: '12px'}}>
                          {' '}
                          <Translations text='Please enter a value of at least 240 minutes' />
                        </p>
                </FormControl>
              </Grid>

              {/* <Grid item sm={12} xs={12}>
                <FormControl fullWidth>
                  <TextField
                    fullWidth
                    type='number'
                    label='Number Of Message Transaction '
                    value={msgTransaction}
                    onChange={handleMsgTransaction}
                    placeholder='Message Transaction'
                  />
                </FormControl>
              </Grid> */}

              <Grid item sm={12} xs={12}>
                <FormControl sx={{ mt: 3, ml: 5 }}>
                  <FormLabel id='demo-row-radio-buttons-group-label'>
                    <Translations text='Campaign Privacy' />
                  </FormLabel>
                  <RadioGroup row aria-labelledby='demo-row-radio-buttons-group-label' name='row-radio-buttons-group'>
                    <FormControlLabel
                      value='private'
                      control={<Radio value='private' checked={selectedValue === 'private'} onChange={handleChange} />}
                      label={<Translations text='Private' />}
                    />
                    <FormControlLabel
                      value='share_organize'
                      control={
                        <Radio
                          value='share_organize'
                          checked={selectedValue === 'share_organize'}
                          onChange={handleChange}
                        />
                      }
                      label={<Translations text='Share to Organize' />}
                    />
                    {resultIsAdmin ? (
                      <FormControlLabel
                        value='share_all'
                        control={
                          <Radio value='share_all' checked={selectedValue === 'share_all'} onChange={handleChange} />
                        }
                        label={<Translations text='Share to All' />}
                      />
                    ) : (
                      ''
                    )}
                  </RadioGroup>
                </FormControl>
              </Grid>
            </Grid>
          </div>

          <div id={`repeat`}>
            <Grid item sm={12}>
              <RepeaterWrapper>
                <Repeater count={keywords.length}>
                  {(i: number) => {
                    return (
                      <KeywordForm
                        key={i}
                        value={keywords[i] ?? null}
                        indexNumber={i}
                        keywords={keywords}
                        setKeywords={setKeywords}
                        removeKeyword={removeKeyword}
                        checkKeyword={checkKeyword}
                        setCheckKeyword={setCheckKeyword}
                        checkKeywordAnd={checkKeywordAnd}
                        setCheckKeywordAnd={setCheckKeywordAnd}
                        checkKeywordOr={checkKeywordOr}
                        setCheckKeywordOr={setCheckKeywordOr}
                        checkKeywordExclude={checkKeywordExclude}
                        setCheckKeywordExclude={setCheckKeywordExclude}
                        keywordCount={keywordCount}
                        setKeywordCount={setKeywordCount}
                        keywordLimit={keywordLimit}
                      />
                    )
                  }}
                </Repeater>

                <Grid container sx={{ mt: 0.25 }}>
                  <Grid item xs={12} sx={{ px: 0 }}>
                    {keywordCount >= keywordLimit ? (
                      ''
                    ) : (
                      <>
                        <Button
                          size='small'
                          variant='contained'
                          startIcon={<Plus fontSize='small' />}
                          onClick={addKeyword}
                        >
                          <Translations text='Add Keyword' />
                        </Button>

                        <p style={{ marginTop: '20px', color: 'red' }}>
                          {' '}
                          <Translations text='Remaining Keyword Limit' /> : {remainingKeywordCount}{' '}
                        </p>
                      </>
                    )}
                  </Grid>
                </Grid>
              </RepeaterWrapper>
              <Grid item xs={12} mt={3}>
                {(checkKeyword || checkKeywordAnd || checkKeywordOr) && (
                  <FormHelperText sx={{ color: 'red', textAlign: 'center', fontSize: '14px' }}>
                    Keywords must be different value.
                  </FormHelperText>
                )}
              </Grid>
            </Grid>

            <Grid container spacing={6} mt={1} style={{ paddingLeft: '1.5rem' }}>
              <Grid item sm={12} xs={12}>
                {/*<TextField*/}
                {/*  fullWidth*/}
                {/*  multiline*/}
                {/*  label='Exclude Campaign'*/}
                {/*  id='textarea-outlined-controlled'*/}
                {/*/>*/}
              </Grid>

              <Grid item sm={6} xs={12}>
                <FormControl fullWidth>
                  <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DatePicker
                      label={<Translations text='Start Date' />}
                      inputFormat='dd/MM/yyyy'
                      value={date}
                      onChange={newValue => setDate(newValue)}
                      renderInput={params => (
                        <TextField
                          {...params}
                          inputProps={{
                            ...params.inputProps,
                            placeholder: t('dd/mm/yyyy')
                          }}
                        />
                      )}
                    />
                  </LocalizationProvider>
                </FormControl>
              </Grid>
              <Grid item sm={6} xs={12}>
                <FormControl fullWidth>
                  <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DatePicker
                      label={<Translations text='End Date' />}
                      value={endDate}
                      inputFormat='dd/MM/yyyy'
                      onChange={newValue => setEndDate(newValue)}
                      renderInput={params => (
                        <TextField
                          {...params}
                          inputProps={{
                            ...params.inputProps,
                            placeholder: t('dd/mm/yyyy')
                          }}
                        />
                      )}
                    />
                  </LocalizationProvider>
                </FormControl>
              </Grid>

              <Grid item sm={6} xs={12} mt={3}>
                <FormControl>
                  <FormControlLabel
                    control={
                      <Switch
                        checked={status}
                        onChange={e => {
                          setStatus(e.target.checked)
                        }}
                      />
                    }
                    label={<Translations text='Campaign Status' />}
                    labelPlacement='start'
                  />
                </FormControl>
              </Grid>
              {action === 'edit' && (
                <Grid item sm={6} xs={12}>
                  <div> {` Last update: ${new Date(current.updated_at).toLocaleString('th')}`} </div>
                </Grid>
              )}

              <Grid item sm={6} xs={12} mt={4}>
                {/*<b>Update Date:</b> {updateDate?.toDateString() + ' ' + updateDate?.toLocaleTimeString()}*/}
              </Grid>
            </Grid>
          </div>
          {/* {showKeywordEmpty ? (
            <div>
              <p style={{ textAlign: 'center', color: 'red', marginTop: '10px' }}> Keyword Name must not be empty! </p>
            </div>
          ) : (
            ''
          )} */}
        </DialogContent>
        <DialogActions sx={{ pb: { xs: 8, sm: 12.5 }, justifyContent: 'center' }}>
          <Button
            variant='contained'
            sx={{ mr: 2 }}
            onClick={() => {
              if (!checkKeyword && !checkKeywordAnd && !checkKeywordOr && !showErrorFrequency) {
                createNewCampaign()
              }
            }}
          >
            <Translations text='SUBMIT' />
          </Button>
          <Button variant='outlined' color='secondary' onClick={closeDialogBox}>
            <Translations text='DISCARD' />
          </Button>
        </DialogActions>
      </Dialog>
    </Card>
  )
}

export default DialogCampaign
