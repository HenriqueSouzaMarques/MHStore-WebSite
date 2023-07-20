import React, { useState, useContext } from 'react';

import { Button, TextField, Grid, Box } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import CancelIcon from '@mui/icons-material/Cancel';

import { UserContext } from '../../../UserContext';

const NovoCupom = ( { setAdicionarCupom } ) =>
{
    const { addCoupon } = useContext(UserContext);

    const [ nome, setNome ] = useState('');
    const [ desconto, setDesconto ] = useState('');
    const [ quantidade, setQuantidade ] = useState('');

    const handleCreate = async () =>
    {
        if(nome === '' || desconto === '' || quantidade === '')
        {
            alert("Fill out all the fields!");

            return;
        }

        if(desconto <= 0 || desconto >= 100)
        {
            alert("Discount should be greater than 0 and lower than 100!");
    
            return;
        }

        if(quantidade <= 0)
        {
            alert("Quantity should be greater than 0!");
    
            return;
        }
    
        const novoCupom =
        {
            nome: nome, 
            desconto: desconto, 
            quantidade: quantidade
        }

        try
        {
            await addCoupon(novoCupom);

            alert("Creation done successfully!");

            setAdicionarCupom(false);
        }
        catch(error)
        {
            alert("Error while creating: each coupon must have a unique name! ");

            setNome('');
        }
    }


    return (
        <div className='pop-up-container'>
            <div className='pop-up-conteudo-overlay'>
                <Grid container spacing={2} justifyContent='center'>
                    <Grid item xs={12}>
                        <TextField
                            label='Coupon Name'
                            value={nome}
                            onChange={(e) => setNome(e.target.value)}
                            fullWidth
                            required
                        />
                    </Grid>

                    <Grid item xs={12} sm={6}>
                        <TextField
                            label='Discount (%)'
                            type='number'
                            value={desconto}
                            onChange={(e) => setDesconto(e.target.value)}
                            fullWidth
                            required
                            inputProps=
                            {
                                {
                                    min: 0,
                                    max: 100,
                                }
                            }
                        />
                    </Grid>

                    <Grid item xs={12} sm={6}>
                        <TextField
                            label='Quantity'
                            type='number'
                            value={quantidade}
                            onChange={(e) => setQuantidade(e.target.value)}
                            fullWidth
                            required
                            inputProps=
                            {
                                {
                                    min: 0,
                                }
                            }
                        />
                    </Grid>
                </Grid>

                <Grid container spacing={2} justifyContent="center" marginTop={2}>
                    <Grid item>
                        <Button
                            type="submit"
                            className="add-button"
                            variant="contained"
                            endIcon={<AddIcon />}
                            onClick={handleCreate}
                        >
                        Add Coupon
                        </Button>
                    </Grid>

                    <Grid item>
                        <Button
                            className="cancel-button"
                            variant="contained"
                            endIcon={<CancelIcon />}
                            onClick={() => setAdicionarCupom(false)}
                        >
                            Cancel
                        </Button>
                    </Grid>
                </Grid>
            </div>
        </div>
                    
    )
}

export default NovoCupom;