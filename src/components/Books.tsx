import { ReactElement } from 'react'
import axios from 'axios'
import { useQuery } from 'react-query'
import {
  Grow,
  Grid,
  styled,
  Typography,
  useMediaQuery,
  useTheme
} from '@mui/material'

import Loader from './Loader'
import Book from './Book'
import BookData from './BookData'
import { BookType, ErrorType } from '../types'
import { StyledContainer, StyledContent, StyledError, StyledTitle } from '../styles/styledComponents'

const Shelf = styled(Grid)(({ theme }) => ({
  borderBottom: '30px solid #1e0c0c',
  flexWrap: 'nowrap',
  height: 440,
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
  search: string
  selectedBooks: BookType[]
  onAddBook: (book: BookType) => void
  onDeleteBook: (book: BookType) => void
}

function Books ({ search, selectedBooks, onAddBook, onDeleteBook }: Props): ReactElement {
  const theme = useTheme()
  const isDownMd = useMediaQuery(theme.breakpoints.down('md'))

  const { data, isLoading, isIdle, isError, error } = useQuery<BookType[], ErrorType>(
    'books',
    async () => await axios.get('https://henri-potier.techx.fr/books').then((res) => res.data)
  )
  const filtered = (data != null)
    ? data?.filter((book) => book.title.toUpperCase().includes(search.toUpperCase()))
    : []
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
            {(error != null) && <StyledError>{error.message}</StyledError>}
          </div>
        )}
        {(data != null) && (
          <Shelf container>
            {filtered.map((book, index) => (
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
                    search={search}
                    tooltipItems={['title', 'price', 'hr', 'synopsis']}
                    vertical
                  />
                </Grid>
              </Grow>
            ))}
          </Shelf>
        )}
        {isDownMd && selectedBooks.length > 0 && (
          <BookData book={selectedBooks[selectedBooks.length - 1]} />
        )}
      </StyledContent>
    </StyledContainer>
  )
}

export default Books
