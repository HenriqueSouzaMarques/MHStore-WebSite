import React, { useContext, useState } from 'react';

import { ThemeProvider } from '@mui/material/styles';
import { TextField, Button, Paper, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

import { UserContext } from '../../../UserContext';

import { produtos } from '../../../data/produtos.js';

const LoginForm = ( { theme, setCreateAccount, usuarios } ) =>
{
    
    const { updateUserData } = useContext(UserContext);

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

    
    const navigate = useNavigate();

    const handleSubmit = (e) =>
    {
        e.preventDefault(); 

        const user = usuarios.find
        (
            (user) => user.email === email && user.password === password
        )

        if(user)
        {
            const catalogo = localStorage.getItem('catalogo');
            
            if(!catalogo)
            {
                localStorage.setItem('catalogo', JSON.stringify(produtos));
            }
            
            navigate(-1);
            
            updateUserData(user);
        }
        else
        {
            alert("User or password wrong!")
        }        
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
