import React, { useState } from 'react';
import { createTheme } from '@mui/material/styles';


import { useLocation } from 'react-router-dom';

import Logo from '../../components/Header/Logo/Logo'
import LoginForm from "./LoginForm/LoginForm";

import './Login.css'
import SignUp from './SignUp/SignUp';

const Login = () =>
{   
    const location = useLocation();
    const { type } = location.state;

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
                    (createAccount || type === 'admin') ? 
                        <SignUp 
                            theme={theme}   
                            type={type}
                        />
                    :
                        <LoginForm 
                            theme={theme}
                            setCreateAccount={setCreateAccount}
                            type={type}
                        /> 
                }
                
            </div>

        </div>
    )
}

export default Login;