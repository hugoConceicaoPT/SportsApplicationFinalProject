import React, { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import TeamStandings from "./TeamStadings"; // Componente para classificações
import TeamResults from "./TeamResults"; // Componente para resultados
import TeamList from "./TeamList"; // Componente para lista de jogos futuros
import { AppProps } from "../../main"; // Tipos de propriedades principais
import { useTeamContext } from "./teamContext"; // Contexto para a equipe
import Header from "../PaginaPrincipal/Header"; // Header compartilhado

const TeamPage: React.FC<AppProps> = ({ setState }) => {
  const { team } = useTeamContext(); // Contexto da equipe selecionada
  const [view, setView] = useState<"standings" | "results" | "list">("standings");

  useEffect(() => {
    // Define a view padrão como 'standings' quando o componente é montado
    setView("standings");
  }, []);

  if (!team) {
    return <div>Erro: Nenhuma equipe selecionada.</div>;
  }

  return (
    <>
      <Header setState={setState} />
      <div className="team-page">
        <div className="team-header d-flex align-items-center justify-content-between">
          <div className="d-flex align-items-center">
            <img
              src={team.imageSrc}
              alt={`${team.teamName} logo`}
              className="team-logo me-3"
            />
            <h1 className="team-logo-text">{team.teamName}</h1>
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
          {view === "standings" && <TeamStandings teamId={team.teamId} />}
          
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
