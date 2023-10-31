import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import Product from './Product';

test('Product component renders correctly', () => {
    const item = {
        name: 'Water',
        price: 0.65,
        count: 5,
    };
    const disabled = false;
    const onClick = jest.fn();

    render(<Product item={item} disabled={disabled} onClick={onClick} />);

    const productName = screen.getByText('Water');
    const productPrice = screen.getByText('$0.65');
    const productCount = screen.getByText('5 unit');
    const getButton = screen.getByTestId('get-button-Water');

    expect(productName).toBeInTheDocument();
    expect(productPrice).toBeInTheDocument();
    expect(productCount).toBeInTheDocument();
    expect(getButton).toBeInTheDocument();
    expect(getButton).not.toHaveAttribute('disabled');
});

test('Product component renders correctly when disabled', () => {
    const item = {
        name: 'Water',
        price: 0.65,
        count: 0,
    };
    const disabled = true;
    const onClick = jest.fn();

    render(<Product item={item} disabled={disabled} onClick={onClick} />);

    const productName = screen.getByText('Water');
    const productPrice = screen.getByText('$0.65');
    const productCount = screen.getByText('0 unit');
    const getButton = screen.getByTestId('get-button-Water');

    expect(productName).toBeInTheDocument();
    expect(productPrice).toBeInTheDocument();
    expect(productCount).toBeInTheDocument();
    expect(getButton).toBeInTheDocument();
    expect(getButton).toHaveAttribute('disabled');
    });

    test('Product component onClick is called when Get button is clicked', () => {
    const item = {
        name: 'Water',
        price: 0.65,
        count: 5,
    };
    const disabled = false;
    const onClick = jest.fn();

    render(<Product item={item} disabled={disabled} onClick={onClick} />);

    const getButton = screen.getByTestId('get-button-Water');
    fireEvent.click(getButton);

    expect(onClick).toHaveBeenCalledTimes(1);
    expect(onClick).toHaveBeenCalledWith(item);
});
