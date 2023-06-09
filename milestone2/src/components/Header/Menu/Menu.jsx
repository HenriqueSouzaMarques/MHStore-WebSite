import React, { useContext } from "react";

import BotaoHeader from "./BotaoHeader/BotaoHeader";
import UserInfo from "./UserInfo/UserInfo";

import './Menu.css'

import { UserContext } from "../../../UserContext";

const Menu = () =>
{
    const { userData } = useContext(UserContext);

    return (

        <div className="menu-container">
            <ul>
                {userData && <li className="user-info"> <UserInfo /> </li>}

                <li> <BotaoHeader link={"/"} props={null}>Home</BotaoHeader> </li>

                <li> <BotaoHeader link={"/products"} props={null}>Products</BotaoHeader> </li>

                <li> <BotaoHeader link={"/about-us"} props={null}>About Us</BotaoHeader> </li>

                {userData ? <li> <BotaoHeader link={"/cart"} props={null}> Cart </BotaoHeader> </li> : <></>}

                {!userData ? <li> <BotaoHeader link={"/login"} props={{ type: 'client' }}>Login</BotaoHeader> </li> : <></>}
            </ul>
        </div>
    
    )
};

export default Menu;