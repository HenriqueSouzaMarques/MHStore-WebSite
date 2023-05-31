import React from "react";

import Header from "../../components/header/Header";
import Resumo from "./resumo/Resumo";
import Marcas from "./marcas/Marcas";
import Footer from "../../components/footer/Footer";

import "./Home.css"

const Home = (  )  =>
{
    return (

        <div className="home-container">
            <Header />

            <Resumo />

            <Marcas />

            <Footer />
        </div>
    )
}

export default Home;