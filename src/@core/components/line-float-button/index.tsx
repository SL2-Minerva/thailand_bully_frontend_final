// ** React Imports
import { ReactNode } from 'react'

// ** MUI Imports
import { styled } from '@mui/material/styles'

interface ScrollToTopProps {
  className?: string
  children: ReactNode
}

const ScrollToTopStyled = styled('div')(({ theme }) => ({
  zIndex: 11,
  position: 'fixed',
  right: theme.spacing(6),
  bottom: theme.spacing(10)
}))

const LineFloatButton = (props: ScrollToTopProps) => {
  // ** Props
  const { children, className } = props

  const handleClick = () => {
    const anchor = document.querySelector('body')
    if (anchor) {
      anchor.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <ScrollToTopStyled className={className} onClick={handleClick} role='presentation'>
        {children}
      </ScrollToTopStyled>
  )
}

export default LineFloatButton
