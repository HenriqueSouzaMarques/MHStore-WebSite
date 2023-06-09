import React, { useContext } from 'react';
import { IconButton } from '@mui/material';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import { UserContext } from '../../../../../UserContext';

const BotaoLogout = ({ children }) => 
{
    const { logout } = useContext(UserContext);

    return (<IconButton color="primary" onClick={() => logout()}><ExitToAppIcon/>{children}</IconButton>);
};

export default BotaoLogout;
