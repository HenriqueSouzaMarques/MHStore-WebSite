import React from 'react'
import { useContext } from 'react';

import { Box, Typography } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { UserContext } from '../../../../UserContext';
import BotaoLogout from './BotaoLogout/LogoutButton';

const theme = createTheme(
{
    userBadge:
    {
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: 40,
        height: 40,
        borderRadius: '50%',
        backgroundColor: '#444',
        color: 'white',
        fontWeight: 'bold',
        fontSize: 15
    },

    username: 
    {
        fontSize: 16
    }
});

const getInitials = (name) => 
{
    const nameArray = name.trim().split(' ');
    const initials = nameArray.map((word) => word[0].toUpperCase());

    return initials.join('');
}

const UserInfo = () => 
{
    const { userData } = useContext(UserContext);

    return (

        <>
            <div>
                <ThemeProvider theme={theme}>

                    <Box display="flex" alignItems="center">

                        <Box sx={theme.userBadge}>
                            <Typography sx={theme.userBadge}>{getInitials(userData.username)}</Typography>
                        </Box>

                        <Box ml={1}>
                            <Typography sx={theme.username}>Welcome!</Typography>
                        </Box>

                        <Box ml={2}>
                            <BotaoLogout> <Typography >Log Out</Typography> </BotaoLogout> 
                        </Box>
                    </Box>

                </ThemeProvider>
            

            </div>
        </>

    )
}

export default UserInfo;