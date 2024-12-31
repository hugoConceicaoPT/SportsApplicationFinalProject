// Importações necessárias
import React, { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { User } from "../Registo/Login"; // Define o tipo User

// Criação do contexto de usuário
const UserContext = createContext<{
    user: User | undefined; // Estado do usuário (pode ser indefinido)
    setUser: React.Dispatch<React.SetStateAction<User | undefined>>; // Função para atualizar o estado do usuário
} | undefined>(undefined); // Inicializado como indefinido

// Hook para usar o contexto do usuário
export function useUserContext() {
    const userContext = useContext(UserContext); // Obtém o contexto

    // Verifica se o contexto foi usado corretamente
    if (userContext === undefined) {
        throw new Error('useUserContext must be used with a DashboardContext'); // Lança erro se usado fora do contexto
    }

    return userContext; // Retorna o contexto
}

// Interface para as props do provedor do contexto
interface UserProviderProps {
    children: ReactNode; // Componentes filhos que serão envolvidos pelo provedor
}

// Provedor do contexto de usuário
const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
    // Recupera o usuário do localStorage ao carregar o componente
    const storedUser = localStorage.getItem('user');
    const initialUser = storedUser ? JSON.parse(storedUser) : undefined; // Define o estado inicial com base no localStorage

    const [user, setUser] = useState<User | undefined>(initialUser); // Estado do usuário

    // Efeito para salvar ou remover o usuário do localStorage quando o estado mudar
    useEffect(() => {
        if (user) {
            localStorage.setItem('user', JSON.stringify(user)); // Salva o usuário no localStorage
        } else {
            localStorage.removeItem('user'); // Remove o usuário do localStorage se indefinido
        }
    }, [user]); // Dependência: executa sempre que `user` mudar

    return (
        // Provedor do contexto que passa o estado e a função de atualização
        <UserContext.Provider value={{ user, setUser }}>
            {children} {/* Renderiza os componentes filhos */}
        </UserContext.Provider>
    );
};

export default UserProvider; // Exporta o provedor para uso em outros arquivos
