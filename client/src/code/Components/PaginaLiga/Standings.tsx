import React, { useState, useEffect } from "react";
import { Worker, ILeagueStandings } from "../../league";
import { Container } from "react-bootstrap";
import StandingsItem from "./StandingsItem";
import { AppProps } from "../../main";
import { useLeagueContext } from "../Context/LeagueContext";

// Componente funcional para exibir as classificações de uma liga
const LeagueStandings: React.FC<AppProps> = ({ setState }) => {
  const [standings, setStandings] = useState<ILeagueStandings[]>([]); // Estado para armazenar as classificações
  const [favorite, setFavorite] = useState(false); // Estado para marcar como favorito
  const { league } = useLeagueContext(); // Obtém os dados da liga do contexto
  const leagueId = league?.leagueId;// ID da liga, usado para buscar as classificações
  
  // Efeito para buscar as classificações ao carregar o componente ou quando o ID da liga mudar
  useEffect(() => {
    const worker = new Worker(); // Instância do Worker para interagir com a API
    const fetchStandings = async () => {
      try {
        if (leagueId) {
          // Busca as classificações da liga
          const rawData = await worker.getLeagueStanding(leagueId);
          setStandings(rawData);  // Atualiza o estado com as classificações obtidas
        }
      } catch (error) {
        console.error("Erro ao buscar classificações:", error);
      }
    };

    fetchStandings(); // Executa a função de busca
  }, [leagueId]); // Atualiza sempre que o ID da liga mudar

  // Alterna o estado de favorito
  const toggleFavorite = () => {
    setFavorite(!favorite); // Inverte o estado atual de favorito
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
