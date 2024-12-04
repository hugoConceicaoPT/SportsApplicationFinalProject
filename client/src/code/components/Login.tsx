import React, { useState } from "react";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import axios from 'axios';
import Card from 'react-bootstrap/Card';
import { config } from "../config";
import { Eye, EyeSlash } from 'react-bootstrap-icons';
import { styleText } from "util";
import { useUserContext } from '../userContext';
import { AppProps } from "../main";


export interface FormState {
    username: string;
    password: string;
}

export interface User {
    username: string;
}

const Login: React.FC<AppProps> = ({ setState }) => {
    const { setUser } = useUserContext();
    const [formState, setFormState] = React.useState<FormState>({
        username: '',
        password: ''
    });
    const [error, setError] = React.useState('');
    const [isSubmitting, setIsSubmitting] = React.useState(false);
    const [showPassword, setShowPassword] = React.useState(false);
    const [hoverStyle, setHoverStyle] = React.useState(false);

    const toggleShowPassword = () => {
        setShowPassword(!showPassword);
    }

    const toggleHoverStyle = () => {
        setHoverStyle(!hoverStyle);
    };
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = event.target;
        setFormState((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setIsSubmitting(true);
        try {

            // Envia uma solicitação para registar um novo utilizador
            const response = await axios.post(`${config.serverAddress}/user/login`, {
                username: formState.username,
                password: formState.password
            });
            console.log(response.data);
            if (response.data.status !== "ok") {
                throw new Error("Utilizador(a) ou password incorretos. Tente novamente");
            } else {
                setUser({ username: formState.username});
                setState({view: "home"});
            }
            console.log(response.data);
        } catch (error) {
            setError(error.message);
        } finally {
            setIsSubmitting(false);
        }
    }

    const redirectToRegister = () => {
        setState({ view: "register" });
    };

    return (
        <div className="d-flex justify-content-center align-items-center vh-100 loginComponent">
            <Card style={{ width: '18rem' }} className="mt-4" data-bs-theme="dark">
                <Card.Title className="text-center mt-3">Entre com a sua conta</Card.Title>
                {error && <div className="ms-4 text-danger fs-6">{error}</div>}
                <Card.Body className="p-4">
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3" controlId="formBasicUsername">
                            <Form.Label>Username</Form.Label>
                            <Form.Control type="text" placeholder="Enter username" name="username" value={formState.username} onChange={handleChange} required/>
                        </Form.Group>
                        <Form.Group className="mb-4" controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type={showPassword ? "text" : "password"} placeholder="Password" name="password" value={formState.password} onChange={handleChange} required/>
                        </Form.Group>
                        <Button variant="link" className="componentShowPasswordLogin" onClick={toggleShowPassword}>{showPassword ? <EyeSlash color="gray" size={20}/> : <Eye color="gray" size={20}/>}</Button>
                        <Button variant="secondary" type="submit" className="w-100" disabled={isSubmitting}>
                            {isSubmitting ? 'Aguarde...' : 'Entrar'}
                        </Button>
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

export default Login;