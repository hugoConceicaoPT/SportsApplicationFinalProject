import React from "react";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Dropdown from 'react-bootstrap/Dropdown';
import { useUserContext } from "../userContext";
import { AppProps } from "../main";


const Header: React.FC<AppProps> = ({setState}) => {
    const user = useUserContext();
    return (
        <>
            <Navbar sticky="top" bg="dark" data-bs-theme="dark">
                <Container>
                    <Navbar.Brand onClick={() => setState({view: "home"})}>SportsShare</Navbar.Brand>
                    <Nav className="me-auto">
                        <Nav.Link onClick={() => setState({view: "home"})}>Home</Nav.Link>
                        <Nav.Link href="#features">Features</Nav.Link>
                        <Nav.Link href="#pricing">Pricing</Nav.Link>
                    </Nav>
                </Container>
            </Navbar>
        </>
    );
}

export default Header;