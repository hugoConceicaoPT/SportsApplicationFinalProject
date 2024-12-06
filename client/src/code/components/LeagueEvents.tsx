import React, { useState, useEffect } from "react";
import { Worker, INextPastLeagueEvents } from "../league";
import { AppProps } from "../main";
import Button from 'react-bootstrap/Button';
import { ArrowUp, ArrowDown, Star, StarFill } from "react-bootstrap-icons";
import Nav from 'react-bootstrap/Nav';
import { Container } from "react-bootstrap";
import Image from 'react-bootstrap/Image';
import NextEventButton from "./NextEventButton";


interface LeagueButtonEventsProps extends AppProps {
  leagueId: string;
  leagueName: string;
  imageSrc: string;
}

const LeagueEvents: React.FC<LeagueButtonEventsProps> = ({ setState,  leagueId, leagueName, imageSrc }) => {
  const [events, setEvents] = useState<INextPastLeagueEvents[]>([]);
  const [isOpen, setIsOpen] = useState(true);
  const [favorite, setFavorite] = useState(false);

  const worker = new Worker();

  
  useEffect(() => {
    const fetchInitialEvents = async () => {
      try {
        const data = await worker.listNextLeagueEvents(leagueId);
        setEvents(data);
      } catch (error) {
        console.error("Error fetching league events:", error);
      }
    };

    fetchInitialEvents();
  }, [leagueId]); // Dependency array includes leagueId
  // Toggle visibility of games
  const toggleVisibility = () => {
    setIsOpen(!isOpen);
  };

  const toggleFavorite = () => {
    setFavorite(!favorite);
  }

  return (
    <Container className="leagueEvents rounded">
      {/* Button to expand/collapse */}
      <div className="d-flex justify-content-between align-items-center">
        <Nav.Link style={{color: "#FFCD00", textDecoration: "underline"}} className="m-0 p-1 ps-0">
        <Button style={{color: favorite ? "#FFCD00": "white", backgroundColor: "#01203E", borderColor: "#01203E"}} className="ps-0 ms-0 mb-3 mt-2" onClick={toggleFavorite}>{favorite ? <StarFill/> : <Star/>}</Button>
        <Image className="me-2" src={imageSrc} alt="icon" style={{ marginRight: "5px", width: "16px", height: "16px"}}/>
        {leagueName}</Nav.Link>
        <Button variant="secondary" size="sm" onClick={toggleVisibility}>
          {isOpen ? <ArrowUp/> : <ArrowDown/>}
        </Button>
      </div>

      {/* List of games */}
      {isOpen && (
        <div className="mt-3">
          {events.length > 0 ? (
            <ul className="list-group">
              {events.map((event, index) => (
                <NextEventButton key={index} setState={setState} event={event} index={index}/>
              ))}
            </ul>
          ) : (
            <div className="text-center">Sem jogos disponíveis</div>
          )}
        </div>
      )}
    </Container>
  );
}

export default LeagueEvents;
