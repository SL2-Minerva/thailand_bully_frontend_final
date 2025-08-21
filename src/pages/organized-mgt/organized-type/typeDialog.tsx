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

// ** Icons Imports
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

interface FormData {
  description: string
  status: boolean
  type: string
  id?: number
}

const DialogOrganizationType = (props: DialogInfoProps) => {
  const { show, setShow, action, current } = props

  const {t} = useTranslation();

  const schema = yup.object().shape({
    description: yup.string().required(),
    type: yup.string().required()
  })

  // const [type, setType] = useState(current?.organization_type_name || '')
  // const [description, setDescription] = useState(current?.organization_type_description || '')
  // const [status, setStatus] = useState(current?.status === 1 ? true : false || '')

  // console.log('status', status, description, type)

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
    setValue('description', current?.organization_type_description || '')
    setValue('type', current?.organization_type_name || '')
    setValue('status', current?.status === 1 ? true : false)
    if (action === 'edit') {
      setValue('id', current?.id)
    }
  }, [current])

  useEffect(() => {
    errors.type = false
    errors.description = false
  })

  const onSubmit = (data: FormData) => {
    if (action === 'create') {
      axios
        .post(authConfig.createOrgType, data, {
          headers: {
            Authorization: `Bearer ${window.localStorage.getItem(authConfig.storageTokenKeyName)!}`
          }
        })
        .then(() => {
          setShow(false)
        })
    } else {
      axios
        .put(authConfig.updateOrgType, data, {
          headers: {
            Authorization: `Bearer ${window.localStorage.getItem(authConfig.storageTokenKeyName)!}`
          }
        })
        .then(() => {
          // console.log('res', res);
          setShow(false)
        })
    }
  }

  // if (current) {
  //   setValue('description', current?.organization_type_description)
  // }

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
          {action !== 'create' && (
            <Controller
              name='id'
              control={control}
              render={({ field: { value } }) => <TextField type='hidden' name='id' value={value} />}
            />
          )}
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
                  <Translations text='Edit Organization Type' />
                ) : (
                  <Translations text='Create Organization Type' />
                )}
              </Typography>
            </Box>

            <Grid container spacing={6}>
              <Grid item sm={12} xs={12}>
                <FormControl fullWidth sx={{ mb: 4 }}>
                  <Controller
                    name='type'
                    control={control}
                    render={({ field: { value, onChange, onBlur } }) => (
                      <TextField
                        autoFocus
                        value={value}
                        onBlur={onBlur}
                        label={<Translations text='Organization Type' />}
                        onChange={onChange}
                        placeholder={t('Organization Type')}
                        error={errors?.type ? true : false}
                      />
                    )}
                  />
                  {errors.type && <FormHelperText sx={{ color: 'error.main' }}>{errors.type.message}</FormHelperText>}
                </FormControl>
              </Grid>
              <Grid item sm={12} xs={12}>
                <FormControl fullWidth sx={{ mb: 4 }}>
                  <Controller
                    name='description'
                    control={control}
                    render={({ field: { value, onChange, onBlur } }) => (
                      <TextField
                        autoFocus
                        fullWidth
                        multiline
                        rows={3}
                        value={value}
                        onBlur={onBlur}
                        label={<Translations text='Description' />}
                        onChange={onChange}
                        placeholder={t('Description')}
                        error={errors.description ? true : false}
                      />
                    )}
                  />
                  {errors.description && (
                    <FormHelperText sx={{ color: 'error.main' }}>{errors.description.message}</FormHelperText>
                  )}
                </FormControl>
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
        </form>
      </Dialog>
    </Card>
  )
}

export default DialogOrganizationType
