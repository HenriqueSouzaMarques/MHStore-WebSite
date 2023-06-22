import React from "react";

import TipoProduto from "./TipoProduto/TipoProduto";

import { tipoProdutos } from "../../../data/tipoProdutos.js"

import "./Resumo.css"

const Resumo = () =>
{
    return (
        <>
            <h2> Products </h2>
            <div className="resumo-container">

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