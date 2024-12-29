import React, { useState, useEffect } from "react";
import { config } from "../../config";
import { Container } from "react-bootstrap";

interface ITeamNextGame {
  idEvent?: string;
  dateEvent?: string;
  strTime?: string;
  strHomeTeam?: string;
  strAwayTeam?: string;
  strHomeTeamBadge?: string;
  strAwayTeamBadge?: string;
  idHomeTeam?: string;
  idAwayTeam?: string;
  intRound?: string | number;
}

const TeamList: React.FC<{ teamId: string }> = ({ teamId }) => {
  const [events, setEvents] = useState<ITeamNextGame[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchList = async () => {
      setLoading(true);
      try {
        const res = await fetch(
          `${config.serverAddress}/equipa/${teamId}/lista`
        );
        const data = await res.json();
        setEvents(data || []);
      } catch (error) {
        console.error("Failed to fetch team list", error);
      }
      setLoading(false);
    };

    fetchList();
  }, [teamId]);

  // Agrupar por jornada
  const groupByRound = (games: ITeamNextGame[]) => {
    return games.reduce(
      (acc, game) => {
        const round = game.intRound || "Unknown Round";
        if (!acc[round]) {
          acc[round] = [];
        }
        acc[round].push(game);
        return acc;
      },
      {} as Record<string, ITeamNextGame[]>
    );
  };
  

  const groupedEvents = groupByRound(events);

  if (loading) {
    return <div>Carregando...</div>;
  }

  return (
    <Container className="team-list-container">
      {/* Cabeçalho */}
      <div className="league-header text-center mb-4">
        <h4>Próximos Jogos</h4>
      </div>

      {/* Lista de jogos */}
      <div className="list-results">
        {Object.keys(groupedEvents).length > 0 ? (
          Object.keys(groupedEvents).map((round) => (
            <div key={round} className="round-container mb-3">
              <h5> Jornada {round}</h5>
              <ul className="list-results-2">
                {groupedEvents[round].map((game, index) => (
                  <li
                    key={index}
                    className="list-group-item d-flex align-items-center justify-content-between"
                    style={{
                      backgroundColor: "#0b2129",
                      padding: "10px",
                      marginBottom: "10px",
                      borderBottom: "#fff"
                    }}
                  >
                    <img
                      src={game.strHomeTeamBadge}
                      alt={game.strHomeTeam}
                      style={{
                        width: "24px",
                        height: "24px",
                        marginRight: "10px",
                        cursor: "pointer",
                      }}
                    />
                    <span>{game.strHomeTeam}</span>

                    <span>vs</span>

                    <span>{game.strAwayTeam}
                    <img
                      src={game.strAwayTeamBadge}
                      alt={game.strAwayTeam}
                      style={{
                        width: "24px",
                        height: "24px",
                        marginLeft: "10px",
                        cursor: "pointer",
                      }}
                     
                    />
                    </span>

                    {/* Data/Hora */}

                    <span>
                      {game.dateEvent} {game.strTime}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          ))
        ) : (
          <div className="text-center">Nenhum jogo disponível</div>
        )}
      </div>
    </Container>
  );
};

export default TeamList;
