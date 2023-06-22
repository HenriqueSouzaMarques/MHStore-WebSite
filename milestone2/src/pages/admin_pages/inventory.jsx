import React from "react";
import { UserContext } from "../../UserContext"
import Header from "../../components/Header/Header";
import "./inventory.css"
import Product from "./produtos/Product"
import { produtos } from "../../data/produtos.js";

const Inventory = () =>{
    const teste = produtos;

    return (
        <div className="inventory">
            <Header/>
            <div className="products-container">
                <h1>product goes here</h1>
                {
                    produtos.map((produto => (
                        <Product produto = {produto}/>
                    )))
                }
            </div>
        </div>
    )
}

export default Inventory;