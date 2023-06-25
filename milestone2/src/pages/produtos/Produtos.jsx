import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../../UserContext.jsx";

import { produtos } from "../../data/produtos.js"

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
            <div className={adicionarProduto ? "blur" : "produtos-container"}>

                <h2> Products </h2>


                <ProdutoSlider />

                {
                    (userData && userData.type === 'admin') &&
                    
                    <BotaoCatalogoAdicionar 
                        adicionarProduto={setAdicionarProduto}
                    />
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