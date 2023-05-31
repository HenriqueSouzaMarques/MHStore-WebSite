import React from 'react'

import { TextField, Grid } from '@mui/material';

const Phone = ( {handlePhoneChange} ) => 
(
    <Grid item xs={12}>
        <h3>Phone</h3>
        <Grid container spacing={2}>
            <Grid item xs={4}>
                <TextField 
                    label="Phone" 
                    type="number"
                    variant="outlined" 
                    fullWidth 
                    onChange={handlePhoneChange}
                />
            </Grid>
        </Grid>
    </Grid>
)

export default Phone;