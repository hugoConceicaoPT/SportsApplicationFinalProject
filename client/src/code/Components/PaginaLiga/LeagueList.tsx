import React, { useState, useEffect } from "react";
import { INextPastLeagueEvents, Worker } from "../../league";
import { Container } from "react-bootstrap";
import Image from "react-bootstrap/Image";
import { AppProps } from "../../main";
import ListButton from "./ListButton";
import { WorkerTeam } from "../../team";


// Interface para definir as propriedades do componente LeagueList
interface LeagueListProps extends AppProps {
  leagueId: string; // ID da liga
  leagueName: string; // Nome da liga
  imageSrc: string; // URL da imagem da liga
}

// Componente funcional para exibir a lista de próximos eventos de uma liga
const LeagueList: React.FC<LeagueListProps> = ({ setState, leagueId, leagueName, imageSrc }) => {
   // Estado para armazenar os eventos da liga
  const [events, setEvents] = useState<INextPastLeagueEvents[]>([]);
 // Instância do worker para gerenciar eventos de liga
  const worker = new Worker();

  // Efeito para buscar os eventos da liga ao montar o componente
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        // Busca os próximos eventos da liga usando o worker
        const rawData = await worker.getListNextLeagueEvents(leagueId);

        // Mapeando os dados da API para o formato correto
        setEvents(rawData);
      } catch (error) {
        console.error("Erro ao buscar os próximos eventos da liga:", error);
      }
    };

    fetchEvents(); // Chama a função para buscar eventos
  }, [leagueId]); // Executa o efeito sempre que `leagueId` mudar

  // Função para agrupar os eventos por jornada
  const groupByRound = (events: INextPastLeagueEvents[]) => {
    return events.reduce((groups, event) => {
       // Define a jornada como "Unknown Round" se não estiver disponível
      const round = event.intRound || "Unknown Round"; // Usando intRound para jornada
      if (!groups[round]) {
        groups[round] = []; // Inicializa o grupo se ainda não existir
      }
      groups[round].push(event); // Adiciona o evento ao grupo correspondente
      return groups;
    }, {} as Record<string, INextPastLeagueEvents[]>);
  };
 // Agrupa os eventos por jornada
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
