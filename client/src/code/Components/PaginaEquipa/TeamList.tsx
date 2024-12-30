import React, { useState, useEffect } from "react";
import { config } from "../../config";
import { Container, ListGroup, Image } from "react-bootstrap";
import { useTeamContext } from "../Context/TeamContext";
import { ITeamDetails, WorkerTeam } from "../../team";
import { INextPastLeagueEvents } from "../../league";
import { AppProps } from "../../main";
import { useLeagueContext } from "../Context/LeagueContext";

interface ITeamList extends AppProps {
  teamId: string
}
const TeamList: React.FC<ITeamList> = ({ teamId, setState }) => {
  const [events, setEvents] = useState<INextPastLeagueEvents[]>([]);
  const [loading, setLoading] = useState(true);
  const { setLeague } = useLeagueContext();
  const { setTeam } = useTeamContext();
  const worker = new WorkerTeam();

  useEffect(() => {
    const fetchList = async () => {
      setLoading(true);
      try {
        const res = await worker.getNextTeamList(teamId);
        setEvents(res);
      } catch (error) {
        console.error("Failed to fetch team list", error);
      }
      setLoading(false);
    };

    fetchList();
  }, [teamId]);

  // Agrupar por jornada
  const groupByRound = (games: INextPastLeagueEvents[]) => {
    return games.reduce(
      (acc, game) => {
        const round = game.intRound || "Unknown Round";
        if (!acc[round]) {
          acc[round] = [];
        }
        acc[round].push(game);
        return acc;
      },
      {} as Record<string, INextPastLeagueEvents[]>
    );
  };

  const groupedEvents = groupByRound(events);

  const fetchTeamDetails = async (teamId: string): Promise<ITeamDetails | null> => {
    try {
      const worker = new WorkerTeam(); // Instancie o worker aqui, se necessário
      const teamResponse: ITeamDetails[] = await worker.getTeamDetails(teamId);
      return teamResponse[0] || null;
    } catch (error) {
      console.error("Failed to fetch team details", error);
      return null;
    }
  };

  // Funções de redirecionamento
  const redirectToTeamHomePage = async (
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
    const homeTeamDetails = await fetchTeamDetails(teamId);
    if (homeTeamDetails) {
      setLeague({
        leagueId: homeTeamDetails?.idLeague ?? '',
        leagueName: '',
        imageSrc: ''
      })
    }
  };

  const redirectToTeamAwayPage = async (
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
    const awayTeamDetails = await fetchTeamDetails(teamId);
    if (awayTeamDetails) {
      setLeague({
        leagueId: awayTeamDetails.idLeague ?? '',
        leagueName: '',
        imageSrc: ''
      });
    } else {
      console.warn(`No details found for team ID: ${teamId}`);
    }
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
