import React, { useContext, useEffect, useState } from "react";

import { produtos } from "../../data/produtos.js"

import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";

import Camisetas from "./Camisetas/Camisetas";
import Shorts from "./Shorts/Shorts";
import Calcas from "./Calcas/Calcas";
import Tenis from "./Tenis/Tenis";

import "./Produtos.css";
import ProdutoSlider from "./Slider/ProdutoSlider";
import { UserContext } from "../../UserContext.jsx";
import BotaoCatalogoAdicionar from "./BotaoCatalogoAdicionar/BotaoCatalogoAdicionar.jsx";

const Produtos = () =>
{   
    const { userData } = useContext(UserContext);

    const [catalogo, setCatalogo] = useState(() => 
    {
        const catalogoAtual = localStorage.getItem('catalogo');

        return (catalogoAtual ? JSON.parse(catalogoAtual) : produtos);
    });

    useEffect(() =>
    {
        localStorage.setItem('catalogo', JSON.stringify(catalogo))
    }, [catalogo]);

    return (
        <>
            <Header />

            <h2> Products </h2>

            <div className="produtos-container">

                <ProdutoSlider />

                {
                    (userData && userData.type === 'admin') &&
                    
                    <BotaoCatalogoAdicionar />
                }

                <Camisetas 
                    catalogo={catalogo}
                    setCatalogo={setCatalogo}
                />

                <Shorts 
                    catalogo={catalogo}
                    setCatalogo={setCatalogo}
                />

                <Calcas 
                    catalogo={catalogo}
                    setCatalogo={setCatalogo}
                />

                <Tenis 
                    catalogo={catalogo}
                    setCatalogo={setCatalogo}
                />

            </div>

            <Footer />
        </>


    )
};

export default Produtos;