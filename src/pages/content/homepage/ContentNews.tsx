// import { Card, CardContent, Grid, Typography } from '@mui/material'
// import 'react-quill/dist/quill.bubble.css'
// import dynamic from 'next/dynamic'
// import { useTranslation } from 'react-i18next'


// const ReactQuill = dynamic(() => import('react-quill'), { ssr: false, loading: () => <p>Loading ...</p> })

// interface Props {
//   resultContentList: any
// }

// const ContentAnnouncement = (props: Props) => {
//   const { resultContentList } = props
//   const {t} = useTranslation();


//   return (
//     <Grid container spacing={3}>
//       {(resultContentList || []).map((contents: any, index: any) => {
//         return (
//           <Grid item xs={12} key={index}>
//             <Card
//               sx={{
//                 backgroundImage: `url(${'https://cornea-ai.com/images/' + contents.picture})`,
//                 backgroundPosition: 'center',
//                 backgroundSize: 'contain',
//                 backgroundPositionX: 'center',
//                 backgroundPositionY: 'center',
//                 backgroundRepeat: 'no-repeat'

//                 // backgroundSize: 'cover',
//               }}
//             >
//               <CardContent>
//                 <Grid
//                   container

//                   minHeight={800}
//                   style={{
//                     display: 'flex',
//                     width: '70%',
//                     paddingLeft: '100px'
//                   }}
//                 >
//                   <Grid item xs={12} md={8} spacing={2} mt={40}>
//                     <h1>
//                       <ReactQuill value={contents.title} readOnly={true} theme='bubble' />
//                     </h1>
//                     <Grid>
//                       {/* <ReactQuill value={contents.content_text} readOnly={true} theme='bubble' /> */}
//                       <div dangerouslySetInnerHTML={{ __html: contents.content_text || '-' }} />

//                     </Grid>
//                     <Typography>
//                       {/* <ReactQuill value={'Date:' + contents.date} readOnly={true} theme='bubble' /> */}
//                       <div dangerouslySetInnerHTML={{ __html: t('Date') + ": " + contents.date || '-' }} />

//                     </Typography>
//                   </Grid>
//                 </Grid>
//               </CardContent>
//             </Card>
//           </Grid>
//         )
//       })}
//     </Grid>
//   )
// }

// export default ContentAnnouncement

//Lasted
// แสดง รูปภาพ อย่างเดียว
import { Card, Grid } from '@mui/material'
import 'react-quill/dist/quill.bubble.css'

interface Props {
  resultContentList: any
}

const ContentAnnouncement = (props: Props) => {
  const { resultContentList } = props
  
  return (
    <Grid container spacing={3}>
      {(resultContentList || []).map((contents: any, index: any) => {
        return (
          <Grid item xs={12} key={index}>
            <Card
              sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',

                height: '93%',
                overflow: 'hidden',
              }}
            > 
              <img
                src={'https://cornea-ai.com/images/banners/' + contents.picture}
                alt="content picture"
                style={{
                  width: '100%',
                  height: '100%',

                  // objectFit: 'contain', 
                }}
              />
            </Card>
          </Grid>
        )
      })}
    </Grid>
  )
}

export default ContentAnnouncement



// import { Card, CardContent, Grid, Typography } from '@mui/material'
// import 'react-quill/dist/quill.bubble.css'

// // import dynamic from 'next/dynamic'
// import { useTranslation } from 'react-i18next'


// // const ReactQuill = dynamic(() => import('react-quill'), { ssr: false, loading: () => <p>Loading ...</p> })

// interface Props {
//   resultContentList: any
// }

// const ContentAnnouncement = (props: Props) => {
//   const { resultContentList } = props
//   const {t} = useTranslation();


//   return (
//     <Grid container spacing={3}>
//       {(resultContentList || []).map((contents: any, index: any) => {
//         return (
//           <Grid item xs={12} key={index}>
//             <Card
//               sx={{
//                 backgroundImage: `url(${'https://cornea-ai.com/images/' + contents.picture})`,
//                 backgroundPosition: 'center',
//                 backgroundSize: 'contain',
//                 backgroundPositionX: 'center',
//                 backgroundPositionY: 'center',
//                 backgroundRepeat: 'no-repeat'

