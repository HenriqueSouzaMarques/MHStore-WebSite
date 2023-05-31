import React, { createContext, useState } from 'react';

export const LoginContext = createContext();

export const LoginProvider = ( { children } ) =>
{
    const [username, setUsername] = useState('');

    const updateUsername = (newUsername) => 
    {
        setUsername(newUsername);
    };

    return (
        <LoginContext.Provider value={{ username, updateUsername }}>
            {children}
        </LoginContext.Provider>
    );
};