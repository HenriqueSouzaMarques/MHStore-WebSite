import React, { useContext } from "react";

import BotaoHeader from "./botao/BotaoHeader";
import UserInfo from "./user_info/UserInfo";

import './Menu.css'

import { LoginContext } from "../../../LoginContext";

const Menu = () =>
{
    const {username} = useContext(LoginContext);

    return (

        <div className="menu-container">
            <ul>
                {username ? <li className="user-info"> <UserInfo /> </li> : <></>}

                <li> <BotaoHeader link={""}>Home</BotaoHeader> </li>

                <li> <BotaoHeader link={"products"}>Products</BotaoHeader> </li>

                <li> <BotaoHeader link={"about-us"}>About Us</BotaoHeader> </li>

                {username ? <li> <BotaoHeader link={"cart"}> Cart </BotaoHeader> </li> : <></>}

                {!username ? <li> <BotaoHeader link={"login"}>Login</BotaoHeader> </li> : <></>}
            </ul>
        </div>
    
    )
};

export default Menu;