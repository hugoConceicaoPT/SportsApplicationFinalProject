import React from "react";
import { INextPastLeagueEvents } from "../../league";
import { AppProps } from "../../main";
import { useTeamContext } from "../Context/TeamContext";
import { ListGroup } from "react-bootstrap";

interface ListButtonProps extends AppProps {
  event: INextPastLeagueEvents;
  index: number;
}

// Componente para exibir um botão de lista com informações de um evento
const ListButton: React.FC<ListButtonProps> = ({ setState, event, index }) => {
  const { setTeam } = useTeamContext();

  // Redireciona para a página do time da casa
  const redirectToTeamHomePage = () => {
    setState({ view: "teampage" });
    setTeam({
      teamId: event.idHomeTeam,
      teamName: event.strHomeTeam,
      imageSrc: event.strHomeTeamBadge,
    });
  };

  // Redireciona para a página do time visitante
  const redirectToTeamAwayPage = () => {
    setState({ view: "teampage" });
    setTeam({
      teamId: event.idAwayTeam,
      teamName: event.strAwayTeam,
      imageSrc: event.strAwayTeamBadge,
    });
  };

  return (
    <ListGroup.Item
      key={index} 
    >
        {/* Badge e nome do time da casa */}
        <img
          src={event.strHomeTeamBadge}
          alt={event.strHomeTeam}
          style={{
            width: "24px",
            height: "24px",
            marginRight: "10px",
            cursor: "pointer",
          }}
          onClick={redirectToTeamHomePage}
        />
        <span>{event.strHomeTeam}</span>
        <span className="list-vs">vs</span>

        {/* Badge e nome do time visitante */}
        <img
          src={event.strAwayTeamBadge}
          alt={event.strAwayTeam}
          style={{
            width: "24px",
            height: "24px",
            marginRight: "10px",
            cursor: "pointer",
          }}
          onClick={redirectToTeamAwayPage}
        />
        <span>{event.strAwayTeam}</span>
       
        {/* Data e hora do evento */}
        <span>{event.dateEvent} {event.strTime}</span>
     
    </ListGroup.Item>
  );
  
};

export default ListButton;
