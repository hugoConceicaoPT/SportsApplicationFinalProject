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


const LeaguePage: React.FC<AppProps> = ({ setState }) => {
  const { league } = useLeagueContext();
  const [view, setView] = useState<"standings" | "results" | "list">("standings");
  const [favorite, setFavorite] = useState(false); // Estado para o botão de favoritos
  const workerFavorites = new WorkerFavorites(); // Instância do worker de favoritos

  useEffect(() => {
    // Define a view padrão como 'standings' quando o componente é montado
    setView("standings");
  }, []);

  const toggleFavorite = () => {
      if (league) {
        workerFavorites.toggleFavorite(league.leagueId, league.leagueName, league.imageSrc);
        setFavorite(!favorite);
      }
    };
  
  if(league) {
    useEffect(() => {
      const fetchFavorites = async () => {
        try {
          const response = await workerFavorites.getFavorites();
          setFavorite(response.leagueIds.includes(league?.leagueId));
        } catch (error) {
          console.error("Erro ao buscar favoritos:", error);
          setFavorite(false);
        }
      };
      fetchFavorites();
    }, [league?.leagueId]);
  }

  if (!league) {
    return <div>Erro: Nenhuma liga selecionada.</div>;
  }

  const redirectToTeamPage = () => {
    setState({ view: "teampage" });
  }

  return (
    <>
      <Header setState={setState} />
      <div className="league-page">
        <div className="league-header d-flex align-items-center justify-content-between">
          <div className="d-flex align-items-center">
            <Image onClick={redirectToTeamPage}
              src={league.imageSrc}
              alt={`${league.leagueName} logo`}
              className="league-logo me-3"
              style={{cursor: "pointer"}}
            />
            <h1 className="league-logo-text me-3">{league.leagueName}</h1>
            {/* Adiciona o botão de favoritos */}
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
          <FilterClassificationButton setView={setView} view={view}/>

          {/* Botão Resultados */}
          <FilterResultsButton setView={setView} view={view} />

          {/* Botão Lista */}
          <FilterListButton setView={setView} view={view} />
        </div>

        <div className="content mt-4">
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
