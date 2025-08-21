import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import { Grid } from '@mui/material'

// ** Third Party Imports
import { ApexOptions } from 'apexcharts'

// ** Custom Components Imports
import ReactApexcharts from 'src/@core/components/react-apexcharts'

const DailyMessagePercentage = () => {

    const series = [ 44, 55, 41, 17, 15];
    const options: ApexOptions = {
        chart: {
        type: 'donut',
        },
        labels: ["Keyword 1", "Keyword 2", "Keyword 3", "Keyword 4", "Keyword 5"],
        colors : ['#ed7d31', '#ffc000', '#5b9bd5', '#70ad47', '#c00000'],
        fill : {
            colors : ['#ed7d31', '#ffc000', '#5b9bd5', '#70ad47', '#c00000'],
        },
        legend : {
            position: 'top',
            itemMargin: {
                horizontal: 5,
                vertical: 0
            },
        }
    }

    return ( 
        
        <Card>
            <CardHeader title="Percentage of Message" titleTypographyProps={{ varient:'h6' }}
                subheader="Period over Period Comparison"
                subheaderTypographyProps={{ varient: 'h6' }}
            />
            <CardContent>
                <Grid container spacing={1}>
                    <Grid item xs={12} md={6} >
                         <ReactApexcharts type='donut' options={options} series={series} height={305}/>  
                         Current Period
                    </Grid>
                    <Grid item xs={12} md={6}>
                         <ReactApexcharts type='donut' options={options} series={series} height={305}/>  
                         Previous Period
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
        
    )

}

export default DailyMessagePercentage