import React, { useState, useEffect } from 'react';
import { Box, Grid, Typography, Button } from '@mui/material';
import CoinMethods from '../components/coinMethods/CoinMethods';
import Product from '../components/product/Product';
import ProductSelected from '../components/productSelected/ProductSelected';
import MoneyTrack from '../components/moneyTrack/MoneyTrack';

const VendingMachine = () => {
    // Initialize state from localStorage or use default values
    const initialAvailableProducts = JSON.parse(localStorage.getItem('availableProducts')) || [
        { name: 'Water', price: 0.65, count: 5 },
        { name: 'Juice', price: 1.00, count: 3 },
        { name: 'Soda', price: 1.50, count: 7 },
    ];
    
    // Initialize state from localStorage or use default values
    const initialCoinButtons = JSON.parse(localStorage.getItem('coinButtons')) || [
        { value: 0.05, coins: 10, text: '$0.05' },
        { value: 0.10, coins: 10, text: '$0.10' },
        { value: 0.25, coins: 10, text: '$0.25' },
        { value: 1.00, coins: 10, text: '$1.00' }
    ];

    const [availableProducts, setAvailableProducts] = useState(initialAvailableProducts);
    const [coinButtons, setCoinButtons] = useState(initialCoinButtons);
    const [insertedMoney, setInsertedMoney] = useState(0);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [customerMoney, setCustomermoney] = useState(0);

    // Update localStorage when state changes
    useEffect(() => {
        localStorage.setItem('availableProducts', JSON.stringify(availableProducts));
        localStorage.setItem('coinButtons', JSON.stringify(coinButtons));
    }, [availableProducts, coinButtons]);

    const handleSelectItem = (item) => {
        if (insertedMoney >= 0 && item.count > 0) {
            setSelectedProduct(item);
            const updateInsertedMoneyFixed = (insertedMoney.toFixed(2) * 100 - item.price.toFixed(2) * 100) / 100;
            setInsertedMoney(updateInsertedMoneyFixed);
            const updatedItems = availableProducts.map((i) =>
                i.name === item.name ? { ...i, count: i.count - 1 } : i
            );
            setAvailableProducts(updatedItems);
        }
    };

    // Reset coins to initial state
    const resetCoins = () => {
        setCoinButtons(initialCoinButtons);
    };

    // Return coins o the customer
    const handleReturnCoin = () => {
        setCustomermoney(prev => prev + insertedMoney);
        setInsertedMoney(0);
        resetCoins();
    };

    // Insert coin into vending machine
    const handleInsertedMoney = (amount) => {
        const fixedInsertedMoney = (insertedMoney.toFixed(2) * 100 + amount.toFixed(2) * 100) / 100;
        setInsertedMoney(fixedInsertedMoney);
    };

    // Format it to two decimal places
    const insertedMoneyRounded = insertedMoney.toFixed(2); 

    const customerMoneyRounded = customerMoney.toFixed(2);
    
    // Update (diminsh)the amount of coin when it's inserted
    const updateBadge = (coinValue) => {
        setCoinButtons((prevButtons) =>
            prevButtons.map((button) => {
                if (button.value === coinValue) {
                return { ...button, coins: button.coins - 1 };
                }
                return button;
            })
        );
    };   

    // Calculate the change as the the difference between the inserted money and product price
    const calculateChange = (productPrice) => {
        const change = insertedMoney - productPrice;
        return change.toFixed(2);
    };

    return (
        <Box    
            sx={{ height: '100vh', background: 'gray', textAlign: 'center' }}
        >
            <Typography variant="h1" sx={{ color: 'lightBlue' }}>Vending Machine</Typography>
            <Grid 
                container
                direction="row"
                justifyContent="space-evenly"
                alignItems="center"
                spacing={6}
            >
                {availableProducts.map((item) => (
                    <Grid item key={item.name}>
                        <Product 
                            item={item}
                            disabled={insertedMoney < item.price || item.count === 0} 
                            onClick={handleSelectItem}
                        />
                    </Grid>
                ))}
            </Grid>
            <Grid 
                container
                direction="row"
                justifyContent="center"
                alignItems="center"
            >
                {coinButtons.map((coinButton) => (
                    <Grid item key={coinButton.value}>
                        <CoinMethods
                            price={coinButton.value}
                            coinCount={coinButton.coins}
                            onClick={() => handleInsertedMoney(coinButton.value)}
                            updateBadge={updateBadge}
                            text={coinButton.text}
                        />
                    </Grid>
                    ))
                }
            </Grid>
            <Grid
                container
                direction="row"
                justifyContent="space-evenly"
                alignItems="center"
                sx={{ marginTop: 2 }}
            >
                <MoneyTrack 
                    text='Inserted Money'
                    testId='inserted-money'
                    value={insertedMoneyRounded}
                />
                <MoneyTrack 
                    text='Customer Money'
                    testId='customer Money'
                    value={customerMoneyRounded}
                />
                <Grid item>
                    <Button
                        onClick={handleReturnCoin} 
                        size="large" 
                        variant="contained" 
                        disabled={insertedMoney === 0}
                        data-testid='return-money-button'
                    >
                        Return inserted money
                    </Button>
                </Grid>
            </Grid>
            <Grid>
                {selectedProduct && 
                    <ProductSelected 
                        selectedProduct={selectedProduct} 
                        change={calculateChange(selectedProduct.price)} 
                    />
                }
            </Grid>
        </Box>
    )
};

export default VendingMachine;
