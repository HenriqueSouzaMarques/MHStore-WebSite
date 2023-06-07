import React, { useEffect, useState, useContext } from 'react';

import './Produto.css';
import { Button, ButtonGroup } from '@mui/material';

import InfoIcon from '@mui/icons-material/Info';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import { UserContext } from '../../UserContext';
import { useNavigate } from 'react-router-dom';
import AdicionarCarrinho from './AdicionarCarrinho/AdicionarCarrinho';

const Produto = ( {produto} ) =>
{
    const [imagem, setImagem] = useState(null);
    const [adicionarCarrinho, setAdicionarCarrinho] = useState(false);

    const { userData, updateUserData } = useContext(UserContext);

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

    const navigate = useNavigate();

    const handleAddCartClick = () =>
    {
        const props = 
        {
            linkBack: '/products', 
            createAdmin: false
        };

        if(!userData)
        {
            navigate('/login', { state: props });
        }

        setAdicionarCarrinho(true);        
    }

    const handleAddInfoClick = () =>
    {
        navigate('/info', { state : {produto}})
    }

    const addProduct = (product, quantity) =>
    {
        const isProductInArray = (userData.cartProducts).find((obj) =>
            Object.entries(obj).every(([key, value]) => product[key] === value)
        );

        if(isProductInArray && product.quantidade + quantity <= product.estoque)
        {
            product.quantidade = product.quantidade + quantity;

            updateUserData((oldUserData) => ({
                ...oldUserData, cartProducts: [...oldUserData.cartProducts, product]
            })); 
        }
        else
        {
            let produtoComQuantidade = {...produto, quantidade: quantity};

            updateUserData((oldUserData) => ({
                ...oldUserData, cartProducts: [...oldUserData.cartProducts, produtoComQuantidade]
            }));
        }
    }

    const closePopUp = (size, quantidade, buy) =>
    {
        if(buy)
        {
            let produtoComTamanho = {...produto, tamanho: size};

            addProduct(produtoComTamanho, quantidade);
        }

        setAdicionarCarrinho(false);
    }
    
    return (
        <>
            {  
                produto.estoque > 0 ?                 
                    <div className='produto-container'>

                        <div className='nome'> {produto.marca} {produto.nome} </div>

                        {imagem && <img src={imagem}></img>}
                        
                        <div className='estoque'> Stock: {produto.estoque} items </div>

                        <div className='preco'> $ {produto.preco},00 </div>

                        <ButtonGroup variant="outlined" >
                            <Button 
                                endIcon={<InfoIcon/>} 
                                sx={{width : 140}}
                                onClick={handleAddInfoClick}
                            >
                                Info
                            </Button>

                        
                            <Button 
                                endIcon={<AddShoppingCartIcon/>} 
                                sx={{width : 140}}
                                onClick={handleAddCartClick}
                            >
                                Add Cart
                            </Button>
                        </ButtonGroup>

                    </div>   
                : null
            }

            {
                adicionarCarrinho && 
                <AdicionarCarrinho 
                    updateUserData={updateUserData}
                    product={produto}  
                    closePopUp={closePopUp}  
                />
            }
        </>
    )
}


export default Produto;