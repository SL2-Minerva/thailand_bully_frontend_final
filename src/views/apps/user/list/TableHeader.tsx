// ** MUI Imports
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'

// ** Icons Imports
import ExportVariant from 'mdi-material-ui/ExportVariant'
import Translations from 'src/layouts/components/Translations'

interface TableHeaderProps {
  value: string
  toggle: () => void
  handleFilter: (val: string) => void
}

const TableHeader = (props: TableHeaderProps) => {
  // ** Props
  const { handleFilter, toggle, value } = props

  return (
    <Box sx={{ p: 5, pb: 3, display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'right' }}>
      <Box sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center' }}>
        <Button sx={{ mb: 2, mr: 2 }} href={`/apps/user/list/RegisterManagement`} variant='contained'>
          <Translations text='REGISTER MGT' />
        </Button>
        <Button sx={{ mb: 2 }} onClick={toggle} variant='contained'>
          <Translations text='ADD USER' />
        </Button>
      </Box>
    </Box>
  )
}

export default TableHeader
