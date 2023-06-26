import React, { useState, useEffect } from 'react';
import { Typography, Avatar, Box } from '@mui/material';

const ProdutoComprado = ({ produto }) => {
    const [imagem, setImagem] = useState(null);
    
    useEffect(() => 
    {
        const importarImagem = async () =>
        {
            try 
            {
                const imagem = await import(`../../../../../assets/Produtos/${produto.imagem}`);
                setImagem(imagem.default);
            }
            catch (error) 
            {
                const imagem = await import('../../../../../assets/Produtos/not_found.png');
                setImagem(imagem.default);
            }
        };
    
        importarImagem();
    }, []);

  const { nome, marca, preco, tamanho, quantidade } = produto;

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: '16px' }}>
      <Avatar alt={nome} src={imagem} sx={{ width: 100, height: 100 }}/>
      <Box sx={{ marginLeft: '16px' }}>
        <Typography variant="h5">{marca} {nome}</Typography>
        <Typography variant="body2">Size: {tamanho}</Typography>
        <Typography variant="body2" color="textPrimary">
          Unit Price: {preco.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}
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
