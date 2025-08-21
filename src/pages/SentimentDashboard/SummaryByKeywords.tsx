// import { Grid, Button, LinearProgress, Typography, Paper } from '@mui/material'
import { LinearProgress, Typography, Paper } from '@mui/material'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import { StyledTooltip } from '../dashboard/overall'
import { Information } from 'mdi-material-ui'
import React, { useEffect } from 'react'
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid'
import clsx from 'clsx'
import { createTheme } from '@mui/material'
import { createStyles, makeStyles } from '@mui/styles'
import Translations from 'src/layouts/components/Translations'

const defaultTheme = createTheme()
export const useStyles = makeStyles(
  () =>
    createStyles({
      root: {
        position: 'relative',
        overflow: 'hidden',
        width: '100%',
        height: 26,
        borderRadius: 2
      },
      value: {
        position: 'absolute',
        lineHeight: '24px',
        width: '100%',
        display: 'flex',
        justifyContent: 'center'
      },
      bar: {
        height: '100%'
      }
    }),
  { defaultTheme }
)
interface ProgressBarProps {
  value: number
  sentiment: string
}

const ProgressBar = React.memo(function ProgressBar(props: ProgressBarProps) {
  const { value, sentiment } = props
  const valueInPercent = value
  const classes = useStyles()

  return (
    <div
      className={classes.root}
      style={{
        border:
          sentiment === 'positive'
            ? `1px solid #63a375`
            : sentiment === 'negative'
            ? `1px solid #c73e1e`
            : sentiment === 'neutral'
            ? `1px solid #f5b95f`
            : `1px solid #cccc00`
      }}
    >
      <div className={classes.value}>{`${valueInPercent.toLocaleString()} %`}</div>
      <div
        className={clsx(classes.bar, {
          low: valueInPercent < 30,
          medium: valueInPercent >= 30 && valueInPercent <= 70,
          high: valueInPercent > 70
        })}
        style={{
          maxWidth: `${valueInPercent}%`,
          backgroundColor:
            sentiment === 'positive'
              ? `#63a375`
              : sentiment === 'negative'
              ? `#c73e1e`
              : sentiment === 'neutral'
              ? `#f5b95f`
              : `#cccc00`
        }}
      />
    </div>
  )
})
export function renderProgress(params: any) {
  return <ProgressBar value={Number(params.value)!} sentiment={params?.field} />
}

export const changeToFixedValue = (params: any) => {
  if (!params) return ''

  return params?.value?.toFixed(2)
}

