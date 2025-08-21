import { Box, Grid, Typography } from '@mui/material'
import Translations from 'src/layouts/components/Translations'
import { GraphicColors } from 'src/utils/const'

interface customeLabel {
  data: any
  labels: any
  color: any
  totalUsers?: number
  showValue?: boolean
  itemsCountPerPage?: number
}

const CustomeLabels = ({
  labels = [],
  color = GraphicColors
}: // showValue = false
// data,
// itemsCountPerPage = 10
customeLabel) => {
  // const page = 1

  return (
    <Grid container spacing={2}>
      {labels.map((label: string, key: number) => {
        return (
          <Grid key={key} item xs={4} style={{ display: 'flex', justifyContent: 'inherit' }}>
            <Box
              style={{
                width: 10,
                height: 10,
                marginTop: '4px',
                backgroundColor: color[key],
                borderRadius: '100%'
              }}
              mr={0.3}
            ></Box>
            <Box><Typography sx={{ fontSize: '12px' }}><Translations text={label}/></Typography></Box>
          </Grid>
        )
      })}
    </Grid>
  )
}

export default CustomeLabels
