// ** React Imports
import { Ref, forwardRef, ReactElement, useEffect, useState } from 'react'

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
import Fade, { FadeProps } from '@mui/material/Fade'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import FormControlLabel from '@mui/material/FormControlLabel'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import InputLabel from '@mui/material/InputLabel'
import FormControl from '@mui/material/FormControl'

// ** Icons Imports
import Close from 'mdi-material-ui/Close'
import { Controller, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import FormHelperText from '@mui/material/FormHelperText'
import axios from 'axios'
import authConfig from '../../../configs/auth'
import AdapterDateFns from '@mui/lab/AdapterDateFns'
import LocalizationProvider from '@mui/lab/LocalizationProvider'
import DatePicker from '@mui/lab/DatePicker'
import moment from 'moment'
import Translations from 'src/layouts/components/Translations'
import { useTranslation } from 'react-i18next'

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
  id?: number
  table: any
  current?: any
  types?: any
  groups?: any
}

const DialogOrganization = (props: DialogInfoProps) => {
  const { show, setShow, action, current, types, groups } = props
  const [date, setDate] = useState<Date | null>(null)

  const { t } = useTranslation()

  const schema = yup.object().shape({
    name: yup.string().required(),
    organization_group_id: yup.string().required(),
    organization_type_id: yup.string().required()
  })

  interface FormData {
    description: string
    status: boolean
    name: string
    id?: number
    organization_type_id: string
    organization_group_id: string
  }

  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors }
  } = useForm({
    shouldUnregister: false,
    mode: 'onBlur',
    resolver: yupResolver(schema)
  })

  useEffect(() => {
    setValue('description', current?.description || '')
    setValue('name', current?.name || '')
    setValue('status', current?.status === 1 ? true : false)
    setValue('organization_type_id', current?.organization_type_id || '')
    setValue('organization_group_id', current?.organization_group_id || '')

    setValue('transaction_limit', current?.transaction_limit || 0)
    setValue('transaction_reamining', current?.transaction_reamining || 0)
    setValue('transaction_start_at', current?.transaction_start_at || null)
    setDate(current?.transaction_start_at || null)

    if (action === 'edit') {
      setValue('id', current?.id)
    }
  }, [current])

  const onSubmit = (data: FormData) => {
    if (action === 'create') {
      axios
        .post(authConfig.createOrganization, data, {
          headers: {
            Authorization: `Bearer ${window.localStorage.getItem(authConfig.storageTokenKeyName)!}`
          }
        })
        .then(() => {
          // console.log('res', res)
          setShow(false)
        })
    } else {
      axios
        .put(authConfig.updateOrganization, data, {
          headers: {
            Authorization: `Bearer ${window.localStorage.getItem(authConfig.storageTokenKeyName)!}`
          }
        })
        .then(() => {
          // console.log('res', res)
          setShow(false)
        })
    }
  }

  return (
    <Card>
      <Dialog
        fullWidth
        open={show}
        maxWidth='md'
        scroll='body'
        onClose={() => setShow(false)}
        TransitionComponent={Transition}
        onBackdropClick={() => setShow(false)}
      >
        <form autoComplete='off' onSubmit={handleSubmit(onSubmit)}>
          <DialogContent sx={{ pb: 6, px: { xs: 8, sm: 15 }, pt: { xs: 8, sm: 12.5 }, position: 'relative' }}>
            <IconButton
              size='small'
              onClick={() => setShow(false)}
              sx={{ position: 'absolute', right: '1rem', top: '1rem' }}
            >
              <Close />
            </IconButton>
            <Box sx={{ mb: 8, textAlign: 'center' }}>
              <Typography variant='h5' sx={{ mb: 3, lineHeight: '2rem' }}>
                {action === 'edit' ? (
                  <Translations text='Edit Organization' />
                ) : (
                  <Translations text='Create Organization' />
                )}
              </Typography>
            </Box>
            <Grid container spacing={6}>
              <Grid item sm={12} xs={12}>
                <FormControl fullWidth sx={{ mb: 4 }}>
                  <Controller
                    name='name'
                    control={control}
                    render={({ field: { value, onChange, onBlur } }) => (
                      <TextField
                        fullWidth
                        value={value}
                        onBlur={onBlur}
                        label={<Translations text='Organization' />}
                        onChange={onChange}
                        placeholder={t('Organization')}
                        error={errors?.name ? true : false}
                      />
                    )}
                  />
                  {errors.name && <FormHelperText sx={{ color: 'error.main' }}>{errors.name.message}</FormHelperText>}
                </FormControl>
              </Grid>
              <Grid item sm={12} xs={12}>
                <FormControl fullWidth sx={{ mb: 4 }}>
                  <Controller
                    name='description'
                    control={control}
                    render={({ field: { value, onChange } }) => (
                      <TextField
                        fullWidth
                        multiline
                        rows={3}
                        value={value}
                        label={<Translations text='Description' />}
                        onChange={onChange}
                        placeholder={t('Description')}
                        error={errors?.description ? true : false}
                      />
                    )}
                  />
                  {errors.description && (
                    <FormHelperText sx={{ color: 'error.main' }}>{errors.description.message}</FormHelperText>
                  )}
                </FormControl>
              </Grid>

              <Grid item sm={6} xs={12}>
                <FormControl fullWidth>
                  <InputLabel id='plan-select'>
                    <Translations text='Organization Group' />
                  </InputLabel>
                  <Controller
                    name='organization_group_id'
                    control={control}
                    render={({ field: { value, onChange } }) => (
                      <Select
                        displayEmpty
                        value={value}
                        label={<Translations text='Organization Group' />}
                        onChange={onChange}
                        id='demo-multiple-name'
                        labelId='demo-multiple-name-label'
                        error={errors?.organization_group_id ? true : false}
                      >
                        {groups &&
                          groups.map((item: any, index: number) => {
                            return (
                              <MenuItem key={index} value={item.id}>
                                {item.organization_group_name}
                              </MenuItem>
                            )
                          })}
                      </Select>
                    )}
                  />
                </FormControl>
              </Grid>

              <Grid item sm={6} xs={12}>
                <FormControl fullWidth>
                  <InputLabel id='plan-select'>
                    <Translations text='Organization Type' />
                  </InputLabel>
                  <Controller
                    name='organization_type_id'
                    control={control}
                    render={({ field: { value, onChange } }) => (
                      <Select
                        displayEmpty
                        value={value}
                        label={<Translations text='Organization Type' />}
                        onChange={onChange}
                        id='demo-multiple-name'
                        labelId='demo-multiple-name-label'
                        error={errors?.organization_type_id ? true : false}
                      >
                        {types &&
                          types.map((item: any, index: number) => {
                            return (
                              <MenuItem key={index} value={item.id}>
                                {item.organization_type_name}
                              </MenuItem>
                            )
                          })}
                      </Select>
                    )}
                  />
                </FormControl>
              </Grid>

              {action === 'edit' ? (
                <>
                  <Grid item sm={6} xs={12}>
                    <Controller
                      name='transaction_limit'
                      control={control}
                      render={({ field: { value, onChange } }) => (
                        <TextField
                          value={value}
                          InputProps={{
                            readOnly: true
                          }}
                          label={<Translations text='Number of Message Transaction' />}
                          type='number'
                          fullWidth
                          onChange={onChange}
                          placeholder={t('Number of Message Transaction')}
                          error={errors?.transaction_limit ? true : false}
                        />
                      )}
                    />
                    {errors.transaction_limit && (
                      <FormHelperText sx={{ color: 'error.main' }}>{errors.transaction_limit.message}</FormHelperText>
                    )}
                  </Grid>
                  <Grid item sm={6} xs={12}>
                    <Controller
                      name='transaction_reamining'
                      control={control}
                      render={({ field: { value, onChange } }) => (
                        <TextField
                          value={value}
                          label={<Translations text='Number of Transaction Remaining' />}
                          type='number'
                          fullWidth
                          onChange={onChange}
                          placeholder={t('Number of Message Transaction')}
                          error={errors?.transaction_reamining ? true : false}
                        />
                      )}
                    />
                    {errors.transaction_reamining && (
                      <FormHelperText sx={{ color: 'error.main' }}>
                        {errors.transaction_reamining.message}
                      </FormHelperText>
                    )}
                  </Grid>

                  <Grid item sm={6} xs={12}>
                    <FormControl fullWidth>
                      <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <DatePicker
                          views={['year', 'month', 'day']}
                          inputFormat='yyyy-MM-dd'
                          label={<Translations text='Transaction Start At' />}
                          value={date}
                          onChange={newValue => {
                            setDate(newValue)
                            setValue('transaction_start_at', moment(newValue).format('YYYY-MM-DD'))
                          }}
                          renderInput={params => <TextField {...params} />}
                        />
                      </LocalizationProvider>
                    </FormControl>
                  </Grid>
                </>
              ) : (
                ''
              )}

              <Grid item sm={6} xs={12}>
                <FormControl>
                  <Controller
                    name='status'
                    control={control}
                    render={({ field: { value, onChange } }) => (
                      <FormControlLabel
                        name={'status'}
                        control={<Switch checked={value} onChange={onChange} />}
                        label={<Translations text='Status' />}
                        labelPlacement='start'
                        sx={{ mt: 2 }}
                      />
                    )}
                  />
                </FormControl>
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions sx={{ pb: { xs: 8, sm: 12.5 }, justifyContent: 'center' }}>
            <Button variant='contained' sx={{ mr: 2 }} onClick={handleSubmit(onSubmit)}>
              <Translations text='SUBMIT' />
            </Button>
            <Button variant='outlined' color='secondary' onClick={() => setShow(false)}>
              <Translations text='DISCARD' />
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </Card>
  )
}

export default DialogOrganization
