import React, { useEffect, useState } from "react";
import { config } from "../../config"; // Importa a configuração geral, incluindo o endereço do servidor
import { AppProps } from "../../main";
import axios from "axios"; // Usaremos axios para buscar os favoritos do utilizador
import ButtonTeam from "./buttonTeam";
import { ITeamDetails, WorkerTeam } from "../../team";
import { WorkerFavorites, IFavorites } from "../../favorites";


// Interface para representar informações de uma equipe favorita
interface TeamInfo {
  teamId: string; // ID único da equipa
  teamName: string; // Nome da equipa
  teamBadge: string; // URL do emblema da equipa
  leagueId: string; // ID da liga associada à equipa
  leagueName: string;  // Nome da liga associada à equipa
}

// Componente funcional para exibir equipes favoritas
const TeamFavorites: React.FC<AppProps> = ({ setState }) => {
  // Declara um estado local `ids` com `useState`.
  // O estado inicial é um array vazio.
  const [teamInfos, setTeamInfos] = useState<TeamInfo[]>([]);
  const worker = new WorkerTeam(); // Instância do worker para gerenciar equipas
  const workerFavorites = new WorkerFavorites();  // Instância do worker para gerenciar favoritos

  // Função para buscar os favoritos do utilizador
  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const response = await workerFavorites.getFavorites(); // API para buscar favoritos do utilizador
        const { teamIds, teamName, teamBadge } = response; // Supomos que a API retorna arrays `teamIds`, `teamNames` e `teamBadges`
        const teamDetailsPromises = teamIds.map(async (teamId: string, index: number) => {
          const teamResponse: ITeamDetails[] = await worker.getTeamDetails(teamId); // API para buscar detalhes da equipe
          const { idLeague, strLeague } = teamResponse[0];// Supomos que a API retorna leagueId e leagueName
          return {
            teamId,
            teamName: teamName[index],
            teamBadge: teamBadge[index],
            leagueId: idLeague,
            leagueName: strLeague,
          };
        });

        // Resolve todas as promessas e atualiza o estado
        const teamDetails = await Promise.all(teamDetailsPromises);
        setTeamInfos(teamDetails as TeamInfo[]);
      } catch (error) {
        console.error("Erro ao buscar favoritos:", error);
      }
    };

    fetchFavorites(); // Chama a função para buscar os favoritos
  }, []); // Executa apenas ao montar o componente

  return (
    <div className="favorite-team-block-container">
      {/* Verifica se há favoritos */}
      {teamInfos.length === 0 ? (
        <div>Você não possui equipes favoritas.</div>
      ) : (
        teamInfos.map((teamInfo) => (
          <ButtonTeam
            key={teamInfo.teamId}
            setState={setState}
            teamId={teamInfo.teamId}
            label={teamInfo.teamName}
            imageSrc={teamInfo.teamBadge}
            leagueId={teamInfo.leagueId}
            leagueName={teamInfo.leagueName}
          />
        ))
      )}
    </div>
  );
};

export default TeamFavorites;
