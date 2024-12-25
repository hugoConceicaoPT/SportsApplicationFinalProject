import React, { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import LeagueStandings from "./Standings";
import LeagueResults from "./Results";
import LeagueList from "./List";
import { AppProps } from "../../main";
import { useLeagueContext } from "../../leagueContext";
import Header from "../PaginaPrincipal/Header";


const LeaguePage: React.FC<AppProps> = ({ setState }) => {
  const { league } = useLeagueContext();
  const [view, setView] = useState<"standings" | "results" | "list">("standings");

  useEffect(() => {
    // Set default view to standings when the component loads
    setView("standings");
  }, []);

  if (!league) {
    return <div>Erro: Nenhuma liga selecionada.</div>;
  }

  return (
    <>
      <Header setState={setState} />
      <div className="league-page">
        <div className="league-header d-flex align-items-center justify-content-between">
          <div className="d-flex align-items-center">
            <img src={league.imageSrc} alt={`${league.leagueName} logo`} className="league-logo me-3" />
            <h1 className="league-logo-text">{league.leagueName}</h1>
          </div>
        </div>

        <div className="navigation d-flex justify-content-around my-3">
          <Button
            className={`navigation-button ${view === "standings" ? "active" : ""}`}
            onClick={() => setView("standings")}
          >
            Classificações
          </Button>
          <Button
            className={`navigation-button ${view === "results" ? "active" : ""}`}
            onClick={() => setView("results")}
          >
            Resultados
          </Button>
          <Button
            className={`navigation-button ${view === "list" ? "active" : ""}`}
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
          {view === "list" && <LeagueList leagueId={league.leagueId} leagueName={league.leagueName} imageSrc={league.imageSrc} />}
        </div>
      </div>
    </>
  );
};

export default LeaguePage;
