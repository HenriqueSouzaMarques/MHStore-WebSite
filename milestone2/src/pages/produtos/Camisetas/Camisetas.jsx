import React from 'react';

import "../Produtos.css";

import Produto from "../../../components/Produto/Produto"

const Camisetas = ( { catalogo, updateProduto } ) =>
{
    const camisetas = catalogo.filter(produto => produto.tipo === "t-shirt");

    return (
        <>
        
            <h3 id="t-shirt"> T-Shirts </h3>
            <div className="camisetas-container">
                
                {camisetas.map((product, index) => (
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

export default Camisetas;