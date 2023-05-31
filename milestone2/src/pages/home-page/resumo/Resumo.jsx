import React from "react";

import TipoProduto from "./TipoProduto/TipoProduto";

import tipoProdutos from "../../../data/tipoProdutos.json"

import "./Resumo.css"

const Resumo = () =>
{
    return (
        <>
            <h2> Products </h2>
            <div className="produtos-container">

                {tipoProdutos.map((tipoProduto, index) => (
                    <TipoProduto 
                        tipo={tipoProduto} 
                        key={index}
                    />
                ))}
                
            </div>  
        </>
    )

}


export default Resumo;