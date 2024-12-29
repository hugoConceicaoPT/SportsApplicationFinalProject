import React, { useState, useEffect } from "react";
import { Worker, INextPastLeagueEvents } from "../../league";
import { AppProps } from "../../main";
import Nav from "react-bootstrap/Nav";
import Container from "react-bootstrap/Container";
import Image from "react-bootstrap/Image";
import ResultEventButton from "./ResultEventButton";

interface LeagueButtonResultsProps extends AppProps {
  leagueId: string;
  leagueName: string;
  imageSrc: string;
  round?: string; // Parâmetro opcional para jornada
}

const LeagueResults: React.FC<LeagueButtonResultsProps> = ({ setState, leagueId, leagueName, imageSrc, round }) => {
  const [results, setResults] = useState<INextPastLeagueEvents[]>([]);
  const worker = new Worker();

  useEffect(() => {
    const fetchInitialResults = async () => {
      try {
        const data = await worker.getPastLeagueResultsByRound(leagueId, round);
        setResults(data);
      } catch (error) {
        console.error("Error fetching league results:", error);
      }
    };

    fetchInitialResults();
  }, [leagueId, round]); // Dependency array includes leagueId and round

  // Função para agrupar resultados por jornada
  const groupByRound = (results: INextPastLeagueEvents[]) => {
    return results.reduce((groups, result) => {
      const round = result.intRound || "Unknown Round";
      if (!groups[round]) {
        groups[round] = [];
      }
      groups[round].push(result);
      return groups;
    }, {} as Record<string, INextPastLeagueEvents[]>);
  };

  const groupedResults = groupByRound(results);

  return (
    <Container className="leagueResults-0">
      {/* Lista de jogos organizados por jornadas */}
      <div className="game-results-1">
        {Object.keys(groupedResults).length > 0 ? (
          Object.keys(groupedResults).map(round => (
            <div key={round}>
              <h5>Jornada {round}</h5> {/* Exibe a jornada */}
              <ul className="game-results-text">
                {groupedResults[round].map((result, index) => (
                  <ResultEventButton key={index} setState={setState} result={result} index={index} />
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

export default LeagueResults;
