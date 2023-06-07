import { Route, Routes } from 'react-router-dom';

import Home from './pages/home-page/Home'
import Produtos from './pages/produtos/Produtos'
import Carrinho from './pages/carrinho/Carrinho'
import Login from './pages/login/Login'
import AboutUs from './pages/about_us/AboutUs'

import { UserProvider } from './UserContext';

import './App.css'
import ProdutoInfo from './pages/produto_info/ProdutoInfo';

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

                <Route path='/info' element={<ProdutoInfo />} />

            </Routes>
        </UserProvider>
    )
};

export default App;