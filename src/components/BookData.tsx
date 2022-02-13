import { ReactElement } from 'react'
import { Divider, Grid, styled, Typography } from '@mui/material'

import { BookType } from '../types'
import { StyledPaper } from '../styles/styledComponents'

const Img = styled('img')(({ theme }) => ({
  display: 'block',
  marginBottom: theme.spacing(2),
  width: '100%'
}))

function BookData ({ book }: { book: BookType}): ReactElement {
  return (
    <StyledPaper>
      <Img
        src={book.cover}
        alt={book.title}
      />
      <Grid container spacing={2}>
        <Grid item xs>
          <Typography sx={{ lineHeight: 1 }} paragraph>
            {book.title}
          </Typography>
        </Grid>
        <Grid item>
          <Typography>
            <code>{book.price.toLocaleString(undefined, { minimumFractionDigits: 2 })}€</code>
          </Typography>
        </Grid>
      </Grid>
      <Divider sx={{ marginBottom: (theme) => theme.spacing(1) }} />
      {book.synopsis.map((line) => (
        <Typography
          key={line}
          variant='caption'
          sx={(theme) => ({
            display: 'block',
            lineHeight: 1.3,
            textIndent: theme.spacing(3)
          })}
        >
          {line}
        </Typography>
      ))}
    </StyledPaper>
  )
}

export default BookData
