// import {
//   Grid,
//   Card,
//   CardHeader,
//   CardContent,
//   FormControl,
//   TextField,
//   InputLabel,
//   Select,
//   MenuItem,
//   SelectChangeEvent,
//   Box,
//   Button,
//   TableContainer,
//   Paper,
//   Table,
//   TableHead,
//   TableRow,
//   TableCell,
//   TableBody,
//   Pagination
// } from '@mui/material'
// import React, { useCallback, useEffect, useState } from 'react'
// import LocalizationProvider from '@mui/lab/LocalizationProvider'
// import DatePicker from '@mui/lab/DatePicker'
// import AdapterDateFns from '@mui/lab/AdapterDateFns'
// import Switch from '@mui/material/Switch'
// import { ContentDelete, ContentLists } from 'src/services/api/content/ContentAPI'
// import DialogContents from './DialogContents'
// import { PencilOutline, TrashCanOutline } from 'mdi-material-ui'
// import { ContentList } from 'src/types/content/ContentType'
// import axios from 'axios'
// import authConfig from '../../../configs/auth'
// import { useRouter } from 'next/router'
// import moment from 'moment'
// import { UserPermission } from 'src/services/api/users/role'
// import Swal from 'sweetalert2'
// import 'react-quill/dist/quill.bubble.css'
// import Translations from 'src/layouts/components/Translations'
// import { useTranslation } from 'react-i18next'

// // import dynamic from 'next/dynamic'

// // const ReactQuill = dynamic(() => import('react-quill'), { ssr: false, loading: () => <p>Loading ...</p> })

// const ContentManagement = () => {
//   const router = useRouter()
//   const [contentName, setContentName] = useState<string>('')
//   const [content, setContent] = useState<string>('')
//   const [status, setStatus] = useState<string>('')
//   const [date, setDate] = useState<Date | null>(null)
//   const [action, setAction] = useState<string>('create')
//   const [showCreate, setShowCreate] = useState<boolean>(false)
//   const [showEdit, setShowEdit] = useState<boolean>(false)
//   const [current, setCurrent] = useState<any>({})
//   const [reload, setReload] = useState<boolean>(false)
//   const [updateStatus, setUpdateStatus] = useState<boolean>(false)
//   const [page, setPage] = useState(0)
//   const [pageCount, setPageCount] = useState<number>(0)
//   const { resultPermission, errorUserPermission, resultIsAdmin } = UserPermission()
//   const { removeContent } = ContentDelete()
//   const { t } = useTranslation();
  
//   const params = {
//     date: date ? moment(date)?.format('YYYY-MM-DD') : '',
//     status: status,
//     title: contentName,
//     content_id: content,
//     page: page,
//     limit: 10
//   }
//   const { resultContents, total, errorCampaiganList } = ContentLists(params, reload)

//   const handleStatusChange = useCallback((e: SelectChangeEvent) => {
//     setStatus(e.target.value)
//   }, [])

//   const handleCotent = useCallback((e: SelectChangeEvent) => {
//     setContent(e.target.value)
//   }, [])

//   const handleChange = (index: number, i: number, event: React.ChangeEvent<HTMLInputElement>) => {
//     const values = [...resultContents]
//     values[index].status = event.target.checked

//     axios.post(
//       authConfig.updateContent,
//       { id: i, status: event.target.checked, title: values[index].title, content_text: values[index].content_text },
//       {
//         headers: {
//           Authorization: `Bearer ${window.localStorage.getItem(authConfig.storageTokenKeyName)!}`
//         }
//       }
//     )
//     setUpdateStatus(!updateStatus)
//   }

//   function handleEdit(i: number) {
//     setAction('edit')
//     setShowEdit(true)
//     setCurrent(resultContents[i])
//   }

//   const toggleCreate = () => {
//     setAction('create')
//     setShowCreate(!showCreate)
//   }

//   const handleChangePagination = (event: React.ChangeEvent<unknown>, value: number) => {
//     setPage(value - 1)
//   }

//   useEffect(() => {
//     if (total > 0) {
//       setPageCount(Math.ceil(total / 10))
//     }
//   }, [total])

//   useEffect(() => {
//     setReload(!reload)
//   }, [showEdit, showCreate, updateStatus])

