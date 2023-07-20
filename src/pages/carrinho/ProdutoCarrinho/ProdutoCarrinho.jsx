import React, { useState, useEffect, useContext } from 'react';
import memoizeOne from 'memoize-one';

import { Typography, Avatar, ButtonGroup, Button } from '@mui/material';

import MudarQuantidade from '../../../components/Produto/AdicionarCarrinho/MudarQuantidade/MudarQuantidade';
import { UserContext } from '../../../UserContext';

import { IconButton } from '@mui/material';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';

import './ProdutoCarrinho.css';


const loadImage = async (imageUrl, fallbackImageUrl) =>
{
    try
    {
        const importedImage = await import(`../../../assets/Produtos/${imageUrl}`);
        return importedImage.default;
    }
    catch (error)
    {
        const importedFallbackImage = await import(`../../../assets/Produtos/${fallbackImageUrl}`);
        return importedFallbackImage.default;
    }
};

const ProdutoCarrinho = ( { cartProduct, index } ) =>
{
    const { userData, updateUserData, fetchProduto, updateUser } = useContext(UserContext);

    const fetchProdutoMemoized = memoizeOne(fetchProduto);

    const [ produto, setProduto ] = useState(null);
    const [ tamanho, setTamanho ] = useState(cartProduct.tamanho);
    const [imagem, setImagem] = useState(null);
    const [marca, setMarca] = useState('');
    const [nome, setNome] = useState('');
    const [preco, setPreco] = useState(0);
    const [estoque, setEstoque] = useState(0);
    const [quantidade, setQuantidade] = useState(cartProduct.quantidade);
  
    useEffect(() =>
    {
        const fetchData = async () =>
        {
            const product = await fetchProdutoMemoized(cartProduct.id);
  
            const [loadedImage, loadedFallbackImage] = await Promise.all(
            [
                loadImage(product.imagem, 'not_found.png'),
                loadImage('not_found.png')
            ]);
  
            setImagem(loadedImage || loadedFallbackImage);
            setProduto(product);
            setTamanho(cartProduct.tamanho);
            setQuantidade(cartProduct.quantidade);
            setMarca(product.marca);
            setNome(product.nome);
            setPreco(product.preco);
            setEstoque(product.estoque);
  
            if(cartProduct.quantidade > product.estoque)
            {
                setQuantidade(product.estoque);
            }
        };
        fetchData();
    }, [cartProduct.id, cartProduct.tamanho]);

    const handleIncreaseQuantity = () =>
    {
        if(quantidade < estoque)
        {
            const novoTotal = quantidade + 1;

            setQuantidade(novoTotal);

            const novoCarrinho = (userData.cartProducts).map((product) =>
            {
                if(product.id === produto._id && product.size === tamanho)
                {
                    return { id: produto._id, quantidade: novoTotal, tamanho: tamanho};
                }

                return product;
            });

            const novosDados =
            {
                ...userData, 
                cartProducts: novoCarrinho, 
                totalProducts: userData.totalProducts + 1,
                purchaseAmount: userData.purchaseAmount + preco,
            };

            updateUserData(novosDados);
            updateUser(novosDados);
        }

    }

    const handleDecreaseQuantity = () =>
    {
        if(quantidade > 1)
        {
            const novoTotal = quantidade - 1;

            setQuantidade(novoTotal);

            const novoCarrinho = (userData.cartProducts).map((product) =>
            {
                if(product.id === produto._id && product.size === tamanho)
                {
                    return { id: produto._id, quantidade: novoTotal, tamanho: tamanho};
                }

                return product;
            });

            const novosDados =
            {
                ...userData, 
                cartProducts: novoCarrinho, 
                totalProducts: userData.totalProducts - 1,
                purchaseAmount: userData.purchaseAmount - preco,
            };

            updateUserData(novosDados);
            updateUser(novosDados);
        }  
    }

    const handleDelete = async ( index ) =>
    {
        const novoCarrinho = [...userData.cartProducts]; // Create a copy of the cartProducts array

        novoCarrinho.splice(index, 1);

        const novosDados =
        {
            ...userData, 
            cartProducts: novoCarrinho, 
            purchaseAmount: ((userData.totalProducts - quantidade) * produto.preco),
            totalProducts: (userData.totalProducts - quantidade)
        };

        updateUserData(novosDados);

        await updateUser(novosDados);
    }

    
    return (

        <div className="product-container">                
                
            <div className='product-info-container'>
                <IconButton onClick={() => handleDelete(index)}>
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