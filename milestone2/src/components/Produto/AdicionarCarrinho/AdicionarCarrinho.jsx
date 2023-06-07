import React, { useState } from 'react';

import { FormControl, FormLabel, RadioGroup, FormControlLabel, Radio, Button } from '@mui/material';

import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import CancelIcon from '@mui/icons-material/Cancel';

import './AdicionarCarrinho.css'

const AdicionarCarrinho = ( { product, closePopUp } ) =>
{
    const [size, setSize] = useState("M");
    const [quantity, setQuantity] = useState(0);

    const handleIncreaseQuantity = () =>
    {
        if(quantity < product.estoque)
        {
            setQuantity(quantity + 1);
        }
    }

    const handleDecreaseQuantity = () =>
    {
        if(quantity > 1)
        {
            setQuantity(quantity - 1);
        }
    }

    const handleChangeSize = (e) => 
    {
        setSize(e.target.value);
    };

    const closeBuying = () =>
    {
        closePopUp(size, quantity, true);
    }

    const closeNotBuying = () =>
    {
        closePopUp(0, 0, false);
    }

    return (
        <div className='add-carrinho-container'>
            <div className='add-carrinho-conteudo-overlay'>

                <FormControl component='fieldset'>
                    <FormLabel component='legend'>Choose the Size</FormLabel>
                    <RadioGroup
                        aria-label='controlled-radio-buttons-group'
                        name='controlled-radio-buttons-group'
                        value={size}
                        onChange={handleChangeSize}
                        row
                    >
                        <FormControlLabel 
                            control={<Radio />} 
                            value={product.tipo === "sneakers" ? 40 : "S"} 
                            label={product.tipo === "sneakers" ? 40 : "S"} 
                        />
                        <FormControlLabel 
                            control={<Radio />} 
                            value={product.tipo === "sneakers" ? 41 : "M"} 
                            label={product.tipo === "sneakers" ? 41 : "M"} 
                        />
                        <FormControlLabel 
                            control={<Radio />} 
                            value={product.tipo === "sneakers" ? 42 : "L"} 
                            label={product.tipo === "sneakers" ? 42 : "L"} 
                        />
                    </RadioGroup>
                </FormControl>

                <FormControl>
                    <FormLabel component='legend'>Choose the Quantity</FormLabel>

                    <div className='quantity-container'>
                        <Button 
                            className='quantity-button'
                            variant="contained" 
                            onClick={handleIncreaseQuantity}
                        >
                            Increase
                        </Button>

                        <span className='quantity-value'>{quantity}</span>

                        <Button 
                            className='quantity-button'
                            variant="contained" 
                            onClick={handleDecreaseQuantity}
                        >
                            Decrease
                        </Button>
                    </div>

                </FormControl>


                <div className='add-carrinho-buttons-container'>
                    <Button 
                        className='add-button'
                        variant="contained" 
                        endIcon={<AddShoppingCartIcon/>} 
                        onClick={closeBuying}
                        
                    >
                        Add Cart
                    </Button>


                    <Button 
                        className='cancel-button'
                        variant="contained" 
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

export default AdicionarCarrinho;