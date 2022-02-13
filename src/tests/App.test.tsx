import { render, screen } from '@testing-library/react'
import { QueryClient, QueryClientProvider } from 'react-query'

import App from '../App'

const queryClient = new QueryClient()

describe('App', () => {
  test('renders "bienvenue"', () => {
    const app = (
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
    )
    render(app)
    const title = screen.getByText(/bienvenue/i)
    expect(title).toBeInTheDocument()
  })
  test('snapshot', () => {
    const app = (
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
    )
    const { asFragment } = render(app)
    expect(asFragment()).toMatchSnapshot()
  })
})