const SummaryByKeywords = ({
  resultSummaryByKeywords,
  total,
  loadingSummaryByKeywords,

  // topKeyword,
  // setTopKeyword
}: {
  params: any
  chartId: string
  highlight: boolean
  resultSummaryByKeywords: any
  total: number
  loadingSummaryByKeywords: boolean
  topKeyword: string
  setTopKeyword: any
}) => {
  // const [page, setPage] = useState(0);
  // const [pageCount, setPageCount] = useState<number>(0);

  // const handleTopKeyword = (data: string) => {
  //   setTopKeyword(data)
  // }

  // const handleChangePagination = (event: React.ChangeEvent<unknown>, value: number) => {
  //     setPage(value-1);
  // };

  useEffect(() => {
    if (total > 0) {
      // setPageCount(Math.ceil(total / 10));
    }
  }, [total])

  // const reportNo = '5.2.019'

  const columns: GridColDef[] = [
    { field: 'keyword_name', headerName: 'Keywords', flex: 1, sortable: false, align: 'center', headerAlign: 'center' },
    {
      field: 'total_messages',
      headerName: 'Total Message',
      flex: 1,
      align: 'center',
      headerAlign: 'center',
      valueGetter: (params: GridValueGetterParams) => `${params.row.total_messages?.toLocaleString('en-US')}`
    },
    {
      field: 'percentage',
      headerName: ' %',
      flex: 1,
      align: 'center',
      headerAlign: 'center',
      valueGetter: (params: GridValueGetterParams) => `${params.row.percentage?.toFixed(2) + '%'}`
    },
    { field: 'positive', headerName: ' Positive', flex: 1, renderCell: renderProgress, headerAlign: 'center' },
    { field: 'neutral', headerName: ' Neutral', flex: 1, renderCell: renderProgress, headerAlign: 'center' },
    { field: 'negative', headerName: ' Negative', flex: 1, renderCell: renderProgress, headerAlign: 'center' }
  ]

  return (
    <Paper sx={{ border: `3px solid #fff`, borderRadius: 1 }}>
      {loadingSummaryByKeywords && <LinearProgress style={{ width: '100%' }} />}
      <span style={{ display: 'flex', justifyContent: 'flex-start' }}>
        <CardHeader
          title={<Translations text='Sentiment Type by Keyword' />}
          titleTypographyProps={{ variant: 'h6' }}
        />
        <StyledTooltip
          arrow
          title={
            <span>
              <Typography variant='h6' sx={{ color: 'white' }}>
                <Translations text='sentimentChart17Title' />
              </Typography>
              <Typography variant='body2' sx={{ color: 'white' }}>
                <Translations text='sentimentChart17Description' />
              </Typography>
            </span>
          }
        >
          <Information style={{ marginTop: '22px', fontSize: '29px' }} />
        </StyledTooltip>
      </span>
      <CardContent>
        {/* <Grid container spacing={3} mt={2} mb={3}>
          <Grid item xs={12} md={12} sx={{ display: 'flex', justifyContent: 'end' }}>
            <span style={{ marginTop: '7px', marginRight: '20px', fontSize: '20px' }}> Select </span>
            <Button
              variant='contained'
              color={topKeyword === 'top10' ? 'warning' : 'inherit'}
              size='medium'
              sx={{ marginRight: '20px' }}
              onClick={() => {
                handleTopKeyword('top10')
              }}
            >
              <span style={{ color: topKeyword === 'top10' ? 'white' : '#626376' }}>Top 10</span>
            </Button>
            <Button
              variant='contained'
              color={topKeyword === 'top20' ? 'warning' : 'inherit'}
              size='medium'
              sx={{ marginRight: '20px' }}
              onClick={() => {
                handleTopKeyword('top20')
              }}
            >
              <span style={{ color: topKeyword === 'top20' ? 'white' : '#626376' }}>Top 20</span>
            </Button>
            <Button
              variant='contained'
              color={topKeyword === 'top50' ? 'warning' : 'inherit'}
              size='medium'
              sx={{ marginRight: '20px' }}
              onClick={() => {
                handleTopKeyword('top50')
              }}
            >
              <span style={{ color: topKeyword === 'top50' ? 'white' : '#626376' }}>Top 50</span>
            </Button>
            <Button
              variant='contained'
              color={topKeyword === 'top100' ? 'warning' : 'inherit'}
              size='medium'
              sx={{ marginRight: '20px' }}
              onClick={() => {
                handleTopKeyword('top100')
              }}
            >
              <span style={{ color: topKeyword === 'top100' ? 'white' : '#626376' }}>Top 100</span>
            </Button>
            <Button
              variant='contained'
              color={topKeyword === 'all' ? 'warning' : 'inherit'}
              size='medium'
              sx={{ marginRight: '20px' }}
              onClick={() => {
                handleTopKeyword('all')
              }}
            >
              <span style={{ color: topKeyword === 'all' ? 'white' : '#626376' }}>ALL</span>
            </Button>
          </Grid>
        </Grid> */}

        {resultSummaryByKeywords ? (
          <DataGrid
            autoHeight
            rows={resultSummaryByKeywords}
            columns={columns}
            pageSize={10}
            rowsPerPageOptions={[10]}
            getRowId={row => row.id}
          />
        ) : (
          ''
        )}
      </CardContent>
    </Paper>
  )
}

export default SummaryByKeywords
