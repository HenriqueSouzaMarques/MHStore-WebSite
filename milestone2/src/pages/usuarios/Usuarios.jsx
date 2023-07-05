import React, { useContext, useEffect, useState } from 'react';
import { Grid } from '@mui/material';

import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";

import UserData from './UserData/UserData';
import NovoAdminBotao from './NovoAdminBotao/NovoAdminBotao';
import HistoricoCompra from './HistoricoCompra/HistoricoCompra';
import { UserContext } from '../../UserContext';


const Usuarios = () =>
{
    const { fetchUsers } = useContext(UserContext);

    const [ compras, setCompras ] = useState(null);
    const [ users, setUsers ] = useState(null);

    useEffect(() =>
    {
        const fetchData = async () =>
        {
            const usuarios = await fetchUsers();

            setUsers(usuarios);
        };

        fetchData();
    }, []);

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
                        user={user} 
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
