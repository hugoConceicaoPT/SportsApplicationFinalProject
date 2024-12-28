import React, { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { User } from "../Registo/Login";


const UserContext = createContext<{
    user: User | undefined;
    setUser: React.Dispatch<React.SetStateAction<User | undefined>>;
} | undefined>(undefined);

export function useUserContext() {
    const userContext = useContext(UserContext);
  
    if (userContext === undefined) {   
      throw new Error('useUserContext must be used with a DashboardContext');
    }
  
    return userContext;
}

interface UserProviderProps {
    children: ReactNode;
}
const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
    const storedUser = localStorage.getItem('user');
    const initialUser = storedUser ? JSON.parse(storedUser) : undefined;

    const [user, setUser] = useState<User | undefined>(initialUser);

    // Salva o usuário no localStorage sempre que o estado do usuário mudar
    useEffect(() => {
        if (user) {
            localStorage.setItem('user', JSON.stringify(user));
        } else {
            localStorage.removeItem('user');
        }
    }, [user]);
    
    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    );
};

export default UserProvider;