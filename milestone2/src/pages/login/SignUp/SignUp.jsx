import React, { useContext, useState } from 'react';

import { useNavigate } from 'react-router-dom';

import { Paper, ThemeProvider, Button, Grid } from '@mui/material';

import { UserContext } from '../../../UserContext';

import AccountInfo from './AccountInfo/AccountInfo';
import UserInfo from './UserInfo/UserInfo';
import Address from './Address/Address';
import Phone from './Phone/Phone'

import { produtos } from '../../../data/produtos.js';

import './SignUp.css';

const SignUp = ( { theme } ) => 
{
    const { userData, updateUserData } = useContext(UserContext);

    const usuarios = JSON.parse(localStorage.getItem('users'));

    const [newUserInfo, setNewUserInfo] = useState({
        type: (userData && userData.type === 'admin') ? 'admin' : 'cliente',
        id: usuarios[usuarios.length - 1].id + 1,
        email: '',
        username: '',
        password: '',
        name: '',
        gender: '',
        street: '',
        number: '',
        zipCode: '',
        fullAddress: '',
        phone: '',
        cartProducts: [],
        totalProducts: 0,
        purchaseAmount: 0,
        purchaseHistory: []
    })

    const handleEmailChange = (e) =>
    {
        setNewUserInfo({ ...newUserInfo, email: e.target.value });
    };
    
    const handleUsernameChange = (e) =>
    {
        setNewUserInfo({ ...newUserInfo, username: e.target.value });
    };

    const handlePasswordChange = (e) =>
    {
        setNewUserInfo({ ...newUserInfo, password: e.target.value });
    };

    const handleNameChange = (e) =>
    {
        setNewUserInfo({ ...newUserInfo, name: e.target.value });
    };

    const handleGenderChange = (e) =>
    {
        setNewUserInfo({ ...newUserInfo, gender: e.target.value });
    };

    const handleStreetChange = (e) => 
    {
        setNewUserInfo({ ...newUserInfo, street: e.target.value });
    };

    const handleNumberChange = (e) =>
    {
        setNewUserInfo({ ...newUserInfo, number: e.target.value });
    };
    
    const handleZipCodeChange = (e) =>
    {
        setNewUserInfo({ ...newUserInfo, zipCode: e.target.value });
    };

    const handlePhoneChange = (e) =>
    {
        setNewUserInfo({ ...newUserInfo, phone: e.target.value });
    };

    const navigate = useNavigate();

    const handleSubmit = (e) =>
    {
        e.preventDefault();
        
        const alreadyUser = usuarios.some((user) => user.email === newUserInfo.email)

        if (alreadyUser)
        {
            alert("account already registered!")
        }
        else
        {
            const novoUser = {...newUserInfo, fullAddress: newUserInfo.street + " " + newUserInfo.number + " " + newUserInfo.zipCode};

            usuarios.push(novoUser);
            
            localStorage.setItem('users', JSON.stringify(usuarios));
    
            const catalogo = localStorage.getItem('catalogo');

            if(!catalogo)
            {
                localStorage.setItem('catalogo', JSON.stringify(produtos));
            }

            if(!userData)
            {
                updateUserData(novoUser);
                navigate(-1);
            }
            else
            {
                navigate('/users');
            }
            
        }
        
    }

    return (
        <ThemeProvider theme={theme} >
            <Paper 
                elevation={3}
                style=
                {
                    {
                        padding: '2rem',
                        width: '700px', // Adjust the width as desired
                        height: '550px', // Adjust the height as desired
                    }
                }
            >
                <form onSubmit={handleSubmit}>
                    <Grid container spacing={2}>

                        <AccountInfo 
                            handleEmailChange={handleEmailChange}
                            handleUsernameChange={handleUsernameChange}
                            handlePasswordChange={handlePasswordChange}
                        />

                        <UserInfo 
                            handleNameChange={handleNameChange}
                            handleGenderChange={handleGenderChange}
                        />

                        <Address 
                            handleStreetChange={handleStreetChange}
                            handleNumberChange={handleNumberChange}
                            handleZipCodeChange={handleZipCodeChange}  
                        />

                        <Phone 
                            handlePhoneChange={handlePhoneChange}
                        />

                    </Grid>
                
                    <br/>
                    <Button type="submit" variant="contained" color="primary">Submit</Button>
                </form> 
            </Paper>
        </ThemeProvider>
    )
};

export default SignUp;