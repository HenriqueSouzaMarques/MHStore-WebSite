import React from "react";
import { useNavigate } from 'react-router-dom';

import { IconButton } from "@mui/material";

import './BotaoHeader.css'

const BotaoHeader = ( {children, link, props} ) =>
{
    const navigate = useNavigate();

    const navegar = () =>
    {
        navigate(link, { state: props })
    }

    return ( <IconButton onClick={navegar} className="botao-header"> {children} </IconButton> )
}
    



export default BotaoHeader;