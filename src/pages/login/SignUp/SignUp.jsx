import React, { useContext, useEffect, useState } from 'react';

import { Paper, ThemeProvider, Button, Grid } from '@mui/material';

import { UserContext } from '../../../UserContext';

import AccountInfo from './AccountInfo/AccountInfo';
import UserInfo from './UserInfo/UserInfo';
import Address from './Address/Address';
import Phone from './Phone/Phone'

import './SignUp.css';

const SignUp = ( { theme, createUser } ) => 
{
    const { userData, fetchUsers } = useContext(UserContext);

    const [usuarios, setUsuarios] = useState(null);
  
    useEffect(() =>
    {
        const fetchData = async () =>
        {
            const usuarios = await fetchUsers();
            setUsuarios(usuarios);
        };
        
        fetchData();
    }, []);

    const [newUserInfo, setNewUserInfo] = useState({
        type: (userData && userData.type === 'admin') ? 'admin' : 'cliente',
        email: '',
        username: '',
        password: '',
        name: '',
        gender: '',
        street: '',
        number: '',
        zipCode: '',
        phone: '',
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

    const handleSubmit = (e) =>
    {
        e.preventDefault();

        const newUser =
        {
            ...newUserInfo, 
            id: usuarios[usuarios.length - 1].id + 1,
            fullAddress: newUserInfo.street + " " + newUserInfo.number + " " + newUserInfo.zipCode
        };

        createUser(newUser);
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