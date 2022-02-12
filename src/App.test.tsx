import { render, screen } from '@testing-library/react'
import App from './App'

test('renders "bienvenue"', () => {
  render(<App />)
  const linkElement = screen.getByText(/bienvenue/i)
  expect(linkElement).toBeInTheDocument()
})
