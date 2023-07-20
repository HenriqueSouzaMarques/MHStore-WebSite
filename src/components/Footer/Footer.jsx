import React from "react";

import { SocialIcon } from 'react-social-icons';

import './Footer.css'

const Footer = () =>
(
    <footer>
        <div>
            <p> Rua das Flores, 123 - Jardim das Borboletas </p>
            <p> CEP: 13566-789, São Carlos - SP, Brazil </p>
            <p> Phone: +55 (16) 998765-4321</p>
        </div>

        <div>
            <SocialIcon fgColor="black" bgColor="#bbb" url={"https://www.instagram.com"} />
            <SocialIcon fgColor="black" bgColor="#bbb" url={"https://www.whatsapp.com"} />
            <SocialIcon fgColor="black" bgColor="#bbb" url={"https://www.facebook.com"} />
        </div>
    </footer>
);

export default Footer;