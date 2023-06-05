import React from "react";

import Nike from "../../../../assets/Logomarcas/Nike.png"
import Adidas from "../../../../assets/Logomarcas/Adidas.png"
import Vans from "../../../../assets/Logomarcas/Vans.png"
import High from "../../../../assets/Logomarcas/High.png"

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