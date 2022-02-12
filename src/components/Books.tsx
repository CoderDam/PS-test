import { ReactElement } from 'react'
import axios from 'axios'
import { useQuery } from 'react-query'
import { Box, Grid, styled, Typography } from '@mui/material'

import Loader from './Loader'
import { BookType, ErrorType } from '../types'

const bookStyle = {
  backgroundColor: '#4b3621',
  border: '2px solid black',
  display: 'flex',
  flex: '1 0 auto',
  flexDirection: 'column',
  height: 410,
  justifyContent: 'center',
  writingMode: 'vertical-lr'
}
const errorStyle = {
  backgroundColor: 'black',
  color: 'white',
  fontFamily: 'monospace',
  opacity: 0.75
}
const Container = styled(Box)(({ theme }) => ({
  flex: 1,
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(1)
  },
  [theme.breakpoints.up('sm')]: {
    padding: theme.spacing(3)
  }
}))
const Title = styled(Typography)(({ theme }) => ({
  [theme.breakpoints.up('md')]: {
    marginTop: theme.spacing(4)
  }
}))
const Shelf = styled(Grid)(({ theme }) => ({
  borderBottom: '30px solid #1e0c0c',
  flexWrap: 'nowrap',
  marginTop: theme.spacing(3),
  [theme.breakpoints.down('sm')]: {
    padding: '0 2vh'
  },
  [theme.breakpoints.only('sm')]: {
    padding: '0 10vh'
  },
  [theme.breakpoints.up('md')]: {
    padding: '50px 7vh 0'
  }
}))

function Books (): ReactElement {
  const { data, isLoading, isIdle, isError, error } = useQuery<BookType[], ErrorType>(
    'books',
    async () => await axios.get('https://henri-potier.techx.fr/books').then((res) => res.data)
  )

  return (
    <Container>
      <Title color='primary' variant='h5' paragraph>
        Voici les livres que vous pouvez consulter ici :
      </Title>
      {(isLoading || isIdle) && <Loader ratio={0.67} />}
      {isError && (
        <div>
          <Typography color='error' paragraph>
            <em>Sacrebleu, la bibliothèque a perdu ses ouvrages...</em>
          </Typography>
          {(error != null) && <Box p={2} sx={errorStyle}>{error.message}</Box>}
        </div>
      )}
      {(data != null) &&
        <Shelf container>
          {data.map((book) => (
            <Grid
              item
              key={book.isbn}
              sx={bookStyle}
            >
              <Typography color='secondary' align='center'>
                ~ <em>{book.title}</em> ~
              </Typography>
            </Grid>
          ))}
        </Shelf>}
    </Container>
  )
}

export default Books
