import React, { useState } from 'react';
import { Alert, Button, Typography } from '@mui/material';
import PropTypes from 'prop-types';

const ProductSelected = ({ selectedProduct, change }) => {
    const [showAlert, setShowAlert] = useState(true);
    return (
        (showAlert && (
            <Alert
                sx={{ p:1, position: 'absolute', top: '1%', zIndex: 1, left: '50%', transform: 'translateX(-50%)' }}
                severity="info"
                variant="filled"
                action={
                    <Button onClick={() => setShowAlert(false)} color="inherit" size="small" data-testid="close-button">
                        Close
                    </Button>
                }
            >
            <Typography>You get this product: <strong>{selectedProduct.name}</strong></Typography>
            {change >= 0 ? (
                <Typography sx={{ fontSize: 16 }}>Your change: ${change}</Typography>
            ) : (
                <Typography sx={{ fontSize: 16 }}>No change due.</Typography>
            )}
            </Alert>
        ))
    );
}

ProductSelected.propTypes = {
    selectedProduct: PropTypes.shape({
        name: PropTypes.string.isRequired,
    }).isRequired,
    change: PropTypes.string.isRequired
};

export default ProductSelected;
