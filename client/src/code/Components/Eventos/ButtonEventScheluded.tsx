// Importa o componente Button do react-bootstrap e os ícones Dash
import { Button } from "react-bootstrap";
import { ILiveEvents, INextPastLeagueEvents } from "../../league";
import React from "react";
import { Dash } from "react-bootstrap-icons";

// Define a interface para o componente ButtonEventScheluded, especificando o tipo do evento
interface IButtonEventScheluded {
    event: INextPastLeagueEvents | ILiveEvents, // O evento pode ser do tipo INextPastLeagueEvents ou ILiveEvents
}

// Declaração do componente funcional ButtonEventScheluded
const ButtonEventScheluded: React.FC<IButtonEventScheluded> = ({ event }) => {

    // Formata o horário do evento, verificando se o atributo "strTime" existe no evento
    const formattedTime = "strTime" in event ? event.strTime.split(":").slice(0, 2).join(":") : null;

    return (
        <Button variant="secondary"> {/* Botão com estilo secundário */}
            <span className="time-event">{formattedTime}</span> {/* Exibe o horário formatado do evento */}
            <div>
                {/* Imagem e nome do time da casa */}
                <img
                    src={event.strHomeTeamBadge} // URL do escudo do time da casa
                    alt={event.strHomeTeam}      // Texto alternativo para acessibilidade
                    width="22"                  // Largura da imagem
                    className="me-2"            // Classe para espaçamento
                />
                <span className="team-name">{event.strHomeTeam}</span> {/* Nome do time da casa */}
                <span className="score">
                    <Dash /> {/* Ícone de separador */}
                </span>
            </div>
            <div>
                {/* Imagem e nome do time visitante */}
                <img
                    src={event.strAwayTeamBadge} // URL do escudo do time visitante
                    alt={event.strAwayTeam}      // Texto alternativo para acessibilidade
                    width="22"                  // Largura da imagem
                    className="me-2"            // Classe para espaçamento
                />
                <span className="team-name">{event.strAwayTeam}</span> {/* Nome do time visitante */}
                <span className="score">
                    <Dash /> {/* Ícone de separador */}
                </span>
            </div>
        </Button>
    );
}

// Exporta o componente para ser usado em outros arquivos
export default ButtonEventScheluded;
