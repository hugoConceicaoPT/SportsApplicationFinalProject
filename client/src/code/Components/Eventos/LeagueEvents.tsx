import React, { useState, useEffect } from "react";
import { Worker, INextPastLeagueEvents } from "../../league";
import { AppProps } from "../../main";
import Button from 'react-bootstrap/Button';
import { ArrowUp, ArrowDown, Star, StarFill } from "react-bootstrap-icons";
import Nav from 'react-bootstrap/Nav';
import { Container } from "react-bootstrap";
import Image from 'react-bootstrap/Image';
import NextEventButton from "./NextEventButton";
import { config } from "../../config";


interface LeagueButtonEventsProps extends AppProps {
  leagueId: string;
  leagueName: string;
  imageSrc: string;
  selectedDate: Date;
}

let socket: WebSocket | null = null;

const LeagueEvents: React.FC<LeagueButtonEventsProps> = ({ setState, leagueId, leagueName, imageSrc, selectedDate }) => {
  const [events, setEvents] = useState<INextPastLeagueEvents[]>([]);
  const [isOpen, setIsOpen] = useState(true);
  const [favorite, setFavorite] = useState(false);

  const worker = new Worker();


  useEffect(() => {
    const fetchInitialEvents = async () => {
      try {
        // Buscar eventos futuros
        const futureEvents = await worker.getListNextLeagueEvents(leagueId, selectedDate);

        // Buscar resultados passados
        const pastResults = await worker.getPastLeagueResults(leagueId, selectedDate);

        // Combinar ambos os resultados (futuros e passados) em um único array
        const combinedEvents = [...futureEvents, ...pastResults];

        // Atualizar o estado com todos os eventos combinados
        setEvents(combinedEvents);
      } catch (error) {
        console.error("Error fetching league events:", error);
      }
    };

    fetchInitialEvents();
  }, [leagueId, selectedDate]); // Dependency array includes leagueId

  useEffect(() => {
    if (!socket) {
      socket = new WebSocket(`${config.serverAddressSocket}`);
      socket.onopen = () => {
        console.log("WebSocket connection established");
      };

      socket.onerror = (error) => {
        console.error("WebSocket error:", error);
      };

      socket.onclose = () => {
        console.log("WebSocket connection closed");
      };
    }

    const handleMessage = (event: MessageEvent) => {
      const data = JSON.parse(event.data);
      if (data[leagueName]) {
        const updatedEvents = data[leagueName].events || [];
        setEvents((prevEvents) => [...prevEvents, ...updatedEvents]);
      }
    };

    if (socket) {
      socket.addEventListener("message", handleMessage);
    }

    // Limpeza quando o componente for desmontado
    return () => {
      if (socket) {
        socket.removeEventListener("message", handleMessage);
      }
    };
  }, [leagueId]);
  // Toggle visibility of games
  const toggleVisibility = () => {
    setIsOpen(!isOpen);
  };

  const toggleFavorite = () => {
    setFavorite(!favorite);
  }

  return events.length === 0 ? null : (
    <Container className="leagueEvents rounded p-0 mb-1">
      {/* Button to expand/collapse */}
      <div className="d-flex">
        <Button
          style={{
            color: favorite ? "#FFCD00" : "white",
            backgroundColor: "#01203E",
            borderColor: "#01203E",
          }}
          className="leagueEvents-favorite"
          onClick={toggleFavorite}
        >
          {favorite ? <StarFill /> : <Star />}
        </Button>
        <Nav.Link className="leagueEvents-navLink">
          <Image
            className="me-2"
            src={imageSrc}
            alt="icon"
            style={{ marginRight: "5px", width: "14px", height: "14px" }}
          />
          {leagueName}
        </Nav.Link>
        <Button
          variant="secondary"
          size="sm"
          className="ms-auto mt-2 mb-2 me-2"
          onClick={toggleVisibility}
        >
          {isOpen ? <ArrowUp /> : <ArrowDown />}
        </Button>
      </div>

      {/* List of games */}
      {isOpen && (
        <div className="mt-auto">
          <ul className="list-group">
            {events.map((event, index) => (
              <NextEventButton
                key={index}
                setState={setState}
                event={event}
                index={index}
              />
            ))}
          </ul>
        </div>
      )}
    </Container>
  );
}

export default LeagueEvents;
