import React, { useState, useEffect } from "react";
import { Button, Image } from "react-bootstrap";
import { Star, StarFill } from "react-bootstrap-icons"; // Importar os ícones
import LeagueStandings from "./Standings";
import LeagueList from "./LeagueList";
import { AppProps } from "../../main";
import { useLeagueContext } from "../Context/LeagueContext";
import Header from "../PaginaPrincipal/Header";
import axios from "axios";
import { config } from "../../config";
import LeagueResults from "./Results";
import FilterClassificationButton from "../PaginaEquipa/FilterClassificationButton";
import FilterResultsButton from "../PaginaEquipa/FilterResultsButton";
import FilterListButton from "../PaginaEquipa/FilterListButton";
import { WorkerFavorites, IFavorites } from "../../favorites";

// Componente funcional para exibir a página de uma liga
const LeaguePage: React.FC<AppProps> = ({ setState }) => {
  const { league } = useLeagueContext(); // Contexto para obter as informações da liga selecionada
  const [view, setView] = useState<"standings" | "results" | "list">("standings"); // Estado para a visão atual
  const [favorite, setFavorite] = useState(false); // Estado para o botão de favoritos
  const workerFavorites = new WorkerFavorites(); // Instância do worker de favoritos

  // Define a visão padrão como "standings" ao montar o componente
  useEffect(() => {
    setView("standings"); // Define a visão padrão como "standings"
  }, []);

  // Função para alternar o estado de favorito
  const toggleFavorite = () => {
      if (league) {
        workerFavorites.toggleFavorite(league.leagueId, league.leagueName, league.imageSrc);
        setFavorite(!favorite);// Atualiza o estado local
      }
    };
  
     // Busca se a liga é favorita ao montar o componente ou quando a liga muda
  if(league) {
    useEffect(() => {
      const fetchFavorites = async () => {
        try {
          const response = await workerFavorites.getFavorites(); // Obtém a lista de favoritos
          setFavorite(response.leagueIds.includes(league?.leagueId)); // Verifica se a liga está na lista de favoritos
        } catch (error) {
          console.error("Erro ao buscar favoritos:", error);
          setFavorite(false); // Define como não favorito em caso de erro
        }
      };
      fetchFavorites();
    }, [league?.leagueId]);// Reexecuta se o ID da liga mudar
  }
// Verifica se uma liga foi selecionada, caso contrário, exibe um erro
  if (!league) {
    return <div>Erro: Nenhuma liga selecionada.</div>;
  }

  // Redireciona para a página de um time
  const redirectToTeamPage = () => {
    setState({ view: "teampage" });
  };

  return (
    <>
      <Header setState={setState} />
      <div className="league-page">
        <div className="league-header d-flex align-items-center justify-content-between">
          <div className="d-flex align-items-center">
            {/* Logotipo da liga */}
            <Image
              onClick={redirectToTeamPage}
              src={league.imageSrc}
              alt={`${league.leagueName} logo`}
              className="league-logo me-3"
              style={{ cursor: "pointer" }}
            />
            {/* Nome da liga */}
            <h1 className="league-logo-text me-3">{league.leagueName}</h1>
            {/* Botão de favoritos */}
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
          {/* Botões de filtro para diferentes visões */}
          <FilterClassificationButton setView={setView} view={view} />
          <FilterResultsButton setView={setView} view={view} />
          <FilterListButton setView={setView} view={view} />
        </div>

        <div className="content mt-4">
          {/* Renderiza a visão correspondente */}
          {view === "standings" && <LeagueStandings setState={setState} />}
          {view === "results" && (
            <LeagueResults
              leagueId={league.leagueId}
              leagueName={league.leagueName}
              imageSrc={league.imageSrc}
              setState={setState}
            />
          )}
          {view === "list" && (
            <LeagueList
              leagueId={league.leagueId}
              leagueName={league.leagueName}
              imageSrc={league.imageSrc}
              setState={setState}
            />
          )}
        </div>
      </div>
    </>
  );
};

export default LeaguePage;
