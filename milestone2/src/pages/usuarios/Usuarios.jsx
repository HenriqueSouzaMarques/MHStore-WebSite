import React, { useState } from 'react';
import { Grid } from '@mui/material';

import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";

import UserData from './UserData/UserData';
import NovoAdminBotao from './NovoAdminBotao/NovoAdminBotao';
import HistoricoCompra from './HistoricoCompra/HistoricoCompra';


const Usuarios = () =>
{
    const users = JSON.parse(localStorage.getItem('users'));

    const [ compras, setCompras ] = useState(null);

    return (
    <>
        <Header />
        <div className={compras && 'blur'}>

            <h2>Users</h2>

            <Grid container justifyContent="center">
                <Grid item>
                    <NovoAdminBotao />
                </Grid>
            </Grid>

            {
                users.map((user, index) =>
                (
                    <UserData 
                        index={index} 
                        setHistory={setCompras}
                        key={index}
                    />
                ))
            }
        </div>

        {
            compras && 
            <HistoricoCompra
                compras={compras}
                setCompras={setCompras}
            />
        }

        <Footer />
    </>
    );
};

export default Usuarios;
