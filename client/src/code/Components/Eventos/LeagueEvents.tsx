import React, { useState, useEffect } from "react";
import { Worker, INextLeagueEvents } from "../../league";
import { AppProps } from "../../main";
import Button from 'react-bootstrap/Button';
import { ArrowUp, ArrowDown, Star, StarFill } from "react-bootstrap-icons";
import Nav from 'react-bootstrap/Nav';
import { Container } from "react-bootstrap";
import Image from 'react-bootstrap/Image';
import NextEventButton from "./NextEventButton";
import { config } from "../../config";
import axios from "axios";
import { useLeagueContext } from "../Context/LeagueContext";


interface LeagueButtonEventsProps extends AppProps {
  leagueId: string;
  leagueName: string;
  imageSrc: string;
  selectedDate: Date;
  filter: string;
}

let socket: WebSocket | null = null;

const LeagueEvents: React.FC<LeagueButtonEventsProps> = ({ setState, leagueId, leagueName, imageSrc, selectedDate, filter }) => {
  const [events, setEvents] = useState<INextLeagueEvents[]>([]);
  const [isOpen, setIsOpen] = useState(true);
  const [favorite, setFavorite] = useState(true);
  const worker = new Worker();
  const { setLeague } = useLeagueContext();

  useEffect(() => {
    const fetchInitialEvents = async () => {
      try {
        // Buscar eventos futuros
        const futureEvents = await worker.getListNextLeagueEvents(leagueId, selectedDate);

        // Buscar resultados passados
        const pastResults = await worker.getPastLeagueResults(leagueId, selectedDate);

        // Combinar ambos os resultados (futuros e passados) em um único array
        // Combinar ambos os resultados (priorizando os passados)
        const combinedEventsMap = new Map<string, INextLeagueEvents>();

        // Adicionar eventos passados ao mapa
        pastResults.forEach((event) => {
          combinedEventsMap.set(event.idEvent, event);
        });

        // Adicionar eventos futuros, apenas se não existirem no mapa
        futureEvents.forEach((event) => {
          if (event.idEvent) { // Verifica se idEvent está definido
            if (!combinedEventsMap.has(event.idEvent)) {
              combinedEventsMap.set(event.idEvent, event);
            }
          }
        });

        // Atualizar o estado com todos os eventos combinados
        setEvents(Array.from(combinedEventsMap.values()));
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
      if (data[leagueId]) {
        const updatedEvents = data[leagueId];
        setEvents((prevEvents) => {
          const updated = [...prevEvents];
          updatedEvents.forEach((newEvent: INextLeagueEvents) => {
            const index = updated.findIndex((event) => event.idEvent === newEvent.idEvent);
            if (index === -1) {
              updated.push(newEvent); // Adiciona o evento se não for duplicado
            } else {
              // Substitui o evento antigo pelo novo (livescore)
              updated[index] = newEvent;
            }
          });
          return updated;
        });
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
    const togFavorite = async () => {
      try {
        const response = await axios.post(`${config.serverAddress}/favorites`, {
          id: leagueId,
          badge: imageSrc,
          name: leagueName,
        });
      }
      catch (error) {
        console.error("Erro ao adicionar favorito:", error);
      }
    }
    togFavorite();

    setFavorite(!favorite);
  };

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const response = await axios.get(`${config.serverAddress}/favorites`, {
          withCredentials: true, // Inclui cookies na requisição para autenticação
        });
  
        if (response.status === 401) {
          setFavorite(false);
        } else if(response.status === 404) {
          setFavorite(false);
        } else {
          const { leagueIds } = response.data;
          setFavorite(leagueIds.includes(leagueId));
        }
      } catch (error) {
        console.error("Erro ao buscar favoritos:", error);
        setFavorite(false);
      }
    };
  
    fetchFavorites();
  }, [leagueId]);


  const filteredEvents = events
    .filter((event) => {
      if (filter === "finished") return event.strStatus === "Match Finished";
      if (filter === "scheduled") return event.intHomeScore === null && event.intAwayScore === null;
      if (filter === "live") return event.strProgress !== undefined;
      return true; // "all"
    })
    .sort((a, b) => {
      const isLiveA = a.strProgress !== undefined;
      const isLiveB = b.strProgress !== undefined;

      if (isLiveA && !isLiveB) return -1; // A é live, B não é
      if (!isLiveA && isLiveB) return 1;  // B é live, A não é

      // Combine `dateEvent` e `strTime` para criar objetos Date
      const dateTimeA = new Date(`${a.dateEvent}T${a.strTime}`);
      const dateTimeB = new Date(`${b.dateEvent}T${b.strTime}`);

      // Ordenar em ordem crescente (mais antigos primeiro)
      return dateTimeA.getTime() - dateTimeB.getTime();
    })

    const redirectToLeaguePage = () => {
      setState({view: "LeaguePage"});
      setLeague({
        leagueId,
        leagueName,
        imageSrc
      })
    }
  return filteredEvents.length === 0 ? null : (
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
          <span onClick={redirectToLeaguePage}>{leagueName}</span>
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
            {filteredEvents.map((event, index) => (
              <NextEventButton
                key={index}
                setState={setState}
                event={event}
                index={index}
                leagueId={leagueId}
                leagueName={leagueName}
                imageSrc={imageSrc}
              />
            ))}
          </ul>
        </div>
      )}
    </Container>
  );
}

export default LeagueEvents;
