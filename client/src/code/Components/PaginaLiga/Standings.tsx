import React, { useState, useEffect } from "react";
import { Worker, ILeagueStandings } from "../../league";
import { Container } from "react-bootstrap";
import StandingsItem from "./StandingsItem";
import { AppProps } from "../../main";
import { useLeagueContext } from "../Context/LeagueContext";

const LeagueStandings: React.FC<AppProps> = ({ setState }) => {
  const [standings, setStandings] = useState<ILeagueStandings[]>([]); // Estado para armazenar as classificações
  const [favorite, setFavorite] = useState(false); // Estado para marcar como favorito
  const { league } = useLeagueContext(); // Obtém os dados da liga do contexto
  const leagueId = league?.leagueId;
  
  useEffect(() => {
    const worker = new Worker();
    const fetchStandings = async () => {
      try {
        if (leagueId) {
          // Busca as classificações da liga
          const rawData = await worker.getLeagueStanding(leagueId);
          setStandings(rawData);
        }
      } catch (error) {
        console.error("Erro ao buscar classificações:", error);
      }
    };

    fetchStandings();
  }, [leagueId]); // Atualiza sempre que o ID da liga mudar

  // Alterna o estado de favorito
  const toggleFavorite = () => {
    setFavorite(!favorite);
  };

  return (
    <Container className="leagueStandings rounded">
      <div className="mt-3">
        {/* Cabeçalho fixo das colunas */}
        <div className="d-flex list-group-item" style={{ fontWeight: "bold" }}>
          <div style={{ flex: 2 }}>Equipa</div>
          <div style={{ flex: 1, textAlign: "left" }}>Jogos</div>
          <div style={{ flex: 1, textAlign: "left" }}>Vitórias</div>
          <div style={{ flex: 1, textAlign: "left" }}>Empates</div>
          <div style={{ flex: 1, textAlign: "left" }}>Derrotas</div>
          <div style={{ flex: 1, textAlign: "left" }}>Pontos</div>
        </div>
        {/* Linhas de classificação */}
        <ul className="list-group">
          {standings.map((team, index) => (
            <StandingsItem key={index} team={team} index={index} setState={setState} />
          ))}
        </ul>
      </div>
    </Container>
  );
};

export default LeagueStandings;
