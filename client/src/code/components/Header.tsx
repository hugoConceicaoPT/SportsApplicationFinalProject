import React from "react";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { AppProps } from "../main";
import LoginHeaderButton from "./LoginHeaderButton";


const Header: React.FC<AppProps> = ({setState}) => {
    return (
        <>
            <Navbar sticky="top" bg="dark" data-bs-theme="dark">
                <Container>
                    <Navbar.Brand onClick={() => setState({view: "home"})}>SportsShare</Navbar.Brand>
                    <Nav className="me-auto">
                        <LoginHeaderButton setState={setState}/>
                    </Nav>
                </Container>
            </Navbar>
        </>
    );
}

export default Header;