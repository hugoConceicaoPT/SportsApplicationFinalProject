import React from "react";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import axios from 'axios';
import Card from 'react-bootstrap/Card';
import { config } from "../config";
import { Eye, EyeSlash } from 'react-bootstrap-icons';

interface RegisterProps {
    setState: React.Dispatch<React.SetStateAction<{ view: string }>>;
}

interface FormState {
    username: string;
    email: string;
    password: string;
}

const Register: React.FC<RegisterProps> = ({ setState }) => {

    const [formState, setFormState] = React.useState<FormState>({
        username: '',
        email: '',
        password: '',
    });
    const [error, setError] = React.useState('');
    const [isSubmitting, setIsSubmitting] = React.useState(false);
    const [showPassword, setShowPassword] = React.useState(false);

    const toggleShowPassword = () => {
        setShowPassword(!showPassword);
    }

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
            const response = await axios.post(`${config.serverAddress}/user/register`, {
                username: formState.username,
                email: formState.email,
                password: formState.password,
            });

            if (response.data !== "ok") {
                throw new Error("Já existe um(a) utilizador(a) com o mesmo email.");
            } else {
                setState({view: "home"});
            }
            console.log(response.data);
        } catch (error) {
            setError(error.message);
        } finally {
            setIsSubmitting(false);
        }
    }

    return (
        <div className="d-flex justify-content-center align-items-center vh-100 registerComponent">
            <Card style={{ width: '18rem' }} className="mt-4" data-bs-theme="dark">
                <Card.Title className="text-center mt-3">Criar uma nova conta</Card.Title>
                <Card.Body className="p-4">
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3" controlId="formBasicUsername">
                            <Form.Label>Username</Form.Label>
                            <Form.Control type="text" placeholder="Enter username" name="username" value={formState.username} onChange={handleChange} required/>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="email" placeholder="Enter email" name="email" value={formState.email} onChange={handleChange} required/>
                        </Form.Group>
                        <Form.Group className="mb-4" controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type={showPassword ? "text" : "password"} placeholder="Password" name="password" value={formState.password} onChange={handleChange} required/>
                        </Form.Group>
                        <Button variant="link" className="componentShowPassword" onClick={toggleShowPassword}>{showPassword ? <EyeSlash color="gray" size={20}/> : <Eye color="gray" size={20}/>}</Button>
                        <Button variant="secondary" type="submit" className="w-100" disabled={isSubmitting}>
                            {isSubmitting ? 'Aguarde...' : 'Registar'}
                        </Button>
                    </Form>
                </Card.Body>
            </Card>
        </div>
    );
};

export default Register;