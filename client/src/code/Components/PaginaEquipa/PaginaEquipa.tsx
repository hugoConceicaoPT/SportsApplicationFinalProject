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
import { WorkerFavorites, IFavorites } from "../../favorites";


// Componente funcional que representa a página de uma equipa
const TeamPage: React.FC<AppProps> = ({ setState }) => {
  const { team } = useTeamContext(); // Contexto da equipa selecionada
  const [view, setView] = useState<"standings" | "results" | "list">("standings"); // Estado para gerenciar a visão atual (classificações, resultados, lista)
  const [favorite, setFavorite] = useState(true);// Estado para gerenciar se a equipe está nos favoritos
  const workerFavorites = new WorkerFavorites();

  // Define a view padrão como "standings" ao montar o componente
  useEffect(() => {
    // Define a view padrão como 'standings' quando o componente é montado
    setView("standings");
  }, []);

  // Função para alternar o estado de favorito
  const toggleFavorite = () => {
        if (team) {
          workerFavorites.toggleFavorite(team.teamId, team.teamName, team.imageSrc);
          setFavorite(!favorite);
        }
      };
    
      // Verifica se a equipe está nos favoritos ao carregar a página
    if(team) {
      useEffect(() => {
        const fetchFavorites = async () => {
          try {
            const response = await workerFavorites.getFavorites();
            setFavorite(response.teamIds.includes(team?.teamId));
          } catch (error) {
            console.error("Erro ao buscar favoritos:", error);
            setFavorite(false);
          }
        };
        fetchFavorites();
      }, [team?.teamId]);
    }
// Caso nenhuma equipa esteja selecionada, exibe uma mensagem de erro
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
