import React from "react";
import { UserContext } from "../../UserContext"
import Header from "../../components/Header/Header";
import "./inventory.css"
import Product from "./produtos/Product"
import produtos from "../../data/produtos.json";

const Inventory = () =>{
    const teste = produtos;

    return (
        <div className="inventory">
            <Header currentPage={"/inventorio"}/>
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