//   useEffect(() => {
//     setPage(0)
//   }, [date, status, contentName, content])

//   useEffect(() => {
//     if (errorCampaiganList || errorUserPermission) {
//       window.localStorage.removeItem('userData')
//       window.localStorage.removeItem(authConfig.storageTokenKeyName)
//       localStorage.clear()
//       router.push('/login')
//       window.location.reload()
//     }
//   }, [errorCampaiganList, errorUserPermission])

//   return (
//     <Grid container spacing={6}>
//       <Grid item xs={12}>
//         <Card>
//           <CardHeader
//             title={<Translations text='Content Management' />}
//             sx={{ pb: 4, '& .MuiCardHeader-title': { letterSpacing: '.15px' } }}
//           />
//           <CardContent>
//             <Grid container spacing={6}>
//               <Grid item sm={4} xs={12}>
//                 <FormControl fullWidth>
//                   <InputLabel id='plan-select'>
//                     <Translations text='contents' />
//                   </InputLabel>
//                   <Select
//                     fullWidth
//                     value={content}
//                     id='select-content'
//                     label='Select content'
//                     labelId='content-select'
//                     onChange={handleCotent}
//                     inputProps={{ placeholder: 'Select content' }}
//                   >
//                     <MenuItem value=''>
//                       <span>ALL</span>
//                     </MenuItem>
//                     <MenuItem value='1'>News</MenuItem>
//                     <MenuItem value='2'>Announcement</MenuItem>
//                     <MenuItem value='3'>FAQ</MenuItem>
//                   </Select>
//                 </FormControl>
//               </Grid>
//               <Grid item sm={4} xs={12}>
//                 <FormControl fullWidth>
//                   <TextField
//                     id='contentName'
//                     label={<Translations text='Content Topic' />}
//                     value={contentName}
//                     onChange={e => {
//                       setContentName(e.target.value)
//                     }}
//                   />
//                 </FormControl>
//               </Grid>
//               <Grid item sm={4} xs={12}>
//                 <FormControl fullWidth>
//                   <InputLabel id='status-select'>
//                     <Translations text='Select Status' />
//                   </InputLabel>
//                   <Select
//                     fullWidth
//                     value={status}
//                     id='select-status'
//                     label={<Translations text='Select Status' />}
//                     labelId='status-select'
//                     onChange={handleStatusChange}
//                     inputProps={{ placeholder: 'Select Status' }}
//                   >
//                     <MenuItem value=''>
//                       <Translations text='Select Status' />
//                     </MenuItem>
//                     <MenuItem value='1'>
//                       <Translations text='Active' />
//                     </MenuItem>
//                     <MenuItem value='0'>
//                       <Translations text='Inactive' />
//                     </MenuItem>
//                   </Select>
//                 </FormControl>
//               </Grid>
//             </Grid>

//             <Grid container spacing={6} mt={2}>
//               <Grid item sm={4} xs={12}>
//                 <FormControl fullWidth>
//                   <LocalizationProvider dateAdapter={AdapterDateFns}>
//                     <DatePicker
//                       label={<Translations text='DATE' />}
//                       value={date}
//                       inputFormat='dd/MM/yyyy'
//                       onChange={newValue => setDate(newValue)}
//                       renderInput={params => (
//                         <TextField
//                           {...params}
//                           inputProps={{
//                             ...params.inputProps,
//                             placeholder: t('dd/mm/yyyy')
//                           }}
//                         />
//                       )}
//                     />
//                   </LocalizationProvider>
//                 </FormControl>
//               </Grid>
//               <Grid item sm={4} xs={12} mt={2}>
//                 <Box sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center' }}>
//                   <Button
//                     sx={{ mb: 2 }}
//                     onClick={() => {
//                       console.log('search')
//                     }}
//                     variant='contained'
//                   >
//                     <Translations text='SEARCH' />
//                   </Button>
//                 </Box>
//               </Grid>
//             </Grid>
//           </CardContent>
//         </Card>
//       </Grid>

//       <Grid item xs={12}>
//         <Card>
//           <CardContent>
//             <TableContainer component={Paper}>
//               {resultPermission?.content_mgt?.authorized_create || resultIsAdmin ? (
//                 <Box
//                   sx={{ p: 5, pb: 3, display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'right' }}
//                 >
//                   <Box sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center' }}>
//                     <Button sx={{ mb: 2 }} onClick={toggleCreate} variant='contained'>
//                       <Translations text='ADD' />
//                     </Button>
//                   </Box>
//                 </Box>
//               ) : (
//                 ''
//               )}

