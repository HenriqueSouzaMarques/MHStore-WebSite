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
    const { userData, updateUserData, fetchProduto, updateProduct, updateUser } = useContext(UserContext);

    const [isBlurred, setIsBlurred] = useState(false);

    const handleIsBlurred = () =>
    {
        setIsBlurred(true);
    }

    const navigate = useNavigate();

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


    const finalizePurchase = ( buy, totalPurchase, creditCard ) =>
    {
        if(buy)
        {
            alert("Purchase completed successfully!");

            updateStock();

            updateUsuario(totalPurchase, creditCard);
            
            navigate('/');
            
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