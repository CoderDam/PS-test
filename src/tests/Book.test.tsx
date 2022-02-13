import { render, screen } from '@testing-library/react'

import Book from '../components/Book'

describe('Book', () => {
  test('renders the books\'s title', () => {
    const props = {
      book: {
        isbn: 'isbn',
        price: 5,
        title: 'titre du livre',
        synopsis: ['une ligne'],
        cover: 'https://img.memecdn.com/random-images-from-google-5-wtf_o_2176725.jpg'
      }
    }
    render(<Book {...props} />)
    const title = screen.getByText(/titre du livre/i)
    expect(title).toBeInTheDocument()
  })
})
