import React from 'react';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { Button } from '@mui/material';

const BotaoRemover = ( { removeProduct } ) =>
{
    return (
        <Button 
            
            variant='outlined'
            endIcon={<DeleteOutlineIcon />}
            onClick={removeProduct}
        >
            Remove
        </Button>
    )
}

export default BotaoRemover;