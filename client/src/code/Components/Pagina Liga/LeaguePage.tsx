import React, { useState } from "react";
import { Button } from "react-bootstrap";
import LeagueStandings from "./Standings";

interface AppProps {
  setState: (state: { view: string }) => void; 
  imageSrc: string;
  label: string;
  leagueId: string;
}

const LeaguePage: React.FC<AppProps> = ({ setState, label, imageSrc, leagueId }) => {
  const [view, setView] = useState<"standings" | "results" | "list" | null>(null);

  const redirectToStandings = () => setView("standings");
  const redirectToResults = () => setView("results");
  const redirectToList = () => setView("list");

  return (
    <div className="league-page">
      <div className="league-header">
        <img src={imageSrc} alt={`${label} logo`} className="league-logo" />
        <div>
          <h1>{label}</h1>
        </div>
      </div>

      <div className="Navigation">
        <Button
          className="Standings"
          type="button"
          onClick={redirectToStandings}
        >
          Classificações
        </Button>
        <Button className="Results" type="button" onClick={redirectToResults}>
          Resultados
        </Button>
        <Button className="List" type="button" onClick={redirectToList}>
          Lista
        </Button>
      </div>

      <div className="content">
        {view === "standings" && (
          <LeagueStandings
            leagueId={leagueId}
            leagueName={label}
            imageSrc={imageSrc}
          />
        )}
        {view === "results" && <p>Resultados ainda não implementados.</p>}
        {view === "list" && <p>Lista ainda não implementada.</p>}
      </div>
    </div>
  );
};

export default LeaguePage;