//               <Table sx={{ minWidth: 650 }} aria-label='simple table'>
//                 <TableHead>
//                   <TableRow>
//                     <TableCell>
//                       <Translations text='ID' />
//                     </TableCell>
//                     <TableCell>
//                       <Translations text='Topic' />
//                     </TableCell>
//                     <TableCell>
//                       <Translations text='Content Information' />
//                     </TableCell>
//                     <TableCell align='center'>
//                       <Translations text='PICTURE' />
//                     </TableCell>
//                     <TableCell align='center'>
//                       <Translations text='Status' />
//                     </TableCell>
//                     <TableCell>
//                       <Translations text='DATE' />
//                     </TableCell>
//                     {resultPermission?.content_mgt?.authorized_edit || resultIsAdmin ? (
//                       <TableCell align='center'>
//                         <Translations text='Action' />
//                       </TableCell>
//                     ) : (
//                       ''
//                     )}
//                   </TableRow>
//                 </TableHead>
//                 <TableBody>
//                   {resultContents &&
//                     resultContents.map((contentList: ContentList, index: number) => (
//                       <TableRow key={index}>
//                         <TableCell>{index + 1 + page * 10}</TableCell>
//                         <TableCell>
//                           <div dangerouslySetInnerHTML={{ __html: contentList.title || '-' }} />
//                           {/* <ReactQuill value={contentList.title || '-'} readOnly={true} theme='bubble' style={{maxWidth: '300px'}} />  */}
//                         </TableCell>
//                         <TableCell>
//                           <span
//                             style={{
//                               overflow: 'hidden',
//                               display: '-webkit-box',
//                               WebkitBoxOrient: 'vertical',
//                               WebkitLineClamp: 6,
//                               maxWidth: '330px'
//                             }}
//                           >
//                             <div dangerouslySetInnerHTML={{ __html: contentList.content_text || '-' }} />
//                             {/* <ReactQuill
//                               value={contentList.content_text || '-'}
//                               readOnly={true}
//                               theme='bubble'
//                               style={{
//                                 maxWidth: '330px',
//                                 overflow: 'hidden',
//                                 display: '-webkit-box',
//                                 WebkitBoxOrient: 'vertical',
//                                 WebkitLineClamp: 6
//                               }}
//                             /> */}
//                           </span>
//                         </TableCell>
//                         <TableCell align='center'>
//                           {contentList.picture ? (
//                             <Box sx={{ height: '200px', marginLeft: '1rem' }}>
//                               <img
//                                 style={{ width: 150, height: 150 }}
//                                 alt='Image'
//                                 src={'https://cornea-analysis.com/storage/' + contentList.picture}
//                               />
//                             </Box>
//                           ) : (
//                             '-'
//                           )}
//                         </TableCell>

