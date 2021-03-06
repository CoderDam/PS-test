import { ReactElement, useRef, useState } from 'react'
import {
  Box,
  Container,
  Fade,
  Grid,
  Grow,
  IconButton,
  InputAdornment,
  TextField,
  Theme,
  Typography,
  useMediaQuery,
  useTheme
} from '@mui/material'
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward'
import ClearIcon from '@mui/icons-material/Clear'
import SearchIcon from '@mui/icons-material/Search'

import Books from './components/Books'
import Cart from './components/Cart'
import Offers from './components/Offers'
import { BookType } from './types'

const boxStyle = (theme: Theme): any => ({
  background: 'linear-gradient(to right, #1e0c0c, #6f4e37 7% 93%, #1e0c0c)',
  display: 'flex',
  flexDirection: 'column',
  height: '100vh',
  overflowX: 'hidden',
  // keep the scrollbar visible to avoid UI jumps
  overflowY: 'scroll',
  // ...but make it discreet, on Firefox
  scrollbarWidth: 'thin',
  scrollbarColor: '#4b3621 #1e0c0c',
  // ...and Chrome, Edge, Safari
  '::-webkit-scrollbar': {
    width: 8
  },
  '::-webkit-scrollbar-track': {
    background: '#1e0c0c'
  },
  '::-webkit-scrollbar-thumb': {
    background: '#4b3621',
    borderRadius: 8
  }
})
const buttonContainerStyle = (theme: Theme): any => ({
  bottom: theme.spacing(3),
  left: '50vw',
  position: 'fixed',
  transform: 'translateX(-50%)',
  zIndex: 20
})
const buttonStyle = (theme: Theme): any => ({
  backgroundColor: theme.palette.primary.light,
  ':active, :hover': {
    backgroundColor: theme.palette.primary.dark
  }
})
const getIconStyle = (isFocus: boolean) => (theme: Theme): any => ({
  color: isFocus ? theme.palette.primary.main : 'transparent',
  transition: theme.transitions.create('color')
})

function App (): ReactElement {
  const [selectedBooks, setSelectedBooks] = useState<BookType[]>([])
  const [search, setSearch] = useState<string>('')
  const [isFocus, setIsFocus] = useState<boolean>(false)
  const theme = useTheme()
  const isDownMd = useMediaQuery(theme.breakpoints.down('md'))
  const boxRef = useRef<HTMLElement>(null)

  const onScrollBottom = (): void => boxRef.current?.scrollTo?.({ top: 10000, behavior: 'smooth' })
  const onAddBook = (book: BookType): void => setSelectedBooks((prevBooks) => [...prevBooks, book])
  const onDeleteBook = (book: BookType): void =>
    setSelectedBooks((prevBooks) => prevBooks.filter((prevBook) => prevBook.isbn !== book.isbn))

  return (
    <Box sx={boxStyle} ref={boxRef}>
      <Container
        sx={{
          backgroundColor: isDownMd ? '#6f4e37' : 'transparent',
          flex: '1 0 auto',
          paddingBottom: theme.spacing(4),
          paddingTop: theme.spacing(2)
        }}
      >
        <Typography
          variant='h4'
          align='center'
          color='primary'
          paragraph
          sx={{ padding: theme.spacing(0, 2) }}
        >
          Bienvenue dans la biblioth??que d'
          <strong>Henry Potier</strong>
        </Typography>
        <Box sx={{ textAlign: 'center' }}>
          <TextField
            inputProps={{
              style: {
                textAlign: 'center',
                color: theme.palette.secondary.main
              }
            }}
            InputProps={{
              onFocus: () => setIsFocus(true),
              onBlur: () => setIsFocus(false),
              startAdornment: (
                <InputAdornment position='start'>
                  <SearchIcon sx={getIconStyle(isFocus)} />
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position='end'>
                  <IconButton onClick={() => setSearch('')}>
                    <ClearIcon sx={getIconStyle(isFocus)} />
                  </IconButton>
                </InputAdornment>
              )
            }}
            variant='standard'
            value={search}
            onChange={(event) => setSearch(event.target.value.trimStart())}
          />
        </Box>
        <Grid container spacing={3}>
          <Grid item xs={12} md={7} sx={{ display: 'flex' }}>
            <Books
              search={search}
              selectedBooks={selectedBooks}
              onAddBook={onAddBook}
              onDeleteBook={onDeleteBook}
            />
          </Grid>
          {selectedBooks.length > 0 && (
            <Grid
              item
              xs={12}
              md={5}
              sx={{ display: 'flex', paddingBottom: (theme) => theme.spacing(3) }}
            >
              <Cart
                search={search}
                selectedBooks={selectedBooks}
                onDeleteBook={onDeleteBook}
              />
            </Grid>
          )}
        </Grid>
        {selectedBooks.length > 1 && (
          <Fade in>
            <Offers selectedBooks={selectedBooks} />
          </Fade>
        )}
      </Container>
      {isDownMd && selectedBooks.length > 0 && (
        <Box sx={buttonContainerStyle}>
          <Grow in>
            <IconButton size='large' sx={buttonStyle} onClick={onScrollBottom}>
              <ArrowDownwardIcon />
            </IconButton>
          </Grow>
        </Box>
      )}
    </Box>
  )
}

export default App
