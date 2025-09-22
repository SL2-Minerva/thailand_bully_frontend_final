import React, { forwardRef, ReactElement, Ref } from 'react'
import Fade, { FadeProps } from '@mui/material/Fade'
import { Box, Card, Dialog, DialogContent, IconButton, Typography, Grid, Button } from '@mui/material'
import Close from 'mdi-material-ui/Close'

import 'react-graph-vis/node_modules/vis-network/dist/dist/vis-network.css'

// import 'vis-network/styles/vis-network.css'

import Translations from 'src/layouts/components/Translations'
import { DeleteMessage } from 'src/services/api/dashboards/overall/overallDashboardApi'

// import FormLabel from '@mui/material/FormLabel'
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
  id: string
  reload: boolean
  setReload: any
}

const DeleteConfirmDialog = (props: DialogInfoProps) => {
  const { showDialog, setShowDialog, id, reload, setReload } = props
  const { deleteMessages } = DeleteMessage()

  const onClose = () => {
    setShowDialog(false)
  }

  const handleDelete = () => {
    deleteMessages(id)
      .then(result => {
        if (result) {
          onClose()
          setReload(!reload)
        }
      })
      .catch(ex => {
        if (ex) {
          console.log('something went wrong')
        }
      })
  }

  return (
    <Card>
      <Dialog
        fullWidth
        open={showDialog}
        maxWidth='sm'
        scroll='body'
        onClose={onClose}
        TransitionComponent={Transition}
      >
        <DialogContent sx={{ pb: 6, pt: { xs: 8, sm: 12.5 }, position: 'relative' }}>
          <IconButton size='small' onClick={onClose} sx={{ position: 'absolute', right: '1rem', top: '1rem' }}>
            <Close />
          </IconButton>

          <Box sx={{ mb: 8, textAlign: 'center' }}>
            <Typography variant='h5' sx={{ mb: 3, lineHeight: '2rem' }}>
              <Translations text={'Are you sure to delete?'} />
            </Typography>
          </Box>

          <Grid container spacing={1}>
            <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center' }}>
              <Button variant='contained' color='error' onClick={handleDelete} sx={{ mr: 2 }}>
                DELETE
              </Button>
              <Button variant='contained' color='inherit' onClick={onClose}>
                CANCEL
              </Button>
            </Grid>
          </Grid>
        </DialogContent>
      </Dialog>
    </Card>
  )
}

export default DeleteConfirmDialog
