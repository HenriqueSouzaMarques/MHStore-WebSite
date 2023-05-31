import React, { useState } from 'react';
import { createTheme } from '@mui/material/styles';


import Logo from '../../components/header/logo/Logo'
import LoginForm from "./LoginForm/LoginForm";

import './Login.css'
import SignUp from './SignUp/SignUp';

const Login = () =>
{   
    const [createAccount, setCreateAccount] = useState(false);

    const theme = createTheme(
    {
        palette: 
        {
            primary:
            {
                main: '#333333', // Adjust the primary color as desired
            },

            text: 
            {
                primary: '#555555', // Adjust the text color as desired
            }
        }
    });

    return (

        <div className="login-container">

            <div className="logo-container">
                <Logo size={"600px"} />
            </div>

            <div className="form-container">

                {
                    !createAccount ? 
                        <LoginForm 
                            theme={theme}
                            setCreateAccount={setCreateAccount}
                        />
                    : 
                    <SignUp theme={theme} />
                }
                
            </div>

        </div>
    )

}

export default Login;