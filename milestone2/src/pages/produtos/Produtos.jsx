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
    const { userData, fetchCatalogo, updateProduct } = useContext(UserContext);
    const [ adicionarProduto, setAdicionarProduto ] = useState(false);

    const [ catalogo, setCatalogo ] = useState([]);

    const updateProduto = async ( produto ) =>
    {
        const updatedProduct = await updateProduct( produto );

        setCatalogo((prevCatalogo) =>
        {
            const newCatalogo = prevCatalogo.map((product) =>
            {
                if (product._id === produto._id)
                {
                    return updatedProduct;
                }

                return product;
            })

            return newCatalogo;
        })
    }

    useEffect(() =>
    {
        const fetchData = async() =>
        {
            const fetchedCatalogo = await fetchCatalogo();
            setCatalogo(fetchedCatalogo);
        }

        fetchData();
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
                    catalogo={catalogo}
                    setCatalogo={setCatalogo} 
                    setAdicionarProduto={setAdicionarProduto}
                />
            }

            <Footer />
        </>
    )
};

export default Produtos;