import React from 'react'
import { Typography, Badge, Card, Button } from '@mui/material';
import CurrencyExchangeIcon from '@mui/icons-material/CurrencyExchange';
import PropTypes from 'prop-types';

const CoinMethods = ({ onClick, price, updateBadge, coinCount, text }) => { 

    // Inserted coin into insertedMoney state 
    const handleClick = () => {
        if (coinCount > 0) {
            onClick();
            updateBadge(price);
        }
    };

    // Update the amount of coins remaining
    const updateBadgeContent = (coinCount) => {
        if (coinCount === 0) {
            return "/";
        } else {
            return coinCount;
        }
    };

    return (
        <Card sx={{ width: 130, p: 1, m: 2, background: 'lightBlue' }}>
        <Typography data-testid={`coin-${text}`} variant="h6" color="black" gutterBottom>
            {text}
        </Typography>
        <Badge sx={{marginTop: 2, marginBottom: 2 }} color="primary" overlap="circular" badgeContent={updateBadgeContent(coinCount)} showZero>
            <CurrencyExchangeIcon color='action' fontSize='large' />
        </Badge>
        <Button 
            onClick={handleClick}
            variant="contained"
            disabled={coinCount === 0}
            data-testid="coin-method-button"
        >
            Insert Coin
        </Button>
        </Card>
    )
}

CoinMethods.propTypes = {
    onClick: PropTypes.func.isRequired,
    price: PropTypes.number.isRequired,
    updateBadge: PropTypes.func.isRequired,
    coinCount: PropTypes.number.isRequired,
    text: PropTypes.string.isRequired,
};

export default CoinMethods;
