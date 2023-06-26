import { Button, Box } from '@mui/material';
import React from 'react'
import Compra from './Compra/Compra';

import CloseIcon from '@mui/icons-material/Close';

const HistoricoCompra = ( { compras, setCompras } ) =>
{
    const handleClick = () =>
    {
        setCompras(null);
    }

    const calculateTotalAmount = () =>
    {
        let total = 0;
        
        compras.forEach((compra) =>
        {
            total += compra.total;
        })

        return total.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
    }

    return (
        <div className='pop-up-container'>
            <div className='pop-up-conteudo-overlay'>

                <Box sx={{ maxHeight: '80vh', minWidth: '150vh', overflowY: 'auto' }}>
                    <h4 style={{fontSize: '40px', textAlign: 'center'}}> 
                        Total: {calculateTotalAmount()} 
                    </h4>
                    {
                        compras.map((compra, index) =>
                        (
                            <Compra key={index} compra={compra} />
                        ))
                    }
                </Box>
        
  
                <Button 
                    onClick={handleClick}
                    startIcon={<CloseIcon />}
                    variant="contained"
                    sx={{width: '50%'}}
                >
                    Close
                </Button>
            </div>
        </div>
    )
}

export default HistoricoCompra;