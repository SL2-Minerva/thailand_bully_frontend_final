import { Grid } from '@mui/material'
import TotalMessageLists from '../dashboard/TotalMessageLists'
import WordCloud from '../dashboard/WordCloud'
import { GetWordClouds } from 'src/services/api/dashboards/overall/overallDashboardApi'

interface Props {
    apiParams : any, 
    resultReportPermission : any
    params : any
    setWord: any
    topKeyword: string
}

const WordClouds = (props: Props) => {
    const {apiParams, params, resultReportPermission, setWord, topKeyword} = props
  const { loadingWordClouds, resultWordClouds, total } = GetWordClouds(apiParams)

  return (
    <>
      {resultReportPermission?.includes('13') ? (
        <>
          <Grid container spacing={3} mt={2}>
            <Grid id='chart13' item xs={12} md={6}>
              <WordCloud
                params={params}
                chartId='Chart 13'
                resultWordClouds={resultWordClouds}
                loadingWordClouds={loadingWordClouds}
                setWord={setWord}
              />
            </Grid>
            <Grid id='chart14' item xs={12} md={6}>
              <TotalMessageLists
                params={params}
                chartId='Chart 14'
                resultWordClouds={resultWordClouds}
                loadingWordClouds={loadingWordClouds}
                total={total}
                topKeyword={topKeyword}
              />
            </Grid>
          </Grid>
        </>
      ) : (
        ''
      )}
    </>
  )
}

export default WordClouds
