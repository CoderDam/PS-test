import { ReactElement } from 'react'
import { Box, Grid, Typography } from '@mui/material'

import Books from './components/Books'

const boxStyle = {
  backgroundColor: '#6f4e37',
  display: 'flex',
  flexDirection: 'column',
  height: '100vh',
  overflow: 'auto'
}

function App (): ReactElement {
  return (
    <Box p={2} sx={boxStyle}>
      <Typography variant='h4' align='center' color='primary' paragraph>
        Bienvenue dans la bibliothèque d'
        <strong>Henry Potier</strong>
      </Typography>
      <Grid container spacing={3} sx={{ flex: '1 0 auto' }}>
        <Grid item xs={12} md={7} sx={{ display: 'flex' }}>
          <Books />
        </Grid>
      </Grid>
    </Box>
  )
}

export default App
