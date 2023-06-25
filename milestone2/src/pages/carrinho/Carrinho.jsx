import React, { useEffect, useState } from "react";

import ProdutoCarrinho from "./ProdutoCarrinho/ProdutoCarrinho";
import Header from "../../components/Header/Header";

import { useContext } from "react";
import { UserContext } from "../../UserContext";

import './Carrinho.css';
import PrecoTotal from "./PrecoTotal/PrecoTotal";
import { useNavigate } from "react-router-dom";

const Carrinho = () =>
{
    const { userData, updateUserData } = useContext(UserContext);

    const [isBlurred, setIsBlurred] = useState(false);

    const handleIsBlurred = () =>
    {
        setIsBlurred(true);
    }

    const navigate = useNavigate();

    const updateStock = () =>
    {
        const catalogo = JSON.parse(localStorage.getItem('catalogo'));

        (userData.cartProducts).forEach((product) => 
        {
            const index  = catalogo.findIndex((productCatalogo) => productCatalogo.id === product.id);

            if(catalogo[index].estoque - product.quantidade > 0)
            {
                catalogo[index].estoque -= product.quantidade;
            }
            else
            {
                catalogo[index].estoque = 0;
            }

            localStorage.setItem('catalogo', JSON.stringify(catalogo));
        });
    }

    const updateUsers = ( newData ) =>
    {
        const users = JSON.parse(localStorage.getItem('users'));

        const userIndex = users.findIndex((user) => user.id === userData.id);

        users[userIndex] = newData;
        
        localStorage.setItem('users', JSON.stringify(users)); 
    }

    const updateUser = ( totalPurchase, creditCard ) =>
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

        updateUsers(newData);
        updateUserData(newData);
    }


    const finalizePurchase = ( buy, totalPurchase, creditCard ) =>
    {
        if(buy)
        {
            alert("Purchase completed successfully!");

            updateStock();

            updateUser(totalPurchase, creditCard);
            
            navigate('/');
            
        }
        else
        {
            setIsBlurred(false);
        }

    }

    useEffect(() => 
    {
        let quantidadeTotal = 0;

        if(userData !== null)
        {
            (userData.cartProducts).forEach(element => 
                {
                    quantidadeTotal += (element.quantidade);
                }
            );

            let newData = {...userData, totalProducts: quantidadeTotal};

            updateUsers(newData);
            updateUserData(newData);
        }


    }, [userData])

    useEffect(() =>
    {
        let valorTotal = 0

        if(userData !== null)
        {
            (userData.cartProducts).forEach(element => 
            {
                valorTotal += (element.quantidade) * (element.preco);
            });

            let newData = {...userData, purchaseAmount: valorTotal}
            
            updateUsers(newData);
            updateUserData(newData);
        }


    }, [userData])

    return (
        <>
            <Header/>
            <div className={isBlurred && 'blur'}>

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