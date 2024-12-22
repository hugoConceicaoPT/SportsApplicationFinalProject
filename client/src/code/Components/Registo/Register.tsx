import React from "react";
// Importa React e outras dependências necessárias, como Bootstrap, Axios, e componentes do aplicativo.

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import axios from 'axios';
import Card from 'react-bootstrap/Card';
import { config } from "../../config"; // Configuração geral, incluindo o endereço do servidor.
import { Eye, EyeSlash } from 'react-bootstrap-icons'; // Ícones de olho para alternar visibilidade da senha.
import { AppProps } from "../../main"; // Interface para definir as propriedades do componente.

interface FormState {
    username: string; // Estado para o nome de usuário.
    email: string;    // Estado para o email.
    password: string; // Estado para a senha.
}

const Register: React.FC<AppProps> = ({ setState }) => {
    // Gerencia os estados do formulário e interatividade.
    const [formState, setFormState] = React.useState<FormState>({
        username: '', // Estado inicial para o nome de usuário.
        email: '',    // Estado inicial para o email.
        password: '', // Estado inicial para a senha.
    });

    const [error, setError] = React.useState(''); // Armazena mensagens de erro.
    const [isSubmitting, setIsSubmitting] = React.useState(false); // Controle do botão "Registar" durante o envio.
    const [showPassword, setShowPassword] = React.useState(false); // Alterna visibilidade da senha.
    const [hoverStyle, setHoverStyle] = React.useState(false); // Estilo hover para o botão "Entrar".

    // Alterna a visibilidade da senha entre texto e pontos.
    const toggleShowPassword = () => {
        setShowPassword(!showPassword);
    }

    // Altera o estilo do botão "Entrar" ao passar o mouse.
    const toggleHoverStyle = () => {
        setHoverStyle(!hoverStyle);
    };

    // Atualiza os valores do estado `formState` com base na entrada do usuário.
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target; // Obtém o nome e o valor do campo de entrada.
        setFormState((prevState) => ({
            ...prevState, // Mantém os valores anteriores.
            [name]: value, // Atualiza o campo correspondente.
        }));
    };

    // Trata o envio do formulário e faz a requisição ao servidor para registrar um novo usuário.
    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault(); // Evita que a página seja recarregada.
        setIsSubmitting(true); // Desabilita o botão "Registar" durante o envio.

        try {
            // Envia os dados do usuário para o endpoint de registro.
            const response = await axios.post(`${config.serverAddress}/user/register`, {
                username: formState.username,
                email: formState.email,
                password: formState.password,
            });

            if (response.data !== "ok") {
                // Exibe um erro caso já exista um usuário com o mesmo email.
                throw new Error("Já existe um(a) utilizador(a) com o mesmo email.");
            } else {
                // Redireciona para a página "home" após o registro bem-sucedido.
                setState({ view: "home" });
            }
        } catch (error) {
            // Define a mensagem de erro em caso de falha no registro.
            setError(error.message);
        } finally {
            setIsSubmitting(false); // Reabilita o botão após o envio.
        }
    }

    // Redireciona para a página de login.
    const redirectToLogin = () => {
        setState({ view: "login" });
    };

    return (
        <div className="d-flex justify-content-center align-items-center vh-100 registerComponent">
            {/* Card centralizado com estilos Bootstrap */}
            <Card style={{ width: '18rem' }} className="mt-4" data-bs-theme="dark">
                <Card.Title className="text-center mt-3">Criar uma nova conta</Card.Title>
                {/* Exibe mensagens de erro, se houver. */}
                {error && <div className="ms-4 text-danger fs-6">{error}</div>}
                <Card.Body className="p-4">
                    <Form onSubmit={handleSubmit}>
                        {/* Campo para nome de usuário */}
                        <Form.Group className="mb-3" controlId="formBasicUsername">
                            <Form.Label>Username</Form.Label>
                            <Form.Control type="text" placeholder="Enter username" name="username" value={formState.username} onChange={handleChange} required />
                        </Form.Group>
                        {/* Campo para email */}
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="email" placeholder="Enter email" name="email" value={formState.email} onChange={handleChange} required />
                        </Form.Group>
                        {/* Campo para senha com alternância de visibilidade */}
                        <Form.Group className="mb-4" controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type={showPassword ? "text" : "password"} placeholder="Password" name="password" value={formState.password} onChange={handleChange} required />
                        </Form.Group>
                        <Button variant="link" className="componentShowPassword" onClick={toggleShowPassword}>
                            {showPassword ? <EyeSlash color="gray" size={20} /> : <Eye color="gray" size={20} />}
                        </Button>
                        {/* Botão para envio do formulário */}
                        <Button variant="secondary" type="submit" className="w-100" disabled={isSubmitting}>
                            {isSubmitting ? 'Aguarde...' : 'Registar'}
                        </Button>
                        {/* Link para redirecionar ao login */}
                        <p className="text-nowrap mt-2">Tem uma conta?
                            <Button size="sm" variant="link" type="submit" style={{ color: "white", fontSize: "1.1em", textDecoration: hoverStyle ? "none" : "underline" }} className="w-30 pb-2" disabled={isSubmitting} onClick={redirectToLogin} onMouseOver={toggleHoverStyle} onMouseOut={toggleHoverStyle}>
                                Entrar
                            </Button>
                        </p>
                    </Form>
                </Card.Body>
            </Card>
        </div>
    );
};

export default Register; // Exporta o componente para uso em outras partes do aplicativo.
