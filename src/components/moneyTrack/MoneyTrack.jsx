import React from 'react'
import { Grid, Typography } from '@mui/material';
import PropTypes from 'prop-types';

const MoneyTrack = ({ text, testId, value }) => {
    return (
        <Grid item sx={{ border: '1px solid black', p: 1, borderRadius:'5px', color: 'white', background: 'black' }}>
            <Typography sx={{ fontSize: 20 }}>{text}</Typography>
            <Typography data-testid={testId} sx={{ fontSize: 20 }}>{value}</Typography>
        </Grid>
    )
}

MoneyTrack.propTypes = {
    text: PropTypes.string.isRequired,
    testId: PropTypes.string.isRequired,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
};

export default MoneyTrack;
