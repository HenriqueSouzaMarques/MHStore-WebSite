import React from 'react';

import "../Produtos.css";

import Produto from "../../../components/Produto/Produto";

const Tenis = ( { catalogo, setCatalogo } ) =>
{
    const tenis = catalogo.filter(produto => produto.tipo === "sneakers");

    return (
        <>
            <h3 id="sneakers"> Sneakers </h3>
        
            <div className="tenis-container">
                
                {tenis.map((tenis, index) => (
                    <Produto 
                        produto={tenis}
                        setCatalogo={setCatalogo}
                        key={index}    
                    />
                ))}
                
            </div>
        
        </>
    )
}

export default Tenis;