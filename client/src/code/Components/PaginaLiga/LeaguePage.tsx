import React, { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import LeagueStandings from "./Standings";
import LeagueResults from "./Results";
import LeagueList from "./List";

interface AppProps {
  leagueId: string;
  leagueName: string;
  imageSrc: string;
}

const LeaguePage: React.FC<AppProps> = ({ leagueId, leagueName, imageSrc }) => {
  const [view, setView] = useState<"standings" | "results" | "list">("standings");

  useEffect(() => {
    // Set default view to standings when the component loads
    setView("standings");
  }, []);

  return (
    <div className="league-page">
      <div className="league-header d-flex align-items-center justify-content-between">
        <div className="d-flex align-items-center">
          <img src={imageSrc} alt={`${leagueName} logo`} className="league-logo me-3" />
          <h1 className="m-0">{leagueName}</h1>
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
        {view === "standings" && <LeagueStandings leagueId={leagueId} leagueName={leagueName} imageSrc={imageSrc} />}
        {view === "results" && (
          <LeagueResults
            leagueId={leagueId}
            leagueName={leagueName}
            imageSrc={imageSrc}
            selectedStartDate={new Date()}
            selectedEndDate={new Date()} setState={function (value: React.SetStateAction<{ view: string; }>): void {
              throw new Error("Function not implemented.");
            } }/>
        )}
        {view === "list" && <LeagueList leagueId={leagueId} leagueName={leagueName} imageSrc={imageSrc} />}
      </div>
    </div>
  );
};

export default LeaguePage;
