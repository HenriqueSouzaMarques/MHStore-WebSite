import { Route, Routes } from 'react-router-dom';

import Home from './pages/home-page/Home';
import Produtos from './pages/produtos/Produtos';
import Carrinho from './pages/carrinho/Carrinho';
import Login from './pages/login/Login';
import Inventario from './pages/inventario/Inventario';

import { UserProvider } from './UserContext';

import './App.css';

const App = () =>
{   
    return (
        <UserProvider>
            <Routes>

                <Route path='/' exact element={<Home />} />

                <Route path='/products' element={<Produtos />} />

                <Route path='/cart' element={<Carrinho/>} />

                <Route path='/login' element={<Login />} />

                <Route path='/inventory' element={<Inventario />} /> 

            </Routes>
        </UserProvider>
    )
};

export default App;
