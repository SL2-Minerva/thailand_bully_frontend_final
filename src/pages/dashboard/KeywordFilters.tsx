import { Button, CardContent, CardHeader, Grid, LinearProgress, Paper } from '@mui/material'
import { useEffect } from 'react'
import { GetKeyWordsList } from 'src/services/api/dashboards/overall/overallDashboardApi'
import { wordBreaks } from './overall'
import Translations from 'src/layouts/components/Translations'

interface Props {
  campaign: string
  keyword: string
  setKeyword: any
  filterKeyword: any
  setFilterKeyword: any
  checkKeywordId: any
  setKeywordLoading?: any
}

const KeywordFilters = (data: Props) => {
  const { campaign, keyword, setKeyword, filterKeyword, setFilterKeyword, checkKeywordId, setKeywordLoading } = data

  const { resultKeywordList, loadingKeywordList, keywordsColor } = GetKeyWordsList(campaign)

  useEffect(() => {
    if (setKeywordLoading) {
      setKeywordLoading(loadingKeywordList)
    }
  }, [loadingKeywordList])

  return (
    <Grid container spacing={2} mt={2}>
      <Grid item xs={12}>
        <Paper sx={{ border: `3px solid #fff`, borderRadius: 1 }} >
          {loadingKeywordList && <LinearProgress style={{ width: '100%' }} />}
          <CardHeader title={<Translations text='Filter' />}></CardHeader>
          <CardContent>
            <Grid container spacing={4}>
              <Grid item xs={6} md={1}>
                <Button
                  fullWidth
                  onClick={() => {
                    if (keyword === 'all') {
                      setKeyword('')
                    } else {
                      setKeyword('all')
                      setFilterKeyword([])
                    }
                  }}
                  variant='contained'
                  color={keyword === 'all' ? 'primary' : 'secondary'}
                >
                  ALL
                </Button>
              </Grid>

              {resultKeywordList &&
                (resultKeywordList || [])?.map((keywords: any, index: number) => {
                  return (
                    <Grid item xs={6} md={1.4} key={index}>
                      <Button
                        fullWidth
                        sx={{
                          bgcolor:
                            filterKeyword?.indexOf(keywords?.id) > -1
                              ? keywordsColor && keywordsColor[index] !== '#'
                                ? keywordsColor[index]
                                : 'black'
                              : keyword === 'all'
                              ? keywordsColor && keywordsColor[index] !== '#'
                                ? keywordsColor[index]
                                : 'black'
                              : 'grey',
                          ':hover': {
                            bgcolor:
                              filterKeyword?.indexOf(keywords?.id) > -1
                                ? keywordsColor && keywordsColor[index] !== '#'
                                  ? keywordsColor[index]
                                  : 'black'
                                : keyword === 'all'
                                ? keywordsColor && keywordsColor[index] !== '#'
                                  ? keywordsColor[index]
                                  : 'black'
                                : 'grey'
                          }
                        }}
                        onClick={() => {
                          checkKeywordId(filterKeyword, keywords?.id)
                        }}
                        variant='contained'
                      >
                        <span style={{ wordWrap: 'break-word' }}>{wordBreaks(keywords.name)}</span>
                      </Button>
                    </Grid>
                  )
                })}
            </Grid>
          </CardContent>
        </Paper>
      </Grid>
    </Grid>
  )
}

export default KeywordFilters
