import React, { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import { Star, StarFill } from "react-bootstrap-icons"; // Ícones para o botão de favoritos
import TeamStandings from "./TeamStadings"; // Componente para classificações
import TeamResults from "./TeamResults"; // Componente para resultados
import TeamList from "./TeamList"; // Componente para lista de jogos futuros
import { AppProps } from "../../main"; // Tipos de propriedades principais
import { useTeamContext } from "../Context/TeamContext"; // Contexto para a equipe
import Header from "../PaginaPrincipal/Header"; // Header compartilhado
import Standings from "../PaginaLiga/Standings";
import axios from "axios"; // Para integração com API
import { config } from "../../config"; // Configuração da API

const TeamPage: React.FC<AppProps> = ({ setState }) => {
  const { team } = useTeamContext(); // Contexto da equipe selecionada
  const [view, setView] = useState<"standings" | "results" | "list">("standings");
  const [favorite, setFavorite] = useState(false); // Estado para o botão de favoritos

  useEffect(() => {
    // Define a view padrão como 'standings' quando o componente é montado
    setView("standings");
  }, []);

  // Função para alternar o estado de favorito
  const toggleFavorite = () => {
    const togFavorite = async () => {
      try {
        await axios.post(`${config.serverAddress}/favorites`, {
          id: team?.teamId,
          badge: team?.imageSrc,
          name: team?.teamName,
        });
      } catch (error) {
        console.error("Erro ao adicionar favorito:", error);
      }
    };
    togFavorite();

    setFavorite(!favorite); // Alterna o estado local
  };

  // Verifica se o time está nos favoritos ao carregar a página
  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const response = await axios.get(`${config.serverAddress}/favorites`, {
          withCredentials: true, // Inclui cookies para autenticação
        });
        const { teamIds } = response.data;
        setFavorite(teamIds.includes(team?.teamId)); // Verifica se o time está nos favoritos
      } catch (error) {
        console.error("Erro ao buscar favoritos:", error);
        setFavorite(false);
      }
    };

    fetchFavorites();
  }, [team?.teamId]);

  if (!team) {
    return <div>Erro: Nenhuma equipe selecionada.</div>;
  }

  return (
    <>
      <Header setState={setState} />
      <div className="team-page">
        <div className="team-header d-flex align-items-center justify-content-between">
          <div className="cabecalho-league-page d-flex align-items-center">
            <img
              className="cabecalho-league-page-logo"
              src={team.imageSrc}
              alt={`${team.teamName} logo`}
            />
            <h1 className="team-logo-text ms-4">{team.teamName}</h1>
            {/* Botão de favoritos */}
            <Button
              style={{
                color: favorite ? "#FFCD00" : "white",
                backgroundColor: "black",
                borderColor: "black",
                marginLeft: "1rem", // Espaço entre o texto e o botão
              }}
              onClick={toggleFavorite}
            >
              {favorite ? <StarFill /> : <Star />}
            </Button>
          </div>
        </div>

        <div className="navigation d-flex justify-content-around my-3">
          {/* Botão Classificações */}
          <Button
            style={{
              backgroundColor: view === "standings" ? "red" : "gray",
              color: "white",
              borderColor: view === "standings" ? "red" : "gray",
            }}
            onClick={() => setView("standings")}
          >
            Classificações
          </Button>

          {/* Botão Resultados */}
          <Button
            style={{
              backgroundColor: view === "results" ? "red" : "gray",
              color: "white",
              borderColor: view === "results" ? "red" : "gray",
            }}
            onClick={() => setView("results")}
          >
            Resultados
          </Button>

          {/* Botão Lista */}
          <Button
            style={{
              backgroundColor: view === "list" ? "red" : "gray",
              color: "white",
              borderColor: view === "list" ? "red" : "gray",
            }}
            onClick={() => setView("list")}
          >
            Lista
          </Button>
        </div>

        <div className="content mt-4">
          {/* Exibe classificações */}
          {view === "standings" && <Standings setState={setState} />}
          
          {/* Exibe resultados */}
          {view === "results" && <TeamResults teamId={team.teamId} />}

          {/* Exibe lista de próximos jogos */}
          {view === "list" && <TeamList teamId={team.teamId} />}
        </div>
      </div>
    </>
  );
};

export default TeamPage;
