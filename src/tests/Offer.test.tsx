import { render, screen } from '@testing-library/react'

import Offer, { OfferProps } from '../components/Offer'

describe('Offer', () => {
  describe('type minus', () => {
    test('renders the offer\'s value twice', () => {
      const props: OfferProps = {
        index: 0,
        offer: {
          type: 'minus',
          value: 13,
          discount: 13
        },
        total: 38
      }
      render(<Offer {...props} />)
      const values = screen.getAllByText(/13/i)
      expect(values.length).toEqual(2)
      expect(values[0]).toBeInTheDocument()
      expect(values[1]).toBeInTheDocument()
    })
  })

  describe('type percentage', () => {
    test('renders the offer\'s value', () => {
      const props: OfferProps = {
        index: 0,
        offer: {
          type: 'percentage',
          value: 10,
          discount: 3.8
        },
        total: 38
      }
      render(<Offer {...props} />)
      const value = screen.getByText(/10%/i)
      expect(value).toBeInTheDocument()
    })
    test('renders the offer\'s discount', () => {
      const props: OfferProps = {
        index: 0,
        offer: {
          type: 'percentage',
          value: 10,
          discount: 3.8
        },
        total: 38
      }
      render(<Offer {...props} />)
      const discount = screen.getByText(/3,8/i)
      expect(discount).toBeInTheDocument()
    })
  })
})
