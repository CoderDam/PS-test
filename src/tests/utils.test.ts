import { getDiscount } from '../utils'
import { OfferType } from '../types'

describe('getDiscount', () => {
  describe('type minus', () => {
    test('returns the value', () => {
      const offer: OfferType = {
        type: 'minus',
        value: 8
      }
      expect(getDiscount(offer, 55)).toEqual(8)
    })
  })

  describe('type percentage', () => {
    test('returns a part of the total', () => {
      const offer: OfferType = {
        type: 'percentage',
        value: 10
      }
      expect(getDiscount(offer, 55)).toEqual(5.5)
    })
  })

  describe('type slice', () => {
    test('returns 0 if sliceValue > total', () => {
      const offer: OfferType = {
        type: 'slice',
        value: 10,
        sliceValue: 70
      }
      expect(getDiscount(offer, 55)).toEqual(0)
    })
    test('returns the value once if 2 * sliceValue > total >= sliceValue', () => {
      const offer: OfferType = {
        type: 'slice',
        value: 10,
        sliceValue: 50
      }
      expect(getDiscount(offer, 55)).toEqual(10)
    })
    test('returns the value 5 times if 6 * sliceValue > total >= 5 * sliceValue', () => {
      const offer: OfferType = {
        type: 'slice',
        value: 10,
        sliceValue: 50
      }
      expect(getDiscount(offer, 260)).toEqual(50)
    })
  })
})
