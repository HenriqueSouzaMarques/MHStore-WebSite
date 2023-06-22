import React from 'react';

import "../Produtos.css";

import { produtos } from "../../../data/produtos.js";

import Produto from "../../../components/Produto/Produto";

const Shorts = () =>
{
    const shorts = produtos.filter(produto => produto.tipo === "shorts");

    return (
        <>
            <h3 id="shorts"> Shorts </h3>
        
            <div className="shorts-container">
                
                {shorts.map((shorts, index) => (
                    <Produto 
                        produto={shorts}
                        key={index}    
                    />
                ))}
                
            </div>
        
        </>
    )
}

export default Shorts;