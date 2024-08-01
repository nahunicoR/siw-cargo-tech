import { createContext } from "react";
import { useState } from "react";

export const UserContext = createContext()


//2. Crear el Provider, para proveer el contexto

export function UserProvider({ children }) {

    const [user, setUser] = useState({
        nombre: '',
        username: '',
        token: '',
    });

    return (
        <UserContext.Provider value={{
            user,
            setUser
        }}
        >
            {children}
        </UserContext.Provider>
    )
}


