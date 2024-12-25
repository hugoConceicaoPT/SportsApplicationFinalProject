// Importa o módulo React, necessário para criar componentes no React.
import React, { useState } from "react";
// Importa o tipo `AppProps` de um arquivo local localizado no diretório principal.
// Este tipo é usado para definir as propriedades esperadas pelo componente.
import { AppProps } from "../../main";
import Header from "../PaginaPrincipal/Header";
import { useEvent } from "../../eventContext";
import { Container } from "react-bootstrap";
import TeamVsContainer from "./TeamsVsContainer";
import FilterFormattionButton from "./FilterFormattionButton";
import FilterGameButton from "./FilterGameButton";
import FilterStatisticsButton from "./FilterStatisticsButton";
import FilterClassificationButton from "./FilterClassificationButton";
import FormationPage from "./FormationPage";
import GamePage from "./GamePage";
import StatisticsPage from "./StatisticsPage";
import Standings from "../PaginaLiga/Standings";


const EventStatisticsPage: React.FC<AppProps> = ({ setState }) => {
    const { selectedEvent } = useEvent();
    const [filter, setFilter] = useState<"formation" | "game" | "statistic" | "classification">("game");

    if (!selectedEvent) {
        return <div>Evento não encontrado</div>; // Tratamento para casos onde o evento não foi definido
    }

    const round = "intRound" in selectedEvent ? selectedEvent.intRound : null;
    const leagueName = "strLeague" in selectedEvent ? selectedEvent.strLeague : null;
    return (
        <>
            <Header setState={setState} />
            <Container>
                <span className="text-white mt-2 d-inline-block">{leagueName} - Ronda {round}</span>
                <hr className="text-white mt-2" />
                <TeamVsContainer setState={setState} teamBadge={selectedEvent.strHomeTeamBadge} teamName={selectedEvent.strHomeTeam} />
                <hr className="text-white statistics-hr" />
                <div className="d-flex justify-content-center">
                    <FilterGameButton filter={filter} setFilter={setFilter} />
                    <FilterStatisticsButton filter={filter} setFilter={setFilter} />
                    <FilterFormattionButton filter={filter} setFilter={setFilter} />
                    <FilterClassificationButton filter={filter} setFilter={setFilter} />
                </div>
                <hr className="text-white" />
                {filter === "formation" ? (
                    <FormationPage setState={setState}/>
                ) : filter === "game" ? (
                    <GamePage setState={setState} />
                ) : filter === "statistic" ? (
                    <StatisticsPage setState={setState}/>
                ): (
                    <Standings setState={setState}/>
                )}
            </Container>
        </>
    );
}

// Exporta o componente `Home` como o export padrão, permitindo que ele seja usado em outros arquivos.
export default EventStatisticsPage;