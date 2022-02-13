import { render, screen } from '@testing-library/react'

import Cart from '../components/Cart'

describe('Cart', () => {
  test('renders the cart\'s title', () => {
    const props = {
      search: '',
      selectedBooks: [{
        isbn: 'isbn',
        price: 5,
        title: 'titre du livre',
        synopsis: ['une ligne'],
        cover: 'https://img.memecdn.com/random-images-from-google-5-wtf_o_2176725.jpg'
      }],
      onDeleteBook: jest.fn()
    }
    render(<Cart {...props} />)
    const title = screen.getByText(/je vois que vous avez bon goût/i)
    expect(title).toBeInTheDocument()
  })
})