//                         {resultPermission?.content_mgt?.authorized_edit || resultIsAdmin ? (
//                           <>
//                             <TableCell align='center'>
//                               <Switch
//                                 key={index}
//                                 checked={contentList.status === 1 ? true : contentList.status ? true : false}
//                                 onChange={e => handleChange(index, contentList.id, e)}
//                               />
//                             </TableCell>
//                           </>
//                         ) : (
//                           <TableCell align='center'>
//                             <Switch
//                               key={index}
//                               checked={contentList.status === 1 ? true : contentList.status ? true : false}
//                             />
//                           </TableCell>
//                         )}
//                         <TableCell sx={{ minWidth: 130 }}>{contentList.date}</TableCell>
//                         {resultPermission?.content_mgt?.authorized_edit || resultIsAdmin ? (
//                           <>
//                             <TableCell align='center' sx={{ minWidth: 120 }}>
//                               <a href='#' style={{ color: 'grey' }}>
//                                 <PencilOutline
//                                   onClick={() => {
//                                     handleEdit(index)
//                                   }}
//                                 />
//                               </a>
//                               <a href='#' style={{ color: 'grey', marginLeft: '5px' }}>
//                                 <TrashCanOutline
//                                   onClick={() => {
//                                     Swal.fire({
//                                       title: 'Are you sure?',
//                                       text: "You won't be able to revert this!",
//                                       icon: 'warning',
//                                       showCancelButton: true,
//                                       confirmButtonColor: '#3085d6',
//                                       cancelButtonColor: '#d33',
//                                       confirmButtonText: 'Yes, delete it!'
//                                     })
//                                       .then(result => {
//                                         if (result.isConfirmed) {
//                                           removeContent(contentList.id)
//                                             .then(result => {
//                                               if (result) {
//                                                 setReload(!reload)
//                                                 Swal.fire('Deleted!', 'Your content has been deleted.', 'success')
//                                               } else {
//                                                 Swal.fire('Somenthing went wrong!', 'Please try again.', 'error')
//                                               }
//                                             })
//                                             .catch(ex => {
//                                               if (ex) {
//                                                 Swal.fire(
//                                                   'Somenthing went wrong!',
//                                                   ex?.message ? ex?.message : 'Please try again.',
//                                                   'error'
//                                                 )
//                                               }
//                                             })
//                                         }
//                                       })
//                                       .catch(ex => {
//                                         if (ex) {
//                                           Swal.fire('Somenthing went wrong!', 'Please try again.', 'error')
//                                         }
//                                       })
//                                   }}
//                                 />
//                               </a>
//                             </TableCell>
//                           </>
//                         ) : (
//                           ''
//                         )}
//                       </TableRow>
//                     ))}
//                 </TableBody>
//               </Table>
//             </TableContainer>
//             <Box sx={{ mt: 4, display: 'flex', justifyContent: 'center' }}>
//               {total > 0 ? (
//                 <Pagination
//                   count={pageCount}
//                   page={page + 1}
//                   onChange={handleChangePagination}
//                   variant='outlined'
//                   color='primary'
//                 />
//               ) : (
//                 ''
//               )}
//             </Box>
//           </CardContent>
//         </Card>

//         <DialogContents
//           show={action === 'create' ? showCreate : showEdit}
//           setShow={action === 'create' ? setShowCreate : setShowEdit}
//           action={action}
//           current={current}
//         />
//       </Grid>
//     </Grid>
//   )
// }

// export default ContentManagement

import React, { useCallback, useEffect, useState } from 'react'
import {
  Grid, Card, CardHeader, CardContent, FormControl, TextField, InputLabel,
  Select, MenuItem, SelectChangeEvent, Box, Button, TableContainer, Paper,
  Table, TableHead, TableRow, TableCell, TableBody, Pagination, Switch
} from '@mui/material'
import LocalizationProvider from '@mui/lab/LocalizationProvider'
import DatePicker from '@mui/lab/DatePicker'
import AdapterDateFns from '@mui/lab/AdapterDateFns'
import { ContentDelete, ContentLists } from 'src/services/api/content/ContentAPI'
import DialogContents from './DialogContents'
import { PencilOutline, TrashCanOutline } from 'mdi-material-ui'
import { ContentList } from 'src/types/content/ContentType'
import axios from 'axios'
import authConfig from '../../../configs/auth'
import { useRouter } from 'next/router'
import moment from 'moment'
import { UserPermission } from 'src/services/api/users/role'
import Swal from 'sweetalert2'
import Translations from 'src/layouts/components/Translations'
import { useTranslation } from 'react-i18next'

