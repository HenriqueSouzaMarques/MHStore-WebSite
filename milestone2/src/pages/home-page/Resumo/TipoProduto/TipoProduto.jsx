import React from "react";

import Calca from "../../../../assets/Icons/Calca.png"
import Shorts from "../../../../assets/Icons/Shorts.png"
import TShirt from "../../../../assets/Icons/Camiseta.png"
import Shoes from "../../../../assets/Icons/Tenis.png"

import "./TipoProduto.css"
import { HashLink } from 'react-router-hash-link';

const TipoProduto = ( {tipo} ) =>
{
    const imagem = (nome) =>
    {
        switch (nome)
        {
            case "T-Shirts": return TShirt;
        
            case "Sneakers"   : return Shoes;

            case "Shorts"  : return Shorts;

            case "Pants"   : return Calca;
        }
    }

    const link = (nome) =>
    {
        switch (nome)
        {
            case "T-Shirts": return '/products#t-shirt';
        
            case "Sneakers"   : return '/products#sneakers';

            case "Shorts"  : return '/products#shorts';

            case "Pants"   : return '/products#pants'; 
        }
    }


    return (
        
        <HashLink to={link(tipo.nome)} className="tipo-produto-container">
            <h3> {tipo.nome} </h3>

            <img src={imagem(tipo.nome)} alt={tipo.nome} />

            <p>{tipo.descricao}</p>
        </HashLink>
            
    )

}


export default TipoProduto;