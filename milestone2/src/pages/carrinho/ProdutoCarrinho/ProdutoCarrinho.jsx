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
    }, [userData]);

    const { tamanho, marca, nome, preco, quantidade, estoque } = userData.cartProducts[index];
    const handleIncreaseQuantity = () =>
    {
        if(quantidade < estoque)
        {
            const novoTotal = quantidade + 1;

            const novoProduto = {...userData.cartProducts[index], quantidade: novoTotal};

            const novoCarrinho = userData.cartProducts.slice(0, index).concat(novoProduto).concat(userData.cartProducts.slice(index + 1));

            const novosDados = {...userData, cartProducts: novoCarrinho, totalProducts: userData.totalProducts + 1};

            updateUserData(novosDados);
        }

    }

    const handleDecreaseQuantity = () =>
    {
        if(quantidade > 1)
        {
            const novoTotal = quantidade - 1;

            const novoProduto = {...userData.cartProducts[index], quantidade: novoTotal};

            const novoCarrinho = userData.cartProducts.slice(0, index).concat(novoProduto).concat(userData.cartProducts.slice(index + 1));

            const novosDados = {...userData, cartProducts: novoCarrinho, totalProducts: userData.totalProducts - 1};

            updateUserData(novosDados);
        }  
    }

    const handleDelete = () =>
    {
        let novoCarrinho = (userData.cartProducts).slice(0, index).concat((userData.cartProducts).slice(index + 1));

        const novosDados = {...userData, cartProducts: novoCarrinho, totalProducts: (userData.totalProducts - quantidade)};

        updateUserData(novosDados);
    }

    
    return (

        <div className="product-container">                
                
            <div className='product-info-container'>
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

            <div className='product-value-container'>
                <Typography variant='h4'>
                    Total
                </Typography>
                <Typography variant='h4'>
                    {(preco * quantidade).toLocaleString('en-US', { style: 'currency', currency: 'USD' })}
                </Typography>
            </div>
        </div>
    )
}

export default ProdutoCarrinho;