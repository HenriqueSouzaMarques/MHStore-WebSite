import React, {useState } from 'react';

import { ThemeProvider } from '@mui/material/styles';
import { TextField, Button, Paper, Typography } from '@mui/material';

const LoginForm = ( { theme, setCreateAccount, loginVerification } ) =>
{
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');   

    const handleEmailChange = (e) =>
    {
        setEmail(e.target.value);
    };
    
    
    const handlePasswordChange = (e) =>
    {
        setPassword(e.target.value);
    };  

    const handleSubmit = (e) =>
    {
        e.preventDefault(); 

        loginVerification(email, password);        
    };  

    return (
        <ThemeProvider theme={theme}>
            <Paper 
                elevation={3}
                style=
                {
                    {
                        padding: '2rem',
                        width: '400px', // Adjust the width as desired
                        height: '350px', // Adjust the height as desired
                    }
                }
            >
                <Typography variant="h5" align="center" gutterBottom>Login</Typography>

                <form onSubmit={handleSubmit} >
                    <TextField
                        required
                        label="Email"
                        type="email"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        value={email}
                        onChange={handleEmailChange}
                    />

                    <TextField
                        label="Password"
                        variant="outlined"
                        fullWidth
                        required
                        margin="normal"
                        type="password"
                        value={password}
                        onChange={handlePasswordChange}
                    />

                    <Button 
                        type="submit" 
                        variant="contained" 
                        color="primary" 
                        fullWidth
                        style={{marginTop: '20px'}}
                    >
                            Login
                    </Button>
                    
                </form>

                <div>

                    <Button 
                        variant="text" 
                        color="primary" 
                        fullWidth 
                        onClick={() => setCreateAccount(true)}
                        style={{marginTop: '10px'}}
                    >
                        Create new Account
                    </Button>
                </div>

            </Paper>
        </ThemeProvider>
  );
};

export default LoginForm;
