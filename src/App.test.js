import { render, screen } from '@testing-library/react';
import App from './App';

test('renders App component', () => {
  render(<App />);
  const textElement = screen.getByText(/Vending Machine/i);

  expect(textElement).toBeInTheDocument();
});
