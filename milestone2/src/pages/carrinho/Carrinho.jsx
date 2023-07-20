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
    
    const updateUsuarios = async ( totalPurchase, creditCard ) =>
    {
        const compra = {};
        compra["produtos"] = userData.cartProducts;
        compra["total"] = totalPurchase;
        compra["cartao"] = creditCard;

        const historico = userData.purchaseHistory;
        historico.push(compra)
        
        const users = await fetchUsers();
        const usersPromises = users.map(async (user) =>
        {
            let newData =
            {
                ...user, 
                cartProducts: [], 
                totalProducts: 0,
                purchaseAmount: 0,
            };

            if(user._id === userData._id)
            {
                newData = { ...newData, purchaseHistory: historico };

                updateUserData(newData);
            }
            
            await updateUser(newData);
        })
        
        Promise.all(usersPromises);
    }
    
    const navigate = useNavigate();
    const finalizePurchase = async ( buy, totalPurchase, creditCard ) =>
    {
        if(buy)
        {
            alert("Purchase completed successfully!");
            navigate('/');

            await Promise.all( [ updateStock() , updateUsuarios(totalPurchase, creditCard) ] );
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