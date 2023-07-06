import React, { useContext } from "react";

import BotaoHeader from "./BotaoHeader/BotaoHeader";
import UserInfo from "./UserInfo/UserInfo";

import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import HomeIcon from '@mui/icons-material/Home';
import PeopleIcon from '@mui/icons-material/People';
import CheckroomIcon from '@mui/icons-material/Checkroom';
import LoginIcon from '@mui/icons-material/Login';
import ConfirmationNumberIcon from '@mui/icons-material/ConfirmationNumber';

import './Menu.css'

import { UserContext } from "../../../UserContext";

const Menu = () =>
{
    const { userData } = useContext(UserContext);

    return (

        <div className="menu-container">
            <ul>
                {userData && <li className="user-info"> <UserInfo /> </li>}
                
                <li> <BotaoHeader link={"/"} props={null}> <HomeIcon /> </BotaoHeader> </li>

                {
                    userData && userData.type === 'admin' && 
                    
                    <li>
                        <BotaoHeader link={"/coupon"} props={null}>
                            <ConfirmationNumberIcon />
                        </BotaoHeader>

                    </li>
                }

                {
                    userData && userData.type === 'admin' && 
                    <li> 
                        <BotaoHeader link={"/users"} props={null}> 
                            <PeopleIcon />
                        </BotaoHeader>
                    </li>
                }

                <li> <BotaoHeader link={"/products"} props={null}><CheckroomIcon /></BotaoHeader> </li>

                {
                    userData && 
                    
                    <li> 
                        <BotaoHeader link={"/cart"} props={null}> 
                            <ShoppingCartIcon /> 
                            <span className="total-products">{userData.totalProducts}</span> 
                        </BotaoHeader> 
                    </li>
                
                }

                {
                    !userData && 
                    <li> 
                        <BotaoHeader link={"/login"} props={{ type: 'client' }}>
                            <LoginIcon />
                        </BotaoHeader> 
                    </li>
                }
            </ul>
        </div>
    
    )
};

export default Menu;