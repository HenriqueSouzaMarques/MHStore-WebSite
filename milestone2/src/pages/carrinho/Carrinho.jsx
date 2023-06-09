import React, { useEffect, useState } from "react";

import ProdutoCarrinho from "./ProdutoCarrinho/ProdutoCarrinho";
import Header from "../../components/Header/Header";

import { useContext } from "react";
import { UserContext } from "../../UserContext";

import './Carrinho.css';

const Carrinho = () =>
{
    const { userData, updateUserData } = useContext(UserContext);
    const [ total, setTotal ] = useState(0);

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
            
            setTotal(valorTotal);
        }


    }, [userData])

    return (
        <>
            <Header/>

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

                        <h4> Total : {total.toLocaleString('en-US', { style: 'currency', currency: 'USD' })} </h4>
                    </>    
                )

            }

        </>
    )
}

export default Carrinho;