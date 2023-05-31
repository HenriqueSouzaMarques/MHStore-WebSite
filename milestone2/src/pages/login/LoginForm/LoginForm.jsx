import React, { useContext, useState } from 'react';


import { ThemeProvider } from '@mui/material/styles';
import { TextField, Button, Paper, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { LoginContext } from '../../../LoginContext';


const LoginForm = ( { theme, setCreateAccount } ) =>
{
    const navigate = useNavigate();

    const {updateUsername} = useContext(LoginContext);

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');   

    const handleUsernameChange = (e) =>
    {
        setUsername(e.target.value);
    };
    
    
    const handlePasswordChange = (e) =>
    {
        setPassword(e.target.value);
    };  


    const handleSubmit = (e) =>
    {
        e.preventDefault(); 

        /* TODO : LOGIN VALIDATION */

        updateUsername(username);

        navigate('/');
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
                        label="Username"
                        variant="outlined"
                        fullWidth
                        required
                        margin="normal"
                        value={username}
                        onChange={handleUsernameChange}
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