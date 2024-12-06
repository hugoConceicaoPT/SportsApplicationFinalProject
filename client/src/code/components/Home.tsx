// Importa o módulo React, necessário para criar componentes no React.
import React from "react";
// Importa o tipo `AppProps` de um arquivo local localizado no diretório principal.
// Este tipo é usado para definir as propriedades esperadas pelo componente.
import { AppProps } from "../main";
import Header from "./Header";
import LeagueBlock from "./LeagueBlock";


// Define o componente funcional `Home` que utiliza as propriedades do tipo `AppProps`.
// Ele recebe `setState` como uma propriedade desestruturada de `AppProps`.
const Home: React.FC<AppProps> = ({ setState }) => {
    return (
        <div>
            <Header setState={setState}/>
            <LeagueBlock setState={setState}/>
          

            {/* Renderiza um cabeçalho principal com uma mensagem de boas-vindas. */}
            <h1>Welcome to Sports Application</h1>
        </div>
    );
}

// Exporta o componente `Home` como o export padrão, permitindo que ele seja usado em outros arquivos.
export default Home;
