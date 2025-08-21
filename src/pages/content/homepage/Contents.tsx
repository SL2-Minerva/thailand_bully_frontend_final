// import { Box, Card, CardContent, Grid, Typography } from '@mui/material'
// import 'react-quill/dist/quill.bubble.css'
// import { styled } from '@mui/material/styles'
// import Translations from 'src/layouts/components/Translations'

// // import dynamic from 'next/dynamic'

// // const ReactQuill = dynamic(() => import('react-quill'), { ssr: false, loading: () => <p>Loading ...</p> })

// interface Props {
//   resultContentList: any
// }

// const Img = styled('img')(({ theme }) => ({
//   [theme.breakpoints.up('md')]: {
//     marginRight: theme.spacing(10)
//   },
//   [theme.breakpoints.down('md')]: {
//     marginBottom: theme.spacing(4)
//   },
//   [theme.breakpoints.down('sm')]: {
//     width: 250
//   }
// }))

// const Contents = (props: Props) => {
//   const { resultContentList } = props

//   return (
//     <Grid container spacing={3}>
//       {(resultContentList || []).map((contents: any, index: any) => {
//         return (
//           <Grid item xs={12} key={index}>
//             <Card>
//               <h2 style={{ marginLeft: '2rem', marginBottom: '-2rem' }}>
//                 {contents.title == '<p><strong class="ql-size-huge">FAQs</strong></p>' ? (
//                   <h4>
//                     <Translations text='FAQs' />
//                   </h4>
//                 ) : (
//                   <div dangerouslySetInnerHTML={{ __html: contents.title }} />
//                 )}
//               </h2>
//               <CardContent>
//                 <Grid container minHeight={450}>
//                   <Grid item md={5.5} xs={12} mb={2}>
//                     {contents?.picture ? (
//                       <Box sx={{ minHeight: '250px', marginLeft: '1rem' }}>
//                         <Img
//                           style={{ width: '100%', height: 'auto' }}
//                           alt='Image'
//                           src={'https://cornea-analysis.com/storage/' + contents.picture}
//                         />
//                       </Box>
//                     ) : (
//                       <Box sx={{ minHeight: '250px', marginLeft: '1rem' }}>
//                         <Img style={{ width: 400, height: 400 }} alt='Image' src={'/images/default_image.png'} />
//                       </Box>
//                     )}
//                   </Grid>

//                   <Grid item xs={12} md={6} spacing={2} mt={5} ml={3}>
//                     <Typography>
//                       {/* <ReactQuill value={contents.content_text} readOnly={true} theme='bubble' /> */}
//                       <div dangerouslySetInnerHTML={{ __html: contents.content_text || '-' }} />
//                     </Typography>
//                     <Typography ml={4}>
//                       <Translations text='Date' /> : {contents.date}
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

// export default Contents

//Lasted
import { Card, CardContent, Typography } from '@mui/material'
import Translations from 'src/layouts/components/Translations'

interface Props {
  resultContentList: any
}

const Contents = (props: Props) => {
  const { resultContentList } = props

  return (
    <div style={{
      boxShadow: '0px 2px 10px 0px rgba(76, 78, 100, 0.22)',
      border: 'none',
      borderRadius: '10px',
      backgroundColor: 'white',
      color: 'rgba(76, 78, 100, 0.87)',
      transition: 'box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
      backgroundImage: 'none',
      overflow: 'hidden'
    }}>
      {(resultContentList || []).map((contents: any, index: any) => {
        return (
          <Card key={index} style={{
            boxShadow: 'none',
            border: 'none',
            backgroundColor: 'transparent',
            marginBottom: '20px' // เพิ่มระยะห่างระหว่างการ์ด
          }}>
            <h3 style={{ marginLeft: '2rem', marginBottom: '-2rem' }}>
              {contents.title === '<p><strong class="ql-size-huge">FAQs</strong></p>' ? (
                <h6>
                  <Translations text='FAQs' />
                </h6>
              ) : (
                <div>
                  {index + 1}. <span dangerouslySetInnerHTML={{ __html: contents.title }} />
                </div>
              )}
            </h3>
            <CardContent style={{ padding: '16px' }}>
              <Typography style={{ marginTop: '20px', marginLeft: '20px' }}>
                <strong>Ans:</strong>{' '}
                <span dangerouslySetInnerHTML={{ __html: contents.content_text || '-' }} />
              </Typography>
            </CardContent>
          </Card>
        )
      })}
      <Typography variant="h4" style={{ padding: '1rem', fontWeight: 'bold', textAlign: 'center', marginTop: '20px' }}>
        <Translations text='แนะนำการใช้งานระบบ Cornea' />
      </Typography>
      <iframe 
        style={{ width: '69%', height: '698px', border: 'none', marginBottom: '50px', justifyContent: 'center', display: 'flex', marginLeft: 'auto', marginRight: 'auto' }}
        src="https://www.youtube.com/embed/JkRgMhocdCI"
        allowFullScreen
        >
      </iframe>
    </div>
  )
}

export default Contents

// import { Typography, Accordion, AccordionSummary, AccordionDetails } from '@mui/material'
// import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
// import Translations from 'src/layouts/components/Translations'

// interface Props {
//   resultContentList: any
// }

// const Contents = (props: Props) => {
//   const { resultContentList } = props

//   return (
//     <div >
//       <Typography variant="h6" style={{ padding: '1rem', fontWeight: 'bold' }}>
//         คำถามที่พบบ่อย
//       </Typography>
//       <div style={{
//         fontFamily: 'sans-serif',
//         border: 'none',
//         borderRadius: '0px',
//         backgroundColor: 'white',
//         color: 'rgba(76, 78, 100, 0.87)',
//         transition: 'box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
//         backgroundImage: 'none',
//         overflow: 'hidden',
//       }}>
//       {(resultContentList || []).map((contents: any, index: any) => {
//         return (
//           <Accordion key={index} style={{
//               paddingBottom: '2%',
//               paddingTop:'2%',
//             }}
//             sx={{
//               borderBottom: '1px solid rgba(0, 0, 0, 0.12)',
//               '&.Mui-expanded': {
//                 borderBottom: '1px solid rgba(0, 0, 0, 0.12)',
//                 margin: 0
//               },
//               '&:before': {
//                 display: 'none'
//               }
//             }}
//           >
//             <AccordionSummary expandIcon={<ExpandMoreIcon />}>
//               <Typography variant="h6" style={{
//                 fontWeight: 'bold',
//                 fontSize: '1rem ',
//                 fontFamily: 'sans-serif',
//                 marginLeft: '0.7%',
//                 marginRight: '10%',
//               }}>
//                 {contents.title === '<p><strong class="ql-size-huge">FAQs</strong></p>' ? (
//                   <Translations text='FAQs' />
//                 ) : (
//                   <>
//                     {index + 1}. <span dangerouslySetInnerHTML={{ __html: contents.title }} />
//                   </>
//                 )}
//               </Typography>
//             </AccordionSummary>
//             <AccordionDetails>
//               <Typography style={{ marginTop: '-1rem',fontSize: '1rem', fontFamily: 'sans-serif' , marginLeft: '2%', marginRight: '10%' }}>
//                 <strong>Ans:</strong>{' '}
//                 <span dangerouslySetInnerHTML={{ __html: contents.content_text || '-' }} />
//               </Typography> 
//             </AccordionDetails>
//           </Accordion>
//         )
//       })}
//       </div>
//     </div>
//   )
// }

// export default Contents