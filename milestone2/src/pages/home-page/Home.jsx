import React from "react";

import Header from "../../components/Header/Header";
import Resumo from "./Resumo/Resumo";
import Marcas from "./Marcas/Marcas";
import Footer from "../../components/Footer/Footer";

import "./Home.css"

const Home = (  )  =>
{
    return (

        <div className="home-container">
            <Header currentPage={"/"}/>

            <Resumo />

            <Marcas />

            <Footer />
        </div>
    )
}

export default Home;