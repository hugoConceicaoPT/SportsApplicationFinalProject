import React from "react";
import { AppProps } from "../../main";
import Dropdown from "react-bootstrap/esm/Dropdown";
import { useUserContext } from "../Context/UserContext";
import Button from 'react-bootstrap/Button';
import { Person, PersonCheck } from 'react-bootstrap-icons';
import { config } from "../../config";
import axios from "axios";

// Componente funcional para o botão de login no cabeçalho
const LoginHeaderButton: React.FC<AppProps> = ({ setState }) => {
    const { user, setUser } = useUserContext();  // Obtém o utilizador atual e a função para atualizar o contexto do usuário
    const username = user ? user.username : false; // Obtém o nome de utilizador, se o utilizador estiver autenticado
    // Função para realizar o logout
    const handleLogout = async () => {
        try {
            // Envia uma solicitação de logout para o back-end
            await axios.post(`${config.serverAddress}/user/logout`);
            // Após o logout, atualiza o estado do usuário para refletir que o usuário foi desconectado
            setUser(undefined);  // Atualize o estado do usuário
            setState({ view: "home" }); // Redireciona para a página inicial
        } catch (error) {
            console.error("Erro ao fazer logout:", error);
        }
    };

     // Função para apagar a conta do usuário
    const handleDeleteAccount = async () => {
        try {
            // Envia uma solicitação de logout para o back-end
            await axios.delete(`${config.serverAddress}/user/${user?.username}/delete`);
            // Após o logout, atualiza o estado do usuário para refletir que o usuário foi desconectado
            setUser(undefined);  // Atualize o estado do usuário
            setState({ view: "home" }); // Redireciona para a página inicial
        } catch (error) {
            console.error("Erro ao fazer logout:", error);
        }
    }

    // Função para redirecionar para a página de alteração de nome de usuário
    const handleUpdateUsername = async () => {
        try {
            setState({ view: "updateUsername" }); // Redireciona para a página inicial
        } catch (error) {
            console.error("Erro ao fazer logout:", error);
        }
    }
    return (
        <>
            {user ? (
                <Dropdown align="end">
                    <Dropdown.Toggle variant="secondary" id="dropdown-basic">
                        <PersonCheck size={24} className="ps-0 me-1 ms-0"/>
                        {username}
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                        <Dropdown.Item onClick={handleUpdateUsername}>Alterar Username</Dropdown.Item>
                        <Dropdown.Item onClick={handleDeleteAccount}>Apagar Conta</Dropdown.Item>
                        <Dropdown.Item onClick={handleLogout}>Logout</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
            ) : (
                <Button variant="secondary" onClick={() => setState({view:"login"})} className="ps-2">
                    <Person size={24} className="ps-0 me-1 ms-0"/>Login
                </Button>
            )}
        </>
    );
}

export default LoginHeaderButton;