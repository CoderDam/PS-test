import { createTheme, Theme } from '@mui/material'

export const theme: Theme = createTheme({
  typography: {
    fontFamily: 'Redressed, cursive'
  },
  palette: {
    primary: {
      main: '#edc9af'
    }
  }
})

// log the theme to help styling white developping the app
console.log({ theme })
