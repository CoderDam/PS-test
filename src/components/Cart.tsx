import { ReactElement, useRef } from 'react'
import { Fade, Slide, useMediaQuery, useTheme } from '@mui/material'

import Book from './Book'
import { StyledContainer, StyledContent, StyledTitle } from '../styles/styledComponents'
import { BookType } from '../types'

const contentStyle = {
  borderBottom: '30px solid #1e0c0c',
  display: 'flex',
  flexDirection: 'column-reverse',
  justifyContent: 'end'
}

interface Props {
  selectedBooks: BookType[]
  onDeleteBook: (book: BookType) => void
}

function Cart ({ selectedBooks, onDeleteBook }: Props): ReactElement {
  const contentRef = useRef(null)
  const theme = useTheme()
  const isDownMd = useMediaQuery(theme.breakpoints.down('md'))

  return (
    <StyledContainer>
      <Fade in>
        <StyledTitle color='primary' variant='h5' paragraph>
          Je vois que vous avez bon goût :)
        </StyledTitle>
      </Fade>
      <StyledContent sx={{ ...contentStyle, height: isDownMd ? 'auto' : 488 }} ref={contentRef}>
        {selectedBooks.map((book, index) => (
          <Slide key={book.isbn} in direction='down' container={contentRef.current}>
            <div>
              <Book book={book} selectable onClick={() => onDeleteBook(book)} zIndex={7 - index} />
            </div>
          </Slide>
        ))}
      </StyledContent>
    </StyledContainer>
  )
}

export default Cart
