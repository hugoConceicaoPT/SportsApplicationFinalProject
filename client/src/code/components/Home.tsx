// Importa o módulo React, necessário para criar componentes no React.
import React from "react";

// Importa o componente `Nav` da biblioteca react-bootstrap para criar navegações estilizadas.
import Nav from "react-bootstrap/Nav";

// Importa o tipo `AppProps` de um arquivo local localizado no diretório principal.
// Este tipo é usado para definir as propriedades esperadas pelo componente.
import { AppProps } from "../main";
import Header from "./Header";

// Define o componente funcional `Home` que utiliza as propriedades do tipo `AppProps`.
// Ele recebe `setState` como uma propriedade desestruturada de `AppProps`.
const Home: React.FC<AppProps> = ({ setState }) => {
    return (
        <div>
            <Header setState={setState}/>
            {/* Renderiza um link de navegação usando `Nav.Link`.
                Quando clicado, chama a função `setState` passando um objeto que define a visão atual como "register". */}
            <Nav.Link onClick={() => setState({ view: "register" })}>Register</Nav.Link>

            {/* Renderiza outro link de navegação.
                Quando clicado, chama a função `setState` passando um objeto que define a visão atual como "login". */}
            <Nav.Link onClick={() => setState({ view: "login" })}>Login</Nav.Link>

            {/* Renderiza um cabeçalho principal com uma mensagem de boas-vindas. */}
            <h1>Welcome to Sports Application</h1>
        </div>
    );
}

// Exporta o componente `Home` como o export padrão, permitindo que ele seja usado em outros arquivos.
export default Home;
