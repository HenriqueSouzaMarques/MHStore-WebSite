import React from 'react';

import "../Produtos.css";

import Produto from "../../../components/Produto/Produto";

const Shorts = ( { catalogo, updateProduto } ) =>
{
    const shorts = catalogo.filter(produto => produto.tipo === "shorts");

    return (
        <>
            <h3 id="shorts"> Shorts </h3>
        
            <div className="shorts-container">
                
                {shorts.map((shorts, index) => (
                    <Produto 
                        produto={shorts}
                        updateProduto={updateProduto}
                        key={index}    
                    />
                ))}
                
            </div>
        
        </>
    )
}

export default Shorts;