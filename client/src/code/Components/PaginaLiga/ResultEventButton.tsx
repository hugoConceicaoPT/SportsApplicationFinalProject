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
    setState({ selectedResult: result });
  };

  return (
    <ListGroup.Item key={index} className="d-flex align-items-center justify-content-between">
      <div className="d-flex align-items-center">
        <Image
          src={result.strHomeTeamBadge}
          alt="Home Team Badge"
          className="me-2"
          style={{ width: "24px", height: "24px" }}
        />
        <span className="me-2">{result.strHomeTeam}</span>
      </div>
      <div className="d-flex align-items-center">
        <span className="me-2">{result.strAwayTeam}</span>
        <Image
          src={result.strAwayTeamBadge}
          alt="Away Team Badge"
          className="me-2"
          style={{ width: "24px", height: "24px" }}
        />
      </div>
      <Button variant="info" onClick={handleClick}>
        View Details
      </Button>
    </ListGroup.Item>
  );
};

export default ResultEventButton;
