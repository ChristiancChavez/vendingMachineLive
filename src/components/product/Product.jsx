import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import PropTypes from 'prop-types';

const Product = ({ item, disabled, onClick } ) => {
    const { name, price, count } = item;

    //Get the product selected
    const handleProductOnClick = () =>{
        onClick(item);
    };
    
    return (
        <Card 
            sx={{ width: 250, margin: 1, background: disabled ? 'lightGray' : 'lightBlue' }}
        >
            <CardContent>
                <Typography variant="h4" color="text.primary">
                    {name}
                </Typography>
                <Typography sx={{ fontSize: 18 }}>
                    ${price}
                </Typography>
                <Typography sx={{ fontSize: 16 }} color="text.secondary">
                    {count} unit
                </Typography>
                <Button 
                    onClick={handleProductOnClick} 
                    sx={{ marginTop: 1 }} 
                    size="small" 
                    variant="contained" 
                    disabled={disabled} 
                    data-testid={`get-button-${name}`}
                    >
                    Get
                </Button>
            </CardContent>
        </Card>
    );
}

Product.propTypes = {
    item: PropTypes.shape({
        name: PropTypes.string.isRequired,
        price: PropTypes.number.isRequired,
        count: PropTypes.number.isRequired,
    }).isRequired,
    disabled: PropTypes.bool.isRequired,
    onClick: PropTypes.func.isRequired,
};

export default Product;
