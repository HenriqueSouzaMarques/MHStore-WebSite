import React from 'react'
import { TextField, Grid  } from '@mui/material';


const Address = ( {handleStreetChange, handleNumberChange, handleZipCodeChange } ) => 
(
    <Grid item xs={12}>
        <h3>Address</h3>
        <Grid container spacing={2}>
            <Grid item xs={4}>
                <TextField 
                    label="Street" 
                    variant="outlined" 
                    fullWidth 
                    onChange={handleStreetChange}
                />
            </Grid>

            <Grid item xs={4}>
                <TextField 
                    label="Number" 
                    type="number"
                    variant="outlined" 
                    fullWidth 
                    onChange={handleNumberChange}
                />
            </Grid>

            <Grid item xs={4}>
                <TextField 
                    label="Zip Code" 
                    type="number"
                    variant="outlined" 
                    fullWidth 
                    onChange={handleZipCodeChange}
                />
            </Grid>
        </Grid>
    </Grid>
)

export default Address;