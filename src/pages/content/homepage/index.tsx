// import { useEffect, useState } from 'react'
// import { Grid, Typography, Box } from '@mui/material'
// import { useRouter } from 'next/router'
// import { GetContentLists } from 'src/services/api/content/ContentAPI'
// import Tabs from '@mui/material/Tabs'
// import Tab from '@mui/material/Tab'
// import Contents from './Contents'
// import ContentAnnouncement from './ContentAnnouncement'
// import ContentNews from './ContentNews'
// import Translations from 'src/layouts/components/Translations'

// // import ContentAnnouncement from './ContentAnnouncement'

// interface TabPanelProps {
//   children?: React.ReactNode
//   index: number
//   value: number
// }

// function CustomTabPanel(props: TabPanelProps) {
//   const { children, value, index, ...other } = props

//   return (
//     <div
//       role='tabpanel'
//       hidden={value !== index}
//       id={`simple-tabpanel-${index}`}
//       aria-labelledby={`simple-tab-${index}`}
//       {...other}
//     >
//       {value === index && (
//         <Box sx={{ p: 3 }}>
//           <Typography>{children}</Typography>
//         </Box>
//       )}
//     </div>
//   )
// }

// const ContentPage = () => {
//   const router = useRouter()
//   const [value, setValue] = useState(0)
//   const [contentId, setContentId] = useState(2)
//   const { resultContentList, errorResultContentList } = GetContentLists(contentId)

//   const handleChange = (event: React.SyntheticEvent, newValue: number) => {
//     if (newValue === 0) {
//       setContentId(2)
//     } else if (newValue === 1) {
//       setContentId(1)
//     } else if (newValue === 2) {
//       setContentId(3)
//     }
//     setValue(newValue)
//   }

//   function a11yProps(index: number) {
//     return {
//       id: `simple-tab-${index}`,
//       'aria-controls': `simple-tabpanel-${index}`
//     }
//   }

//   useEffect(() => {
//     if (errorResultContentList) {
//       window.localStorage.removeItem('userData')
//       window.localStorage.clear()
//       localStorage.clear()
//       router.push('/login')
//       window.location.reload()
//     }
//   }, [errorResultContentList])

//   return (
//     <Grid container spacing={3}>
//       <Box sx={{ width: '100%' }}>
//         <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
//           <Tabs value={value} onChange={handleChange} aria-label='contents tabs'>
//             <Tab label={<Translations text='Announcement' />} {...a11yProps(0)} />
//             <Tab label={<Translations text='News' />} {...a11yProps(1)} />
//             <Tab label={<Translations text='FAQ' />} {...a11yProps(2)} />
//           </Tabs>
//         </Box>
//         <CustomTabPanel value={value} index={0}>
//           {resultContentList?.length > 0 ? (

//             <ContentAnnouncement resultContentList={resultContentList} />
            
//             // <Contents resultContentList={resultContentList} />
//           ) : (
//             <Typography sx={{ display: 'flex', justifyContent: 'center', color: 'grey' }} variant='h6' mt={5}>
//               There is no data.
//             </Typography>
//           )}
//         </CustomTabPanel>
//         <CustomTabPanel value={value} index={1}>
//           {resultContentList?.length > 0 ? (

//             <ContentNews resultContentList={resultContentList} />
            
//             // <Contents resultContentList={resultContentList} />
//           ) : (
//             <Typography sx={{ display: 'flex', justifyContent: 'center', color: 'grey' }} variant='h6' mt={5}>
//               There is no data.
//             </Typography>
//           )}
//         </CustomTabPanel>
//         {/* <CustomTabPanel value={value} index={1}>
//           {resultContentList?.length > 0 ? (
//             <Contents resultContentList={resultContentList} />
//           ) : (
//             <Typography sx={{ display: 'flex', justifyContent: 'center', color: 'grey' }} variant='h6' mt={5}>
//               There is no data.
//             </Typography>
//           )}
//         </CustomTabPanel> */}
//         <CustomTabPanel value={value} index={2}>
//           {resultContentList?.length > 0 ? (
//             <Contents resultContentList={resultContentList} />
//           ) : (
//             <Typography sx={{ display: 'flex', justifyContent: 'center', color: 'grey' }} variant='h6' mt={5}>
//               There is no data.
//             </Typography>
//           )}
//         </CustomTabPanel>
//       </Box>
//     </Grid>
//   )
// }

// export default ContentPage


import { useEffect, useState } from 'react'
import { Grid, Typography, Box } from '@mui/material'
import { useRouter } from 'next/router'
import { GetContentLists } from 'src/services/api/content/ContentAPI'
import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import Contents from './Contents'
import Translations from 'src/layouts/components/Translations'

interface TabPanelProps {
  children?: React.ReactNode
  index: number
  value: number
}

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props

  return (
    <div
      role='tabpanel'
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  )
}

