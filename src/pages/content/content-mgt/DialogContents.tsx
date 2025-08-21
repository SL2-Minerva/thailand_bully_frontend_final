import React, { Ref, useState, forwardRef, ReactElement, useEffect, useCallback} from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Typography, { TypographyProps } from '@mui/material/Typography'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import Switch from '@mui/material/Switch'
import Dialog from '@mui/material/Dialog'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import IconButton from '@mui/material/IconButton'
import FormControl from '@mui/material/FormControl'
import Fade, { FadeProps } from '@mui/material/Fade'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import FormControlLabel from '@mui/material/FormControlLabel'
import InputLabel from '@mui/material/InputLabel'
import { styled } from '@mui/material/styles'
import LocalizationProvider from '@mui/lab/LocalizationProvider'
import AdapterDateFns from '@mui/lab/AdapterDateFns'
import DatePicker from '@mui/lab/DatePicker'

// ** CKEditor
// import { CKEditor } from '@ckeditor/ckeditor5-react' //can not use in sever linux
// import ClassicEditor from '@ckeditor/ckeditor5-build-classic'  //can not use in sever linux
import CKEditorClient from 'src/views/components/dialogs/CKEditorClient'// ** CKEditor Client Component

// ** Styles
import 'react-quill/dist/quill.snow.css'

// ** Third Party Imports
import { useDropzone } from 'react-dropzone'

// ** Icons Imports
import Close from 'mdi-material-ui/Close'
import { ContentList } from 'src/types/content/ContentType'
import { CreateContent, UpdateContent } from 'src/services/api/content/ContentAPI'
import { MenuItem, Select, SelectChangeEvent } from '@mui/material'
import Translations from 'src/layouts/components/Translations'
import { useTranslation } from 'react-i18next'

const Transition = forwardRef(function Transition(
  props: FadeProps & { children?: ReactElement<any, any> },
  ref: Ref<unknown>
) {
  return <Fade ref={ref} {...props} />
})

interface FileProp {
  name: string
  type: string
  size: number
}

// Styled component for the upload image inside the dropzone area
export const Img = styled('img')(({ theme }) => ({
  [theme.breakpoints.up('md')]: {
    marginRight: theme.spacing(10)
  },
  [theme.breakpoints.down('md')]: {
    marginBottom: theme.spacing(4)
  },
  [theme.breakpoints.down('sm')]: {
    width: 250
  }
}))

// Styled component for the heading inside the dropzone area
export const HeadingTypography = styled(Typography)<TypographyProps>(({ theme }) => ({
  marginBottom: theme.spacing(5),
  [theme.breakpoints.down('sm')]: {
    marginBottom: theme.spacing(4)
  }
}))

interface DialogInfoProps {
  show: boolean
  setShow: any
  action: string
  current?: ContentList
  table?: any
}

// ฟังก์ชันสำหรับตรวจสอบว่าเป็น HTML หรือไม่
// const isHTML = (str: string): boolean => {
// const doc = new DOMParser().parseFromString(str, 'text/html');
// return Array.from(doc.body.childNodes).some(node => node.nodeType === 1);
// };

// ฟังก์ชันสำหรับตรวจสอบว่าต้องการ encode HTML หรือไม่
// const shouldEncodeHTML = (str: string): boolean => {
//   return str.includes('<') && str.includes('>') && !str.includes('&lt;') && !str.includes('&gt;');
// };

