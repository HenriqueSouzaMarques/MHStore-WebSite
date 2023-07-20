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
    const { userData, fetchCoupon, updateCoupon, deleteCoupon } = useContext(UserContext);

    const [ total, setTotal ] = useState(userData.purchaseAmount);

    const [ address, setAddress ] = useState(userData.fullAddress);
    const [ creditCard, setCreditCart ] = useState('');

    const [ isEditing, setIsEditing ] = useState(false);

    const [ discountCoupon, couponName ] = useState('');
    const [ discount, setDiscount ] = useState(0);

    const [ coupon, setCoupon ] = useState(null);

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
        couponName(e.target.value);
    };

    const handleCCChange = (e) =>
    {
        setCreditCart(e.target.value);
    };

    const closeBuying = async (e) =>
    {
        e.preventDefault();

        if(address === '' || isEditing)
        {
            alert("You must confirm an address to receive your products!");
        }
        else
        {
            closeFinalize(true, total, creditCard);

            if(coupon)
            {
                if(coupon.quantidade === 1)
                {
                    await deleteCoupon(coupon._id);
                }
                else
                {
                    const newCoupon = 
                    {
                        ...coupon,
                        quantidade: coupon.quantidade - 1
                    }

                    await updateCoupon(newCoupon._id, newCoupon);
                }
            }
        }
    }

    const closeNotBuying = () =>
    {
        if(coupon)
        {
            handleDisableCoupon();
        }

        closeFinalize(false, 0, '')
    }

    const handleApplyCoupon = async () =>
    {
        if(discountCoupon)
        {
            try
            {
                const cupom = await fetchCoupon(discountCoupon);

                setDiscount(total / (100 / cupom.desconto));

                const novoTotal = total - (total / (100 / cupom.desconto));                
                setTotal(novoTotal);

                setCoupon(cupom);
            }
            catch(error)
            {
                alert('Invalid coupon!');
            }
        }
    };

    const handleDisableCoupon = () =>
    {
        const novoTotal = total + discount;
        setTotal(novoTotal);

        setDiscount(0);

        couponName('');

        setCoupon(null);
    }

    return (
        <div className='finalizar-container'>

            <div className='finalizar-detalhes-container'>
                <h4>
                    
                    Total: {total.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}

                </h4>

                <form onSubmit={closeBuying}>
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
                                placeholder='Insert Address'
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
                                    readOnly: coupon
                                }}
                            />

                            <IconButton 
                                style={{color: 'black'}}
                                onClick={coupon ? handleDisableCoupon : handleApplyCoupon}
                            >
                                {!coupon ? <Send /> : <Clear />}
                            </IconButton>

                    </div>

                    <div className='credit-card-container'>
                            <h4> C. Card: </h4>
                            
                            <TextField
                                style={{marginLeft: '5px'}}
                                required
                                value={creditCard}
                                onChange={handleCCChange}
                                variant="outlined"
                                placeholder='Insert Credit Card'
                            />
                    </div>

                    <div className='buttons-container'>
                        <Button 
                            type='submit'
                            style={{color: 'black', borderColor: 'black'}}
                            variant="outlined" 
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
                </form>
            </div>
        
        </div>
    )
}

export default FinalizarCompra;