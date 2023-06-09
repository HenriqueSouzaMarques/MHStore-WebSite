import React, { useEffect, useState, useContext } from 'react';

import './Produto.css';

import { UserContext } from '../../UserContext';

import AdicionarCarrinho from './AdicionarCarrinho/AdicionarCarrinho';
import BotaoAdicionar from './BotaoAdicionar/BotaoAdicionar';

const Produto = ( { produto } ) =>
{
    const { userData, updateUserData } = useContext(UserContext);

    const [imagem, setImagem] = useState(null);
    const [adicionarCarrinho, setAdicionarCarrinho] = useState(false);

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

    const addProduct = (product, quantity) =>
    {
        let newData;

        const index = userData.cartProducts.findIndex((obj) => 
        {
            const { quantidade, ...rest } = obj;

            return JSON.stringify(rest) === JSON.stringify(product);
        });
      
        if(index !== -1)
        {
            let novaQuantidade = 
            (
                userData.cartProducts[index].quantidade + quantity > product.estoque ? 
                product.estoque : userData.cartProducts[index].quantidade + quantity
            );

            const produtosAtualizados = userData.cartProducts.map((obj, i) =>
            {
                if (i === index)
                {
                    return { ...obj, quantidade: novaQuantidade };
                }

                return obj;
            });

            newData = {...userData, cartProducts: produtosAtualizados};
        }
        else
        {
            let produtoComQuantidade = {...product, quantidade: quantity};

            newData = {...userData, cartProducts: [...userData.cartProducts, produtoComQuantidade]};
        }

        updateUserData(newData); 
    }

    const closePopUp = (size, quantidade, buy) =>
    {
        setAdicionarCarrinho(false);

        if(buy)
        {
            let produtoComTamanho = {...produto, tamanho: size};

            addProduct(produtoComTamanho, quantidade);
        }
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
                        
                        <BotaoAdicionar 
                            width={280}    
                            setAdicionarCarrinho={setAdicionarCarrinho}
                        />

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