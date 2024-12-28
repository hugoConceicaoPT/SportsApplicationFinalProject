import React from "react";
// Importações necessárias para o componente, incluindo React, hooks e bibliotecas como Bootstrap, Axios e ícones.

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import axios from 'axios';
import Card from 'react-bootstrap/Card';
import { config } from "../../config";
import { useUserContext } from '../Context/UserContext';
import { AppProps } from "../../main";


export interface FormState {
    username: string; // Estado para armazenar o nome de usuário.
}

export interface User {
    username: string; // Estrutura do usuário para manipulação posterior.
}

const UpdateUsername: React.FC<AppProps> = ({ setState }) => {
    // Contexto e estados para manipular informações do formulário e interatividade.
    const { user, setUser } = useUserContext(); // Função para atualizar o contexto do usuário.
    const [formState, setFormState] = React.useState<FormState>({
        username: '', // Estado inicial para o nome de usuário.  // Estado inicial para a senha.
    });
    
    const [error, setError] = React.useState(''); // Estado para mensagens de erro.
    const [isSubmitting, setIsSubmitting] = React.useState(false); // Estado para gerenciar o botão "Entrar".// Estado para alternar entre exibir/esconder senha.


    // Função que atualiza os valores do estado `formState` com base no input do usuário.
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target; // Captura o nome e o valor do input.
        setFormState((prevState) => ({
            ...prevState, // Mantém os valores anteriores.
            [name]: value, // Atualiza o campo específico.
        }));
    };

    // Função responsável por tratar o envio do formulário e autenticar o usuário no servidor.
    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault(); // Previne o comportamento padrão de recarregar a página.
        setIsSubmitting(true); // Desabilita o botão de envio enquanto a requisição está em andamento.

        try {
            // Envia uma solicitação POST para o servidor com as credenciais do usuário.
            const response = await axios.put(`${config.serverAddress}/user/${user?.username}/change-username`, 
                { newUsername: formState.username },
                { withCredentials: true }
            );
            if (response.status != 200) {
                throw new Error("Nome do usuário já existente. Tente novamente");
            } else {
                setState({ view: "home" });
                setUser((prevUser) => ({
                    ...prevUser,
                    username: formState.username,
                }));
                setError(''); 
            }
        } catch (error) {
            // Exibe a mensagem de erro em caso de falha.
            setError(error.message);
        } finally {
            setIsSubmitting(false); // Reabilita o botão de envio após finalizar a requisição.
        }
    };

    return (
        <div className="d-flex justify-content-center align-items-center vh-100 loginComponent">
            {/* Centraliza o card no centro da tela com estilos Bootstrap. */}
            <Card style={{ width: '18rem' }} className="mt-4" data-bs-theme="dark">
                <Card.Title className="text-center mt-3">Alterar Nome do Usuário</Card.Title>
                {/* Exibe uma mensagem de erro caso haja alguma. */}
                {error && <div className="ms-4 text-danger fs-6">{error}</div>}
                <Card.Body className="p-2">
                    <Form onSubmit={handleSubmit}>
                        {/* Campo de entrada para o nome de usuário. */}
                        <Form.Group className="mb-2" controlId="formBasicUsername">
                            <Form.Label>Username</Form.Label>
                            <Form.Control type="text" placeholder={user?.username} name="username" value={formState.username} onChange={handleChange} required/>
                        </Form.Group>
                        <Button variant="secondary" type="submit" className="w-100" disabled={isSubmitting}>
                            {isSubmitting ? 'Aguarde...' : 'Alterar'}
                        </Button>
                    </Form>
                </Card.Body>
            </Card>
        </div>
    );
};

export default UpdateUsername; // Exporta o componente para ser utilizado em outras partes do aplicativo.
