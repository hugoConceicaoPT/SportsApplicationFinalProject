import React from "react";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { AppProps } from "../../main";
import LoginHeaderButton from "../Header/LoginHeaderButton";
import ButtonFavorites from "../Header/ButtonFavorites";
import ButtonResults from "../Header/ButtonResults";

// Componente de cabeçalho para navegação principal
const Header: React.FC<AppProps> = ({ setState }) => {
    return (
        <>
            {/* Navbar com estilo escuro e posicionamento fixo no topo */}
            <Navbar sticky="top" bg="dark" data-bs-theme="dark" className="d-flex justify-content-between">
                <Container fluid>
                    {/* Logo da aplicação que redireciona para a página inicial */}
                    <Navbar.Brand onClick={() => setState({ view: "home" })}>SportsShare</Navbar.Brand>

                    {/* Navegação com botões de resultados e favoritos */}
                    <Nav>
                        <ButtonResults setState={setState} />
                        <ButtonFavorites setState={setState} />
                    </Nav>

                    {/* Botão de login no lado direito */}
                    <Nav>
                        <LoginHeaderButton setState={setState} />
                    </Nav>
                </Container>
            </Navbar>
        </>
    );
};

export default Header;
