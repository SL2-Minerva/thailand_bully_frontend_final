import React, { forwardRef, ReactElement, Ref } from 'react'
import Fade, { FadeProps } from '@mui/material/Fade'
import { Box, Card, Dialog, DialogContent, IconButton, Typography } from '@mui/material'
import Close from 'mdi-material-ui/Close'

const Transition = forwardRef(function Transition(
  props: FadeProps & { children?: ReactElement<any, any> },
  ref: Ref<unknown>
) {
  return <Fade ref={ref} {...props} />
})

interface ImagePopupProps {
  showDialog: boolean
  setShowDialog: (open: boolean) => void
  imageUrl: string
  title?: string
}

const ImagePopupDialog = ({ showDialog, setShowDialog, imageUrl, title }: ImagePopupProps) => {
  const onClose = () => {
    setShowDialog(false)
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
        <DialogContent sx={{ pb: 6, pt: { xs: 8, sm: 12.5 }, position: 'relative', textAlign: 'center' }}>
          <IconButton size='small' onClick={onClose} sx={{ position: 'absolute', right: '1rem', top: '1rem' }}>
            <Close />
          </IconButton>

          {title && (
            <Typography variant='h5' sx={{ mb: 3, lineHeight: '2rem' }}>
              {title}
            </Typography>
          )}

          {/* <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <img

              src={'https://socialguard.online/images/picture_post/' + imageUrl}
              alt={title || 'Image'} 
              style={{ 
                maxWidth: '100%', 
                maxHeight: '80vh', 
                borderRadius: '8px' 
              }} 
            />
          </Box> */}

          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '200px' }}>
            {imageUrl ? (
              <img
                src={'https://socialguard.online/images/picture_post/' + imageUrl}
                alt={title || 'Image'}
                style={{
                  maxWidth: '100%',
                  maxHeight: '80vh',
                  borderRadius: '8px'
                }}
              />
            ) : (
              <Typography variant='body1' color='textSecondary'>
                No Image
              </Typography>
            )}
          </Box>
        </DialogContent>
      </Dialog>
    </Card>
  )
}

export default ImagePopupDialog
