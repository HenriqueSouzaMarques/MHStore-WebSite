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

    const finalizePurchase = ( buy ) =>
    {
        if(buy)
        {
            let newData = {...userData, cartProducts: []};
            newData = {...newData, totalProducts: 0};
            newData = {...newData, purchaseAmount: 0};

            updateUserData(newData);
            
            navigate('/');
            
            alert("Purchase completed successfully!");
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

            let newData = {...userData, totalProducts: quantidadeTotal}
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