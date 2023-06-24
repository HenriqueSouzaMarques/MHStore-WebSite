import React from 'react';

import "../Produtos.css";

import Produto from "../../../components/Produto/Produto"

const Calcas = ( { catalogo, setCatalogo } ) =>
{
    const calcas = catalogo.filter(produto => produto.tipo === "pants");

    return (
        <>
            <h3 id="pants"> Pants </h3>
        
            <div className="calcas-container">
                
                {calcas.map((calca, index) => (
                    <Produto 
                        produto={calca}
                        setCatalogo={setCatalogo}
                        key={index}    
                    />
                ))}
                
            </div>
        
        </>
    )
}

export default Calcas;