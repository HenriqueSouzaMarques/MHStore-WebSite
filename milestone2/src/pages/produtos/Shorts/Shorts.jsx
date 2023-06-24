import React from 'react';

import "../Produtos.css";

import Produto from "../../../components/Produto/Produto";

const Shorts = ( { catalogo, setCatalogo } ) =>
{
    const shorts = catalogo.filter(produto => produto.tipo === "shorts");

    return (
        <>
            <h3 id="shorts"> Shorts </h3>
        
            <div className="shorts-container">
                
                {shorts.map((shorts, index) => (
                    <Produto 
                        produto={shorts}
                        setCatalogo={setCatalogo}
                        key={index}    
                    />
                ))}
                
            </div>
        
        </>
    )
}

export default Shorts;