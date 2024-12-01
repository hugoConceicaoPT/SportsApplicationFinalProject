import React from "react";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Nav from "react-bootstrap/Nav";
import Card from 'react-bootstrap/Card';

interface RegisterProps {
    setState: React.Dispatch<React.SetStateAction<{ view: string }>>;
}

const Register: React.FC<RegisterProps> = ({ setState }) => {
    return (
        <div className="d-flex justify-content-center align-items-center vh-100 registerComponent">
            <Card style={{ width: '18rem' }} className="mt-4" data-bs-theme="dark">
                <Card.Title className="text-center mt-3">Criar uma nova conta</Card.Title>
                <Card.Body className="p-4">
                    <Form>
                        <Form.Group className="mb-3" controlId="formBasicUsername">
                            <Form.Label>Username</Form.Label>
                            <Form.Control type="text" placeholder="Enter username" />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control type="email" placeholder="Enter email" />
                        </Form.Group>
                        <Form.Group className="mb-4" controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" placeholder="Password" />
                        </Form.Group>
                        <Button variant="secondary" type="submit" className="w-100">
                            Submit
                        </Button>
                    </Form>
                </Card.Body>
            </Card>
        </div>
    );
};

export default Register;