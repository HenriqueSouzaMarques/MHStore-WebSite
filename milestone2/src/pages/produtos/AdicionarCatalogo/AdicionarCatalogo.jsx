import React, { useState } from 'react';
import { TextField, FormControl, FormControlLabel, Radio, RadioGroup, Button, Grid } from '@mui/material';
import { AddCircleOutline, Cancel } from '@mui/icons-material';

const AdicionarCatalogo = ( { setCatalogo, setAdicionarProduto } ) =>
{
    const catalogo = JSON.parse(localStorage.getItem('catalogo'));

    const [produto, setProduto] = useState(
    {
        nome: '',
        tipo: '',
        marca: '',
        imagem: '',
        preco: '',
        estoque: '',
        id: catalogo[catalogo.length - 1].id + 1
    });
    
    const handleChange = (e) =>
    {
        const { name, value } = e.target;

        setProduto((produtoAtual) => (
        {
            ...produtoAtual,
            [name]: value
        }));
    };
    
    const handleSubmit = (e) =>
    {
        e.preventDefault();

        const produtoFinalizado = 
        {
            ...produto, 
            estoque: parseInt(produto.estoque),
            preco: parseInt(produto.preco)
        }

        catalogo.push(produtoFinalizado);

        setCatalogo(catalogo);
        setAdicionarProduto(false);   
    };

    const handleCancel = () =>
    {
        setAdicionarProduto(false);
    };


    return (
        <div className='pop-up-container'> 
            <div className='pop-up-conteudo-overlay'>
                <form onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <FormControl component="fieldset" fullWidth>
                                <legend>Product Type</legend>
                                <RadioGroup
                                    aria-label="productType"
                                    name="tipo"
                                    value={produto.tipo}
                                    onChange={handleChange}
                                    row
                                >
                                        <FormControlLabel value="sneakers" control={<Radio />} label="Sneakers" />
                                        <FormControlLabel value="pants" control={<Radio />} label="Pants" />
                                        <FormControlLabel value="shorts" control={<Radio />} label="Shorts" />
                                        <FormControlLabel value="t-shirt" control={<Radio />} label="T-shirt" />
                                </RadioGroup>
                            </FormControl>
                        </Grid>

                        <Grid item xs={12}>
                            <FormControl component="fieldset" fullWidth>
                                <legend>Product Brand</legend>
                                <RadioGroup
                                    aria-label="productBrand"
                                    name="marca"
                                    value={produto.marca}
                                    onChange={handleChange}
                                    row
                                >
                                    <FormControlLabel value="Vans" control={<Radio />} label="Vans" />
                                    <FormControlLabel value="Nike" control={<Radio />} label="Nike" />
                                    <FormControlLabel value="Adidas" control={<Radio />} label="Adidas" />
                                </RadioGroup>
                            </FormControl>
                        </Grid>

                        <Grid item xs={12}>
                            <TextField
                                label="Product Name"
                                name="nome"
                                value={produto.nome}
                                onChange={handleChange}
                                required
                                fullWidth
                            />
                        </Grid>
                        
                        <Grid item xs={12}>
                            <TextField
                                label="Image Name"
                                name="imagem"
                                value={produto.imagem}
                                onChange={handleChange}
                                required
                                fullWidth
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <TextField
                                label="Stock"
                                name="estoque"
                                type="number"
                                value={produto.estoque}
                                onChange={handleChange}
                                required
                                fullWidth
                                inputProps={{ min: 1 }}
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <TextField
                                label="Price"
                                name="preco"
                                type="number"
                                value={produto.preco}
                                onChange={handleChange}
                                required
                                fullWidth
                                inputProps={{ min: 1 }}
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <Button
                                type="submit"
                                variant="contained"
                                startIcon={<AddCircleOutline />}
                            >
                                Add Product
                            </Button>
                        </Grid>

                        <Grid item xs={6}>
                            <Button
                                variant="outlined"
                                startIcon={<Cancel />}
                                onClick={handleCancel}
                                fullWidth
                            >
                                Cancel
                            </Button>
                        </Grid> 
                    </Grid>
                </form>
            </div>
        </div>
    )
}

export default AdicionarCatalogo;