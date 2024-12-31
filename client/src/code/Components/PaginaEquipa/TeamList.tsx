import React, { useState, useEffect } from "react";
import { config } from "../../config";
import { Container, ListGroup, Image } from "react-bootstrap";
import { useTeamContext } from "../Context/TeamContext";
import { ITeamDetails, WorkerTeam } from "../../team";
import { INextPastLeagueEvents } from "../../league";
import { AppProps } from "../../main";
import { useLeagueContext } from "../Context/LeagueContext";

// Interface que define as propriedades aceitas pelo componente
interface ITeamList extends AppProps {
  teamId: string// ID único da equipe
}

// Componente funcional que exibe a lista de jogos futuros de uma equipa
const TeamList: React.FC<ITeamList> = ({ teamId, setState }) => {
  const [events, setEvents] = useState<INextPastLeagueEvents[]>([]);// Estado para armazenar os eventos futuros da equipa
  const [loading, setLoading] = useState(true); // Estado para indicar se os dados ainda estão sendo carregados
  const { setLeague } = useLeagueContext();// Hook para atualizar o contexto da liga
  const { setTeam } = useTeamContext();// Hook para atualizar o contexto da equipa
  const worker = new WorkerTeam(); // Instância da classe WorkerTeam para lidar com dados relacionados à equipe

    // Fetch inicial para obter a lista de próximos jogos da equipe
  useEffect(() => {
    const fetchList = async () => {
      setLoading(true);
      try {
        const res = await worker.getNextTeamList(teamId); // Chama a função para buscar jogos futuros da equipa
        setEvents(res);
      } catch (error) {
        console.error("Failed to fetch team list", error);
      }
      setLoading(false);
    };

    fetchList();
  }, [teamId]);

 // Função para agrupar os eventos por jornada
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
      {} as Record<string, INextPastLeagueEvents[]>// Retorna um objeto agrupado por jornadas
    );
  };

  const groupedEvents = groupByRound(events); // Agrupa os eventos para exibição



  // Função para buscar detalhes de uma equipe específica
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

  // Função para redirecionar para a página da equipe da casa
  const redirectToTeamHomePage = async (
    teamId: string,
    teamName: string,
    teamBadge: string
  ) => {
    setState({ view: "teampage" }); // Atualiza o estado global para a página da equipa
    setTeam({
      teamId,
      teamName,
      imageSrc: teamBadge,
    });
    const homeTeamDetails = await fetchTeamDetails(teamId);
    if (homeTeamDetails) {
      setLeague({ // Atualiza o contexto da equipa
        leagueId: homeTeamDetails?.idLeague ?? '',
        leagueName: '',
        imageSrc: ''
      })
    }
  };

  // Função para redirecionar para a página da equipa visitante
  const redirectToTeamAwayPage = async (
    teamId: string,
    teamName: string,
    teamBadge: string
  ) => {
    setState({ view: "teampage" }); // Atualiza o estado global da equipa
   // Atualiza o contexto da equipe
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
