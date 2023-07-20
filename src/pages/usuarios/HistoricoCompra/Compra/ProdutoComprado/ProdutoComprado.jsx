import React, { useState, useEffect, useContext } from 'react';
import { Typography, Avatar, Box } from '@mui/material';
import memoizeOne from 'memoize-one';
import { UserContext } from '../../../../../UserContext';

const loadImage = async (imageUrl, fallbackImageUrl) =>
{
    try
    {
        const importedImage = await import(`../../../../../assets/Produtos/${imageUrl}`);
        return importedImage.default;
    }
    catch (error)
    {
        const importedFallbackImage = await import(`../../../../../assets/Produtos/${fallbackImageUrl}`);
        return importedFallbackImage.default;
    }
};

const ProdutoComprado = ({ produto }) => {
    const { id, tamanho, quantidade } = produto;

    const [ imagem, setImagem ] = useState(null);
    const [ nome, setNome ] = useState('');
    const [ marca, setMarca ] = useState('');
    const [ preco, setPreco ] = useState('');

    const { fetchProduto } = useContext(UserContext);

    const fetchProdutoMemoized = memoizeOne(fetchProduto);
  
    useEffect(() =>
    {
        const fetchData = async () =>
        {
            const product = await fetchProdutoMemoized(id);
  
            const [loadedImage, loadedFallbackImage] = await Promise.all(
            [
                loadImage(product.imagem, 'not_found.png'),
                loadImage('not_found.png')
            ]);
  
            setImagem(loadedImage || loadedFallbackImage);
            setNome(product.nome);
            setMarca(product.marca);
            setPreco(product.preco);
        };

        fetchData();
    }, []);

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: '16px' }}>
      <Avatar alt={nome} src={imagem} sx={{ width: 100, height: 100 }}/>
      <Box sx={{ marginLeft: '16px' }}>
        <Typography variant="h5">{marca} {nome}</Typography>
        <Typography variant="body2">Size: {tamanho}</Typography>
        <Typography variant="body2" color="textPrimary">
          Current Unit Price: {preco.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}
        </Typography>
        <Typography variant="body2">Quantity: {quantidade}</Typography>
      </Box>
      <Box sx={{ marginLeft: 'auto', display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
        <Typography variant='h6' component='div'>
          {(preco * quantidade).toLocaleString('en-US', { style: 'currency', currency: 'USD' })}
        </Typography>
      </Box>
    </Box>
  );
};

export default ProdutoComprado;
