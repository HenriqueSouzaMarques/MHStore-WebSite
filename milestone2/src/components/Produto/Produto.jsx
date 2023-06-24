import React, { useEffect, useState, useContext } from 'react';

import './Produto.css';

import { UserContext } from '../../UserContext';


import BotaoAdicionar from './BotaoAdicionar/BotaoAdicionar';
import BotaoEditar from './BotaoEditar/BotaoEditar';
import BotaoRemover from './BotaoRemover/BotaoRemover';

import AdicionarCarrinho from './AdicionarCarrinho/AdicionarCarrinho';
import EditarProduto from './EditarProduto/EditarProduto';

const Produto = ( { produto, setCatalogo } ) =>
{
    const { userData, updateUserData } = useContext(UserContext);

    const [ imagem, setImagem ] = useState(null);
    const [ adicionarCarrinho, setAdicionarCarrinho ] = useState(false);
    const [ editarProduto, setEditarProduto ] = useState(false);
    const [ produtoAtual, setProdutoAtual ] = useState(produto);

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

    useEffect(() =>
    {
        if(userData)
        {
            let novoTotal = userData.totalProducts;
    
            const newCart = (userData.cartProducts).map((product) =>
            {
                if(product.id === produtoAtual.id)
                {
                    let novaQuantidade = product.quantidade;
    
                    if(novaQuantidade > produtoAtual.estoque)
                    {
                        novoTotal -= (novaQuantidade - produtoAtual.estoque)
    
                        novaQuantidade = produtoAtual.estoque;
                    }
    
                    return { 
                        ...product, 
                        estoque: produtoAtual.estoque, 
                        preco: produtoAtual.preco, 
                        quantidade: novaQuantidade 
                    };
                }
    
                return product;
            });
    
            const newUserData = {...userData, cartProducts: newCart, totalProducts: novoTotal};

            let catalogo = JSON.parse(localStorage.getItem('catalogo'));

            catalogo = catalogo.map((product) =>
            {
                if(product.id === produtoAtual.id)
                {
                    return produtoAtual;
                }

                return product;
            })
    
            updateUserData(newUserData);
            setCatalogo(catalogo);
        }

    }, [produtoAtual])

    const removeProduct = () =>
    {
        let catalogo = JSON.parse(localStorage.getItem('catalogo'));

        catalogo = catalogo.map((product) =>
        {
            if(product.id === produtoAtual.id)
            {
                return {...product, estoque: 0}
            }

            return product;
        })
        
        setCatalogo(catalogo);

        let novoTotal = userData.totalProducts;

        (userData.cartProducts).forEach(element =>
        {
            if(element.id === produtoAtual.id)
            {
                novoTotal -= element.quantidade;
            } 
        });

        const newCart = (userData.cartProducts).filter((product) => (product.id !== produtoAtual.id));

        const newUserData = {...userData, cartProducts: newCart, totalProducts: novoTotal};
        
        updateUserData(newUserData);
    };

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
            const novaQuantidade = 
            (
                userData.cartProducts[index].quantidade + quantity > produtoAtual.estoque ? 
                produtoAtual.estoque : userData.cartProducts[index].quantidade + quantity
            );

            const produtosAtualizados = (userData.cartProducts).map((obj, i) =>
            {
                if (i === index)
                {
                    return { ...obj, quantidade: novaQuantidade };
                }

                return obj;
            });

        
            newData = {...userData, cartProducts: produtosAtualizados};

            if(userData.cartProducts[index].quantidade + quantity <= produtoAtual.estoque)
            {
                newData = {...newData, totalProducts: (userData.totalProducts += quantity)};
            }
            else
            {
                newData = {...newData, totalProducts: (userData.totalProducts += (produtoAtual.estoque - userData.cartProducts[index].quantidade))}
            }
        }
        else
        {
            let produtoComQuantidade = {...product, quantidade: quantity};

            newData = {...userData, cartProducts: [...userData.cartProducts, produtoComQuantidade]};
            newData = {...newData, totalProducts: (newData.totalProducts += quantity)}; 
            newData = {...newData, purchaseAmount: (newData.purchaseAmount) += (quantity * produtoAtual.preco)}
        }

        updateUserData(newData); 
    }

    const closeAddPopUp = (size, quantidade, buy) =>
    {
        setAdicionarCarrinho(false);

        if(buy)
        {
            let produtoComTamanho = {...produtoAtual, tamanho: size};

            addProduct(produtoComTamanho, quantidade);
        }
    }

    const closeEditPopUp = ( edit, newProduct ) =>
    {
        if(edit)
        {
            setProdutoAtual(newProduct);
        }

        setEditarProduto(false);
    }

    return (
        <>
            {  
                produto.estoque > 0 &&                
                    <div className={!adicionarCarrinho ? 'produto-container' : 'produto-container put-behind'}>

                        <div className='nome'> {produtoAtual.marca} {produtoAtual.nome} </div>

                        {imagem && <img src={imagem}></img>}
                        
                        <div className='estoque'> Stock: {produtoAtual.estoque} items </div>

                        <div className='preco'> 
                            {produtoAtual.preco.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}
                        </div>
                        
                        {
                            userData && userData.type === 'admin' &&
                                
                            <div 
                                className='add-carrinho-buttons-container'
                                style={{width: "100%"}}
                            >
                                <BotaoEditar 
                                    setEditProduct={setEditarProduto}
                                /> 

                                <BotaoRemover
                                    removeProduct={removeProduct}
                                />
                            </div>
                        }

                        <BotaoAdicionar 
                            width={userData && userData.type === 'admin' ? 165 : 280}    
                            setAdicionarCarrinho={setAdicionarCarrinho}
                        />  
                    </div>
            }

            {
                adicionarCarrinho && 
                <AdicionarCarrinho 
                    product={produtoAtual}  
                    closePopUp={closeAddPopUp}  
                />
            }

            {
                editarProduto &&
                <EditarProduto 
                    product={produtoAtual}
                    closePopUp={closeEditPopUp}
                />
            }
        </>
    )
}


export default Produto;