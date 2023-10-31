import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect'; // For additional matchers
import MoneyTrack from './MoneyTrack'; // Adjust the import path as needed

describe('MoneyTrack Component', () => {
    it('renders with the provided props', () => {
        const text = 'Customer Money:';
        const testId = 'customer-money';
        const value = 1.50;

        // Render the component with the provided props
        render(<MoneyTrack text={text} testId={testId} value={value} />);

        // Assert that the text and value are displayed
        expect(screen.getByText(text)).toBeInTheDocument();
        expect(screen.getByTestId(testId)).toHaveTextContent(value.toString());
    });
});
