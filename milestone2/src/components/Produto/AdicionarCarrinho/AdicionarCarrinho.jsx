import React, { useState } from 'react';

import { FormControl, FormLabel, RadioGroup, FormControlLabel, Radio, Button } from '@mui/material';

import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import CancelIcon from '@mui/icons-material/Cancel';

import './AdicionarCarrinho.css'
import MudarQuantidade from './MudarQuantidade/MudarQuantidade';

const AdicionarCarrinho = ( { product, closePopUp } ) =>
{
    const [size, setSize] = useState(product.tipo === "sneakers" ? 41 : 'M');
    const [quantity, setQuantity] = useState(1);

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

                <FormControl>
                    <FormLabel >Size</FormLabel>
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
                            labelPlacement="bottom"
                        />
                        <FormControlLabel 
                            control={<Radio />} 
                            value={product.tipo === "sneakers" ? 41 : "M"} 
                            label={product.tipo === "sneakers" ? 41 : "M"} 
                            labelPlacement="bottom"
                        />
                        <FormControlLabel 
                            control={<Radio />} 
                            value={product.tipo === "sneakers" ? 42 : "L"} 
                            label={product.tipo === "sneakers" ? 42 : "L"} 
                            labelPlacement="bottom"
                        />
                    </RadioGroup>

                    <FormLabel>Quantity</FormLabel>
                    <MudarQuantidade 
                        quantity={quantity}
                        handleDecreaseQuantity={handleDecreaseQuantity}
                        handleIncreaseQuantity={handleIncreaseQuantity}
                    />
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