import React, { useContext, useEffect, useState } from 'react';
import { Grid } from '@mui/material';

import Header from '../../components/Header/Header.jsx';
import { UserContext } from '../../UserContext.jsx';
import CoupomData from './CoupomData/CoupomData.jsx';
import NovoCupomBotao from './NovoCupomBotao/NovoCupomBotao.jsx';
import NovoCupom from './NovoCupom/NovoCupom.jsx';

const CupomGerenciador = () =>
{
    const { fetchCoupons } = useContext(UserContext);

    const [ coupons, setCoupons ] = useState([]);
    const [ adicionarCupom, setAdicionarCupom ] = useState(false);

    useEffect(() =>
    {
        const fetchData = async () =>
        {
            const cupons = await fetchCoupons();

            setCoupons(cupons);
        }

        fetchData();
    }, [coupons]);

    return (
        <>
            <Header />

            <div className={adicionarCupom ? 'blur' : null}>

                <h2> Discount Coupon </h2>

                <Grid container justifyContent="center">
                    <Grid item>
                        <NovoCupomBotao setAdicionarCupom={setAdicionarCupom}/>
                    </Grid>
                </Grid>

                {
                    coupons.length > 0 ?
                        coupons.map((cupom, index) =>
                        (
                            <CoupomData
                                index={index}
                                coupons={coupons}
                                setCupons={setCoupons}
                                key={index}
                            />
                        ))
                    :

                    <h2> No Coupons Available ! </h2>
                }
            </div>

            {
                adicionarCupom && 
                (
                    <NovoCupom 
                        setAdicionarCupom={setAdicionarCupom}
                    />
                )
            }
        </>
    )
}

export default CupomGerenciador;