import React from "react";

import Jeans from "../../../../assets/Jeans.png"
import Shorts from "../../../../assets/Shorts.png"
import TShirt from "../../../../assets/Camiseta.png"
import Shoes from "../../../../assets/Tenis.png"

import "./TipoProduto.css"

const TipoProduto = ( {tipo} ) =>
{
    const imagem = (nome) =>
    {
        switch (nome)
        {
            case "T-Shirts": return TShirt;
        
            case "Shoes"   : return Shoes;

            case "Shorts"  : return Shorts;

            case "Jeans"   : return Jeans;
        }
    }

    return (
        <div className="tipo-produto-container">
            <h3> {tipo.nome} </h3>

            <img src={imagem(tipo.nome)} alt={tipo.nome} />

            <p>{tipo.descricao}</p>

        </div>
    )

}


export default TipoProduto;