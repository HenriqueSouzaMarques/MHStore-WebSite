import React from "react";

import Logo from "./logo/Logo";
import LogoMarca from "./logo_marca/LogoMarca";
import Menu from "./menu/Menu"

import "./Header.css"

const Header = ( { currentPage } ) =>
(
    
    <header>

        <Logo size={"155px"}/>

        <LogoMarca />

        <Menu currentPage={currentPage}/>

    </header>
);


export default Header;