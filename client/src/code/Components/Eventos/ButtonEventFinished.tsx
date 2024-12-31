import { Button } from "react-bootstrap";
import { ILiveEvents, INextPastLeagueEvents } from "../../league"
import { AppProps } from "../../main"
import { useEvent } from "../Context/EventContext";
import { useLeagueContext } from "../Context/LeagueContext";
import React from "react";

export interface IButtonEventType extends AppProps {
    event: INextPastLeagueEvents | ILiveEvents,
    leagueId: string,
    leagueName: string,
    imageSrc: string
}

// Componente para exibir um botão de evento terminado
const ButtonEventFinished: React.FC<IButtonEventType> = ({ setState, event, leagueId, leagueName, imageSrc }) => {

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

    return (
        <Button variant="secondary" onClick={handleClick}>
            {/* Exibe o status "Terminado" */}
            <span className="time-event-end">Terminado</span>
            <div>
                {/* Time da casa com badge e pontuação */}
                <img
                    src={event.strHomeTeamBadge}
                    alt={event.strHomeTeam}
                    width="22"
                    className="me-2"
                />
                <span className="team-name">{event.strHomeTeam}</span>
                <span className="score-end">
                    {event.intHomeScore}
                </span>
            </div>
            <div>
                {/* Time visitante com badge e pontuação */}
                <img
                    src={event.strAwayTeamBadge}
                    alt={event.strAwayTeam}
                    width="22"
                    className="me-2"
                />
                <span className="team-name">{event.strAwayTeam}</span>
                <span className="score-end">
                    {event.intAwayScore}
                </span>
            </div>
        </Button>
    );
}

export default ButtonEventFinished;
