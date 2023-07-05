import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

import { useNavigate } from 'react-router-dom';

export const UserContext = createContext();

export const UserProvider = ( { children } ) =>
{
    const [userData, setUserData] = useState(null);

    useEffect(() => 
    {
        const storedUserData = localStorage.getItem('userData');
        if(storedUserData)
        {
            setUserData(JSON.parse(storedUserData));
        }

    }, []);

    const updateUserData = (newUserData) => 
    {
        localStorage.setItem('userData', JSON.stringify(newUserData));
        setUserData(newUserData);
    };

    const navigate = useNavigate();
    const logout = () =>
    {
        setUserData(null);

        localStorage.removeItem('userData');

        navigate('/');
    }

    const fetchUsers = async () =>
    {
        try
        {
            const response = await axios.get('http://localhost:8000/users');
            return response.data;
        }
        catch (error)
        {
            console.error('Error fetching users:', error);

            throw error;
        }
    };

    const updateUser = async ( user ) =>
    {
        return await axios.put("http://localhost:8000/users", user);
    }

    const addCart = async ( id, tamanho, qtd, user ) =>
    {
        try
        {
            const response = await axios.put(`http://localhost:8000/users/${id}/${tamanho}/${qtd}`, user);

            return response.data;
        }
        catch (error)
        {
            console.error('Error adding to the cart:', error);

            throw error;
        }
    }

    const fetchCatalogo = async () =>
    {
        try
        {
            const response = await axios.get('http://localhost:8000/products');
            return response.data;
        }
        catch (error)
        {
            console.error('Error fetching products:', error);

            throw error;
        }
    };

    const updateProduct = async ( produto ) =>
    {
        try
        {
            const response = await axios.put("http://localhost:8000/products", produto);
            
            return response.data;
        } 
        catch (error)
        {
            throw new Error(error.message);
        }
    }

    const addProduct = async ( novoProduto ) =>
    {
        try
        {
            const response = await axios.post("http://localhost:8000/products", novoProduto);

            return response.data;
        }
        catch (error)
        {
            throw new Error(error.message);
        }
    }

    const fetchProduto = async ( id ) =>
    {
        try
        {
            const response = await axios.get(`http://localhost:8000/products/${id}`);
            
            return response.data;
        }
        catch (error)
        {
            console.error('Error fetching product:', error);

            throw error;
        }  
    }

    return (
        <UserContext.Provider value=
        {
            { 
                userData, 
                updateUserData, 
                logout, 
                fetchUsers,
                fetchCatalogo,
                fetchProduto,
                updateUser, 
                addCart,
                addProduct,
                updateProduct
            }
        }>
            {children}
        </UserContext.Provider>
    );
};