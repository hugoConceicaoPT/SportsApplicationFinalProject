import React, { useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Image from "react-bootstrap/Image";
import { config } from "../../config";
import { ListGroup } from "react-bootstrap";
import { useTeamContext } from "../Context/TeamContext";

interface ITeamResult {
  idEvent?: string;
  intRound?: number | string;
  intHomeScore: number;
  intAwayScore: number;
  dateEvent?: string;

  idHomeTeam?: string;
  idAwayTeam?: string;

  strHomeTeam?: string;
  strAwayTeam?: string;
  strHomeTeamBadge?: string;
  strAwayTeamBadge?: string;
  strTime?: string;
}

const TeamResults: React.FC<{ teamId: string ;setState: (state: any) => void;}> = ({ teamId,setState }) => {
  const [results, setResults] = useState<ITeamResult[]>([]);
  const [loading, setLoading] = useState(true);
  const { setTeam } = useTeamContext();
  
  useEffect(() => {
    const fetchResults = async () => {
      setLoading(true);
      try {
        const res = await fetch(`${config.serverAddress}/equipa/${teamId}/resultados`);
        const data = await res.json();
        setResults(data || []);
      } catch (error) {
        console.error("Failed to fetch team results", error);
      }
      setLoading(false);
    };

    fetchResults();
  }, [teamId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!results.length) {
    return <p>Nenhum resultado encontrado</p>;
  }

  // Agrupa resultados por jornada
  const groupByRound = (items: ITeamResult[]) => {
    return items.reduce((acc, item) => {
      const round = item.intRound || "Unknown Round";
      if (!acc[round]) {
        acc[round] = [];
      }
      acc[round].push(item);
      return acc;
    }, {} as Record<string, ITeamResult[]>);
  };

  const groupedResults = groupByRound(results);
  const rounds = Object.keys(groupedResults).sort(
    (a, b) => Number(a) - Number(b)
  );

  const redirectToTeamHomePage = (
    teamId: string,
    teamName: string,
    teamBadge: string
  ) => {
    setState({ view: "teampage" }); 
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
    setState({ view: "teampage" }); 
    setTeam({
      teamId,
      teamName,
      imageSrc: teamBadge,
    });
  };



  return (
    <Container className="leagueResults-0">
      {/* Lista de resultados organizados por jornada */}
      <div className="game-results-1">
        {rounds.length > 0 ? (
          rounds.map((round) => (
            <div key={round}>
              <h5>Jornada {round}</h5>
              <ListGroup className="game-results-text">
                {groupedResults[round].map((result, index) => (
                  <ListGroup.Item
                    key={index}
                    className="d-flex align-items-center justify-content-between"
                    style={{
                      marginBottom: "6px",
                      padding: "10px",
                      borderBottom: "1px solid #444",
                      backgroundColor:"#0b2129",
                      borderColor: "fff"
                    }}
                  >
                    {/* Equipa da Casa */}
                      <Image
                        src={result.strHomeTeamBadge}
                        alt={result.strHomeTeam}
                        style={{ cursor: "pointer",width: "24px", height: "24px", marginRight: "8px" }}
                        onClick={()=>redirectToTeamHomePage(result.idHomeTeam!,
                          result.strHomeTeam!,
                          result.strHomeTeamBadge!)}
                      />
                      <span>{result.strHomeTeam}</span>
                    {/* Placar */}
                    <span style={{ margin: "0 10px",color: "#fff"}}>
                      {result.intHomeScore} - {result.intAwayScore}
                    </span>
                    
                      <Image
                        src={result.strAwayTeamBadge}
                        alt={result.strAwayTeam}
                        
                        style={{cursor: "pointer", width: "24px", height: "24px", marginRight: "8px" }}
                        onClick={()=>redirectToTeamAwayPage(result.idAwayTeam!,
                          result.strAwayTeam!,
                          result.strAwayTeamBadge!)}
                      />
                      <span>{result.strAwayTeam}</span>
                  
                    <span style={{ marginLeft: "10px",color: "#fff" }}>
                      {result.dateEvent}
                      {result.strTime ? ` ${result.strTime}` : ""}
                    </span>
                  </ListGroup.Item>
                ))}
              </ListGroup>
            </div>
          ))
        ) : (
          <div>Nenhum resultado disponível.</div>
        )}
      </div>
    </Container>
  );
  
};

export default TeamResults;
