import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import CoinMethods from './CoinMethods';

// Define default props
const defaultProps = {
    onClick: jest.fn(),
    updateBadge: jest.fn(),
    price: 0.25,
    coinCount: 5,
    text: '$0.25',
    };

test('CoinMethods renders with initial coin count', () => {
    render(<CoinMethods {...defaultProps} />);

    // Assert that the price and coin count are displayed.
    expect(screen.getByTestId(`coin-${defaultProps.text}`)).toBeInTheDocument();
    expect(screen.getByText(defaultProps.coinCount.toString())).toBeInTheDocument();

    // Assert that the button is not disabled.
    expect(screen.getByTestId('coin-method-button')).not.toHaveAttribute('disabled');
});

test('CoinMethods is disabled when coin count is 0', () => {
    const props = { ...defaultProps, coinCount: 0 };
    render(<CoinMethods {...props} />);

    // Assert that the button is disabled when coin count is 0.
    expect(screen.getByTestId('coin-method-button')).toHaveAttribute('disabled');
});

test('CoinMethods onClick is called when clicked', () => {
    render(<CoinMethods {...defaultProps} />);

    const button = screen.getByTestId('coin-method-button');
    fireEvent.click(button);

    expect(defaultProps.onClick).toHaveBeenCalledTimes(1);
});
