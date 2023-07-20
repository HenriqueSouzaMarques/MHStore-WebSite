import React, { useEffect, useState, useContext } from 'react';

import './Produto.css';

import { UserContext } from '../../UserContext';

import BotaoAdicionar from './BotaoAdicionar/BotaoAdicionar';
import BotaoEditar from './BotaoEditar/BotaoEditar';
import BotaoRemover from './BotaoRemover/BotaoRemover';

import AdicionarCarrinho from './AdicionarCarrinho/AdicionarCarrinho';
import EditarProduto from './EditarProduto/EditarProduto';
const Produto = ( { produto, updateProduto } ) =>
{
    const { userData, updateUserData, addCart, fetchProduto, fetchUsers, updateUser } = useContext(UserContext);

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
                const imagem = await import('../../assets/Produtos/not_found.png');
                setImagem(imagem.default);
            }
        };
    
        importarImagem();
    }, [imagem]);

    const removeProduct = async () =>
    {
        await Promise.all[ updateRemoveUsers(produtoAtual), updateProduto({...produtoAtual, estoque: 0}) ];
    };

    const updateRemoveUsers = async ( produtoAtual ) =>
    {
        const users = await fetchUsers();
        
        const updatePromises = users.map(async (user) => 
        {
            let novoTotal = user.totalProducts;
            let novoPreco = user.purchaseAmount;

            (user.cartProducts).forEach((product) =>
            {
                if(product.id === produtoAtual._id)
                {
                    novoTotal -= product.quantidade;
                    novoPreco -= (product.quantidade * produtoAtual.preco)
                } 
            })

            const newCart = (user.cartProducts).filter((product) => (product.id !== produtoAtual._id));

            const newUserData = 
            {
                ...user, 
                cartProducts: newCart, 
                totalProducts: novoTotal, 
                purchaseAmount: novoPreco
            };

            if(user._id === userData._id)
            {
                updateUserData(newUserData);
            }

            await updateUser(newUserData);
        });

        await Promise.all(updatePromises);
    }

    const addProduct = async (produto, tamanho, quantidade) =>
    {
        const newData = await addCart(produto._id, tamanho, quantidade, userData);
        
        updateUserData(newData);
    }

    const closeAddPopUp = async (size, quantidade, buy) =>
    {
        setAdicionarCarrinho(false);

        if(buy)
        {
            await addProduct(produtoAtual, size, quantidade);
        }
    }

    const closeEditPopUp = async ( edit, newProduct ) =>
    {
        setEditarProduto(false);

        if(edit)
        {
            setProdutoAtual(newProduct);

            await updateUsers(newProduct);
            await updateProduto(newProduct);
        }
    }

    const updateEditarCarrinho = ( user, newProduct ) =>
    {
        let novoTotal = user.totalProducts;

        const newCart = (user.cartProducts).map((product) =>
        {
            if(product.id === newProduct._id)
            {
                let novaQuantidade = product.quantidade;

                if(novaQuantidade > newProduct.estoque)
                {
                    novoTotal -= (novaQuantidade - newProduct.estoque)

                    novaQuantidade = newProduct.estoque;
                }

                return { 
                    ...product, 
                    quantidade: novaQuantidade,
                };
            }

            return product;
        });
        
        return [ newCart, novoTotal ];
    }

    const updateUsers = async ( newProduct ) =>
    {
        const users = await fetchUsers();

        const updatePromises = users.map(async (user) =>
        {
            const [ newCart, novoTotal ] = updateEditarCarrinho(user, newProduct);
    
            let novoPurchaseAmount = 0;

            for(const produto of newCart)
            {
                const produtoCatalogo = await fetchProduto(produto.id);
                
                if(produtoCatalogo._id === newProduct._id)
                {
                    novoPurchaseAmount += ((newProduct.preco) * (produto.quantidade)) 
                }
                else
                {
                    novoPurchaseAmount += ((produtoCatalogo.preco) * (produto.quantidade)) 
                }
            }
    
            const newUserData = 
            {
                ...user, 
                cartProducts: newCart, 
                totalProducts: novoTotal, 
                purchaseAmount: novoPurchaseAmount
            };
    
            if(user._id === userData._id)
            {
                updateUserData(newUserData);
            }

            await updateUser(newUserData);
        });

        await Promise.all(updatePromises);
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
                                className='buttons-container'
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