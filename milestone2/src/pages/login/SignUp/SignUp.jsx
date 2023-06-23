import React, { useContext, useState } from 'react';

import { useNavigate } from 'react-router-dom';

import { Paper, ThemeProvider, Button, Grid } from '@mui/material';

import { UserContext } from '../../../UserContext';

import AccountInfo from './AccountInfo/AccountInfo';
import UserInfo from './UserInfo/UserInfo';
import Address from './Address/Address';
import Phone from './Phone/Phone'

import { users } from '../../../data/users.js'


import './SignUp.css'

const SignUp = ( { theme } ) => 
{
    const [newUserInfo, setNewUserInfo] = useState({
        type: 'cliente',
        id: '',
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
        purchaseAmount: 0
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

    
    const { updateUserData } = useContext(UserContext);


    const navigate = useNavigate();
    const handleSubmit = (e) =>
    {
        e.preventDefault();
        
        const alreadyUser = users.some((user) => user.email === newUserInfo.email)

        if (alreadyUser)
        {
            alert("account already registered!")
        }
        else
        {
            const lastUser = users[users.length - 1]

            setNewUserInfo({ ...newUserInfo, id: lastUser.id + 1});
    
            updateUserData({...newUserInfo, fullAddress: newUserInfo.street + " " + newUserInfo.number + " " + newUserInfo.zipCode});
    
            users.push(newUserInfo);
            
            navigate(-1);
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
                        height: '490px', // Adjust the height as desired
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