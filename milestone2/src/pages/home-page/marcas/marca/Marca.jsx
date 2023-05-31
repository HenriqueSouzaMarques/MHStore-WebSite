import React from "react";

import Nike from "../../../../assets/Nike.png"
import Adidas from "../../../../assets/Adidas.png"
import Vans from "../../../../assets/Vans.png"
import High from "../../../../assets/High.png"

import "./Marca.css"

const Marca = ( {marca} ) =>
{
    const imagem = (nome) =>
    {
        switch (nome)
        {
            case "Adidas" : return Adidas;
        
            case "Nike"   : return Nike;

            case "Vans"   : return Vans;

            case "High"   : return High;
        }
    }

    return ( 
        <tr>
            <td className="coluna-imagem">
                <img src={imagem(marca.nome)} alt={marca.nome}></img>
            </td>

            <td className="coluna-texto">
                <h3>{marca.nome}</h3>
                <p>{marca.descricao}</p>
            </td>
        </tr>
    )

}


export default Marca;