const DialogContents = (props: DialogInfoProps) => {
  const { show, setShow, action, current } = props
  const {t} = useTranslation();

  const [date, setDate] = useState<Date | null>(new Date())
  const [description, setDescription] = useState('')
  const [topic, setTopic] = useState('')
  const [imagePath, setImagePath] = useState('')
  const [contentId, setContentId] = useState('')
  const [status, setStatus] = useState<number>(0)
  const [id, setId] = useState<number | null>(null)
  const [showErrorMessage, setShowErrorMessage] = useState<boolean>(false)
  const [errorMessage, setErrorMessage] = useState<any>('')

  // ** State
  const [files, setFiles] = useState<File[]>([])

  const { fileUpload } = CreateContent()
  const { updateContentData } = UpdateContent()

  // ตรวจสอบว่าสามารถอัปโหลดรูปได้หรือไม่ (เฉพาะ News และ Announcement)
  const canUploadImage = contentId === '1' || contentId === '2';

  // ** Hook
  const { acceptedFiles, getRootProps, getInputProps } = useDropzone({
    multiple: false,
    accept: {
      'image/*': ['.png', '.jpg', '.jpeg']
    },
    onDrop: (acceptedFiles: File[]) => {
      // อนุญาตให้อัปโหลดเฉพาะเมื่อเป็น News หรือ Announcement
      if (canUploadImage) {
        setFiles(acceptedFiles.map((file: File) => Object.assign(file)))
      }
    },
    disabled: !canUploadImage
  })

  const handleRemoveFile = (file: FileProp) => {
    const uploadedFiles = files
    const filtered = uploadedFiles.filter((i: FileProp) => i.name !== file.name)
    setFiles([...filtered])
  }

  const handleContent = useCallback((e: SelectChangeEvent) => {
    const newContentId = e.target.value;
    setContentId(newContentId);
    
    // ถ้าเปลี่ยนเป็น FAQ ให้ลบรูปภาพออก
    if (newContentId === '3') {
      setFiles([]);
      setImagePath('');
    }
  }, [])

  const img = files.map((file: FileProp) => (
    <div key={file.name} style={{ display: 'flex', justifyContent: 'center' }}>
      <img key={file.name} alt={file.name} style={{ width: 246, height: 246 }} src={URL.createObjectURL(file as any)} />
      <IconButton onClick={() => handleRemoveFile(file)} size='small'>
        <Close fontSize='large' />
      </IconButton>
    </div>
  ))

  function closeDialogBox() {
    setShow(false)
    setFiles([])
    setDescription('')
    acceptedFiles.length = 0
  }

  // แปลงค่า HTML escape characters กลับเป็น HTML ปกติ (ใช้ในกรณีที่ HTML ถูก escape ไว้)
  const decodeHtmlEntities = (text: string): string => {
    const textArea = document.createElement('textarea');
    textArea.innerHTML = text;
    
    return textArea.value;
  };

  // แปลง HTML string จากการตรวจสอบว่าเป็น HTML ที่ถูก encode หรือไม่
  const prepareHtmlContent = (content: string): string => {

    // ถ้าเป็น HTML ที่ถูกแสดงเป็น tags ให้แปลงกลับเป็น HTML ปกติ
    if (content.includes('&lt;') && content.includes('&gt;')) {
      return decodeHtmlEntities(content);
    }

    // หากเป็น HTML ปกติ ให้คืนค่าเดิม
    return content;
  };

  const submitData = () => {
    // ปรับแต่งข้อมูลก่อนส่งไป API
    const inputData = {
      title: topic,            // ข้อมูลจาก CKEditor เป็น HTML แล้ว
      content_text: description, // ข้อมูลจาก CKEditor เป็น HTML แล้ว
      date: date,
      content_id: contentId ? contentId : '',
      status: status,
      id: id
    }

    console.log('Submitting data:', inputData);  // ตรวจสอบข้อมูลที่ส่ง

    if (id) {
      updateContentData({ file: files[0] }, inputData)
        .then(() => {
          setShow(false)
          setFiles([])
          setDescription('')
          acceptedFiles.length = 0
          setShowErrorMessage(false)
        })
        .catch(ex => {
          setErrorMessage('something went wrong!')
          console.log('user import error!', ex)
          setShowErrorMessage(true)
        })
    } else {
      fileUpload({ file: files[0] }, inputData)
        .then(() => {
          setShow(false)
          setFiles([])
          setDescription('')
          acceptedFiles.length = 0
          setShowErrorMessage(false)
        })
        .catch(ex => {
          setErrorMessage('something went wrong!')
          console.log('user import error!', ex)
          setShowErrorMessage(true)
        })
    }
  }

  const handleChangeStatus = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log('status', event.target.checked)
    setStatus(event.target.checked ? 1 : 0)
  }

  useEffect(() => {
    if (action === 'edit') {
      if (current) {
        // ตรวจสอบและแปลงค่า HTML ก่อนนำมาแสดงใน CKEditor
        const processedContent = prepareHtmlContent(current.content_text);
        const processedTitle = prepareHtmlContent(current.title);
        
        setDescription(processedContent)
        setDate(current.date ? new Date(current.date) : new Date())
        setTopic(processedTitle)
        setImagePath(current.picture)
        setContentId(current.content_id)
        setStatus(current.status)
        setShowErrorMessage(false)
        setId(current.id)
        
        console.log('Loading content for editing:', { 
          originalTitle: current.title,
          processedTitle: processedTitle,
          originalContent: current.content_text,
          processedContent: processedContent
        });
      }
    } else {
      setDescription('')
      setTopic('')
      setDate(new Date())
      setImagePath('')
      setContentId('')
      setStatus(0)
      setShowErrorMessage(false)
      setId(null)
    }
  }, [current, action])

  return (
    <Card>
      <Dialog
        fullWidth
        open={show}
        maxWidth='md'
        scroll='body'
        onClose={closeDialogBox}
        TransitionComponent={Transition}
      >
        <DialogContent sx={{ pb: 6, px: { xs: 8, sm: 15 }, pt: { xs: 8, sm: 12.5 }, position: 'relative' }}>
          <IconButton size='small' onClick={closeDialogBox} sx={{ position: 'absolute', right: '1rem', top: '1rem' }}>
            <Close />
          </IconButton>
          <Box sx={{ mb: 8, textAlign: 'center' }}>
            <Typography variant='h5' sx={{ mb: 3, lineHeight: '2rem' }}>
              {action === 'edit' ? <Translations text='Edit Content Information'/> : <Translations text="Create Content Information"/>}
            </Typography>
          </Box>
          <div id={`content-master`}>
            <Grid container spacing={6}>
              <Grid item sm={12} xs={12}>
                <FormControl fullWidth>
                  <InputLabel id='plan-select'>
                    <Translations text='Content' />
                  </InputLabel>
                  <Select
                    fullWidth
                    value={contentId}
                    id='select-content'
                    label='Select content'
                    labelId='content-select'
                    onChange={handleContent}
                    inputProps={{ placeholder: 'Select content' }}
                  >
                    <MenuItem value='1'>
                      <Translations text='News' />
                    </MenuItem>
                    <MenuItem value='2'>
                      <Translations text='Announcement' />
                    </MenuItem>
                    <MenuItem value='3'>
                      <Translations text='FAQ' />
                    </MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              
              <Grid item sm={12} xs={12}>
                <FormControl fullWidth>
                  <InputLabel style={{ marginBottom: '10px', position: 'relative', transform: 'none', fontSize: '14px'}}>
                    <Translations text='Topic' /> <b style={{ color: 'red' }}>*</b>
                  </InputLabel>

                  {/* CKEditor สำหรับ Topic */}
                  <Box sx={{ mt: 2 }}>
                    <CKEditorClient
                      data={topic}
                      onChange={setTopic}
                      toolbar={['heading', '|', 'bold', 'italic', 'link', 'bulletedList', 'numberedList', '|', 'undo', 'redo']}
                      placeholder='กรุณาป้อนหัวข้อ...'
                    />
                  </Box>
                </FormControl>
              </Grid>

              <Grid item sm={12} xs={12}>
                <FormControl fullWidth>
                  <InputLabel style={{marginBottom: '10px', position: 'relative', transform: 'none', fontSize: '14px' }}>
                    <Translations text='Content Details' />
                  </InputLabel>

                  {/* CKEditor สำหรับรายละเอียดเนื้อหา */}
                  <Box sx={{ mt: 2 }}>
                    <CKEditorClient
                      data={description}
                      onChange={setDescription}
                      placeholder='กรุณาป้อนรายละเอียดเนื้อหา...'
                    />
                  </Box>
                </FormControl>
              </Grid>

              {/* Image Upload Section - แสดงเฉพาะเมื่อเป็น News หรือ Announcement */}
              {canUploadImage && (
                <Grid
                  item
                  sm={12}
                  xs={12}
                  mt={5}
                  pb={3}
                  style={{ border: '1px solid #4c4e6430', borderRadius: '1rem', marginLeft: '1.2rem' }}
                >
                  <Box {...getRootProps({ className: 'dropzone' })} sx={acceptedFiles.length ? { height: 320 } : {}}>
                    <input {...getInputProps()} />
                    {files.length ? (
                      img
                    ) : (
                      <Box sx={{ display: 'flex', flexDirection: ['column', 'column', 'row'], alignItems: 'center' }}>
                        {imagePath ? (
                          <Img width={200} alt='image' src={'https://api.cornea-demo.com/storage/' + imagePath} />
                        ) : (
                          <Img width={200} alt='Upload img' src='/images/misc/upload.png' />
                        )}

                        <Box
                          sx={{ display: 'flex', flexDirection: 'column', textAlign: ['center', 'center', 'inherit'] }}
                        >
                          <HeadingTypography variant='h5'>
                            <Translations text='DropImageHeader' />
                          </HeadingTypography>
                          <Typography color='textSecondary' sx={{ mb: 4 }}>
                            <Translations text='DropImage' />
                          </Typography>

                          <Typography color='textSecondary'>
                            <Translations text='imageSizeText' />
                          </Typography>
                        </Box>
                      </Box>
                    )}
                  </Box>
                </Grid>
              )}

              {/* ข้อความแจ้งเตือนสำหรับ FAQ */}
              {contentId === '3' && (
                <Grid item sm={12} xs={12}>
                  <Box sx={{ 
                    p: 2, 
                    bgcolor: '#f5f5f5', 
                    borderRadius: 1, 
                    border: '1px solid #e0e0e0',
                    textAlign: 'center'
                  }}>
                    <Typography color='textSecondary' variant='body2'>
                      การอัปโหลดรูปภาพไม่สามารถใช้ได้สำหรับ FAQ
                    </Typography>
                  </Box>
                </Grid>
              )}

              <Grid item sm={6} xs={12} mt={3}>
                <FormControl>
                  <FormControlLabel
                    control={<Switch checked={status == 1 ? true : false} onChange={handleChangeStatus} />}
                    label={<Translations text='Content Status' />}
                    labelPlacement='start'
                  />
                </FormControl>
              </Grid>

              <Grid item sm={6} xs={12}>
                <FormControl fullWidth>
                  <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DatePicker
                      label={<Translations text='DATE' />}
                      value={date}
                      onChange={newValue => setDate(newValue)}
                      renderInput={params => <TextField {...params} inputProps={{
                        ...params.inputProps,
                        placeholder: t('dd-mm-yyyy')
                      }} />}
                      inputFormat='dd-MM-yyyy'
                    />
                  </LocalizationProvider>
                </FormControl>
              </Grid>
            </Grid>
          </div>

          <div>
            {showErrorMessage ? (
              <Typography
                variant='body1'
                sx={{ mt: 5, mb: 3, lineHeight: '2rem', display: 'flex', justifyContent: 'center', color: 'red' }}
              >
                {errorMessage}
              </Typography>
            ) : (
              <></>
            )}
          </div>
        </DialogContent>
        <DialogActions sx={{ pb: { xs: 8, sm: 12.5 }, justifyContent: 'center' }}>
          <Button variant='contained' sx={{ mr: 2 }} onClick={submitData}>
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

export default DialogContents