import React, { useContext, useState, useEffect } from 'react';
import { createTheme } from '@mui/material/styles';

import { users } from "../../data/users.js";

import Logo from '../../components/Header/Logo/Logo'
import LoginForm from "./LoginForm/LoginForm";

import './Login.css'
import SignUp from './SignUp/SignUp';
import { UserContext } from '../../UserContext';

const Login = () =>
{   
    const [createAccount, setCreateAccount] = useState(false);

    const { userData } = useContext(UserContext);

    const [ usuarios, setUsuarios ] = useState(() => 
    {
        const usuarios = localStorage.getItem('users');

        return (usuarios ? JSON.parse(usuarios) : users);
    });

    useEffect(() =>
    {
        localStorage.setItem('users', JSON.stringify(usuarios));
    }, [usuarios]);

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
                    (createAccount || (userData && userData.type === 'admin')) ? 
                        <SignUp 
                            theme={theme}   
                            userData={userData}
                        />
                    :
                        <LoginForm 
                            theme={theme}
                            setCreateAccount={setCreateAccount}
                            usuarios={usuarios}
                        /> 
                }
                
            </div>
        </div>
    )
}

export default Login;