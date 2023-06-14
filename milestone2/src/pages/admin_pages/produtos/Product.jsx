import React, { useState } from "react";
import { useEffect } from "react";
import "../inventory.css"

const Product = ({produto}) =>{

    const [imagem, setImagem] = useState(null);

    useEffect(() => 
    {
        const importarImagem = async () =>
        {
            try 
            {
                const imagem = await import(`../../../assets/Produtos/${produto.imagem}`);
                setImagem(imagem.default);
            }
            catch (error) 
            {
                console.error('Erro ao carregar a imagem: ', error);
            }
        };
    
        importarImagem();
    }, [imagem]);

    const [estoque, setEstoque] = useState(produto.estoque);

    return(
        <div className="product">
            <h1 className="inner-title"> {produto.nome} </h1>
            <div className="content">
                <div className="image">
                    {imagem && <img src={imagem}></img>}
                </div>
                <div className="text">
                    <p>i hate it here</p>
                    <p>i want to diiiiie...</p>
                </div>
            </div>
        </div>
    )
}

export default Product;