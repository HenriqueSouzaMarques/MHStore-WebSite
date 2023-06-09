import React, { useContext } from 'react';

import { Button } from '@mui/material';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import { UserContext } from '../../../UserContext';

import { useNavigate } from 'react-router-dom';

const BotaoAdicionar = ( { width, setAdicionarCarrinho } ) =>
{
    const { userData } = useContext(UserContext);

    const navigate = useNavigate();
    
    const handleAddCartClick = () =>
    {
        if(!userData)
        {
            navigate('/login', { state : { type: 'client' }});
        }

        setAdicionarCarrinho(true);        
    }
    
    return (
        <Button 
            variant='outlined'
            endIcon={<AddShoppingCartIcon/>} 
            sx={{width : width}}
            onClick={handleAddCartClick}
        >
            Add Cart
        </Button>
    )
}

export default BotaoAdicionar;