const ContentManagement = () => {
  const router = useRouter()
  const { t } = useTranslation()
  
  // Filter states
  const [contentName, setContentName] = useState('')
  const [content, setContent] = useState('')
  const [status, setStatus] = useState('')
  const [date, setDate] = useState<Date | null>(null)
  
  // Dialog states
  const [action, setAction] = useState('create')
  const [showDialog, setShowDialog] = useState(false)
  const [currentItem, setCurrentItem] = useState<any>({})
  
  // Pagination
  const [page, setPage] = useState(0)
  const [pageCount, setPageCount] = useState(0)
  const [reload, setReload] = useState(false)

  // API hooks
  const { resultPermission, errorUserPermission, resultIsAdmin } = UserPermission()
  const { removeContent } = ContentDelete()
  
  const searchParams = {
    date: date ? moment(date).format('YYYY-MM-DD') : '',
    status,
    title: contentName,
    content_id: content,
    page,
    limit: 10
  }
  
  const { resultContents, total, errorCampaiganList } = ContentLists(searchParams, reload)

  // Check if user can edit
  const canEdit = resultPermission?.content_mgt?.authorized_edit || resultIsAdmin
  const canCreate = resultPermission?.content_mgt?.authorized_create || resultIsAdmin

  // Handle filter changes
  const handleStatusChange = useCallback((e: SelectChangeEvent) => {
    setStatus(e.target.value)
  }, [])

  const handleContentChange = useCallback((e: SelectChangeEvent) => {
    setContent(e.target.value)
  }, [])

  // Handle status toggle in table
  const handleStatusToggle = (index: number, id: number, event: React.ChangeEvent<HTMLInputElement>) => {
    const updatedContents = [...resultContents]
    updatedContents[index].status = event.target.checked

    axios.post(
      authConfig.updateContent,
      { 
        id, 
        status: event.target.checked, 
        title: updatedContents[index].title, 
        content_text: updatedContents[index].content_text 
      },
      {
        headers: {
          Authorization: `Bearer ${window.localStorage.getItem(authConfig.storageTokenKeyName)}`
        }
      }
    )
    
    setReload(!reload)
  }

  // Handle edit action
  const handleEdit = (index: number) => {
    setAction('edit')
    setCurrentItem(resultContents[index])
    setShowDialog(true)
  }

  // Handle create action
  const handleCreate = () => {
    setAction('create')
    setCurrentItem({})
    setShowDialog(true)
  }

  // Handle delete action
  const handleDelete = (id: number) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then(result => {
      if (result.isConfirmed) {
        removeContent(id)
          .then(() => {
            setReload(!reload)
            Swal.fire('Deleted!', 'Your content has been deleted.', 'success')
          })
          .catch((error) => {
            Swal.fire('Something went wrong!', error?.message || 'Please try again.', 'error')
          })
      }
    })
  }

  // Handle pagination
  const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value - 1)
  }

  // Effects
  useEffect(() => {
    if (total > 0) {
      setPageCount(Math.ceil(total / 10))
    }
  }, [total])

  useEffect(() => {
    setReload(!reload)
  }, [showDialog])

  useEffect(() => {
    setPage(0)
  }, [date, status, contentName, content])

  useEffect(() => {
    if (errorCampaiganList || errorUserPermission) {
      localStorage.clear()
      router.push('/login')
      window.location.reload()
    }
  }, [errorCampaiganList, errorUserPermission, router])

  // Styles
  const contentStyle = {
    fontFamily: 'inherit',
    lineHeight: '1.6',
    wordBreak: 'break-word' as const,
    overflow: 'hidden',
    display: '-webkit-box' as const,
    WebkitBoxOrient: 'vertical' as const,
    WebkitLineClamp: 6,
    maxWidth: '330px'
  }

  return (
    <Grid container spacing={6}>
      {/* Search Filters */}
      <Grid item xs={12}>
        <Card>
          <CardHeader
            title={<Translations text='Content Management' />}
            sx={{ pb: 4, '& .MuiCardHeader-title': { letterSpacing: '.15px' } }}
          />
          <CardContent>
            <Grid container spacing={6}>
              {/* Content Type Filter */}
              <Grid item sm={4} xs={12}>
                <FormControl fullWidth>
                  <InputLabel><Translations text='contents' /></InputLabel>
                  <Select
                    value={content}
                    label='Content'
                    onChange={handleContentChange}
                  >
                    <MenuItem value=''>ALL</MenuItem>
                    <MenuItem value='1'>News</MenuItem>
                    <MenuItem value='2'>Announcement</MenuItem>
                    <MenuItem value='3'>FAQ</MenuItem>
                  </Select>
                </FormControl>
              </Grid>

              {/* Content Topic Filter */}
              <Grid item sm={4} xs={12}>
                <TextField
                  fullWidth
                  label={<Translations text='Content Topic' />}
                  value={contentName}
                  onChange={(e) => setContentName(e.target.value)}
                />
              </Grid>

              {/* Status Filter */}
              <Grid item sm={4} xs={12}>
                <FormControl fullWidth>
                  <InputLabel><Translations text='Select Status' /></InputLabel>
                  <Select
                    value={status}
                    label='Status'
                    onChange={handleStatusChange}
                  >
                    <MenuItem value=''><Translations text='Select Status' /></MenuItem>
                    <MenuItem value='1'><Translations text='Active' /></MenuItem>
                    <MenuItem value='0'><Translations text='Inactive' /></MenuItem>
                  </Select>
                </FormControl>
              </Grid>

              {/* Date Filter */}
              <Grid item sm={4} xs={12}>
                <FormControl fullWidth>
                  <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DatePicker
                      label={<Translations text='DATE' />}
                      value={date}
                      inputFormat='dd/MM/yyyy'
                      onChange={setDate}
                      renderInput={(params) => (
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

              {/* Search Button */}
              <Grid item sm={4} xs={12}>
                <Button variant='contained' sx={{ mt: 2 }}>
                  <Translations text='SEARCH' />
                </Button>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Grid>

      {/* Content Table */}
      <Grid item xs={12}>
        <Card>
          <CardContent>
            <TableContainer component={Paper}>
              {/* Add Button */}
              {canCreate && (
                <Box sx={{ p: 5, pb: 3, display: 'flex', justifyContent: 'flex-end' }}>
                  <Button variant='contained' onClick={handleCreate}>
                    <Translations text='ADD' />
                  </Button>
                </Box>
              )}

              {/* Table */}
              <Table sx={{ minWidth: 650 }}>
                <TableHead>
                  <TableRow>
                    <TableCell><Translations text='ID' /></TableCell>
                    <TableCell><Translations text='Topic' /></TableCell>
                    <TableCell><Translations text='Content Information' /></TableCell>
                    <TableCell align='center'><Translations text='PICTURE' /></TableCell>
                    <TableCell align='center'><Translations text='Status' /></TableCell>
                    <TableCell><Translations text='DATE' /></TableCell>
                    {canEdit && <TableCell align='center'><Translations text='Action' /></TableCell>}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {resultContents?.map((item: ContentList, index: number) => (
                    <TableRow key={index}>
                      {/* ID */}
                      <TableCell>{index + 1 + page * 10}</TableCell>

                      {/* Topic */}
                      <TableCell>
                        <div dangerouslySetInnerHTML={{ __html: item.title || '-' }} />
                      </TableCell>

                      {/* Content */}
                      <TableCell>
                        <div
                          style={contentStyle}
                          dangerouslySetInnerHTML={{ __html: item.content_text || '-' }}
                        />
                      </TableCell>

                      {/* Picture */}
                      <TableCell align='center'>
                        {item.picture ? (
                          <Box sx={{ height: '200px', ml: 1 }}>
                            <img
                              style={{ width: 150, height: 150 }}
                              alt='Content Image'
                              src={`https://api.cornea-demo.com/storage/${item.picture}`}
                            />
                          </Box>
                        ) : (
                          '-'
                        )}
                      </TableCell>

                      {/* Status */}
                      <TableCell align='center'>
                        <Switch
                          checked={item.status === 1}
                          onChange={canEdit ? (e) => handleStatusToggle(index, item.id, e) : undefined}
                          disabled={!canEdit}
                        />
                      </TableCell>

                      {/* Date */}
                      <TableCell sx={{ minWidth: 130 }}>{item.date}</TableCell>

                      {/* Actions */}
                      {canEdit && (
                        <TableCell align='center' sx={{ minWidth: 120 }}>
                          <PencilOutline
                            onClick={() => handleEdit(index)}
                            style={{ color: 'grey', cursor: 'pointer', marginRight: 5 }}
                          />
                          <TrashCanOutline
                            onClick={() => handleDelete(item.id)}
                            style={{ color: 'grey', cursor: 'pointer' }}
                          />
                        </TableCell>
                      )}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>

            {/* Pagination */}
            {total > 0 && (
              <Box sx={{ mt: 4, display: 'flex', justifyContent: 'center' }}>
                <Pagination
                  count={pageCount}
                  page={page + 1}
                  onChange={handlePageChange}
                  variant='outlined'
                  color='primary'
                />
              </Box>
            )}
          </CardContent>
        </Card>

        {/* Dialog */}
        <DialogContents
          show={showDialog}
          setShow={setShowDialog}
          action={action}
          current={currentItem}
        />
      </Grid>
    </Grid>
  )
}

export default ContentManagement