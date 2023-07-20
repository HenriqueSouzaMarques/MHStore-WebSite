import React from "react";

import Logo from "./Logo/Logo";
import LogoMarca from "./LogoMarca/LogoMarca";
import Menu from "./Menu/Menu"

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