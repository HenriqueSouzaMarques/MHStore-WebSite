import { Route, Routes } from 'react-router-dom';

import Home from './pages/home-page/Home'
import Produtos from './pages/produtos/Produtos'
import Carrinho from './pages/carrinho/Carrinho'
import Login from './pages/login/Login'
import AboutUs from './pages/about_us/AboutUs'

import { UserProvider } from './UserContext';

import './App.css'

const App = () =>
{   
    return (
        <UserProvider>
            <Routes>

                <Route path='/' exact element={<Home />} />

                <Route path='/products' element={<Produtos />} />

                <Route path='/cart' element={<Carrinho/>} />

                <Route path='/login' element={<Login />} /> 

                <Route path='/about-us' element={<AboutUs />} />

            </Routes>
        </UserProvider>
    )
};

export default App;