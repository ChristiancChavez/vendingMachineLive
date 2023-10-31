import React from 'react'
import { Alert, Button, AlertTitle, Typography } from '@mui/material';
import PropTypes from 'prop-types';

const ProductSelected = ({ selectedProduct }) => {
    return (
        <Alert 
            severity="success" 
            action={
                <Button color="inherit" size="small" data-testid="close-button">
                    Close
                </Button>
            }
        >
            <AlertTitle>
                <h2>You get this product: <strong>{selectedProduct.name}</strong></h2>
                {change >= 0 ? (
                    <Typography sx={{ fontSize: 18 }}>Your change: ${change}</Typography>
                ) : (
                    <Typography sx={{ fontSize: 18 }}>No change due.</Typography>
                )}
            </AlertTitle>
        </Alert>
    )
}

ProductSelected.propTypes = {
    selectedProduct: PropTypes.shape({
        name: PropTypes.string.isRequired,
    }).isRequired,
};

export default ProductSelected;
