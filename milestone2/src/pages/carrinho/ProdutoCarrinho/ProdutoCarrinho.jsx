import React, { useState, useEffect, useContext } from 'react';

import { Typography, Avatar, Box, ButtonGroup, Button } from '@mui/material';

import MudarQuantidade from '../../../components/Produto/AdicionarCarrinho/MudarQuantidade/MudarQuantidade';
import { UserContext } from '../../../UserContext';

import { IconButton } from '@mui/material';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';

import './ProdutoCarrinho.css'

const ProdutoCarrinho = ( { index } ) =>
{
    const { userData, updateUserData } = useContext(UserContext);

    const [imagem, setImagem] = useState(null);
    
    useEffect(() => 
    {
        const importarImagem = async () =>
        {
            try 
            {
                const imagem = await import(`../../../assets/Produtos/${userData.cartProducts[index].imagem}`);
                setImagem(imagem.default);
            }
            catch (error) 
            {
                console.error('Erro ao carregar a imagem: ', error);
            }
        };
    
        importarImagem();
    }, [imagem]);


    const { tamanho, marca, nome, preco, quantidade, estoque, tipo } = userData.cartProducts[index];
    const handleIncreaseQuantity = () =>
    {
        let novaQuantidade = 
        (
            quantidade + 1 > estoque ? 
            estoque : quantidade + 1
        );

        let novoProduto = {...userData.cartProducts[index], quantidade: novaQuantidade};

        const novoCarrinho = userData.cartProducts.slice(0, index).concat(novoProduto).concat(userData.cartProducts.slice(index + 1));
        
        const novosDados = {...userData, cartProducts: novoCarrinho};

        updateUserData(novosDados);
    }

    const handleDecreaseQuantity = () =>
    {
        let novaQuantidade = 
        (
            quantidade - 1 > 1 ? 
            quantidade - 1 : 1
        );

        let novoProduto = {...userData.cartProducts[index], quantidade: novaQuantidade};

        const novoCarrinho = userData.cartProducts.slice(0, index).concat(novoProduto).concat(userData.cartProducts.slice(index + 1));
        
        const novosDados = {...userData, cartProducts: novoCarrinho};

        updateUserData(novosDados);
    }

    const handleDelete = () =>
    {
        const novoCarrinho = userData.cartProducts.slice(0, index).concat(userData.cartProducts.slice(index + 1));
     
        const novosDados = {...userData, cartProducts: novoCarrinho};

        updateUserData(novosDados);
    }

    
    return (
        <div className="product-container">
                <IconButton onClick={handleDelete}>
                    <DeleteOutlineIcon fontSize='large'/>
                </IconButton>

            <Avatar alt={nome} src={imagem} className='avatar'/>
            
            <div className="details">
                <Typography variant="h5">{marca} {nome}</Typography>
                <Typography variant="p">Size: {tamanho}</Typography>
                <Typography variant="p" color="textPrimary">
                    Unit Price: {preco.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}
                </Typography>
                <Typography variant="p" color="textPrimary">
                    Stock: {estoque} units
                </Typography>
            </div>

            <div className='actions'>
                <ButtonGroup>
                    <MudarQuantidade
                        quantity={quantidade}
                        handleDecreaseQuantity={handleDecreaseQuantity}
                        handleIncreaseQuantity={handleIncreaseQuantity}
                    />
                </ButtonGroup>
            </div>
        </div>
    )
}

export default ProdutoCarrinho;