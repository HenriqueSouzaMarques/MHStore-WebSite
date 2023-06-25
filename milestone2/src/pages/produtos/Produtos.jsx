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

    const [ temCamiseta, setTemCamiseta ] = useState(true);
    const [ temShorts, setTemShorts ] = useState(true);
    const [ temCalca, setTemCalca ] = useState(true);
    const [ temTenis, setTemTenis ] = useState(true);


    const [catalogo, setCatalogo] = useState(() => 
    {
        const catalogoAtual = localStorage.getItem('catalogo');

        return (catalogoAtual ? JSON.parse(catalogoAtual) : produtos);
    });

    useEffect(() =>
    {
        localStorage.setItem('catalogo', JSON.stringify(catalogo));

        setTemCamiseta(catalogo.findIndex((produto) => produto.tipo === 't-shirt' && produto.estoque !== 0) !== -1 ? true : false);
        setTemShorts(catalogo.findIndex((produto) => produto.tipo === 'shorts' && produto.estoque !== 0) !== -1 ? true : false);
        setTemCalca(catalogo.findIndex((produto) => produto.tipo === 'pants' && produto.estoque !== 0) !== -1 ? true : false); 
        setTemTenis(catalogo.findIndex((produto) => produto.tipo === 'sneakers' && produto.estoque !== 0) !== -1 ? true : false);

    }, [catalogo]);

    return (
        <>
            <Header />
            <div className={adicionarProduto ? "blur" : "produtos-container"}>

                {
                    (temCamiseta || temShorts || temCalca || temTenis) ? 

                    <h2> Products </h2> :

                    <h2> No Products Available </h2>
                }


                <ProdutoSlider />

                {
                    (userData && userData.type === 'admin') &&
                    
                    <BotaoCatalogoAdicionar 
                        adicionarProduto={setAdicionarProduto}
                    />
                }

                {
                    temCamiseta &&
                    <Camisetas 
                        catalogo={catalogo}
                        setCatalogo={setCatalogo}
                    />
                }

                {
                    temShorts && 
                    <Shorts 
                        catalogo={catalogo}
                        setCatalogo={setCatalogo}
                    />
                }

                {
                    temCalca &&
                    <Calcas 
                        catalogo={catalogo}
                        setCatalogo={setCatalogo}
                    />
                }

                {
                    temTenis &&
                    <Tenis 
                        catalogo={catalogo}
                        setCatalogo={setCatalogo}
                    />
                }

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