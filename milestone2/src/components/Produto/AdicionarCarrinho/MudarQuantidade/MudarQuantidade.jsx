import React from 'react';

import { IconButton } from '@mui/material';

import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

import './MudarQuantidade.css'

const MudarQuantidade = ( { quantity, handleDecreaseQuantity, handleIncreaseQuantity } ) =>
{
    return (
        <>
            <div className='quantity-container'>
                <IconButton 
                    className='quantity-button'
                    variant="contained" 
                    onClick={handleDecreaseQuantity}
                >
                    <RemoveIcon />
                </IconButton>
            
                <span className='quantity-value'>{quantity}</span>

                <IconButton 
                    className='quantity-button'
                    variant="contained" 
                    onClick={handleIncreaseQuantity}
                >
                    <AddIcon />
                </IconButton>
            </div>
        </>
    )
}

export default MudarQuantidade;