const ContentPage = () => {
  const router = useRouter()
  const [value] = useState(0)
  const [contentId, setContentId] = useState(3)
  const { resultContentList, errorResultContentList } = GetContentLists(contentId)

  const handleChange = () => {
      setContentId(3)
  }

  function a11yProps(index: number) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`
    }
  }

  useEffect(() => {
    if (errorResultContentList) {
      window.localStorage.removeItem('userData')
      window.localStorage.clear()
      localStorage.clear()
      router.push('/login')
      window.location.reload()
    }
  }, [errorResultContentList])

  return (
    <Grid container spacing={3}>
      <Box sx={{ width: '100%' }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={value} onChange={handleChange} aria-label='contents tabs'>
            {/*<Tab label={<Translations text='Announcement' />} {...a11yProps(0)} />
            <Tab label={<Translations text='News' />} {...a11yProps(1)} />*/}
            <Tab label={<Translations text='FAQ' />} {...a11yProps(2)} />
          </Tabs>
        </Box>
        {/*<CustomTabPanel value={value} index={0}>
          {resultContentList?.length > 0 ? (

            <ContentAnnouncement resultContentList={resultContentList} />
            
            // <Contents resultContentList={resultContentList} />
          ) : (
            <Typography sx={{ display: 'flex', justifyContent: 'center', color: 'grey' }} variant='h6' mt={5}>
              There is no data.
            </Typography>
          )}
        </CustomTabPanel>
        <CustomTabPanel value={value} index={1}>
          {resultContentList?.length > 0 ? (

            <ContentNews resultContentList={resultContentList} />
            
            // <Contents resultContentList={resultContentList} />
          ) : (
            <Typography sx={{ display: 'flex', justifyContent: 'center', color: 'grey' }} variant='h6' mt={5}>
              There is no data.
            </Typography>
          )}
        </CustomTabPanel>
        {/* <CustomTabPanel value={value} index={1}>
          {resultContentList?.length > 0 ? (
            <Contents resultContentList={resultContentList} />
          ) : (
            <Typography sx={{ display: 'flex', justifyContent: 'center', color: 'grey' }} variant='h6' mt={5}>
              There is no data.
            </Typography>
          )}
        </CustomTabPanel> */}
        <CustomTabPanel value={value} index={0}>
          {resultContentList?.length > 0 ? (
            <Contents resultContentList={resultContentList} />
          ) : (
            <Typography sx={{ display: 'flex', justifyContent: 'center', color: 'grey' }} variant='h6' mt={5}>
              There is no data.
            </Typography>
          )}
        </CustomTabPanel>
      </Box>
    </Grid>
  )
}

export default ContentPage



// import { useEffect, useState } from 'react'
// import { useRouter } from 'next/router'
// import { GetContentLists } from 'src/services/api/content/ContentAPI'
// import { Grid, Typography, Box, Tabs, Tab } from '@mui/material'
// import Contents from './Contents'
// import ContentAnnouncement from './ContentAnnouncement'
// import ContentNews from './ContentNews'
// import Translations from 'src/layouts/components/Translations'

// const ContentPage = () => {
//   const router = useRouter()
//   const [activeTab, setActiveTab] = useState(0)
//   const [contentId, setContentId] = useState(2)
//   const { resultContentList, errorResultContentList } = GetContentLists(contentId)

//   // Handle tab change
//   const handleTabChange = (event: React.SyntheticEvent, newTab: number) => {
//     setActiveTab(newTab)
    
//     // Set contentId based on tab
//     if (newTab === 0) setContentId(2)      // Announcement
//     else if (newTab === 1) setContentId(1) // News  
//     else if (newTab === 2) setContentId(3) // FAQ
//   }

//   // Handle error - redirect to login
//   useEffect(() => {
//     if (errorResultContentList) {
//       localStorage.clear()
//       router.push('/login')
//       window.location.reload()
//     }
//   }, [errorResultContentList, router])

//   // Render content based on active tab
//   const renderTabContent = () => {
//     if (!resultContentList?.length) {
//       return (
//         <Typography 
//           variant='h6' 
//           sx={{ 
//             backgroundColor: '#ffffff',
//             display: 'flex', 
//             justifyContent: 'center', 
//             color: 'grey',
//             mt: 5,
//             p: 3,
//             borderRadius: '10px',
//             boxShadow: '0px 2px 10px 0px rgba(76, 78, 100, 0.22)'
//           }}
//         >
//           There is no data.
//         </Typography>
//       )
//     }

//     switch (activeTab) {
//       case 0:
//         return <ContentAnnouncement resultContentList={resultContentList} />
//       case 1:
//         return <ContentNews resultContentList={resultContentList} />
//       case 2:
//         return <Contents resultContentList={resultContentList} />
//       default:
//         return null
//     }
//   }

//   return (
//     <Box sx={{ p: 2 }}>
//       <Grid container spacing={3}>
//         <Box sx={{ width: '100%'}}>
//           {/* Tab Header */}
//           <Box sx={{ 
//             borderBottom: 1, 
//             borderColor: 'divider',
//             backgroundColor: '#ffffff',
//             borderRadius: '10px 10px 0 0',
//             boxShadow: '0px 2px 10px 0px rgba(76, 78, 100, 0.22)'
//           }}>
//             <Tabs 
//               value={activeTab} 
//               onChange={handleTabChange} 
//               aria-label='contents tabs'
//               sx={{ p: 1 }}
//             >
//               <Tab 
//                 label={<Translations text='Announcement' />}
//                 id='tab-0'
//                 aria-controls='tabpanel-0'
//               />
//               <Tab 
//                 label={<Translations text='News' />}
//                 id='tab-1' 
//                 aria-controls='tabpanel-1'
//               />
//               <Tab 
//                 label={<Translations text='FAQ' />}
//                 id='tab-2'
//                 aria-controls='tabpanel-2'
//               />
//             </Tabs>
//           </Box>

//           {/* Tab Content */}
//           <Box sx={{ 
//               p: 3,
//               backgroundColor: '#ffffff',
//               borderRadius: '0 0 10px 10px',
//               boxShadowTop: 'none',
//               boxShadowBottom: '0px 2px 10px 0px rgba(76, 78, 100, 0.22)',
//               boxShadow: '0 4px 8px rgba(76, 78, 100, 0.22)',
//               mt: -1
//             }}>
//               {renderTabContent()}
//           </Box>
//         </Box>
//       </Grid>
//     </Box>
//   )
// }

// export default ContentPage