//                 // backgroundSize: 'cover',
//               }}
//             >
//               <CardContent>
//                 <Grid
//                   container

//                   // minHeight={800}
//                   style={{
//                     display: 'flex',
//                     width: '70%',
//                     paddingLeft: '10px'
//                   }}
//                 >
//                   <Grid item xs={12} md={8} spacing={2} >
//                     <Typography>
//                       {/* <ReactQuill value={'Date:' + contents.date} readOnly={true} theme='bubble' /> */}
//                       <div dangerouslySetInnerHTML={{ __html: t('Date') + ": " + contents.date || '-' }} />

//                     </Typography>
//                     {/* <h2>
//                       <ReactQuill value={contents.title} readOnly={true} theme='bubble' />
//                     </h2> */}
//                       <div dangerouslySetInnerHTML={{ __html: t('Header') + ": " + contents.title }} />     
                
//                     <Grid>
//                       {/* <ReactQuill value={contents.content_text} readOnly={true} theme='bubble' /> */}
//                       <div dangerouslySetInnerHTML={{ __html: t('Version') + ": " + contents.content_text || '-' }} /> 
//                     </Grid>
//                   </Grid>
//                 </Grid>
//               </CardContent>
//             </Card>
//           </Grid>
//         )
//       })}
//     </Grid>
//   )
// }

// export default ContentAnnouncement


// import React, { useState, useMemo } from 'react'
// import { Card, CardContent, Grid, Typography, Box, Dialog, DialogContent, IconButton, Pagination } from '@mui/material'
// import Close from 'mdi-material-ui/Close'

// interface NewsItem {
//   id: string
//   title: string
//   content_text: string
//   date: string
//   version?: string
//   picture?: string
// }

// interface Props {
//   resultContentList: NewsItem[]
// }

// const ContentNews: React.FC<Props> = ({ resultContentList }) => {
//   const [openPopup, setOpenPopup] = useState(false)
//   const [selectedNews, setSelectedNews] = useState<NewsItem | null>(null)
//   const [currentPage, setCurrentPage] = useState(1)
//   const itemsPerPage = 3 // เปลี่ยนจาก 10 เป็น 3

//   // Sort by newest first and paginate
//   const sortedAndPaginatedNews = useMemo(() => {
//     const sorted = [...resultContentList].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
//     const totalPages = Math.ceil(sorted.length / itemsPerPage)
//     const startIndex = (currentPage - 1) * itemsPerPage
//     const paginatedItems = sorted.slice(startIndex, startIndex + itemsPerPage)
    
//     return { items: paginatedItems, totalPages, totalItems: sorted.length }
//   }, [resultContentList, currentPage])

//   const handlePageChange = (event: React.ChangeEvent<unknown>, page: number) => {
//     setCurrentPage(page)
//   }
  
//   const handleOpenPopup = (news: NewsItem) => {
//     setSelectedNews(news)
//     setOpenPopup(true)
//   }
  
//   const handleClosePopup = () => {
//     setOpenPopup(false)
//     setSelectedNews(null)
//   }

//   // Function to truncate HTML content
//   const truncateHtmlContent = (html: string, maxLength: number,) => {
//     const tempDiv = document.createElement('div')
//     tempDiv.innerHTML = html
//     const textContent = tempDiv.textContent || tempDiv.innerText || ''
    
//     return textContent.length > maxLength 
//       ? textContent.substring(0, maxLength) + '...' 
//       : textContent
//   }
  
