import React, { useState, useEffect } from "react";
import { Worker, ITeamEvents } from "../../league";
import { AppProps } from "../../main";
import Button from 'react-bootstrap/Button';
import { ArrowUp, ArrowDown, Star, StarFill } from "react-bootstrap-icons";
import Nav from 'react-bootstrap/Nav';
import { Container } from "react-bootstrap";
import Image from 'react-bootstrap/Image';
import NextEventButton from "../Eventos/NextEventButton";
import { config } from "../../config";
import axios from "axios";
import { useTeamContext } from "../Context/TeamContext";
import { leagueIds } from "../../../../../server/src/leagueIds";

interface TeamButtonEventsProps extends AppProps {
  teamId: string;
  teamName: string;
  imageSrc: string;
  selectedDate: Date;
  filter: string;
}

let socket: WebSocket | null = null;

const TeamEvents: React.FC<TeamButtonEventsProps> = ({ setState, teamId, teamName, imageSrc, selectedDate, filter }) => {
  const [events, setEvents] = useState<ITeamEvents[]>([]);
  const [isOpen, setIsOpen] = useState(true);
  const [favorite, setFavorite] = useState(true);
  const worker = new Worker();
  const { setTeam } = useTeamContext();

  useEffect(() => {
    const fetchInitialEvents = async () => {
      try {
        // Buscar eventos futuros
        const futureEvents = await worker.getListNextTeamEvents(teamId, selectedDate);

        // Atualizar o estado com todos os eventos
        setEvents(futureEvents);
      } catch (error) {
        console.error("Error fetching team events:", error);
      }
    };

    fetchInitialEvents();
  }, [teamId, selectedDate]); // Dependency array includes teamId

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
      if (data[teamId]) {
        const updatedEvents = data[teamId];
        setEvents((prevEvents) => {
          const updated = [...prevEvents];
          updatedEvents.forEach((newEvent: ITeamEvents) => {
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
  }, [teamId]);

  // Toggle visibility of games
  const toggleVisibility = () => {
    setIsOpen(!isOpen);
  };

  const toggleFavorite = () => {
    const togFavorite = async () => {
      try {
        const response = await axios.post(`${config.serverAddress}/favorites`, {
          id: teamId,
          badge: imageSrc,
          name: teamName,
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
          const { teamIds } = response.data;
          setFavorite(teamIds.includes(teamId));
        }
      } catch (error) {
        console.error("Erro ao buscar favoritos:", error);
        setFavorite(false);
      }
    };
  
    fetchFavorites();
  }, [teamId]);

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
    });


  const leagueId = filteredEvents[0].idLeague;

  const allLeagues = [
    {
      id: leagueIds.premierLeague,
      imageSrc: "icons/Inglaterra.png",
      label: "Premier League",
    },
    {
      id: leagueIds.primeiraLiga,
      imageSrc: "icons/Portugal.png",
      label: "Liga Portugal",
    },
    {
      id: leagueIds.bundesliga,
      imageSrc: "icons/Alemanha.png",
      label: "Bundesliga",
    },
    {
      id: leagueIds.laLiga,
      imageSrc: "icons/Espanha.png",
      label: "La Liga",
    },
    {
      id: leagueIds.ligue1,
      imageSrc: "icons/França.png",
      label: "Ligue 1",
    },
    {
      id: leagueIds.serieA,
      imageSrc: "icons/Italia.png",
      label: "Serie A",
    },
  ];

  const league = allLeagues.find((league) => league.id === leagueId);


  return filteredEvents.length === 0 ? null : (
    <Container className="teamEvents rounded p-0 mb-1">
      {/* Button to expand/collapse */}
      <div className="d-flex">
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
                leagueId={league?.id || ""}
                leagueName={league?.label || ""}
                imageSrc={league?.imageSrc || ""}
              />
            ))}
          </ul>
        </div>
      )}
    </Container>
  );
};

export default TeamEvents;