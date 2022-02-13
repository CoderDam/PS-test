import { ForwardedRef, forwardRef, ReactElement } from 'react'
import axios from 'axios'
import { useQuery } from 'react-query'
import { Box, Grid, Typography, useMediaQuery, useTheme } from '@mui/material'
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward'

import { BookType, CompleteOfferType, ErrorType, OfferType } from '../types'
import { StyledError, StyledPaper } from '../styles/styledComponents'
import { getDiscount } from '../utils'
import Loader from './Loader'
import Offer from './Offer'

function Offers (
  { selectedBooks }: { selectedBooks: BookType[] },
  ref: ForwardedRef<HTMLElement>
): ReactElement {
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

  let completeOffers: CompleteOfferType[] = []
  if ((data?.offers != null) && (data.offers.length > 0)) {
    completeOffers = data.offers.map((offer) => ({
      ...offer,
      discount: getDiscount(offer, totalBeforeOffers)
    }))
    completeOffers.sort((a, b) => b.discount - a.discount)
  }

  return (
    <StyledPaper sx={{ minHeight: 365, marginBottom: (theme) => theme.spacing(8) }} ref={ref}>
      <Grid container spacing={1} alignItems='baseline' justifyContent='flex-end' mb={1}>
        <Grid item xs={12} sm={8} md>
          <Typography variant='h5' paragraph>Il est temps de trouver des offres pour ces livres...</Typography>
        </Grid>
        <Grid item xs='auto' sm={4} md='auto'>
          <Box
            sx={{
              backgroundColor: '#4b3621',
              color: theme.palette.secondary.main,
              padding: theme.spacing(1, 2)
            }}
          >
            <Typography align='right'>
              Avant réduction&nbsp;: <code>{totalBeforeOffers.toLocaleString(undefined, { minimumFractionDigits: 2 })}€</code>
            </Typography>
          </Box>
        </Grid>
      </Grid>
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
        (completeOffers.length)
          ? (
            <>
              {
                isDownMd
                  ? (
                    <Box p={2}>
                      <Typography align='center' mb={4} sx={{ fontSize: '2.6rem' }}>
                        <ArrowDownwardIcon sx={{ marginBottom: -1 }} />
                        {' '}
                        La meilleure
                        {' '}
                        <ArrowDownwardIcon sx={{ marginBottom: -1 }} />
                      </Typography>
                      <Offer offer={completeOffers[0]} total={totalBeforeOffers} index={0} />
                    </Box>
                    )
                  : (
                    <Grid container spacing={2}>
                      {completeOffers.map((offer, index) => (
                        <Grid key={offer.type} item xs={12} md>
                          <Offer offer={offer} total={totalBeforeOffers} index={index} />
                        </Grid>
                      ))}
                    </Grid>
                    )
                }
            </>
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

export default forwardRef(Offers)
