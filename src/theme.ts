import { createTheme, Theme } from '@mui/material'

export const theme: Theme = createTheme({
  typography: {
    fontFamily: 'Redressed, cursive',
    fontSize: 20
  },
  components: {
    MuiTooltip: {
      styleOverrides: {
        tooltip: {
          display: '-webkit-box',
          fontSize: '1.2rem',
          maxWidth: '55vw',
          overflow: 'hidden',
          WebkitLineClamp: 7,
          WebkitBoxOrient: 'vertical'
        }
      }
    }
  },
  palette: {
    primary: {
      main: '#edc9af'
    },
    secondary: {
      main: '#f4c430'
    },
    error: {
      main: '#ff3636'
    }
  }
})

// log the theme to help styling white developping the app
console.log({ theme })
