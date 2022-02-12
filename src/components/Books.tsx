import { ReactElement } from 'react'
import axios from 'axios'
import { useQuery } from 'react-query'
import { Box, Grow, Grid, styled, Typography, useMediaQuery, useTheme } from '@mui/material'

import Loader from './Loader'
import { BookType, ErrorType } from '../types'
import Book from './Book'
import { StyledContainer, StyledContent, StyledTitle } from '../styles/styledComponents'

const errorStyle = {
  backgroundColor: 'black',
  color: 'white',
  fontFamily: 'monospace',
  opacity: 0.75
}
const Shelf = styled(Grid)(({ theme }) => ({
  borderBottom: '30px solid #1e0c0c',
  flexWrap: 'nowrap',
  [theme.breakpoints.down('sm')]: {
    padding: '0 2vh'
  },
  [theme.breakpoints.only('sm')]: {
    padding: '0 10vh'
  },
  [theme.breakpoints.up('md')]: {
    padding: '0 7vh 0'
  }
}))

interface Props {
  selectedBooks: BookType[]
  onAddBook: (book: BookType) => void
  onDeleteBook: (book: BookType) => void
}

function Books ({ selectedBooks, onAddBook, onDeleteBook }: Props): ReactElement {
  const theme = useTheme()
  const isDownMd = useMediaQuery(theme.breakpoints.down('md'))

  const { data, isLoading, isIdle, isError, error } = useQuery<BookType[], ErrorType>(
    'books',
    async () => await axios.get('https://henri-potier.techx.fr/books').then((res) => res.data)
  )

  const selectedIsbn: string[] = selectedBooks.map((book: BookType) => book.isbn)

  return (
    <StyledContainer>
      <StyledTitle color='primary' variant='h5' paragraph>
        Voici les livres que vous pouvez consulter ici :
      </StyledTitle>
      <StyledContent>
        {(isLoading || isIdle) && <Loader ratio={isDownMd ? 0.7 : 1} />}
        {isError && (
          <div>
            <Typography color='error' paragraph>
              <em>Sacrebleu, la bibliothèque a perdu ses ouvrages...</em>
            </Typography>
            {(error != null) && <Box p={2} sx={errorStyle}>{error.message}</Box>}
          </div>
        )}
        {(data != null) && (
          <Shelf container>
            {data.map((book, index) => (
              <Grow key={book.isbn} in timeout={500} style={{ transitionDelay: `${index * 35}ms` }}>
                <Grid item sx={{ flex: '1 0 auto' }}>
                  <Book
                    book={book}
                    isSelected={selectedIsbn.includes(book.isbn)}
                    onClick={
                      () => selectedIsbn.includes(book.isbn)
                        ? onDeleteBook(book)
                        : onAddBook(book)
                    }
                    selectable
                    vertical
                  />
                </Grid>
              </Grow>
            ))}
          </Shelf>
        )}
      </StyledContent>
    </StyledContainer>
  )
}

export default Books
