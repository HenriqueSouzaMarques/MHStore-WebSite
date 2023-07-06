import React, { useState } from "react";

import ProdutoCarrinho from "./ProdutoCarrinho/ProdutoCarrinho";
import Header from "../../components/Header/Header";

import { useContext } from "react";
import { UserContext } from "../../UserContext";

import './Carrinho.css';
import PrecoTotal from "./PrecoTotal/PrecoTotal";
import { useNavigate } from "react-router-dom";

const Carrinho = () =>
{
    const { userData, updateUserData, fetchProduto, fetchUsers, updateProduct, updateUser } = useContext(UserContext);

    const [isBlurred, setIsBlurred] = useState(false);

    const handleIsBlurred = () =>
    {
        setIsBlurred(true);
    }
    
    const updateStock = async () =>
    {
        for (const product of userData.cartProducts)
        {            
            const produto = await fetchProduto(product.id);
            
            const updatedProduct = { ...produto }; // Assuming `produto` is the retrieved product
            if (updatedProduct.estoque - product.quantidade > 0)
            {
                updatedProduct.estoque -= product.quantidade;
            } 
            else 
            {
                updatedProduct.estoque = 0;
            }
            
            await updateProduct(updatedProduct);
        }
    };

    const updateUsersCarts = async () =>
    {
        const users = await fetchUsers();

        const usersPromises = users.map( async (user) =>
        {
            let novoCarrinho = (user.cartProducts);
            let novoTotal = (user.purchaseAmount);
            let novaQuantidade = (user.totalProducts);

            for(const produtoDesejado of user.cartProducts)
            {
                if(user._id === userData._id) break;

                for(const produtoComprado of userData.cartProducts)
                {
                    if(produtoComprado.id !== produtoDesejado.id) continue;

                    const produto = await fetchProduto(produtoComprado.id);

                    if(produto.estoque === 0)
                    {
                        novaQuantidade -= produtoDesejado.quantidade;
                        novoTotal -= (produtoDesejado.quantidade * produto.preco);

                        novoCarrinho = novoCarrinho.filter((p) => p.id !== produto._id);
                    }

                    else if (produtoDesejado.quantidade > produto.estoque)
                    {
                        const quantidadeResidual = (produtoDesejado.quantidade - produto.estoque);

                        novaQuantidade -= quantidadeResidual;
                        novoTotal -= (quantidadeResidual * produto.preco);

                        novoCarrinho = novoCarrinho.map((p) =>
                        {
                            if(p.id === produtoDesejado.id)
                            {
                                return {...p, quantidade: produto.estoque}
                            }

                            return p;
                        })
                    }
                }
            }

            await updateUser(
                {
                    ...user, 
                    purchaseAmount: novoTotal,
                    totalProducts: novaQuantidade > 0,
                    cartProducts: novoCarrinho
                });
        })

        await Promise.all(usersPromises);
    }
    
    const updateUsuario = async ( totalPurchase, creditCard ) =>
    {
        const compra = {};
        compra["produtos"] = userData.cartProducts;
        compra["total"] = totalPurchase;
        compra["cartao"] = creditCard;

        const historico = userData.purchaseHistory;
        historico.push(compra)
        
        let newData = {...userData, cartProducts: [], purchaseHistory: historico};
        newData = {...newData, totalProducts: 0};
        newData = {...newData, purchaseAmount: 0};
        
        await updateUser(newData);
        updateUserData(newData);
    }
    
    
    const navigate = useNavigate();
    const finalizePurchase = async ( buy, totalPurchase, creditCard ) =>
    {
        if(buy)
        {
            await Promise.all( [ updateStock() , updateUsuario(totalPurchase, creditCard) ] );

            alert("Purchase completed successfully!");
            navigate('/');

            await updateUsersCarts()
        }
        else
        {
            setIsBlurred(false);
        }
    }


    return (
        <>
            <Header/>
            <div className={isBlurred ? 'blur' : null}>

                <h2> Cart </h2>

                {
                    (userData === null) || (userData.totalProducts === 0) ? 
                        <h2> No elements!</h2>

                    :
                        
                    (
                        <>
                            {
                                (userData.cartProducts).map((produto, index) =>
                                (
                                    <ProdutoCarrinho 
                                        cartProduct={produto}
                                        index={index}
                                        key={index}
                                    />
                                ))
                            }

                        </>    
                    )
                }
            </div>

        {            
            (userData !== null) && (userData.totalProducts !== 0) &&
                <PrecoTotal 
                    handleFinalizePurchase={finalizePurchase}
                    handleIsBlurred={handleIsBlurred}
                />
        }

        </>
    )
}

export default Carrinho;