import React from 'react';
import {TextField, Grid } from '@mui/material';

const AccountInfo = ( { handleEmailChange, handleUsernameChange, handlePasswordChange } ) => 
(
    <Grid item xs={12}>
        <h3>Account Info</h3> 
        <Grid container spacing={2}>
            <Grid item xs={4}>
                <TextField 
                    label="Email" 
                    type="email"
                    variant="outlined" 
                    fullWidth 
                    onChange={handleEmailChange}
                />
            </Grid>

            <Grid item xs={4}>
                <TextField 
                    label="Username" 
                    variant="outlined" 
                    fullWidth 
                    onChange={handleUsernameChange}
                />
            </Grid>

            <Grid item xs={4}>
                <TextField 
                    label="Password" 
                    variant="outlined" 
                    type="password" 
                    fullWidth 
                    onChange={handlePasswordChange}
                />
            </Grid>
        </Grid>
    </Grid>
)

export default AccountInfo