import React, { useState } from 'react';
import { Button, TextField } from '@mui/material';
import CancelIcon from '@mui/icons-material/Cancel';
import DoneAllIcon from '@mui/icons-material/DoneAll';

const EditarProduto = ( { product, closePopUp } ) =>
{
    const styleDiv  =
    {
        "display" : "flex",
        "alignItems" : "center",
        "marginBottom" : "5px"
    };

    const styleH4 = 
    {
        "width" : "50px"
    };

    const [ nome, setNome ] = useState(product.nome);
    const [ marca, setMarca ] = useState(product.marca);
    const [ preco, setPreco ] = useState(product.preco);
    const [ estoque, setEstoque ] = useState(product.estoque);

    const closeNotEditing = () =>
    {
        closePopUp(false, null);
    };

    const closeEditing = (e) =>
    {
        e.preventDefault();

        if(preco < 0 )
        {
            alert("Price must be greater than 0!\n");
        }
        else if(estoque < 1)
        {
            alert("Stock must be greater than 0!\n");
        }
        else
        {
            const newProduct = 
            {
                ...product,
                nome: nome,
                marca: marca,
                preco: parseFloat(preco),
                estoque: parseInt(estoque)
            }
    
            closePopUp(true, newProduct);
        }
    };

    const handleNomeChange = (e) =>
    {
        setNome(e.target.value);
    };

    const handleMarcaChange = (e) =>
    {
        setMarca(e.target.value);
    };

    const handlePrecoChange = (e) =>
    {
        setPreco(e.target.value);
    };

    const handleEstoqueChange = (e) =>
    {
        setEstoque(e.target.value);
    };

    return (
        <div className='pop-up-container'>
            <div className='pop-up-conteudo-overlay'>
                <form onSubmit={closeEditing}>
                    <div style={styleDiv}>  
                        <h4 style={styleH4}> Name: </h4>
                
                        <TextField
                            style={{marginLeft: '5px'}}
                            value={nome}
                            onChange={handleNomeChange}
                            variant="outlined"
                        />  
                    </div>

                    <div style={styleDiv}>  
                        <h4 style={styleH4}> Brand: </h4>
                
                        <TextField
                            style={{marginLeft: '5px'}}
                            value={marca}
                            onChange={handleMarcaChange}
                            variant="outlined"
                        />  
                    </div>

                    <div style={styleDiv}>  
                        <h4 style={styleH4}> Price:  </h4>
                
                        <TextField
                            style={{marginLeft: '5px'}}
                            value={preco}
                            onChange={handlePrecoChange}
                            variant="outlined"
                        />  
                    </div>

                    <div style={styleDiv}>  
                        <h4 style={styleH4}> Stock: </h4>
                
                        <TextField
                            style={{marginLeft: '5px'}}
                            value={estoque}
                            onChange={handleEstoqueChange}
                            variant="outlined"
                        />  
                    </div>

                    <div className='buttons-container'>
                        <Button 
                            variant="contained" 
                            endIcon={<CancelIcon/>} 
                            onClick={closeNotEditing}     
                        >
                            Cancel
                        </Button>

                        <Button
                            type='submit'
                            variant="contained"
                            endIcon={<DoneAllIcon />}
                        >
                            
                            Confirm
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default EditarProduto