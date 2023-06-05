import React from "react";
import { Link } from 'react-router-dom';

import './BotaoHeader.css'

const BotaoHeader = ( {children, link} ) =>
(
    <Link to={`/${link}`}><button className="botao-header">{children}</button></Link>
)


export default BotaoHeader;