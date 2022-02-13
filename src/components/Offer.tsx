import { ReactElement } from 'react'
import { Box, Typography } from '@mui/material'

import { OfferType } from '../types'

interface Props {
  offer: OfferType
  total: number
}

function Offer ({ offer, total }: Props): ReactElement {
  if (offer.type === 'percentage') {
    return (
      <Box>
        <Typography variant='h4' sx={{ position: 'relative', height: (theme) => theme.spacing(9) }}>
          {offer.value.toLocaleString()}%
          {' '}
          <small>
            <small>de réduction</small>
          </small>
        </Typography>
        <Typography>soit un total</Typography>
        <Typography variant='h3'>
          <code>{(total * (1 - (offer.value / 100))).toLocaleString()}€</code>
        </Typography>
        <Typography>au lieu de <code>{total.toLocaleString()}€</code></Typography>
      </Box>
    )
  }

  if (offer.type === 'minus') {
    return (
      <Box>
        <Typography variant='h4' sx={{ position: 'relative', height: (theme) => theme.spacing(9) }}>
          {offer.value.toLocaleString()}€
          {' '}
          <small>
            <small>de réduction</small>
          </small>
        </Typography>
        <Typography>soit un total</Typography>
        <Typography variant='h3'>
          <code>{(total - offer.value).toLocaleString()}€</code>
        </Typography>
        <Typography>au lieu de <code>{total.toLocaleString()}€</code></Typography>
      </Box>
    )
  }

  if (offer.type === 'slice') {
    // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
    const slices = offer?.sliceValue ? Math.floor(total / offer.sliceValue) : 0

    return (
      <Box>
        <Typography variant='h4' sx={{ position: 'relative', height: (theme) => theme.spacing(9) }}>
          {offer.value.toLocaleString()}€
          {' '}
          <small>
            <small>de réduction</small>
          </small>
          <br />
          <Typography variant='caption' sx={{ position: 'absolute', width: '100%', left: 0, top: (theme) => theme.spacing(6) }}>
            tous les {offer.sliceValue?.toLocaleString()}€ d'achat
          </Typography>
        </Typography>
        <Typography>soit un total</Typography>
        <Typography variant='h3'>
          <code>{(total - (slices * offer.value)).toLocaleString()}€</code>
        </Typography>
        <Typography>au lieu de <code>{total.toLocaleString()}€</code></Typography>
      </Box>
    )
  }

  return <></>
}

export default Offer
