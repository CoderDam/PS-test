import { ReactElement } from 'react'
import axios from 'axios'
import { useQuery } from 'react-query'
import { Box, Grid, Typography, useMediaQuery, useTheme } from '@mui/material'

import { BookType, ErrorType, OfferType } from '../types'
import { StyledError, StyledPaper } from '../styles/styledComponents'
import Loader from './Loader'
import Offer from './Offer'

function Comparison ({ selectedBooks }: { selectedBooks: BookType[] }): ReactElement {
  const theme = useTheme()
  const isDownMd = useMediaQuery(theme.breakpoints.down('md'))

  const selectedIsbn: string[] = selectedBooks.map((book: BookType) => book.isbn)
  const totalBeforeOffers = selectedBooks.reduce((acc, curr) => (acc + curr.price), 0)

  const { data, isLoading, isIdle, isError, error } = useQuery<{ offers: OfferType[] }, ErrorType>(
    ['offers', ...selectedIsbn],
    async () => (
      await axios
        .get(`https://henri-potier.techx.fr/books/${selectedIsbn.join(',')}/commercialOffers`)
        .then((res) => res.data)
    )
  )

  return (
    <StyledPaper sx={{ minHeight: 325, marginBottom: (theme) => theme.spacing(8) }}>
      <Typography variant='h5' paragraph>Il est temps de trouver des offres pour ces livres...</Typography>
      {(isLoading || isIdle) && (
        <Box sx={{ textAlign: 'center' }}>
          <Loader ratio={isDownMd ? 0.7 : 1} />
        </Box>
      )}
      {isError && (
        <div>
          <Typography color='error' paragraph>
            <em>Bigre, le comparateur semble disfonctionner...</em>
          </Typography>
          {(error != null) && <StyledError>{error.message}</StyledError>}
        </div>
      )}
      {// eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
        (data?.offers?.length)
          ? (
            <Grid container spacing={2}>
              {data.offers.map((offer) => (
                <Grid key={offer.type} item xs={12} md sx={{ textAlign: 'center' }}>
                  <Offer offer={offer} total={totalBeforeOffers} />
                </Grid>
              ))}
            </Grid>
            )
          : (
              isLoading ||
                <Typography>
                  <big>
                    <strong>Quel malheur !</strong>
                  </big>
                  {' '}
                  Aucune offre n'est disponible pour cette sélection
                </Typography>
            )
      }
    </StyledPaper>
  )
}

export default Comparison
