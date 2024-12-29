import React, { useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Image from "react-bootstrap/Image";
import { config } from "../../config";

interface ITeamResult {
  idEvent?: string;
  intRound?: number | string;
  intHomeScore: number;
  intAwayScore: number;
  dateEvent?: string;

  // Se a API retornar esses campos:
  strHomeTeam?: string;
  strAwayTeam?: string;
  strHomeTeamBadge?: string;
  strAwayTeamBadge?: string;
  strTime?: string;
}

const TeamResults: React.FC<{ teamId: string }> = ({ teamId }) => {
  const [results, setResults] = useState<ITeamResult[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Se você tiver a imagem da equipa principal, pode recebê-la via prop
  // ou buscar da API. Exemplo (fixo) só para ilustrar:
  const teamBadgeUrl = "https://via.placeholder.com/16"; // Substitua pela URL real

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

  return (
    <Container className="leagueResults-0">
      {/* Lista de resultados organizados por jornada */}
      <div className="game-results-1">
        {rounds.length > 0 ? (
          rounds.map((round) => (
            <div key={round}>
              <h5>Jornada {round}</h5>
              <ul className="game-results-text">
                {groupedResults[round].map((result, index) => (
                  <li key={index} style={{ marginBottom: "6px" }}>
                    <div className="d-flex align-items-center justify-content-between">
                      {/* Equipa Casa */}
                      <div className="d-flex align-items-center">
                        <Image
                          src={result.strHomeTeamBadge}
                          alt={result.strHomeTeam}
                          style={{ width: "24px", height: "24px", marginRight: "8px" }}
                        />
                        <span>{result.strHomeTeam}</span>
                      </div>
                      
                      {/* Placar */}
                      <div style={{ margin: "0 10px" }}>
                        {result.intHomeScore} - {result.intAwayScore}
                      </div>
                      
                      {/* Equipa Visitante */}
                      <div className="d-flex align-items-center">
                        <span>{result.strAwayTeam}</span>
                        <Image
                          src={result.strAwayTeamBadge}
                          alt={result.strAwayTeam}
                          style={{ width: "24px", height: "24px", marginLeft: "8px" }}
                        />
                      </div>
                      
                      {/* Data/Hora se quiser mostrar */}
                      <div style={{ marginLeft: "10px" }}>
                        {result.dateEvent}
                        {result.strTime ? ` ${result.strTime}` : ""}
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
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
