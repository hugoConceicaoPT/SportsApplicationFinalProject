import React, { useState, useEffect } from "react";
import { Worker, INextLeagueEvents } from "../../league";
import Button from "react-bootstrap/Button";
import { ArrowUp, ArrowDown, Star, StarFill } from "react-bootstrap-icons";
import { Container } from "react-bootstrap";
import Image from "react-bootstrap/Image";

interface LeagueListProps {
  leagueId: string;
  leagueName: string;
  imageSrc: string;
}

const LeagueList: React.FC<LeagueListProps> = ({ leagueId, leagueName, imageSrc }) => {
  const [events, setEvents] = useState<INextLeagueEvents[]>([]);
  const [isOpen, setIsOpen] = useState(true);
  const [favorite, setFavorite] = useState(false);

  useEffect(() => {
    const worker = new Worker();
    const fetchEvents = async () => {
      try {
        const rawData = await worker.getListNextLeagueEvents(leagueId, new Date());

        // Log para depuração
        console.log("Dados brutos da API:", rawData);

        // Mapeando os dados da API para o formato correto
        const formattedData: INextLeagueEvents[] = rawData.map((item: INextLeagueEvents) => ({
          _id: item._id || 0,
          strHomeTeam: item.strHomeTeam || "Time não identificado",
          strAwayTeam: item.strAwayTeam || "Time não identificado",
          dateEvent: item.dateEvent || "",
          strTime: item.strTime || "",
          strHomeTeamBadge: item.strHomeTeamBadge || "",
          strAwayTeamBadge: item.strAwayTeamBadge || "",
          intHomeScore: item.intHomeScore || "-",
          intAwayScore: item.intAwayScore || "-",
        }));

        setEvents(formattedData);
      } catch (error) {
        console.error("Erro ao buscar os próximos eventos da liga:", error);
      }
    };

    fetchEvents();
  }, [leagueId]);

  const toggleVisibility = () => {
    setIsOpen(!isOpen);
  };

  const toggleFavorite = () => {
    setFavorite(!favorite);
  };

  return (
    <Container className="league-list rounded">
      <div className="d-flex justify-content-between align-items-center">
        <div className="d-flex align-items-center">
          <Button
            style={{
              color: favorite ? "#FFCD00" : "white",
              backgroundColor: "#01203E",
              borderColor: "#01203E",
            }}
            className="ps-0 ms-0 mb-3 mt-2"
            onClick={toggleFavorite}
          >
            {favorite ? <StarFill /> : <Star />}
          </Button>
          <Image
            className="me-2"
            src={imageSrc}
            alt="icon"
            style={{ marginRight: "5px", width: "16px", height: "16px" }}
          />
          <h5 style={{ margin: "0" }}>{leagueName}</h5>
        </div>
        <Button variant="secondary" size="sm" onClick={toggleVisibility}>
          {isOpen ? <ArrowUp /> : <ArrowDown />}
        </Button>
      </div>

      {isOpen && (
        <div className="mt-3">
          {events.length > 0 ? (
            <ul className="list-group">
              {events.map((event, index) => (
                <li key={index} className="list-group-item d-flex align-items-center justify-content-between">
                  <div className="d-flex align-items-center">
                    <Image
                      src={event.strHomeTeamBadge}
                      alt={event.strHomeTeam}
                      style={{ width: "24px", height: "24px", marginRight: "10px" }}
                    />
                    <span>{event.strHomeTeam}</span>
                  </div>
                  <span>vs</span>
                  <div className="d-flex align-items-center">
                    <span>{event.strAwayTeam}</span>
                    <Image
                      src={event.strAwayTeamBadge}
                      alt={event.strAwayTeam}
                      style={{ width: "24px", height: "24px", marginLeft: "10px" }}
                    />
                  </div>
                  <div>
                    <span>{event.dateEvent} {event.strTime}</span>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <div className="text-center">Sem eventos disponíveis</div>
          )}
        </div>
      )}
    </Container>
  );
};

export default LeagueList;
