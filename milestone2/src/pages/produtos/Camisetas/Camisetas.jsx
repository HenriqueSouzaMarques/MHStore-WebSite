import React from 'react';

import "../Produtos.css";

import produtos from "../../../data/produtos.json";
import Produto from "../../../components/Produto/Produto"

const Camisetas = () =>
{
    const camisetas = produtos.filter(produto => produto.tipo === "t-shirt");

    return (
        <>
        
            <h3 id="camisetas"> T-Shirts </h3>
            <div className="camisetas-container">
                
                {camisetas.map((camiseta, index) => (
                    <Produto 
                        produto={camiseta}
                        key={index}    
                    />
                ))}
                
            </div>
        
        </>
    )
}

export default Camisetas;