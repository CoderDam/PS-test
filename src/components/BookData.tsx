import { ReactElement } from 'react'
import { Box, Divider, Grid, styled, Typography } from '@mui/material'

import { BookType } from '../types'

const Img = styled('img')(({ theme }) => ({
  display: 'block',
  marginBottom: theme.spacing(2),
  width: '100%'
}))

function BookData ({ book }: { book: BookType}): ReactElement {
  return (
    <Box
      sx={(theme) => ({
        backgroundColor: theme.palette.primary.main,
        marginTop: theme.spacing(3),
        padding: theme.spacing(2)
      })}
    >
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
            <code>{book.price}€</code>
          </Typography>
        </Grid>
      </Grid>
      <Typography align='right' sx={{ fontSize: '90%' }} gutterBottom>
        <code>{book.isbn}</code>
      </Typography>
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
    </Box>
  )
}

export default BookData
