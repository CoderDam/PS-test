import { render, screen } from '@testing-library/react'
import { QueryClient, QueryClientProvider } from 'react-query'

import Books from '../components/Books'

const queryClient = new QueryClient()

describe('Books', () => {
  test('renders the title', () => {
    const props = {
      selectedBooks: [],
      onAddBook: jest.fn(),
      onDeleteBook: jest.fn()
    }
    const books = (
      <QueryClientProvider client={queryClient}>
        <Books {...props} />
      </QueryClientProvider>
    )
    render(books)
    const title = screen.getByText(/voici les livres que vous pouvez consulter ici/i)
    expect(title).toBeInTheDocument()
  })
})