//   return (
//     <Box sx={{ 
//       width: '100%', 
//       fontFamily: 'sans-serif',
//       minHeight: '500px', // กำหนดความสูงขั้นต่ำ
//       display: 'flex',
//       flexDirection: 'column'
//     }}>
//       {/* News List Container */}
//       <Box sx={{ flex: 1 }}>
//         {sortedAndPaginatedNews.items?.map((item, index) => (
//           <Card 
//             key={item.id || index} 
//             onClick={() => handleOpenPopup(item)}
//             sx={{ 
//               mb: 3, 
//               borderRadius: '12px',
//               boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
//               border: '1px solid #e0e0e0',
//               padding: 3,
//               bgcolor: 'white',
//               overflow: 'hidden',
//               cursor: 'pointer',
//               transition: 'all 0.3s ease',
//               '&:hover': {
//                 boxShadow: '0 8px 10px rgba(0,0,0,0.15)',
//                 transform: 'translateY(-2px)'
//               }
//             }}
//           >
//             <Grid container spacing={3}>
//               {/* Image Section */}
//               <Grid item xs={12} sm={4} md={3}>
//                 <Box sx={{ 
//                   width: '100%',
//                   height: '180px', // ลดความสูงลง
//                   bgcolor: '#f5f5f5',
//                   display: 'flex',
//                   justifyContent: 'center',
//                   alignItems: 'center',
//                   position: 'relative',
//                   borderRadius: '8px',
//                   overflow: 'hidden',
//                 }}>
//                   {item.picture ? (
//                     <img
//                       src={`https://api.cornea-demo.com/storage/${item.picture}`}
//                       alt={`Image for ${item.title}`}
//                       style={{
//                         width: '100%',
//                         height: '100%',
//                         objectFit: 'cover'
//                       }}
//                     />
//                   ) : (
//                     <Typography sx={{ 
//                       color: '#999', 
//                       fontSize: '14px',
//                       fontWeight: 'normal',
//                       textAlign: 'center'
//                     }}>
//                     No Picture
//                     </Typography>
//                   )}
//                 </Box>
//               </Grid>
              
//               {/* Content Section */}
//               <Grid item xs={12} sm={8} md={9}>
//                 <CardContent sx={{ 
//                   p: 0,
//                   height: '180px', // จำกัดความสูงให้เท่ากับรูป
//                   display: 'flex',
//                   flexDirection: 'column',
//                 }}>
//                   <Box>
//                     {/* Title */}
//                     <Typography 
//                       variant="h6" 
//                       sx={{ 
//                         fontFamily: 'sans-serif',
//                         fontWeight: 600, 
//                         mb: 1,
//                         fontSize: '18px',
//                         lineHeight: 1.3,
//                         display: '-webkit-box',
//                         WebkitLineClamp: 2, // จำกัด 2 บรรทัด
//                         WebkitBoxOrient: 'vertical',
//                         overflow: 'hidden',
//                         textOverflow: 'ellipsis'
//                       }}
//                       dangerouslySetInnerHTML={{ __html: item.title }}
//                     />
                    
//                     {/* Date */}
//                     <Typography 
//                       variant="body2" 
//                       color="text.secondary" 
//                       sx={{ 
//                         mb: 2,
//                         mt: -6, 
//                         fontSize: '12px', 
//                         fontWeight: 'normal' 
//                       }}
//                     >
//                       {new Date(item.date).toLocaleDateString('th-TH', {
//                         year: 'numeric',
//                         month: 'long',
//                         day: 'numeric'
//                       })}
//                     </Typography>
//                   </Box>
                  
//                   {/* Content Preview */}
//                   <Typography 
//                     variant="body2" 
//                     sx={{
//                       mt: '8px',
//                       fontSize: '13px',
//                       lineHeight: 1.5,
//                       color: 'text.secondary',
//                       display: '-webkit-box',
//                       WebkitLineClamp: 3, // จำกัด 3 บรรทัด
//                       WebkitBoxOrient: 'vertical',
//                       overflow: 'hidden',
//                       textOverflow: 'ellipsis',
//                       fontFamily: 'sans-serif',
//                     }}
//                   >
//                     {truncateHtmlContent(item.content_text || 'ไม่มีเนื้อหา' , 150)}
//                   </Typography>
//                 </CardContent>
//               </Grid>
//             </Grid>
//           </Card>
//         ))}
//       </Box>

//       {/* Pagination */}
//       {sortedAndPaginatedNews.totalPages > 1 && (
//         <Box sx={{ 
//           display: 'flex', 
//           justifyContent: 'center', 
//           mt: 4,
//           pt: 2,
//           borderTop: '1px solid #e0e0e0'
//         }}>
//           <Pagination 
//             count={sortedAndPaginatedNews.totalPages}
//             page={currentPage}
//             onChange={handlePageChange}
//             variant="outlined"
//             color="primary"
//           />
//         </Box>
//       )}
      
