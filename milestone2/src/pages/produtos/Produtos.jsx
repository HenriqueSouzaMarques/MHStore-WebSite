import React, { useContext, useEffect, useState } from "react";
import axios from 'axios';
import { UserContext } from "../../UserContext.jsx";

import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";

import Camisetas from "./Camisetas/Camisetas";
import Shorts from "./Shorts/Shorts";
import Calcas from "./Calcas/Calcas";
import Tenis from "./Tenis/Tenis";

import ProdutoSlider from "./Slider/ProdutoSlider";
import BotaoCatalogoAdicionar from "./BotaoCatalogoAdicionar/BotaoCatalogoAdicionar.jsx";
import AdicionarCatalogo from "./AdicionarCatalogo/AdicionarCatalogo.jsx";

import "./Produtos.css";

const Produtos = () =>
{   
    const { userData } = useContext(UserContext);
    const [ adicionarProduto, setAdicionarProduto ] = useState(false);

    const [ catalogo, setCatalogo ] = useState([]);

    const fetchCatalogo = async () =>
    {
        try
        {
            const response = await axios.get('http://localhost:8000/products');
            return response.data;
        }
        catch (error)
        {
          console.error('Error fetching products:', error);
          throw error; 
        }
    };

    const updateProduto = ( produto ) =>
    {
        axios.put(`http://localhost:8000/products/${produto.id}`, produto)
        .then(() =>
        {
            setCatalogo(() =>
            (
                catalogo.map((product) =>
                {
                    if (product.id === produto.id)
                    {
                        return produto;
                    }

                    return product;
                })
            )
            );
        })
        .catch((error) =>
        {
            console.error('Error updating examples:', error);
        });
    }

    useEffect(() =>
    {
        fetchCatalogo().then((produtos) => { setCatalogo(produtos) });
    }, [catalogo]);

    

    return (
        <>
            <Header />
            <div className={adicionarProduto ? "blur" : "produtos-container"}>

                <h2> Products </h2> :

                <ProdutoSlider />

                {
                    (userData && userData.type === 'admin') &&
                    
                    <BotaoCatalogoAdicionar 
                        adicionarProduto={setAdicionarProduto}
                    />
                }

                <Camisetas 
                    catalogo={catalogo}
                    updateProduto={updateProduto}
                />

                <Shorts 
                    catalogo={catalogo}
                    updateProduto={updateProduto}
                />

                <Calcas 
                    catalogo={catalogo}
                    updateProduto={updateProduto}
                />

                <Tenis 
                    catalogo={catalogo}
                    updateProduto={updateProduto}
                />

            </div>

            {
                adicionarProduto && 
                <AdicionarCatalogo 
                    setCatalogo={setCatalogo} 
                    setAdicionarProduto={setAdicionarProduto}
                />
            }

            <Footer />
        </>
    )
};

export default Produtos;