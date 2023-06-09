import React from "react";

import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";

import Camisetas from "./Camisetas/Camisetas";
import Shorts from "./Shorts/Shorts";
import Calcas from "./Calcas/Calcas";
import Tenis from "./Tenis/Tenis";

import "./Produtos.css";
import ProdutoSlider from "./Slider/ProdutoSlider";

const Produtos = () =>
{   
    return (
        <>
            <Header />

            <h2> Products </h2>

            <div className="produtos-container">

                <ProdutoSlider />

                <Camisetas />

                <Shorts />

                <Calcas />

                <Tenis />

            </div>

            <Footer />
        </>


    )
};

export default Produtos;