import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import ProductSelected from './ProductSelected';

test('ProductSelected displays selected product name', () => {
    const selectedProduct = { name: 'Soda' };
    const change = '0.50';

    render(<ProductSelected selectedProduct={selectedProduct} change={change} />);

    const alertTitle = screen.getByText(/You get this product:/i);
    const productName = screen.getByText(/Soda/i);
    const closeButton = screen.getByText(/Close/i);
    const changeText = screen.getByText(/Change: \$0.50/i);

    expect(alertTitle).toBeInTheDocument();
    expect(productName).toBeInTheDocument();
    expect(closeButton).toBeInTheDocument();
    expect(changeText).toBeInTheDocument(); 
});
