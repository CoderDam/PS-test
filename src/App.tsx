import { ReactElement } from 'react'
import { Box, Typography } from '@mui/material'

function App (): ReactElement {
  return (
    <Box
      sx={{
        backgroundColor: '#6f4e37',
        height: '100vh'
      }}
    >
      <Typography variant='h2' align='center' color='primary' gutterBottom>
        Bienvenue dans la bibliothèque d'Henry Potier
      </Typography>
    </Box>
  )
}

export default App
