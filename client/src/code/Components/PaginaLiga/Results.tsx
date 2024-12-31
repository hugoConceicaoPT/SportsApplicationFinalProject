import React, { useState, useEffect } from "react";
import { Worker, INextPastLeagueEvents } from "../../league";
import { AppProps } from "../../main";
import Nav from "react-bootstrap/Nav";
import Container from "react-bootstrap/Container";
import Image from "react-bootstrap/Image";
import ResultEventButton from "./ResultEventButton";

// Interface para as propriedades do componente LeagueResults
interface LeagueButtonResultsProps extends AppProps {
  leagueId: string; // ID da liga
  leagueName: string;// Nome da liga
  imageSrc: string;// URL da imagem associada à liga
  round?: string; // jornada
}

// Componente funcional para exibir os resultados de uma liga
const LeagueResults: React.FC<LeagueButtonResultsProps> = ({ setState, leagueId, leagueName, imageSrc, round }) => {
  // Estado para armazenar os resultados da liga
  const [results, setResults] = useState<INextPastLeagueEvents[]>([]);
  const worker = new Worker(); // Instância do Worker para buscar dados relacionados à liga

   // Efeito para buscar os resultados iniciais ao montar o componente ou quando leagueId ou round mudar
  useEffect(() => {
    const fetchInitialResults = async () => {
      try {
        // Busca os resultados da liga pela jornada (se especificada)
        const data = await worker.getPastLeagueResultsByRound(leagueId, round);
        setResults(data); // Atualiza o estado com os resultados recebidos
      } catch (error) {
        console.error("Error fetching league results:", error);
      }
    };

    fetchInitialResults();// Chama a função para buscar os resultados
  }, [leagueId, round]); // Atualiza sempre que o leagueId ou round mudar

  // Função para agrupar resultados por jornada
  const groupByRound = (results: INextPastLeagueEvents[]) => {
    return results.reduce((groups, result) => {
      const round = result.intRound || "Unknown Round"; // Define "Unknown Round" como valor padrão caso a jornada não esteja disponível
      if (!groups[round]) {
        groups[round] = [];  // Inicializa o grupo da jornada, se necessário
      }
      groups[round].push(result);// Adiciona o resultado ao grupo correspondente
      return groups;
    }, {} as Record<string, INextPastLeagueEvents[]>);
  };

   // Agrupa os resultados por jornada
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
