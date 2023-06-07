import React, { useContext } from "react";

import BotaoHeader from "./botao/BotaoHeader";
import UserInfo from "./user_info/UserInfo";

import './Menu.css'

import { UserContext } from "../../../UserContext";

const Menu = ({ currentPage }) =>
{
    const { userData } = useContext(UserContext);

    const props = 
    {
        linkBack: currentPage, 
        createAdmin: false
    }

    return (

        <div className="menu-container">
            <ul>
                {userData && <li className="user-info"> <UserInfo /> </li>}

                <li> <BotaoHeader link={"/"} props={null}>Home</BotaoHeader> </li>

                <li> <BotaoHeader link={"/products"} props={null}>Products</BotaoHeader> </li>

                <li> <BotaoHeader link={"/about-us"} props={null}>About Us</BotaoHeader> </li>

                {userData ? <li> <BotaoHeader link={"/cart"} props={null}> Cart </BotaoHeader> </li> : <></>}

                {!userData ? <li> <BotaoHeader link={"/login"} props={props}>Login</BotaoHeader> </li> : <></>}
            </ul>
        </div>
    
    )
};

export default Menu;