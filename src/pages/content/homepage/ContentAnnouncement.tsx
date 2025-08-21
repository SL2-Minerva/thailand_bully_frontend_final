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


// import { Card, Box, IconButton, Typography } from '@mui/material'
// import { useState, useMemo } from 'react'
// import ChevronLeft from '@mui/icons-material/ChevronLeft'
// import ChevronRight from '@mui/icons-material/ChevronRight'

// interface Props {
//   resultContentList: any
// }

// const ContentAnnouncement = (props: Props) => {
//   const { resultContentList } = props
//   const [currentIndex, setCurrentIndex] = useState(0)
//   const [hoverSide, setHoverSide] = useState<'left' | 'right' | null>(null)

//   const sortedAnnouncements = useMemo(() => {
//     return [...(resultContentList || [])].sort((a, b) =>
//       new Date(b.date).getTime() - new Date(a.date).getTime()
//     )
//   }, [resultContentList])

//   const currentAnnouncement = sortedAnnouncements[currentIndex]

//   const handlePrev = () => {
//     setCurrentIndex(prev =>
//       prev === 0 ? sortedAnnouncements.length - 1 : prev - 1
//     )
//   }

//   const handleNext = () => {
//     setCurrentIndex(prev =>
//       prev === sortedAnnouncements.length - 1 ? 0 : prev + 1
//     )
//   }

//   const handleIndicatorClick = (index: number) => {
//     setCurrentIndex(index)
//   }

//   if (!sortedAnnouncements.length) {
//     return (
//       <Box sx={{
//         textAlign: 'center',
//         py: 8,
//         color: 'text.secondary',
//         fontFamily: 'sans-serif'
//       }}>
//         <Typography variant="h6">No announcements available</Typography>
//       </Box>
//     )
//   }

//   return (
//     <Box sx={{
//       fontFamily: 'sans-serif',
//       position: 'relative',
//       width: '100%',
//       height: '70vh',
//       maxHeight: '600px',
//       overflow: 'hidden',
//     }}>
//       <Card sx={{
//         position: 'relative',
//         height: '100%',
//         overflow: 'hidden',
//         borderRadius: '12px',
//         boxShadow: 'none',
//         '&:hover .nav-button': {
//           opacity: 1,
//           visibility: 'visible'
//         }
//       }}>
//         <img
//           src={`https://api.cornea-demo.com/storage/${currentAnnouncement.picture}`}
//           alt="announcement"
//           style={{
//             width: '100%',
//             height: '100%',
//             objectFit: 'fill',
//             overflow: 'hidden',
//           }}
//         />

//         {/* Left Shadow */}
//         <Box
//           className="left-shadow"
//           sx={{
//             position: 'absolute',
//             left: 0,
//             top: 0,
//             bottom: 0,
//             width: '250px',
//             pointerEvents: 'none',
//             opacity: hoverSide === 'left' ? 1 : 0,
//             transition: 'opacity 0.3s ease',
//             background: 'linear-gradient(to right, #0058FF20, rgba(0,0,0,0))',
//             zIndex: 5
//           }}
//         />

//         {/* Right Shadow */}
//         <Box
//           className="right-shadow"
//           sx={{
//             position: 'absolute',
//             right: 0,
//             top: 0,
//             bottom: 0,
//             width: '250px',
//             pointerEvents: 'none',
//             opacity: hoverSide === 'right' ? 1 : 0,
//             transition: 'opacity 0.3s ease',
//             background: 'linear-gradient(to left, #0058FF20, rgba(0,0,0,0))',
//             zIndex: 5
//           }}
//         />

//         {/* Navigation Buttons */}
//         {sortedAnnouncements.length > 1 && (
//           <>
//             <IconButton
//               className="nav-button"
//               onClick={handlePrev}
//               onMouseEnter={() => setHoverSide('left')}
//               onMouseLeave={() => setHoverSide(null)}
//               sx={{
//                 position: 'absolute',
//                 left: 20,
//                 top: '50%',
//                 transform: 'translateY(-50%)',
//                 backgroundColor: '#00083046',
//                 color: 'white',
//                 width: 50,
//                 height: 50,
//                 opacity: 0,
//                 visibility: 'hidden',
//                 transition: 'all 0.3s ease',
//                 backdropFilter: 'blur(10px)',
//                 border: '5px solid rgba(255,255,255,0.2)',
//                 zIndex: 10,
//                 '&:hover': {
//                   backgroundColor: '#0048EE59',
//                   transform: 'translateY(-50%) scale(1.1)',
//                 }
//               }}
//             >
//               <ChevronLeft sx={{ fontSize: 28 }} />
//             </IconButton>

//             <IconButton
//               className="nav-button"
//               onClick={handleNext}
//               onMouseEnter={() => setHoverSide('right')}
//               onMouseLeave={() => setHoverSide(null)}
//               sx={{
//                 position: 'absolute',
//                 right: 20,
//                 top: '50%',
//                 transform: 'translateY(-50%)',
//                 backgroundColor: '#00083046',
//                 color: 'white',
//                 width: 50,
//                 height: 50,
//                 opacity: 0,
//                 visibility: 'hidden',
//                 transition: 'all 0.3s ease',
//                 backdropFilter: 'blur(10px)',
//                 border: '5px solid rgba(255,255,255,0.2)',
//                 zIndex: 10,
//                 '&:hover': {
//                   backgroundColor: '#0048EE59',
//                   transform: 'translateY(-50%) scale(1.1)'
//                 }
//               }}
//             >
//               <ChevronRight sx={{ fontSize: 28 }} />
//             </IconButton>
//           </>
//         )}

//         {/* Indicators */}
//         {sortedAnnouncements.length > 1 && (
//           <Box sx={{
//             position: 'absolute',
//             bottom: 20,
//             left: '50%',
//             transform: 'translateX(-50%)',
//             display: 'flex',
//             gap: 1,
//             zIndex: 10
//           }}>
//             {sortedAnnouncements.map((_, index) => (
//               <Box
//                 key={index}
//                 onClick={() => handleIndicatorClick(index)}
//                 sx={{
//                   width: 12,
//                   height: 12,
//                   borderRadius: '50%',
//                   backgroundColor: index === currentIndex ? '#0040DD78' : '#0058FF20',
//                   cursor: 'pointer',
//                   transition: 'background-color 0.3s',
//                   '&:hover': {
//                     backgroundColor: index === currentIndex ? '#0040DD78' :' #0048EE59'
//                   }
//                 }}
//               />
//             ))}
//           </Box>
//         )}
//       </Card>
//     </Box>
//   )
// }

// export default ContentAnnouncement


