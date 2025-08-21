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
import { useDropzone } from 'react-dropzone'
import { HeadingTypography, Img } from 'src/pages/content/content-mgt/DialogContents'
import Translations from 'src/layouts/components/Translations'
import { useTranslation } from 'react-i18next'

// import { Color, ColorPicker } from 'material-ui-color'

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

interface FileProp {
  name: string
  type: string
  size: number
}

const DialogSource = (props: DialogInfoProps) => {
  const { show, setShow, action, current } = props

  const schema = yup.object().shape({
    name: yup.string().required()
  })

  interface FormData {
    description: string
    status: boolean
    name: string
    id?: number
    image?: File
  }

  const [files, setFiles] = useState<File[]>([])
  const [imagePath, setImagePath] = useState('')

  // const [selectedColor, setSelectedColor] = useState<string>('#A5C1E5')

  // ** Hook
  const { acceptedFiles, getRootProps, getInputProps } = useDropzone({
    multiple: false,
    accept: {
      'image/*': ['.png', '.jpg', '.jpeg', '.gif']
    },
    onDrop: (acceptedFiles: File[]) => {
      setFiles(acceptedFiles.map((file: File) => Object.assign(file)))
    }
  })

  // const handleLinkClick = (event: SyntheticEvent) => {
  //   event.preventDefault()
  // }

  // function handleChangeColor(event: any) {
  //   const hexColor = '#' + event.hex
  //   setSelectedColor(hexColor)
  // }

  const handleRemoveFile = (file: FileProp) => {
    const uploadedFiles = files
    const filtered = uploadedFiles.filter((i: FileProp) => i.name !== file.name)
    setFiles([...filtered])
  }

  const img = files.map((file: FileProp) => (
    <div key={file.name} style={{ display: 'flex', justifyContent: 'center' }}>
      <img key={file.name} alt={file.name} style={{ width: 400, height: 300 }} src={URL.createObjectURL(file as any)} />
      <IconButton onClick={() => handleRemoveFile(file)} size='small'>
        <Close fontSize='large' />
      </IconButton>
    </div>
  ))

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
    setImagePath('')
    if (action === 'edit') {
      setValue('id', current?.id)
      setImagePath(current?.image)

      // setSelectedColor(current?.color)
    }
  }, [current])

  const onSubmit = (data: FormData) => {
    if (action === 'create') {
      const formData = new FormData()
      if (files.length > 0) {
        data.image = files[0]
        formData.append('image', data.image)
      }
      formData.append('description', data.description)
      formData.append('name', data.name)
      formData.append('status', data.status?.toString() === 'true' ? '1' : '0')

      // formData.append('color', selectedColor)

      axios
        .post(authConfig.createSource, formData, {
          headers: {
            Authorization: `Bearer ${window.localStorage.getItem(authConfig.storageTokenKeyName)!}`,
            'Content-Type': 'multipart/form-data'
          }
        })
        .then(() => {
          // console.log('res', res);
          onClose()
        })
    } else {
      const formData = new FormData()
      if (files.length > 0) {
        data.image = files[0]
        formData.append('image', data.image)
      }
      if (data.id) {
        formData.append('id', data.id.toString())
      }
      formData.append('description', data.description)
      formData.append('name', data.name)
      formData.append('status', data.status?.toString() === 'true' ? '1' : '0')

      // formData.append('color', selectedColor)

      axios
        .post(authConfig.updateSource, formData, {
          headers: {
            Authorization: `Bearer ${window.localStorage.getItem(authConfig.storageTokenKeyName)!}`,
            'Content-Type': 'multipart/form-data'
          }
        })
        .then(() => {
          // console.log('res', res);

          onClose()
        })
    }
  }

  const onClose = () => {
    setFiles([])
    acceptedFiles.length = 0
    setShow(false)

    // setSelectedColor('')
  }
  const { t } = useTranslation()

  return (
    <Card>
      <Dialog
        fullWidth
        open={show}
        maxWidth='md'
        scroll='body'
        onClose={onClose}
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
              {action === 'edit' ? (
                <Translations text='Edit Source Information' />
              ) : (
                <Translations text='Create Source Information' />
              )}
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
                      label={<Translations text='Source' />}
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
              <FormControl fullWidth sx={{ mb: 4 }}>
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
                      label={<Translations text='Description' />}
                      onChange={onChange}
                      placeholder={t('Description')}
                      error={errors?.description ? true : false}
                    />
                  )}
                />
                {errors.description && (
                  <FormHelperText sx={{ color: 'error.description' }}>{errors.description.message}</FormHelperText>
                )}
              </FormControl>
            </Grid>

            <Grid
              item
              sm={12}
              xs={12}
              mt={5}
              style={{ border: '1px solid #4c4e6430', borderRadius: '1rem', marginLeft: '1.2rem' }}
            >
              <Box {...getRootProps({ className: 'dropzone' })} sx={acceptedFiles.length ? { height: 320 } : {}}>
                <input name='image' {...getInputProps()} />
                {files.length ? (
                  img
                ) : (
                  <Box sx={{ display: 'flex', flexDirection: ['column', 'column', 'row'], alignItems: 'center' }}>
                    {imagePath ? (
                      <Img width={200} alt='image' src={'https://cornea-analysis.com/storage/images/' + imagePath} />
                    ) : (
                      <Img width={200} alt='Upload img' src='/images/misc/upload.png' />
                    )}

                    <Box sx={{ display: 'flex', flexDirection: 'column', textAlign: ['center', 'center', 'inherit'] }}>
                      <HeadingTypography variant='h5'>
                        <Translations text='DropImageHeader' />
                      </HeadingTypography>
                      <Typography color='textSecondary' sx={{ mb: 4 }}>
                        <Translations text='DropImage' />
                      </Typography>
                    </Box>
                  </Box>
                )}
              </Box>
            </Grid>

            <Grid item sm={3} xs={12}>
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

            <Grid item sm={3} xs={12}>
              {/* <FormControl>
                <ColorPicker
                  value={selectedColor}
                  onChange={(color: Color) => {
                    handleChangeColor(color)
                  }}
                />
              </FormControl> */}
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions sx={{ pb: { xs: 8, sm: 12.5 }, justifyContent: 'center' }}>
          <Button variant='contained' sx={{ mr: 2 }} onClick={handleSubmit(onSubmit)}>
            <Translations text='SUBMIT' />
          </Button>
          <Button variant='outlined' color='secondary' onClick={onClose}>
            <Translations text='DISCARD' />
          </Button>
        </DialogActions>
      </Dialog>
    </Card>
  )
}

export default DialogSource
