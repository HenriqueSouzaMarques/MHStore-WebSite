import React, { useContext, useState } from 'react';
import { Button } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

import './PrecoTotal.css'
import { UserContext } from '../../../UserContext';
import FinalizarCompra from './FinalizarCompra/FinalizarCompra';

const PrecoTotal = ( { handleIsBlurred, handleFinalizePurchase } ) => 
{
    const { userData } = useContext(UserContext);

    const [ isBlurred, setIsBlurred ] = useState(false);

    const [ finalizePurchase, setFinalizePurchase] = useState(false);


    const handleProceedPurchase = () =>
    {
        setIsBlurred(true);
        handleIsBlurred();

        setFinalizePurchase(true);
    };

    const closeFinalize = ( buy, total, creditCard ) =>
    {
        setIsBlurred(false);
        setFinalizePurchase(false);

        handleFinalizePurchase(buy, total, creditCard);
    }

    return (
        <>
        
            <div className={isBlurred ? 'blur' : 'preco-container'}>
                <h4 className='total-value'>
                    Total Purchase Amount: 
                    
                    {(userData.purchaseAmount).toLocaleString('en-US', { style: 'currency', currency: 'USD' })}
                </h4>


                <Button
                    variant="outlined"
                    style={{color: 'black', border: '1px solid black'}}
                    onClick={handleProceedPurchase}
                    endIcon={<ShoppingCartIcon />}
                    >
                    Proceed Purchase
                </Button>

            </div>
            
            {(finalizePurchase) && <FinalizarCompra 
                                        total={userData.purchaseAmount} 
                                        closeFinalize={closeFinalize}
                                    />}
        
        </>
    );
}

export default PrecoTotal;
