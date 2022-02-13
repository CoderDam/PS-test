import { ReactElement, useRef } from 'react'
import { Button, Fade, Slide, styled, Theme, useMediaQuery, useTheme } from '@mui/material'

import Book from './Book'
import { StyledContainer, StyledContent, StyledTitle } from '../styles/styledComponents'
import { BookType } from '../types'

const BgImage = styled('div')<{ src: string }>(({ theme, src }) => ({
  background: `url(${src})`,
  backgroundRepeat: 'no-repeat',
  backgroundPosition: 'top center',
  backgroundSize: 'contain',
  boxShadow: 'inset 0 -20px 50px 100px #6f4e37',
  left: 0,
  height: '100%',
  position: 'absolute',
  top: -theme.spacing(3),
  width: '100%'
}))
const contentStyle = {
  borderBottom: '30px solid #1e0c0c',
  display: 'flex',
  flexDirection: 'column-reverse',
  justifyContent: 'end',
  position: 'relative'
}
const deleteStyle = (theme: Theme): any => ({
  bottom: -30,
  left: '50%',
  opacity: 0.2,
  padding: theme.spacing(0, 3.75),
  position: 'absolute',
  textTransform: 'unset',
  transform: 'translateX(-50%)',
  transition: theme.transitions.create('opacity'),
  ':hover': {
    opacity: 1
  }
})

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
        {!isDownMd && (
          <BgImage src={selectedBooks[selectedBooks.length - 1].cover} />
        )}
        <Button
          size='small'
          sx={deleteStyle}
          onClick={() => selectedBooks.map((book) => onDeleteBook(book))}
        >
          Vider le panier
        </Button>
        {selectedBooks.map((book, index) => (
          <Slide
            key={book.isbn}
            in
            direction='down'
            container={contentRef.current}
            style={{ transitionTimingFunction: 'cubic-bezier(1, 0.12, 1, 0.86)' }}
          >
            <div>
              <Book
                book={book}
                onClick={() => onDeleteBook(book)}
                zIndex={7 - index}
                tooltipItems='price'
                tooltipPlacement='right'
              />
            </div>
          </Slide>
        ))}
      </StyledContent>
    </StyledContainer>
  )
}

export default Cart
