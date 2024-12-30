import React, { useState, useEffect } from "react";
import { config } from "../../config";
import { Container, ListGroup, Image } from "react-bootstrap";
import { useTeamContext } from "../Context/TeamContext";

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

const TeamList: React.FC<{
  teamId: string;
  setState: (state: any) => void;
}> = ({ teamId, setState }) => {
  const [events, setEvents] = useState<ITeamNextGame[]>([]);
  const [loading, setLoading] = useState(true);
  const { setTeam } = useTeamContext();

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

  // Funções de redirecionamento
  const redirectToTeamHomePage = (
    teamId: string,
    teamName: string,
    teamBadge: string
  ) => {
    setState({ view: "teampage" }); // Atualiza o estado global
    setTeam({
      teamId,
      teamName,
      imageSrc: teamBadge,
    });
  };

  const redirectToTeamAwayPage = (
    teamId: string,
    teamName: string,
    teamBadge: string
  ) => {
    setState({ view: "teampage" }); // Atualiza o estado global
    setTeam({
      teamId,
      teamName,
      imageSrc: teamBadge,
    });
  };

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
              <ListGroup className="list-results-2">
                {groupedEvents[round].map((game, index) => (
                  <ListGroup.Item
                    key={index}
                    className="d-flex align-items-center justify-content-between"
                    style={{
                      backgroundColor: "#0b2129",
                      padding: "10px",
                      marginBottom: "10px",
                      borderBottom: "#fff",
                    }}
                  >
                    <Image
                      src={game.strHomeTeamBadge}
                      alt={game.strHomeTeam}
                      style={{
                        width: "24px",
                        height: "24px",
                        marginRight: "10px",
                        cursor: "pointer",
                      }}
                      onClick={() =>
                        redirectToTeamHomePage(
                          game.idHomeTeam!,
                          game.strHomeTeam!,
                          game.strHomeTeamBadge!
                        )
                      }
                    />
                    <span>{game.strHomeTeam}</span>

                    <span className="list-vs">vs</span>

                    <Image
                      src={game.strAwayTeamBadge}
                      alt={game.strAwayTeam}
                      style={{
                        width: "24px",
                        height: "24px",
                        marginRight: "10px",
                        cursor: "pointer",
                      }}
                      onClick={() =>
                        redirectToTeamAwayPage(
                          game.idAwayTeam!,
                          game.strAwayTeam!,
                          game.strAwayTeamBadge!
                        )
                      }
                    />
                    <span>{game.strAwayTeam}</span>

                    <span>
                      {game.dateEvent} {game.strTime}
                    </span>
                  </ListGroup.Item>
                ))}
              </ListGroup>
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
