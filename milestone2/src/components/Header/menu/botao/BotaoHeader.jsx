import React from "react";
import { Link, useNavigate } from 'react-router-dom';

import './BotaoHeader.css'

const BotaoHeader = ( {children, link, props} ) =>
{
    const navigate = useNavigate();

    const navegar = () =>
    {
        if(props === null)
        {
            navigate(link);
        }
        else
        {
            navigate(link, { state: props })
        }
    }

    return ( <button onClick={navegar} className="botao-header">{children}</button> )
}
    



export default BotaoHeader;