// ** MUI Imports
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import {
  Grid,
  IconButton,
  LinearProgress,
  Menu,
  MenuItem,
  Paper,
  TableBody,
  TableCell,
  TableContainer,
  Typography
} from '@mui/material'
import { Table, TableRow, TableHead } from '@mui/material'

// ** Third Party Imports
import { StyledTooltip } from '../dashboard/overall'
import { Information } from 'mdi-material-ui'
import Translations from 'src/layouts/components/Translations'
import { MouseEvent, useEffect, useState } from 'react'
import SentimentEachGraph from '../dashboard/SentimentEachGraph'

import * as htmlToImage from 'html-to-image'
import { saveAs } from 'file-saver'
import { DotsVertical, Download } from 'mdi-material-ui'
import NumberOfEachMessage from '../dashboard/NumberOfEachMessage'

// import { ChannelColors } from 'src/utils/const'

const onCapture = () => {
  const pictureId = document.getElementById('shareOfVoices')
  if (pictureId) {
    htmlToImage.toPng(pictureId, { backgroundColor: '#fff' }).then(function (dataUrl) {
      saveAs(dataUrl, 'Channel by Sentiment.png')
    })
  }
}

const SentimentLevelsByChannel = ({
  resultSentimentLevel,
  resultBy,
  loading
}: {
  chartId: string
  keywordsColor?: any
  resultSentimentLevel: any
  resultBy: any
  loading: boolean
}) => {
  // const reportNo = '3.2.015'

  const [tableData, setTableData] = useState<any[]>([])
  const [colors, setColors] = useState<any[]>([]);

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)

  const rowOptionsOpen = Boolean(anchorEl)

  const handleRowOptionsClick = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }
  const handleRowOptionsClose = () => {
    setAnchorEl(null)
  }

  useEffect(() => {
    if (resultBy && resultSentimentLevel) {
      const data: any = []
      const sourceColors : any = [];

      for (let i = 0; i < resultBy?.length; i++) {
        if (i < resultSentimentLevel.length) {
          data.push({
            keyword_name: resultBy[i]?.keyword_name,
            total: resultBy[i]?.total_value,
            Negative: resultSentimentLevel[i]?.negative,
            Neutral: resultSentimentLevel[i]?.neutral,
            Positive: resultSentimentLevel[i]?.positive
          })
        } else {
          data.push({
            keyword_name: resultBy[i]?.keyword_name,
            total: resultBy[i]?.total_value,
            Negative: 0,
            Neutral: 0,
            Positive: 0
          })
        }
        sourceColors.push(resultBy[i]?.source_color);
      }
      setColors(sourceColors);
      setTableData(data)
    }
  }, [resultSentimentLevel, resultBy])

  return (
    <Paper style={{ minHeight: 450, border: `3px solid #fff`, borderRadius: 7 }}>
      {loading && <LinearProgress style={{ width: '100%' }} />}

      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
        <span style={{ display: 'flex', justifyContent: 'flex-start' }}>
          <CardHeader title={<Translations text='Channel by Sentiment' />} titleTypographyProps={{ variant: 'h6' }} />
          <StyledTooltip
            arrow
            title={
              <span>
                <span>
                  <Typography variant='h6' sx={{ color: 'white' }}>
                    <Translations text='channelChart14Title' />
                  </Typography>
                  <Typography variant='body2' sx={{ color: 'white' }}>
                    <Translations text='channelChart14Description' />
                  </Typography>
                </span>
              </span>
            }
          >
            <Information style={{ marginTop: '22px', fontSize: '29px' }} />
          </StyledTooltip>
        </span>
        <span style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <IconButton size='large' onClick={handleRowOptionsClick} sx={{ m: 2 }}>
            <DotsVertical />
          </IconButton>
          <Menu
            keepMounted
            anchorEl={anchorEl}
            open={rowOptionsOpen}
            onClose={handleRowOptionsClose}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'right'
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right'
            }}
            PaperProps={{ style: { minWidth: '8rem' } }}
          >
            <MenuItem
              onClick={() => {
                onCapture()
                setAnchorEl(null)
              }}
            >
              <Download fontSize='medium' sx={{ mr: 2 }} />
              PNG
            </MenuItem>
          </Menu>
        </span>
      </div>
      <CardContent id='shareOfVoices'>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <TableContainer>
              <Table size='small' sx={{ overflow: 'auto' }}>
                <TableHead>
                  <TableRow>
                    <TableCell></TableCell>
                    <TableCell>Channel By Sentiment</TableCell>
                    <TableCell sx={{ textAlign: 'center', backgroundColor: '#dadadade', color: 'black' }}>
                      Negative
                    </TableCell>
                    <TableCell sx={{ textAlign: 'center', backgroundColor: '#dadadade', color: 'black' }}>
                      Neutral
                    </TableCell>
                    <TableCell sx={{ backgroundColor: '#dadadade', color: 'black' }}>Positive</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {(tableData || []).map((shareVoice: any, index: number) => {
                    return (
                      <TableRow key={index}>
                        <TableCell sx={{ textAlign: 'right', maxWidth: 120, paddingRight: '0px' }}>
                          {shareVoice?.keyword_name}
                        </TableCell>
                        <TableCell sx={{ minWidth: 100, maxWidth: 300, paddingLeft: '0px', paddingRight: '90px' }}>
                          <NumberOfEachMessage
                            keywordsColor={colors[index]}
                            resultShareOfVoiceChart={shareVoice}
                          />
                        </TableCell>
                        <TableCell colSpan={3} sx={{ maxWidth: 300 }}>
                          <SentimentEachGraph resultSentimentLevel={shareVoice} />
                        </TableCell>
                      </TableRow>
                    )
                  })}
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
        </Grid>
      </CardContent>
    </Paper>
  )
}

export default SentimentLevelsByChannel
