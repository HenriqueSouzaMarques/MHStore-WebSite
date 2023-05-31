import React from "react";

import Logo from "./logo/Logo";
import LogoMarca from "./logo_marca/LogoMarca";
import Menu from "./menu/Menu"

import "./Header.css"

const Header = () =>
(
    
    <header>

        <Logo size={"155px"}/>

        <LogoMarca />

        <Menu />

    </header>
);


export default Header;