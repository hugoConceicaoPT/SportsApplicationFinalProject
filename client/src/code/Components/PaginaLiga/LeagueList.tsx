import React, { useState, useEffect } from "react";
import { INextPastLeagueEvents, Worker } from "../../league";
import { Container } from "react-bootstrap";
import Image from "react-bootstrap/Image";
import { AppProps } from "../../main";
import ListButton from "./ListButton";
import { WorkerTeam } from "../../team";

interface LeagueListProps extends AppProps {
  leagueId: string;
  leagueName: string;
  imageSrc: string;
}

const LeagueList: React.FC<LeagueListProps> = ({ setState, leagueId, leagueName, imageSrc }) => {
  const [events, setEvents] = useState<INextPastLeagueEvents[]>([]);
  const worker = new Worker();

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const rawData = await worker.getListNextLeagueEvents(leagueId);

        // Mapeando os dados da API para o formato correto
        setEvents(rawData);
      } catch (error) {
        console.error("Erro ao buscar os próximos eventos da liga:", error);
      }
    };

    fetchEvents();
  }, [leagueId]);

  // Função para agrupar os eventos por jornada
  const groupByRound = (events: INextPastLeagueEvents[]) => {
    return events.reduce((groups, event) => {
      const round = event.intRound || "Unknown Round"; // Usando intRound para jornada
      if (!groups[round]) {
        groups[round] = [];
      }
      groups[round].push(event);
      return groups;
    }, {} as Record<string, INextPastLeagueEvents[]>);
  };

  const groupedEvents = groupByRound(events);

  return (
    <Container className="league-list">
      <div className="list-results">
        {Object.keys(groupedEvents).length > 0 ? (
          Object.keys(groupedEvents).map((round) => (
            <div key={round}>
              <h5>Jornada {round}</h5> {/* Exibe a jornada */}
              <ul className="list-results-2">
                {groupedEvents[round].map((event, index) => (
                  <ListButton
                    key={event.idEvent || index} // Use event.idEvent se disponível; caso contrário, use index
                    setState={setState}
                    event={event}
                    index={index}
                  />
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
