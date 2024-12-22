import React, { createContext, ReactNode, useContext, useState } from "react";
import { User } from "./Components/Registo/Login";


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
    const [user, setUser] = useState<User | undefined>(undefined);

    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    );
};

export default UserProvider;