import React, { useState, useEffect } from "react";
import { Worker, INextLeagueEvents } from "../../league";
import { Container } from "react-bootstrap";
import Image from "react-bootstrap/Image";

interface LeagueListProps {
  leagueId: string;
  leagueName: string;
  imageSrc: string;
}

const LeagueList: React.FC<LeagueListProps> = ({ leagueId, leagueName, imageSrc }) => {
  const [events, setEvents] = useState<INextLeagueEvents[]>([]);

  useEffect(() => {
    const worker = new Worker();
    const fetchEvents = async () => {
      try {
        const rawData = await worker.getNextLeagueList(leagueId);

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
          intRound: item.intRound || "Unknown Round", // Garantir que intRound seja atribuído
        }));

        setEvents(formattedData);
      } catch (error) {
        console.error("Erro ao buscar os próximos eventos da liga:", error);
      }
    };

    fetchEvents();
  }, [leagueId]);

  // Função para agrupar os eventos por jornada
  const groupByRound = (events: INextLeagueEvents[]) => {
    return events.reduce((groups, event) => {
      const round = event.intRound || "Unknown Round"; // Usando intRound para jornada
      if (!groups[round]) {
        groups[round] = [];
      }
      groups[round].push(event);
      return groups;
    }, {} as Record<string, INextLeagueEvents[]>);
  };

  const groupedEvents = groupByRound(events);

  return (
    <Container>
      <div className="d-flex align-items-center">
        <Image
          className="me-2"
          src={imageSrc}
          alt="icon"
          style={{ marginRight: "5px", width: "16px", height: "16px" }}
        />
        <h5 style={{ margin: "0" }}>{leagueName}</h5>
      </div>

      {Object.keys(groupedEvents).length > 0 ? (
        Object.keys(groupedEvents).map((round) => (
          <div key={round}>
            <h5>Jornada {round}</h5> {/* Exibe a jornada */}
            <ul className="list-group">
              {groupedEvents[round].map((event, index) => (
                <li key={index} className="list-group-item d-flex align-items-center justify-content-between">
                  <div className="d-flex align-items-center">
                    <Image
                      src={event.strHomeTeamBadge}
                      alt={event.strHomeTeam}
                      style={{ width: "24px", height: "24px", marginRight: "10px" }}
                    />
                    <span>{event.strHomeTeam}</span>
                  </div>
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
          </div>
        ))
      ) : (
        <div className="text-center">Sem eventos disponíveis</div>
      )}
    </Container>
  );
};

export default LeagueList;
