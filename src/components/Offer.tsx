import { ReactElement } from 'react'
import { Box, Theme, Typography } from '@mui/material'

import { CompleteOfferType } from '../types'

const getBoxStyle = (index: number) => (theme: Theme): any => ({
  backgroundColor: index === 0 ? 'white' : 'transparent',
  borderRadius: 10,
  boxShadow: index === 0
    ? `0 0 20px 10px ${theme.palette.secondary.main},
      inset 0 0 10px 5px ${theme.palette.secondary.main}`
    : 'none',
  color: index === 0 ? '#4b3621' : 'inherit',
  margin: theme.spacing(2, 0),
  opacity: (10 - (index * 3)) / 10,
  padding: theme.spacing(2, 1),
  textAlign: 'center',
  transform: `scale(${(10 - (index * 1.75)) / 10})`
})

interface Props {
  index: number
  offer: CompleteOfferType
  total: number
}

function Offer ({ index, offer, total }: Props): ReactElement {
  return (
    <Box sx={getBoxStyle(index)}>
      <Typography
        sx={{
          fontSize: '2.8rem',
          height: (theme) => theme.spacing(9),
          position: 'relative'
        }}
      >
        {offer.value.toLocaleString()}{offer.type === 'percentage' ? '%' : '€'}
        {' '}
        <small>
          <small>de réduction</small>
        </small>
        {offer.type === 'slice' && (
          <Typography
            variant='caption'
            sx={{ position: 'absolute', width: '100%', left: 0, top: (theme) => theme.spacing(6) }}
          >
            tous les {offer.sliceValue?.toLocaleString()}€ d'achat
          </Typography>
        )}
      </Typography>
      <Typography>soit un total de</Typography>
      <Typography variant='h4'>
        <strong>
          <code>
            {(total - offer.discount).toLocaleString(undefined, { minimumFractionDigits: 2 })}€
          </code>
        </strong>
      </Typography>
      <Typography>
        vous économisez
        {' '}
        <code>
          {offer.discount.toLocaleString(undefined, { minimumFractionDigits: 2 })}€
        </code>
      </Typography>
    </Box>
  )
}

export default Offer
