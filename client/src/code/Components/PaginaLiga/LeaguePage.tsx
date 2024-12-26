import React, { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import { Star, StarFill } from "react-bootstrap-icons"; // Importar os ícones
import LeagueStandings from "./Standings";
import LeagueResults from "./Results";
import LeagueList from "./List";
import { AppProps } from "../../main";
import { useLeagueContext } from "../../leagueContext";
import Header from "../PaginaPrincipal/Header";

const LeaguePage: React.FC<AppProps> = ({ setState }) => {
  const { league } = useLeagueContext();
  const [view, setView] = useState<"standings" | "results" | "list">("standings");
  const [favorite, setFavorite] = useState(false); // Estado para o botão de favoritos

  useEffect(() => {
    // Define a view padrão como 'standings' quando o componente é montado
    setView("standings");
  }, []);

  const toggleFavorite = () => {
    setFavorite(!favorite);
  };

  if (!league) {
    return <div>Erro: Nenhuma liga selecionada.</div>;
  }

  return (
    <>
      <Header setState={setState} />
      <div className="league-page">
        <div className="league-header d-flex align-items-center justify-content-between">
          <div className="d-flex align-items-center">
            <img
              src={league.imageSrc}
              alt={`${league.leagueName} logo`}
              className="league-logo me-3"
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
            />
          )}
        </div>
      </div>
    </>
  );
};

export default LeaguePage;
