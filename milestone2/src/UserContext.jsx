import React, { createContext, useState, useEffect } from 'react';

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

    return (
        <UserContext.Provider value={{ userData, updateUserData, logout }}>
            {children}
        </UserContext.Provider>
    );
};