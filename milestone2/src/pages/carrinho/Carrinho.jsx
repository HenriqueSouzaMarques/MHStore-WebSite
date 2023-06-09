import React from "react";

import ProdutoCarrinho from "./ProdutoCarrinho/ProdutoCarrinho";
import Header from "../../components/Header/Header";

import { useContext } from "react";
import { UserContext } from "../../UserContext";

import './Carrinho.css';

const Carrinho = () =>
{
    const { userData, updateUserData } = useContext(UserContext);

    return (
        <>
            <Header />

            <h2> Cart </h2>

            {
                (userData === null) || (userData.cartProducts.length === 0) ? 
                    <h2> No elements!</h2>

                :
                    
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

export default Carrinho;