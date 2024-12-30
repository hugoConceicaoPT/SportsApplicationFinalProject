import React, { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import TeamResults from "./TeamResults"; // Componente para resultados
import TeamList from "./TeamList"; // Componente para lista de jogos futuros
import { AppProps } from "../../main"; // Tipos de propriedades principais
import { useTeamContext } from "../Context/TeamContext"; // Contexto para a equipe
import Header from "../PaginaPrincipal/Header"; // Header compartilhado
import Standings from "../PaginaLiga/Standings";
import { Star, StarFill } from "react-bootstrap-icons";
import axios from "axios";
import { config } from "../../config";
import FilterClassificationButton from "./FilterClassificationButton";
import FilterResultsButton from "./FilterResultsButton";
import FilterListButton from "./FilterListButton";

const TeamPage: React.FC<AppProps> = ({ setState }) => {
  const { team } = useTeamContext(); // Contexto da equipe selecionada
  const [view, setView] = useState<"standings" | "results" | "list">("standings");
  const [favorite, setFavorite] = useState(true);

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
            <img className="equipa-logo"
              src={team.imageSrc}
              alt={`${team.teamName} logo`}
            />
            <h1 className="team-logo-text">{team.teamName}</h1>
            <Button
              style={{
                color: favorite ? "#FFCD00" : "white",
                backgroundColor: "black",
                borderColor: "black",
              }}
              onClick={toggleFavorite}
            >
              {favorite ? <StarFill /> : <Star />}
            </Button>
          </div>
        </div>

        <div className="navigation d-flex justify-content-around my-3">
          {/* Botão Classificações */}
          <FilterClassificationButton view={view} setView={setView} />

          {/* Botão Resultados */}
          <FilterResultsButton view={view} setView={setView} />

          {/* Botão Lista */}
          <FilterListButton view={view} setView={setView} />
        </div>

        <div className="content mt-4">
          {/* Exibe classificações */}
          {view === "standings" && <Standings setState={setState} />}

          {/* Exibe resultados */}
          {view === "results" && <TeamResults teamId={team.teamId} setState={setState} />}


          {/* Exibe lista de próximos jogos */}
          {view === "list" && <TeamList teamId={team.teamId} setState={setState} />}
        </div>
      </div>
    </>
  );
};

export default TeamPage;
