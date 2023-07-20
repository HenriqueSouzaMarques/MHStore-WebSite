import React, { useContext, useState } from 'react';
import { createTheme } from '@mui/material/styles';
import axios from 'axios';

import { useNavigate } from 'react-router-dom';

import Logo from '../../components/Header/Logo/Logo'
import LoginForm from "./LoginForm/LoginForm";

import './Login.css'
import SignUp from './SignUp/SignUp';
import { UserContext } from '../../UserContext';

const Login = () =>
{   
    const [createAccount, setCreateAccount] = useState(false);

    const { userData, updateUserData } = useContext(UserContext);

    const navigate = useNavigate();

    const loginVerification = async ( email, password ) =>
    {
        try
        {
            const response = await axios.post('http://localhost:8000/users', { email: email, password: password},
            {
                headers:
                {
                    'Content-Type': 'application/json',
                    'X-Action': 'verifyLogin'
                }
            });     
            
            updateUserData(response.data);

            navigate(-1);
        }
        catch (error)
        {
          alert('Email or password wrong!');
        }
    }

    const createUser = async ( newUser ) =>
    {
        console.log(newUser);
        
        try
        {
            const response = await axios.post('http://localhost:8000/users', newUser,
            {
                headers:
                {
                    'Content-Type': 'application/json',
                    'X-Action': 'createUser'
                }
            });    

            if(!userData)
            {
                updateUserData(response.data);
                navigate(-1);
            }
            else
            {
                navigate('/users');
            }
        
        }
        catch (error)
        {
            alert("User already registered!");
        }
    };

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

            <Logo size={"600px"} />
            
            <div className="form-container">

                {
                    (createAccount || (userData && userData.type === 'admin')) ? 
                        <SignUp 
                            theme={theme}   
                            createUser={createUser}
                        />
                    :
                        <LoginForm 
                            theme={theme}
                            setCreateAccount={setCreateAccount}
                            loginVerification={loginVerification}
                        /> 
                }
                
            </div>
        </div>
    )
}

export default Login;