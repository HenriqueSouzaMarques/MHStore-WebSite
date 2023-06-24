import React from 'react';
import EditIcon from '@mui/icons-material/Edit';
import { Button } from '@mui/material';

const BotaoEditar = ( { setEditProduct } ) =>
{
    return (
        <Button 
            style={{width: "120px"}}
            variant='outlined'
            endIcon={<EditIcon />}
            onClick={setEditProduct}
        > 
        
            Edit
        
        </Button>
    )
}

export default BotaoEditar