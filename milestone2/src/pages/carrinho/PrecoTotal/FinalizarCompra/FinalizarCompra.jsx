import React, {useContext, useState} from 'react';

import { Button, IconButton } from '@mui/material';
import { TextField } from '@mui/material';
import Edit from '@mui/icons-material/Edit';
import CancelIcon from '@mui/icons-material/Cancel';
import CheckIcon from '@mui/icons-material/Check';
import Clear from '@mui/icons-material/Clear';
import Send from '@mui/icons-material/Send';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

import { UserContext } from "../../../../UserContext";

import './FinalizarCompra.css'

const FinalizarCompra = ( { closeFinalize } ) =>
{
    const { userData, updateUserData } = useContext(UserContext);

    const [total, setTotal] = useState(userData.purchaseAmount);

    const [address, setAddress] = useState(userData.fullAddress);
    const [isEditing, setIsEditing] = useState(false);

    const [discountCoupon, setDiscountCoupon] = useState('');
    const [ discount, setDiscount ] = useState(0);

    const [isValidCoupon, setIsValidCoupon] = useState(false);

    const handleEditClick = () =>
    {
        setIsEditing(true);  
    };
    
    const handleAddressChange = (e) =>
    {
        setAddress(e.target.address);
    };
    
    const handleSaveClick = () =>
    {
        setIsEditing(false);
    };

    const handleCouponChange = (e) =>
    {
        setDiscountCoupon(e.target.value);
    };

    const closeBuying = () =>
    {
        closeFinalize(true);
    }

    const closeNotBuying = () =>
    {
        if(isValidCoupon)
        {
            handleDisableCoupon();
        }

        closeFinalize(false)
    }

    const handleApplyCoupon = () =>
    {
        /* TODO: DISCOUNT COUPON VERIFICATION */
        if(discountCoupon)
        {
            setDiscount(userData.purchaseAmount / 10);

            const novoTotal = userData.purchaseAmount - (userData.purchaseAmount / 10);

            setTotal(novoTotal);

            const novosDados = {...userData, purchaseAmount: novoTotal};

            updateUserData(novosDados);

            setIsValidCoupon(true);
        }
    };

    const handleDisableCoupon = () =>
    {
        const novoTotal = total + discount;

        setTotal(novoTotal);

        setDiscount(0);

        const novosDados = {...userData, purchaseAmount: novoTotal};

        updateUserData(novosDados);

        setDiscountCoupon('');
        setIsValidCoupon(false);
    }

    return (
        <div className='finalizar-container'>

            <div className='finalizar-detalhes-container'>
                <h4>
                    
                    Total: {total.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}

                </h4>

                <div className='address-container'>  
                    <h4> Address: </h4>
            
                        <TextField
                            style={{marginLeft: '5px'}}
                            value={address}
                            onChange={handleAddressChange}
                            variant="outlined"
                            InputProps={{
                                readOnly: !isEditing
                            }}
                        />  
                
                        <IconButton 
                            style={{color: 'black'}}
                            onClick={isEditing ? handleSaveClick : handleEditClick}
                        >
                            {isEditing ? <CheckIcon /> : <Edit />}
                        </IconButton>
                </div>

                <div className='cupom-container'>
                    <h4> Coupon: </h4>

                        <TextField
                            value={discountCoupon}
                            style={{marginLeft: '5px'}}
                            onChange={handleCouponChange}
                            variant="outlined"
                            placeholder='Insert Coupon'
                            InputProps={{
                                readOnly: isValidCoupon
                            }}
                        />

                        <IconButton 
                            style={{color: 'black'}}
                            onClick={isValidCoupon ? handleDisableCoupon : handleApplyCoupon}
                        >
                            {!isValidCoupon ? <Send /> : <Clear />}
                        </IconButton>

                </div>

                <div className='add-carrinho-buttons-container'>
                    <Button 
                        style={{color: 'black', borderColor: 'black'}}
                        variant="outlined" 
                        onClick={closeBuying}
                        endIcon={<ShoppingCartIcon />}
                    >
                        Finalize Purchase
                    </Button>


                    <Button 
                        style={{color: 'black', borderColor: 'black'}}
                        variant="outlined" 
                        endIcon={<CancelIcon/>} 
                        onClick={closeNotBuying}
                        
                    >
                        Cancel
                    </Button>

                </div>

            </div>
        
        </div>
    )
}

export default FinalizarCompra;