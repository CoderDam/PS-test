import { ReactElement, useRef, useState } from 'react'
import {
  Box,
  Container,
  Grid,
  Grow,
  IconButton,
  Theme,
  Typography,
  useMediaQuery,
  useTheme
} from '@mui/material'
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward'

import Books from './components/Books'
import Cart from './components/Cart'
import Offers from './components/Offers'
import { BookType } from './types'

const boxStyle = (theme: Theme): any => ({
  backgroundColor: '#6f4e37',
  display: 'flex',
  flexDirection: 'column',
  height: '100vh',
  overflowX: 'hidden',
  overflowY: 'auto',
  padding: theme.spacing(2, 0, 4)
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

function App (): ReactElement {
  const [selectedBooks, setSelectedBooks] = useState<BookType[]>([])
  const theme = useTheme()
  const isDownMd = useMediaQuery(theme.breakpoints.down('md'))
  const boxRef = useRef<HTMLElement>(null)

  const onScrollBottom = (): void => boxRef.current?.scrollTo?.({ top: 10000, behavior: 'smooth' })
  const onAddBook = (book: BookType): void => setSelectedBooks((prevBooks) => [...prevBooks, book])
  const onDeleteBook = (book: BookType): void =>
    setSelectedBooks((prevBooks) => prevBooks.filter((prevBook) => prevBook.isbn !== book.isbn))

  return (
    <Box sx={boxStyle} ref={boxRef}>
      <Typography
        variant='h4'
        align='center'
        color='primary'
        paragraph sx={{ padding: (theme) => theme.spacing(0, 2) }}
      >
        Bienvenue dans la bibliothèque d'
        <strong>Henry Potier</strong>
      </Typography>
      {isDownMd && selectedBooks.length > 0 && (
        <Box sx={buttonContainerStyle}>
          <Grow in>
            <IconButton size='large' sx={buttonStyle} onClick={onScrollBottom}>
              <ArrowDownwardIcon />
            </IconButton>
          </Grow>
        </Box>
      )}
      <Container sx={{ flex: '1 0 auto' }}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={7} sx={{ display: 'flex' }}>
            <Books
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
              <Cart selectedBooks={selectedBooks} onDeleteBook={onDeleteBook} />
            </Grid>
          )}
        </Grid>
        {selectedBooks.length > 1 && <Offers selectedBooks={selectedBooks} />}
      </Container>
    </Box>
  )
}

export default App
