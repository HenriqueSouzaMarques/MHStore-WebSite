import React from 'react';

import "../Produtos.css";

import { produtos } from "../../../data/produtos.js";

import Produto from "../../../components/Produto/Produto";

const Tenis = () =>
{
    const tenis = produtos.filter(produto => produto.tipo === "sneakers");

    return (
        <>
            <h3 id="sneakers"> Sneakers </h3>
        
            <div className="tenis-container">
                
                {tenis.map((tenis, index) => (
                    <Produto 
                        produto={tenis}z
                        key={index}    
                    />
                ))}
                
            </div>
        
        </>
    )
}

export default Tenis;