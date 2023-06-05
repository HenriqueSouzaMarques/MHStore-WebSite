import React, { useEffect, useState } from 'react';

import './Produto.css';
import { Button, ButtonGroup } from '@mui/material';

import InfoIcon from '@mui/icons-material/Info';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';

const Produto = ( {produto} ) =>
{
    const [imagem, setImagem] = useState(null);

    useEffect(() => 
    {
        const importarImagem = async () =>
        {
            try 
            {
                const imagem = await import(`../../assets/Produtos/${produto.imagem}`);
                setImagem(imagem.default);
            }
            catch (error) 
            {
                console.error('Erro ao carregar a imagem: ', error);
            }
        };
    
        importarImagem();
      }, [imagem]);

    return (
        <>
            {  
                produto.estoque > 0 ?                 
                    <div className='produto-container'>

                        <div className='nome'> {produto.marca} {produto.nome} </div>

                        {imagem && <img src={imagem}></img>}
                        
                        <div className='estoque'> {produto.estoque} </div>

                        <div className='preco'> $ {produto.preco},00 </div>

                        <ButtonGroup variant="outlined" >
                            <Button endIcon={<InfoIcon/>} sx={{width : 140}}>
                                Info
                            </Button>

                            <Button variant="outlined" endIcon={<AddShoppingCartIcon/>} sx={{width : 140}}>
                                Add Cart
                            </Button>
                        </ButtonGroup>

                    </div>   
                : null
            }
        </>
    )
}


export default Produto;