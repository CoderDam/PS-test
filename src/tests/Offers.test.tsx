import { render, screen } from '@testing-library/react'
import { QueryClient, QueryClientProvider } from 'react-query'

import Offers from '../components/Offers'

const queryClient = new QueryClient()

describe('Offers', () => {
  test('renders the title', () => {
    const props = {
      selectedBooks: []
    }
    const books = (
      <QueryClientProvider client={queryClient}>
        <Offers {...props} />
      </QueryClientProvider>
    )
    render(books)
    const title = screen.getByText(/il est temps de trouver des offres pour ces livres/i)
    expect(title).toBeInTheDocument()
  })
})
