import React, { useState, useEffect } from "react";
import { Worker, INextLeagueEvents } from "../../league";
import { Container } from "react-bootstrap";
import Image from "react-bootstrap/Image";
import { AppProps } from "../../main";
import { useTeamContext } from "../Context/TeamContext";
import ListButton from "./ListButton";

interface LeagueListProps extends AppProps {
  leagueId: string;
  leagueName: string;
  imageSrc: string;
}

const LeagueList: React.FC<LeagueListProps> = ({ setState, leagueId, leagueName, imageSrc }) => {
  const [events, setEvents] = useState<INextLeagueEvents[]>([]);
  const { setTeam } = useTeamContext();

  useEffect(() => {
    const worker = new Worker();
    const fetchEvents = async () => {
      try {
        const rawData = await worker.getNextLeagueList(leagueId);

        // Log para depuração
        console.log("Dados brutos da API:", rawData);

        // Mapeando os dados da API para o formato correto

        setEvents(rawData);
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
    <Container className="league-list">
      <div className="league-list-2 justify-content-between align-items-center">
        <div className="d-flex align-items-center">
          <Image
            className="me-2"
            src={imageSrc}
            alt="icon"
            style={{ marginRight: "5px", width: "16px", height: "16px" }}
          />
          <h5 style={{ margin: "0" }}>{leagueName}</h5>
        </div>
      </div>

      <div className="list-results">
        {Object.keys(groupedEvents).length > 0 ? (
          Object.keys(groupedEvents).map((round) => (
            <div key={round}>
              <h5>Jornada {round}</h5> {/* Exibe a jornada */}
              <ul className="list-results-2">
                {groupedEvents[round].map((event, index) => (
                  <ListButton setState={setState} event={event} index={index} />
                ))}
              </ul>
            </div>
          ))
        ) : (
          <div className="text-center">Sem eventos disponíveis</div>
        )}
      </div>
    </Container>
  );
};

export default LeagueList;
