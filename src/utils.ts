import { OfferType } from './types'

export const getDiscount = (offer: OfferType, total: number): number => {
  let discount = 0
  switch (offer.type) {
    case 'percentage':
      discount = total * (offer.value / 100)
      break
    case 'minus':
      discount = offer.value
      break
    case 'slice': {
      // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
      const slices = offer?.sliceValue ? Math.floor(total / offer.sliceValue) : 0
      discount = slices * offer.value
      break
    }
    default:
  }
  return discount
}

export const getRandInt = (min: number, max: number): number => {
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.floor(Math.random() * (max - min + 1)) + min
}
