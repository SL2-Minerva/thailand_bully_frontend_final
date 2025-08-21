import { Box, LinearProgress, Typography } from "@mui/material"

const LinearProgressBar = ({value} : {value:any}) => {
    
    return (
        <>
            <Box sx={{ display: 'flex', mb: 2, justifyContent: 'start' }}>
                <Typography variant='body2' sx={{ fontWeight: 600, color: 'text.primary' }}>
                     {value}%
                </Typography>
            </Box>
            <LinearProgress value={value} variant='determinate' color="warning" sx={{ height: 10, borderRadius: '5px' }} />
        </>
        
    )
}

export default LinearProgressBar