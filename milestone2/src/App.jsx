import { Route, Routes } from 'react-router-dom';

import Home from './pages/home-page/Home';
import Produtos from './pages/produtos/Produtos';
import Carrinho from './pages/carrinho/Carrinho';
import Login from './pages/login/Login';
import Usuarios from './pages/usuarios/Usuarios';

import { UserProvider } from './UserContext';

import './App.css';
import CupomGerenciador from './pages/coupom/CoupomGerenciador';

const App = () =>
{   
    return (
        <UserProvider>
            <Routes>

                <Route path='/' exact element={<Home />} />

                <Route path='/products' element={<Produtos />} />

                <Route path='/cart' element={<Carrinho/>} />

                <Route path='/login' element={<Login />} />

                <Route path='/users' element={<Usuarios />} /> 

                <Route path='/coupon' element={<CupomGerenciador />} />

            </Routes>
        </UserProvider>
    )
};

export default App;
