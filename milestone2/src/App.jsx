import React, { useContext, useState } from 'react';
import { Route, Routes } from 'react-router-dom';

import Home from './pages/home-page/Home'
import Produtos from './pages/produtos/Produtos'
import Carrinho from './pages/carrinho/Carrinho'
import Login from './pages/login/Login'
import AboutUs from './pages/about_us/AboutUs'

import { LoginProvider } from './LoginContext';

import './App.css'

const App = () =>
{
    return (
        
        <LoginProvider>
            <Routes>

                <Route path='/' exact element={<Home />} />

                <Route path='/products' exact element={<Produtos />} />

                <Route path='/cart' exact element={<Carrinho/>} />

                <Route path='/login' exact element={<Login />} /> 

                <Route path='/about-us' exact element={<AboutUs />} />

            </Routes>
        </LoginProvider>
    )
};

export default App;