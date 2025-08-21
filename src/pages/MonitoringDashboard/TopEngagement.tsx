import React, { useState, useEffect } from 'react'
import Box from '@mui/material/Box'
import { Grid, IconButton } from '@mui/material'
import Slide from '@mui/material/Slide'
import Stack from '@mui/material/Stack'
import { ChevronLeft, ChevronRight } from 'mdi-material-ui'
import TopManagementCard from './TopManagementCard'
import DetailPostEgagement from './DetailPostEngagement'

interface MessageData {
  params: any
  highlight: boolean
  chartId: string
  resultTopEngagement: any
  loadingTopEngagement: boolean
}
const TopEngagement = (props: MessageData) => {
  const { resultTopEngagement, loadingTopEngagement } = props

  // setting the state variables
  // cards will be the cards that are displayed
  const [cards, setCards] = useState<React.ReactElement[]>([])
  const [currentPage, setCurrentPage] = useState(0)
  const [slideDirection, setSlideDirection] = useState<'right' | 'left' | undefined>('left')
  const [showDetail, setShowDetail] = useState<boolean>(false)
  const [messageId, setMessageId] = useState<string>('')

  const cardsPerPage = 3

  const handleClick = (message_id: string) => {
    console.log('message Id', message_id)
    if (message_id) {
      setShowDetail(true)
      setMessageId(message_id)
    }
  }

  const duplicateCards: React.ReactElement[] = Array.from({ length: resultTopEngagement?.length || 0 }, (_, i) => (
    <Grid pl={2} xs={4} key={i} onClick={() => handleClick(resultTopEngagement[i]?.id)}>
      <TopManagementCard
        key={i}
        loadingTopEngagement={loadingTopEngagement}
        resultTopEngagement={resultTopEngagement[i]}
      />
    </Grid>
  ))

  const handleNextPage = () => {
    setSlideDirection('left')
    setCurrentPage(prevPage => prevPage + 1)
  }

  const handlePrevPage = () => {
    setSlideDirection('right')
    setCurrentPage(prevPage => prevPage - 1)
  }

  useEffect(() => {
    setCards(duplicateCards)
  }, [resultTopEngagement])
  const containerWidth = cardsPerPage * 500

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        alignContent: 'center',
        justifyContent: 'center',
        width: '100%'
      }}
    >
      <IconButton onClick={handlePrevPage} sx={{ margin: 5 }} disabled={currentPage === 0}>
        {/* this is the button that will go to the previous page you can change these icons to whatever you wish*/}
        <ChevronLeft />
      </IconButton>

      <Box sx={{ width: `${containerWidth}px`, height: '100%' }}>
        <Grid container spacing={1}>
          {cards.map((card, index) => (
            <Grid
              item
              xs={12}
              md={12}
              key={`card-${index}`}
              sx={{
                width: '100%',
                height: '100%',
                display: currentPage === index ? 'block' : 'none'
              }}
            >
              {/* <Box
              key={`card-${index}`}
             
            > */}
              {/* this is the slide animation that will be used to slide the cards in and out*/}
              <Slide direction={slideDirection} in={currentPage === index}>
                <Stack
                  spacing={2}
                  direction='row'
                  alignContent='center'
                  justifyContent='start'
                  sx={{ width: '100%', height: '100%' }}
                >
                  {/* this slices the cards array to only display the amount you have previously determined per page*/}
                  <Grid container spacing={2}>
                    {cards.slice(index * cardsPerPage, index * cardsPerPage + cardsPerPage)}
                  </Grid>
                </Stack>
              </Slide>
              {/* </Box> */}
            </Grid>
          ))}
        </Grid>
      </Box>
      <IconButton
        onClick={handleNextPage}
        sx={{
          margin: 5
        }}
        disabled={currentPage >= Math.ceil((cards.length || 0) / cardsPerPage) - 1}
      >
        <ChevronRight />
      </IconButton>

      {showDetail && messageId ? (
        <DetailPostEgagement show={showDetail} setShow={setShowDetail} messageId={messageId} />
      ) : (
        ''
      )}
    </Box>
  )
}

export default TopEngagement
