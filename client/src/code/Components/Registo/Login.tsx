import React from "react";
// Importações necessárias para o componente, incluindo React, hooks e bibliotecas como Bootstrap, Axios e ícones.

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import axios from 'axios';
import Card from 'react-bootstrap/Card';
import { config } from "../../config";
import { Eye, EyeSlash } from 'react-bootstrap-icons';
import { useUserContext } from '../Context/UserContext';
import { AppProps } from "../../main";


export interface FormState {
    username: string; // Estado para armazenar o nome de usuário.
    password: string; // Estado para armazenar a senha.
}

export interface User {
    username: string; // Estrutura do usuário para manipulação posterior.
}

const Login: React.FC<AppProps> = ({ setState }) => {
    // Contexto e estados para manipular informações do formulário e interatividade.
    const { setUser } = useUserContext(); // Função para atualizar o contexto do usuário.
    
    const [formState, setFormState] = React.useState<FormState>({
        username: '', // Estado inicial para o nome de usuário.
        password: ''  // Estado inicial para a senha.
    });
    
    const [error, setError] = React.useState(''); // Estado para mensagens de erro.
    const [isSubmitting, setIsSubmitting] = React.useState(false); // Estado para gerenciar o botão "Entrar".
    const [showPassword, setShowPassword] = React.useState(false); // Estado para alternar entre exibir/esconder senha.
    const [hoverStyle, setHoverStyle] = React.useState(false); // Estado para alterar o estilo no botão "Registar".

    // Função que alterna entre exibir ou ocultar o texto da senha.
    const toggleShowPassword = () => {
        setShowPassword(!showPassword);
    }

    // Função que altera o estilo do botão "Registar" ao passar o mouse sobre ele.
    const toggleHoverStyle = () => {
        setHoverStyle(!hoverStyle);
    };

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
            const response = await axios.post(`${config.serverAddress}/user/login`, {
                username: formState.username,
                password: formState.password
            });

            if (response.data.status !== "ok") {
                // Caso o login falhe, exibe um erro.
                throw new Error("Utilizador(a) ou password incorretos. Tente novamente");
            } else {
                // Caso o login tenha sucesso, atualiza o contexto do usuário e navega para a página "home".
                setUser({ username: formState.username });
                setState({ view: "home" });
            }
        } catch (error) {
            // Exibe a mensagem de erro em caso de falha.
            setError(error.message);
        } finally {
            setIsSubmitting(false); // Reabilita o botão de envio após finalizar a requisição.
        }
    };

    // Função que redireciona o usuário para a página de registro.
    const redirectToRegister = () => {
        setState({ view: "register" });
    };

    return (
        <div className="d-flex justify-content-center align-items-center vh-100 loginComponent">
            {/* Centraliza o card no centro da tela com estilos Bootstrap. */}
            <Card style={{ width: '18rem' }} className="mt-4" data-bs-theme="dark">
                <Card.Title className="text-center mt-3">Entre com a sua conta</Card.Title>
                {/* Exibe uma mensagem de erro caso haja alguma. */}
                {error && <div className="ms-4 text-danger fs-6">{error}</div>}
                <Card.Body className="p-4">
                    <Form onSubmit={handleSubmit}>
                        {/* Campo de entrada para o nome de usuário. */}
                        <Form.Group className="mb-3" controlId="formBasicUsername">
                            <Form.Label>Username</Form.Label>
                            <Form.Control type="text" placeholder="Enter username" name="username" value={formState.username} onChange={handleChange} required/>
                        </Form.Group>
                        {/* Campo de entrada para a senha com opção de exibir/esconder. */}
                        <Form.Group className="mb-4" controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type={showPassword ? "text" : "password"} placeholder="Password" name="password" value={formState.password} onChange={handleChange} required/>
                        </Form.Group>
                        <Button variant="link" className="componentShowPasswordLogin" onClick={toggleShowPassword}>
                            {/* Ícones para alternar visibilidade da senha. */}
                            {showPassword ? <EyeSlash color="gray" size={20}/> : <Eye color="gray" size={20}/>}
                        </Button>
                        {/* Botão para enviar o formulário. */}
                        <Button variant="secondary" type="submit" className="w-100" disabled={isSubmitting}>
                            {isSubmitting ? 'Aguarde...' : 'Entrar'}
                        </Button>
                        {/* Link para redirecionar ao registro. */}
                        <p className="text-nowrap pLogin mt-2">Não tem uma conta de utilizador?
                        <Button size="sm" variant="link" type="submit" style={{ color: "white", fontSize: "1.2em", textDecoration: hoverStyle ? "none" : "underline"}} className="w-30 pb-2" disabled={isSubmitting} onClick={redirectToRegister} onMouseOver={toggleHoverStyle} onMouseOut={toggleHoverStyle}>
                            Registar
                        </Button>
                        </p>
                    </Form>
                </Card.Body>
            </Card>
        </div>
    );
};

export default Login; // Exporta o componente para ser utilizado em outras partes do aplicativo.