//       {/* News Detail Popup */}
//       <Dialog
//         open={openPopup}
//         onClose={handleClosePopup}
//         maxWidth="md"
//         fullWidth
//         PaperProps={{
//           sx: {
//             borderRadius: '12px',
//             boxShadow: '0 24px 48px rgba(0,0,0,0.2)',
//             position: 'relative',
//             m: { xs: 1, md: 2 },
//             maxWidth: 800,
//             maxHeight: '85vh',
//             overflow: 'hidden'
//           }
//         }}
//       >
//         {/* Close Button */}
//         <IconButton
//           onClick={handleClosePopup}
//           sx={{
//             position: 'absolute',
//             top: 16,
//             right: 16,
//             zIndex: 10,
//             color: 'white',
//             bgcolor: 'rgba(0,0,0,0.5)',
//             borderRadius: '50%',
//             width: 40,
//             height: 40,
//             '&:hover': {
//               bgcolor: 'rgba(0,0,0,0.7)',
//             }
//           }}
//         >
//           <Close fontSize="medium" />
//         </IconButton>
        
//         <DialogContent sx={{ 
//           p: 0, 
//           overflow: 'auto',
//           '&::-webkit-scrollbar': {
//             width: '6px'
//           },
//           '&::-webkit-scrollbar-track': {
//             background: '#f1f1f1'
//           },
//           '&::-webkit-scrollbar-thumb': {
//             background: '#c1c1c1',
//             borderRadius: '3px'
//           }
//         }}>
//           {selectedNews && (
//             <>
//               {/* Image Section */}
//               <Box
//                 sx={{
//                   width: '100%',
//                   height: '300px',
//                   position: 'relative',
//                   overflow: 'hidden',
//                   bgcolor: '#f5f5f5',
//                   display: 'flex',
//                   justifyContent: 'center',
//                   alignItems: 'center',
//                 }}
//               >
//                 {selectedNews.picture ? (
//                   <img
//                     src={`https://api.cornea-demo.com/storage/${selectedNews.picture}`}
//                     alt={`Image for ${selectedNews.title}`}
//                     style={{
//                       width: '100%',
//                       height: '100%',
//                       objectFit: 'cover',
//                       objectPosition: 'center'
//                     }}
//                   />
//                 ) : (
//                   <Typography sx={{ 
//                     color: '#999', 
//                     fontSize: '18px',
//                     fontWeight: 'normal'
//                   }}>
//                     ไม่มีรูปภาพ
//                   </Typography>
//                 )}
//               </Box>
              
//               {/* Content Section */}
//               <Box sx={{ p: 4 }}>
//                 {/* Title */}
//                 <Typography 
//                   variant="h4" 
//                   component="h2" 
//                   sx={{ 
//                     fontWeight: 700,
//                     mb: -6,
//                     fontSize: { xs: '24px', sm: '28px' },
//                     fontFamily: 'sans-serif',
//                     lineHeight: 1.3
//                   }}
//                   dangerouslySetInnerHTML={{ __html: selectedNews.title }}
//                 />
                
//                 {/* Date */}
//                 <Typography 
//                   variant="body1" 
//                   color="text.secondary" 
//                   sx={{ 
//                     display: 'block',
//                     mb: 6,
//                     fontSize: '14px',
//                     fontWeight: 'normal', 
//                     fontFamily: 'sans-serif'
//                   }}
//                 >
//                   {new Date(selectedNews.date).toLocaleDateString('th-TH', {
//                     year: 'numeric',
//                     month: 'long',
//                     day: 'numeric'
//                   })}
//                 </Typography>
                
//                 {/* Full Content */}
//                 <Box>
//                   <div 
//                     dangerouslySetInnerHTML={{ __html: selectedNews.content_text || 'ไม่มีเนื้อหา' }}
//                     style={{
//                       fontWeight: 'normal',
//                       fontFamily: 'sans-serif',
//                       fontSize: '15px',
//                       lineHeight: '1.7',
//                       color: '#333'
//                     }}
//                   />
//                 </Box>
//               </Box>
//             </>
//           )}
//         </DialogContent>
//       </Dialog>
//     </Box>
//   )
// }

// export default ContentNews