import React, { useState, useEffect } from "react";
import { Worker, IPastLeagueResults } from "../../league";
import { AppProps } from "../../main";
import Button from 'react-bootstrap/Button';
import { ArrowUp, ArrowDown, Star, StarFill } from "react-bootstrap-icons";
import Nav from 'react-bootstrap/Nav';
import { Container } from "react-bootstrap";
import Image from 'react-bootstrap/Image';
import ResultEventButton from "./ResultEventButton";

interface LeagueButtonResultsProps extends AppProps {
  leagueId: string;
  leagueName: string;
  imageSrc: string;
  currentDate: Date; // Replaced selectedStartDate and selectedEndDate with currentDate
}

const LeagueResults: React.FC<LeagueButtonResultsProps> = ({ setState, leagueId, leagueName, imageSrc, currentDate }) => {
  const [results, setResults] = useState<IPastLeagueResults[]>([]);
  const [isOpen, setIsOpen] = useState(true);
  const [favorite, setFavorite] = useState(false);

  const worker = new Worker();

  useEffect(() => {
    const fetchInitialResults = async () => {
      try {
        const data = await worker.getPastLeagueResults(leagueId, currentDate);
        setResults(data);
      } catch (error) {
        console.error("Error fetching league results:", error);
      }
    };

    fetchInitialResults();
  }, [leagueId, currentDate]); // Dependency array includes leagueId and currentDate

  // Toggle visibility of games
  const toggleVisibility = () => {
    setIsOpen(!isOpen);
  };

  const toggleFavorite = () => {
    setFavorite(!favorite);
  };

  return (
    <Container className="leagueResults">
      {/* Button to expand/collapse */}
      <div className="d-flex">
        <Button className="leagueResults-favorite" onClick={toggleFavorite}>{favorite ? <StarFill /> : <Star />}</Button>
        <Nav.Link className="leagueResults-navLink">
          <Image className="me-2" src={imageSrc} alt="icon" />
          {leagueName}</Nav.Link>
        <Button variant="secondary" size="sm" className="ms-auto mt-2 mb-2 me-2" onClick={toggleVisibility}>
          {isOpen ? <ArrowUp /> : <ArrowDown />}
        </Button>
      </div>

      {/* List of games */}
      {isOpen && (
        <div className="mt-auto">
          {results.length > 0 ? (
            <ul className="list-group">
              {results.map((result, index) => (
                <ResultEventButton key={index} setState={setState} result={result} index={index} />
              ))}
            </ul>
          ) : (
            <></>
          )}
        </div>
      )}
    </Container>
  );
};

export default LeagueResults;
