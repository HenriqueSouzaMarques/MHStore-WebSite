import React from 'react';
import { useLocation } from 'react-router-dom';

const ProdutoInfo = () =>
{
    const location = useLocation();
    const { produto } = location.state;

    return (
        <>        
            <p> {produto.nome} </p>

            <a href={`/products`}><button>Back</button></a>
        </>
    )
}

export default ProdutoInfo;