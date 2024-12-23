import React from "react";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { AppProps } from "../../main";
import LoginHeaderButton from "./LoginHeaderButton";
import ButtonFavorites from "./ButtonFavorites";
import ButtonResults from "../PaginaLiga/ButtonResults";


const Header: React.FC<AppProps> = ({setState}) => {
    return (
        <>
            <Navbar sticky="top" bg="dark" data-bs-theme="dark" className="d-flex justify-content-between">
                <Container fluid>
                    <Navbar.Brand onClick={() => setState({view: "home"})}>SportsShare</Navbar.Brand>
                    <Nav>
                        <ButtonResults setState={setState}/>
                        <ButtonFavorites setState={setState}/>
                    </Nav>
                    <Nav>
                        <LoginHeaderButton setState={setState}/>
                    </Nav>
                </Container>
            </Navbar>
        </>
    );
}

export default Header;