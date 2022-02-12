import { render, screen } from '@testing-library/react'
import { QueryClient, QueryClientProvider } from 'react-query'
import App from './App'

const queryClient = new QueryClient()

test('renders "bienvenue"', () => {
  const app = (
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  )
  render(app)
  const linkElement = screen.getByText(/bienvenue/i)
  expect(linkElement).toBeInTheDocument()
})
