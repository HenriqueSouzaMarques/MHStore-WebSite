import React, { useState } from 'react';
import { createTheme } from '@mui/material/styles';


import Logo from '../../components/Header/logo/Logo'
import LoginForm from "./LoginForm/LoginForm";

import './Login.css'
import SignUp from './SignUp/SignUp';
import { useLocation } from 'react-router-dom';

const Login = () =>
{   
    const [createAccount, setCreateAccount] = useState(false);

    const location = useLocation();
    const { linkBack, createAdmin } = location.state;

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
                    (createAccount) || (createAdmin) ? 
                        <SignUp 
                            theme={theme} 
                            link={linkBack}    
                        />
                    :
                        <LoginForm 
                            theme={theme}
                            setCreateAccount={setCreateAccount}
                            link={linkBack}
                        /> 
                }
                
            </div>

        </div>
    )
}

export default Login;