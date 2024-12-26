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
      <Image
        src={result.strHomeTeamBadge}
        alt="Home Team Badge"
        className="me-2"
        style={{ width: "24px", height: "24px" }}
      />
      <span className="me-2">{result.strHomeTeam}</span>
      <span className="me-2">{result.strAwayTeam}</span>
      <Image
        src={result.strAwayTeamBadge}
        alt="Away Team Badge"
        className="me-2"
        style={{ width: "24px", height: "24px" }}
      />
        View Details
      </Button>
    </ListGroup.Item>
  );
};

export default ResultEventButton;
