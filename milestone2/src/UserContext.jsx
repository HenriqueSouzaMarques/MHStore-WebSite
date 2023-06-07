import React, { createContext, useState } from 'react';

export const UserContext = createContext();

export const UserProvider = ( { children } ) =>
{
    const [userData, setUserData] = useState(null);

    const updateUserData = (newUserData) => 
    {
        setUserData(newUserData);
    };

    return (
        <UserContext.Provider value={{ userData, updateUserData }}>
            {children}
        </UserContext.Provider>
    );
};