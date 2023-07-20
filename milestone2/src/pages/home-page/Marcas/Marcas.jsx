import React from "react";

import Marca from "./Marca/Marca"

import { marcas } from "../../../data/marcas.js"

const Marcas = () =>
{
    return (
        <>
            <h2> Brands </h2>
            <table>

                <tbody>

                    {marcas.map((marca, index) => (
                        <Marca 
                            marca={marca}
                            key={index}    
                        />
                    ))}

                </tbody>

            </table>
    
        </>
    )

}


export default Marcas;