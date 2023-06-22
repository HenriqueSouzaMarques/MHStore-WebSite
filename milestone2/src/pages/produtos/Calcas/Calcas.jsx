import React from 'react';

import "../Produtos.css";

import { produtos } from "../../../data/produtos.js";

import Produto from "../../../components/Produto/Produto"

const Calcas = () =>
{
    const calcas = produtos.filter(produto => produto.tipo === "pants");

    return (
        <>
            <h3 id="pants"> Pants </h3>
        
            <div className="calcas-container">
                
                {calcas.map((calca, index) => (
                    <Produto 
                        produto={calca}
                        key={index}    
                    />
                ))}
                
            </div>
        
        </>
    )
}

export default Calcas;