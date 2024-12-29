import React from "react";
import { INextPastLeagueEvents } from "../../league";
import { Button, ListGroup } from "react-bootstrap";
import Image from "react-bootstrap/Image";
import { useTeamContext } from "../Context/TeamContext";
import { useEvent } from "../Context/EventContext";

interface ResultEventButtonProps {
  result: INextPastLeagueEvents;
  index: number;
  setState: (state: any) => void;
}

const ResultEventButton: React.FC<ResultEventButtonProps> = ({ result, index, setState }) => {

  const { setTeam } = useTeamContext();
  const { setSelectedEvent } = useEvent();

  const handleClick = () => {
    // Exemplo de ação quando um resultado é clicado
    setState({ view: "statistics" });
    setSelectedEvent(result);
  };

  const redirectToHomeTeamPage = () => {
    setState({ view: "teampage" });
    setTeam({
      teamId: result.idHomeTeam,
      teamName: result.strHomeTeam,
      imageSrc: result.strHomeTeamBadge
    })
  }

  const redirectToAwayTeamPage = () => {
    setState({ view: "teampage" });
    setTeam({
      teamId: result.idAwayTeam,
      teamName: result.strAwayTeam,
      imageSrc: result.strAwayTeamBadge
    })
  }

  return (
    <ListGroup.Item
      key={index}
      className="resultados"
    >
      <Image
        src={result.strHomeTeamBadge}
        alt="Home Team Badge"
        className="me-2"
        style={{ width: "24px", height: "24px", cursor: "pointer" }}
        onClick={redirectToHomeTeamPage}
      />
      <span className="me-2">{result.strHomeTeam}</span>
      <span className="results-vs">vs</span>
      <span className="me-2">{result.strAwayTeam}</span>
      <Image
        src={result.strAwayTeamBadge}
        alt="Away Team Badge"
        className="me-2"
        style={{ width: "24px", height: "24px", cursor: "pointer" }}
        onClick={redirectToAwayTeamPage}
      />
      <span className="me-2 fw-bold">
        {result.intHomeScore} - {result.intAwayScore}
      </span>
      <span className="me-auto">
        {new Date(result.dateEvent).toLocaleDateString()}
      </span>
      <Button variant="primary" size="sm" onClick={handleClick} className="ms-2">
        View Details
      </Button>
    </ListGroup.Item>
  );
};

export default ResultEventButton;
