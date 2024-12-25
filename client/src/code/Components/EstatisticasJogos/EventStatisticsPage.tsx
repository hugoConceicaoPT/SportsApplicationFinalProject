// Importa o módulo React, necessário para criar componentes no React.
import React, { useState } from "react";
// Importa o tipo `AppProps` de um arquivo local localizado no diretório principal.
// Este tipo é usado para definir as propriedades esperadas pelo componente.
import { AppProps } from "../../main";
import Header from "../PaginaPrincipal/Header";
import { useEvent } from "../../eventContext";
import { Container } from "react-bootstrap";
import ButtonTeam from "./buttonTeam";
import { useLeagueContext } from "../../leagueContext";


const EventStatisticsPage: React.FC<AppProps> = ({ setState }) => {
    const { selectedEvent } = useEvent();

    if (!selectedEvent) {
        return <div>Evento não encontrado</div>; // Tratamento para casos onde o evento não foi definido
    }

    const round = "intRound" in selectedEvent ? selectedEvent.intRound : null;
    const leagueName = "strLeague" in selectedEvent ? selectedEvent.strLeague : null; 
    return (
        <>
            <Header setState={setState} />
            <Container>
                <span>{leagueName}- Ronda {round}</span>
                <ButtonTeam setState={setState} teamBadge={selectedEvent.strHomeTeamBadge} teamName={selectedEvent.strHomeTeam}/>
                <ButtonTeam setState={setState} teamBadge={selectedEvent.strAwayTeamBadge} teamName={selectedEvent.strAwayTeam}/>
            </Container>
        </>
    );
}

// Exporta o componente `Home` como o export padrão, permitindo que ele seja usado em outros arquivos.
export default EventStatisticsPage;