import { Box, styled, Typography } from '@mui/material'

export const StyledContainer = styled(Box)(({ theme }) => ({
  flex: 1,
  maxWidth: '100vw',
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(1)
  },
  [theme.breakpoints.up('sm')]: {
    padding: theme.spacing(3)
  }
}))

export const StyledContent = styled('div')(({ theme }) => ({
  marginTop: theme.spacing(3),
  [theme.breakpoints.up('md')]: {
    paddingTop: theme.spacing(6)
  }
}))

export const StyledTitle = styled(Typography)(({ theme }) => ({
  [theme.breakpoints.up('md')]: {
    marginTop: theme.spacing(4)
  }
}))
