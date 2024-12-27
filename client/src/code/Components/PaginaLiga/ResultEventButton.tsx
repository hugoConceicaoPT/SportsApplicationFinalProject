import React from "react";
import { IPastLeagueResults } from "../../league";
import { Button, ListGroup } from "react-bootstrap";
import Image from "react-bootstrap/Image";

interface ResultEventButtonProps {
  result: IPastLeagueResults;
  index: number;
  setState: (state: any) => void;
}

const ResultEventButton: React.FC<ResultEventButtonProps> = ({ result, index, setState }) => {
  const handleClick = () => {
    // Exemplo de ação quando um resultado é clicado
    setState({ selectedResult: result });
  };

  const redirectToTeamPage = () => {
    setState({ view: "teampage" });
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
        onClick={redirectToTeamPage}
      />
      <span className="me-2">{result.strHomeTeam}</span>
      <span className="results-vs">vs</span>
      <span className="me-2">{result.strAwayTeam}</span>
      <Image
        src={result.strAwayTeamBadge}
        alt="Away Team Badge"
        className="me-2"
        style={{ width: "24px", height: "24px", cursor: "pointer" }}
        onClick={redirectToTeamPage}
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
