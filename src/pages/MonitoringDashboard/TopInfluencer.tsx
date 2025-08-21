import React, { useState, useEffect } from 'react'
import Box from '@mui/material/Box'
import { Grid, IconButton } from '@mui/material'
import Slide from '@mui/material/Slide'
import Stack from '@mui/material/Stack'
import { ChevronLeft, ChevronRight } from 'mdi-material-ui'
import TopFiveInfluencerCard from './TopFiveInfuencerCard'
import InfluencerDetail from './InfluencerDetail'

interface MessageData {
  params: any
  resultTopInfluencer: any
  loadingTopInfluencer: boolean
}
const TopInfluencer = (props: MessageData) => {
  const { resultTopInfluencer, loadingTopInfluencer, params } = props
  const [cards, setCards] = useState<React.ReactElement[]>([])
  const [currentPage, setCurrentPage] = useState(0)
  const [slideDirection, setSlideDirection] = useState<'right' | 'left' | undefined>('left')
  const [showDetail, setShowDetail] = useState<boolean>(false)
  const [accountName, setAccountName] = useState<string>('')
  const [sentimentType, setSentimentType] = useState<string>('')
  const [clickGraph, setClickGraph] = useState(false)

  const cardsPerPage = 3

  const handleOnClick = (name: string) => {
    setAccountName(name)
    setShowDetail(true)
    if (!clickGraph) {
      
    }
    setSentimentType('')
  }

  const handleOnClickGraph = (name: string) => {
    setAccountName(name)
    setShowDetail(true)
  }

  const duplicateCards: React.ReactElement[] = Array.from({ length: resultTopInfluencer?.length || 0 }, (_, i) => (
    <Grid
      pl={4}
      xs={4}
      key={i}
      onClick={() => {
        setClickGraph(false);
        handleOnClick(resultTopInfluencer[i]?.account_name)
      }}
    >
      <TopFiveInfluencerCard
        key={i}
        loading={loadingTopInfluencer}
        influencer={resultTopInfluencer[i]}
        setSentimentType={setSentimentType}
        setClickGraph={setClickGraph}
        handleOnClick ={ handleOnClickGraph }
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
  }, [resultTopInfluencer])

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
        <Grid container spacing={2}>
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

      {showDetail && accountName ? (
        <InfluencerDetail
          show={showDetail}
          setShow={setShowDetail}
          params={params}
          keywordId={accountName}
          setKeywordId={setAccountName}
          reportNo={''}
          title='Post by Influencer'
          networkTitle=''
          sentimentType={sentimentType}
        />
      ) : (
        ''
      )}
    </Box>
  )
}

export default TopInfluencer
