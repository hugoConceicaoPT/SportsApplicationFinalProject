import React from "react";
import { INextPastLeagueEvents } from "../../league";
import { AppProps } from "../../main";
import { useTeamContext } from "../Context/TeamContext";
import { ListGroup } from "react-bootstrap";

interface ListButtonProps extends AppProps {
  event: INextPastLeagueEvents;
  index: number;
}

const ListButton: React.FC<ListButtonProps> = ({ setState, event, index }) => {
  const { setTeam } = useTeamContext();

  const redirectToTeamHomePage = () => {
    setState({ view: "teampage" });
    setTeam({
      teamId: event.idHomeTeam,
      teamName: event.strHomeTeam,
      imageSrc: event.strHomeTeamBadge,
    });
  };

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
       
        <span>{event.dateEvent} {event.strTime}</span>
     
    </ListGroup.Item>
  );
  
};


export default ListButton;
