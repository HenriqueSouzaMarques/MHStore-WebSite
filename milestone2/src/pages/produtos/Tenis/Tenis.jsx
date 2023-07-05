import React from 'react';

import "../Produtos.css";

import Produto from "../../../components/Produto/Produto";

const Tenis = ( { catalogo, updateProduto } ) =>
{
    const tenis = catalogo.filter(produto => produto.tipo === "sneakers");

    return (
        <>
            <h3 id="sneakers"> Sneakers </h3>
        
            <div className="tenis-container">
                
                {tenis.map((product, index) => (
                    <Produto 
                        produto={product}
                        updateProduto={updateProduto}
                        key={index}    
                    />
                ))}
                
            </div>
        
        </>
    )
}

export default Tenis;