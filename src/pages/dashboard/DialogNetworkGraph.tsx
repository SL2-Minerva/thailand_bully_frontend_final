import { forwardRef, ReactElement, Ref } from 'react'
import Fade, { FadeProps } from '@mui/material/Fade'
import { Box, Card, Dialog, DialogContent, IconButton, Typography, Grid, LinearProgress } from '@mui/material'
import Close from 'mdi-material-ui/Close'
import Graph from 'react-graph-vis'

// import 'react-graph-vis/node_modules/vis-network/dist/dist/vis-network.css'

import 'vis-network/styles/vis-network.css'

import { GetNetworkGraph } from 'src/services/api/dashboards/overall/overallDashboardApi'
import Translations from 'src/layouts/components/Translations'

// import { CampaignList } from 'src/services/api/campaign/CampaignAPI';

const Transition = forwardRef(function Transition(
  props: FadeProps & { children?: ReactElement<any, any> },
  ref: Ref<unknown>
) {
  return <Fade ref={ref} {...props} />
})

interface DialogInfoProps {
  showDialog: boolean
  setShowDialog: any
  currentData?: any
  params?: any
  keywordId?: number | string
  messageId?: number | string
  setKeywordId?: any
  setMessageId?: any
  reportNo?: string
  title?: string
}

const DialogNetworkGraph = (props: DialogInfoProps) => {
  const { showDialog, setShowDialog, params, keywordId, messageId, setMessageId, reportNo, title } = props
  const { currentData: resultNetworkGraph, loadingNetworkGraph } = GetNetworkGraph(
    params?.campaign,
    params?.platformId,
    params?.date,
    params?.endDate,
    params?.period,
    params?.previousDate,
    params?.previousEndDate,
    keywordId,
    messageId,
    !!reportNo
  )

  const initialGraph = {
    nodes: [],
    edges: []
  }

  // const [ graph, setGraph ] = useState(initialGraph);

  const options = {
    layout: {
      hierarchical: false
    },
    edges: {
      color: '#000000',
      dashes: false
    },
    height: '500px'
  }

  const onClose = () => {
    setShowDialog(false)
    setMessageId('')
  }

  const cardTitle = title ? title : 'Social Network Analysis'

  // useEffect(() => {
  //   if (resultNetworkGraph) {
  //     console.log("get data from api", resultNetworkGraph);
  //     setGraph(resultNetworkGraph);
  //   }
  // },[resultNetworkGraph]);

  return (
    <Card>
      <Dialog
        fullWidth
        open={showDialog}
        maxWidth='lg'
        scroll='body'
        onClose={onClose}
        TransitionComponent={Transition}
      >
        <DialogContent sx={{ pb: 6, pt: { xs: 8, sm: 12.5 }, position: 'relative' }}>
          <IconButton size='small' onClick={onClose} sx={{ position: 'absolute', right: '1rem', top: '1rem' }}>
            <Close />
          </IconButton>

          {loadingNetworkGraph && <LinearProgress style={{ width: '100%' }} />}
          <Box sx={{ mb: 8, textAlign: 'center' }}>
            <Typography variant='h5' sx={{ mb: 3, lineHeight: '2rem' }}>
              <Translations text={cardTitle} />
            </Typography>
          </Box>

          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Graph graph={resultNetworkGraph ? resultNetworkGraph : initialGraph} options={options} />
            </Grid>
          </Grid>
        </DialogContent>
      </Dialog>
    </Card>
  )
}

export default DialogNetworkGraph
