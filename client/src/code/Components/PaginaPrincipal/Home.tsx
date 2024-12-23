// Importa o módulo React, necessário para criar componentes no React.
import React, { useState } from "react";
// Importa o tipo `AppProps` de um arquivo local localizado no diretório principal.
// Este tipo é usado para definir as propriedades esperadas pelo componente.
import { AppProps } from "../../main";
import Header from "../Header/Header";
import LeagueBlock from "./LeagueBlock";
import LeagueEvents from "../Eventos/LeagueEvents";
import { leagueIds } from "../../../../../server/src/leagueIds";
import DateButton from "./DateButton";
import CardListLeague from "./CardListLeagues";

// Define o componente funcional `Home` que utiliza as propriedades do tipo `AppProps`.
// Ele recebe `setState` como uma propriedade desestruturada de `AppProps`.
const Home: React.FC<AppProps> = ({ setState }) => {
    return (
        <div>
            <Header setState={setState} />
            <LeagueBlock setState={setState} />
            <CardListLeague setState={setState}/>
        </div>
    );
}

// Exporta o componente `Home` como o export padrão, permitindo que ele seja usado em outros arquivos.
export default Home;
