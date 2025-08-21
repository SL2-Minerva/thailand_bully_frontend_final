// ** React Imports
import { Ref, forwardRef, ReactElement, useEffect } from 'react'

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
import Close from 'mdi-material-ui/Close'
import { Controller, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import FormHelperText from '@mui/material/FormHelperText'
import axios from 'axios'
import authConfig from '../../../configs/auth'
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
  current?: any
  table: any
}

const DialogDomain = (props: DialogInfoProps) => {
  const { show, setShow, action, current } = props
  const schema = yup.object().shape({
    name: yup.string().required()
  })

  interface FormData {
    description: string
    status: boolean
    name: string
    id?: number
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
    setValue('description', current?.description)
    setValue('name', current?.name)
    setValue('status', current?.status === 1 ? true : false)
    if (action === 'edit') {
      setValue('id', current?.id)
    }
  }, [current])

  const onSubmit = (data: FormData) => {
    if (action === 'create') {
      axios
        .post(authConfig.createDomain, data, {
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
        .put(authConfig.updateDomain, data, {
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

  const {t} = useTranslation();

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
              {action === 'edit' ? <Translations text='Edit Domain Information' /> : <Translations text='Create Domain Information' />}
            </Typography>
          </Box>
          <Grid container spacing={6}>
            <Grid item sm={12} xs={12}>
              <FormControl fullWidth sx={{ mb: 4 }}>
                <Controller
                  name='name'
                  control={control}
                  render={({ field: { value, onChange } }) => (
                    <TextField
                      autoFocus
                      value={value}
                      label={<Translations text='Domain Name' />}
                      onChange={onChange}
                      fullWidth
                      error={errors?.name ? true : false}
                    />
                  )}
                />
                {errors.name && <FormHelperText sx={{ color: 'error.name' }}>{errors.name.message}</FormHelperText>}
              </FormControl>
            </Grid>
            <Grid item sm={12} xs={12}>
              <Controller
                name='description'
                control={control}
                render={({ field: { value, onChange, onBlur } }) => (
                  <TextField
                    fullWidth
                    multiline
                    rows={3}
                    autoFocus
                    value={value}
                    onBlur={onBlur}
                    label= {<Translations text='Description' />}
                    onChange={onChange}
                    placeholder={t('Description')}
                    error={errors?.description ? true : false}
                  />
                )}
              />
              {errors.description && (
                <FormHelperText sx={{ color: 'error.description' }}>{errors.description.message}</FormHelperText>
              )}
            </Grid>

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
      </Dialog>
    </Card>
  )
}

export default DialogDomain
