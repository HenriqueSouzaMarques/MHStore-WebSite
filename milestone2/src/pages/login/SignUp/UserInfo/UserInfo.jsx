import React from 'react'

import { TextField, Radio, RadioGroup, FormControlLabel, FormLabel, Grid } from '@mui/material';


const UserInfo = ( { handleNameChange, handleGenderChange} ) =>
(
    <Grid item xs={12}>
        <h3>User Info</h3>
        <Grid container spacing={2}>
            <Grid item xs={6}>
                <TextField 
                    label="Name" 
                    variant="outlined" 
                    fullWidth 
                    onChange={handleNameChange}
                />
            </Grid>

            <Grid item xs={6}>
                <FormLabel component="legend">Gender</FormLabel>
                <RadioGroup row aria-label="gender" onChange={handleGenderChange}>
                    <FormControlLabel value="female" control={<Radio />} label="Female" />
                    <FormControlLabel value="male" control={<Radio />} label="Male" />
                    <FormControlLabel value="other" control={<Radio />} label="Other" />
                </RadioGroup>
            </Grid>
        </Grid>
    </Grid>
)

export default UserInfo;