import { Button } from "react-bootstrap";
import { useEvent } from "../Context/EventContext";
import { useLeagueContext } from "../Context/LeagueContext";
import React from "react";
import { IButtonEventType } from "./ButtonEventFinished";

// Componente para exibir um botão de evento ao vivo
const ButtonEventLive: React.FC<IButtonEventType> = ({ setState, event, leagueId, leagueName, imageSrc }) => {

    const { setSelectedEvent } = useEvent(); // Contexto para definir o evento selecionado
    const { setLeague } = useLeagueContext(); // Contexto para definir a liga

    // Função chamada ao clicar no botão
    const handleClick = () => {
        setSelectedEvent(event); // Define o evento selecionado
        setState({ view: "statistics" }); // Altera a visão para "statistics"
        setLeague({
            leagueId,
            leagueName,
            imageSrc
        });
    };

    // Obtém o progresso do jogo e formata para exibição
    const gameProgress = "strProgress" in event ? event.strProgress : null;
    const formattedProgress = gameProgress ? `${gameProgress}'` : gameProgress;
    let gameStatus = "strStatus" in event ? event.strStatus : null;
    if (gameStatus === "1H") {
        gameStatus = "HT"; // Altera o status para "HT" se estiver no intervalo
    }

    return (
        <Button variant="secondary" onClick={handleClick}>
            {/* Exibe o tempo ou status do jogo */}
            <span className="time-event-live">{formattedProgress === "45'" ? gameStatus : formattedProgress}</span>
            <div>
                {/* Time da casa com badge e pontuação ao vivo */}
                <img
                    src={event.strHomeTeamBadge}
                    alt={event.strHomeTeam}
                    width="22"
                    className="me-2"
                />
                <span className="team-name">{event.strHomeTeam}</span>
                <span className="score-live">
                    {event.intHomeScore}
                </span>
            </div>
            <div>
                {/* Time visitante com badge e pontuação ao vivo */}
                <img
                    src={event.strAwayTeamBadge}
                    alt={event.strAwayTeam}
                    width="22"
                    className="me-2"
                />
                <span className="team-name">{event.strAwayTeam}</span>
                <span className="score-live">
                    {event.intAwayScore}
                </span>
            </div>
        </Button>
    );
};

export default ButtonEventLive;
