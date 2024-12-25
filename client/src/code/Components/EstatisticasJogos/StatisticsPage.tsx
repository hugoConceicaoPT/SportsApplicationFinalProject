// Importa o módulo React, necessário para criar componentes no React.
import React, { useState } from "react";
// Importa o tipo `AppProps` de um arquivo local localizado no diretório principal.
// Este tipo é usado para definir as propriedades esperadas pelo componente.
import { AppProps } from "../../main";
import Header from "../PaginaPrincipal/Header";
import { useEvent } from "../../eventContext";
import { Container } from "react-bootstrap";
import ButtonTeam from "./ButtonTeamHome";
import { useLeagueContext } from "../../leagueContext";
import TeamVsContainer from "./TeamsVsContainer";
import FilterFormattionButton from "./FilterFormattionButton";
import FilterGameButton from "./FilterGameButton";
import FilterStatisticsButton from "./FilterStatisticsButton";
import FilterClassificationButton from "./FilterClassificationButton";


const StatisticsPage: React.FC<AppProps> = ({ setState }) => {
    const { selectedEvent } = useEvent();
    const [filter, setFilter] = useState<"formation" | "game" | "statistic" | "classification">("game");

    if (!selectedEvent) {
        return <div>Evento não encontrado</div>; // Tratamento para casos onde o evento não foi definido
    }

    const round = "intRound" in selectedEvent ? selectedEvent.intRound : null;
    const leagueName = "strLeague" in selectedEvent ? selectedEvent.strLeague : null;
    return (
        <>
            <div>Estatísticas</div>
        </>
    );
}

// Exporta o componente `Home` como o export padrão, permitindo que ele seja usado em outros arquivos.
export default StatisticsPage;