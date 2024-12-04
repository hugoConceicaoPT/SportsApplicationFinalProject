import React, { createContext, useContext, useState } from "react";
import { User } from "./components/Login";


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


const UserProvider = ({ children }) => {
    const [user, setUser] = useState<User | undefined>(undefined);

    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    );
};

export default UserProvider;