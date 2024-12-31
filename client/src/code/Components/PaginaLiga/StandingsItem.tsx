import React from "react";
import { ILeagueStandings } from "../../league";
import { AppProps } from "../../main";
import { useTeamContext } from "../Context/TeamContext";

// Propriedades aceitas pelo componente StandingsItem
interface StandingsItemProps extends AppProps {
  team: ILeagueStandings;
  index: number;
}

// Componente para exibir um item na tabela de classificações
const StandingsItem: React.FC<StandingsItemProps> = ({ setState, team, index }) => {
  const { setTeam } = useTeamContext(); // Função para atualizar o contexto da equipa selecionado

  // Redireciona para a página do time ao clicar no badge
  const redirectToTeamPage = () => {
    setState({ view: "teampage" }); // Atualiza o estado global para exibir a página da equipa
    setTeam({
      teamId: team.idTeam,
      teamName: team.strTeam,
      imageSrc: team.strBadge
    });
  };

  return (
    <li className="list-group-item d-flex align-items-center">
      {/* Exibe a posição e o nome do time */}
      <div style={{ flex: 2, display: "flex", alignItems: "center" }}>
        <img
          src={team.strBadge}
          alt={`${team.strTeam} badge`}
          style={{ width: "30px", height: "30px", marginRight: "10px", cursor: "pointer" }}
          onClick={redirectToTeamPage}
        />
        <span>
          {index + 1}. {team.strTeam}
        </span>
      </div>
      {/* Exibe os valores de classificação */}
      <div style={{ flex: 1, textAlign: "center" }}>{team.intPlayed}</div>
      <div style={{ flex: 1, textAlign: "center", color: "green", fontWeight: "bold" }}>
        {team.intWin}
      </div>
      <div style={{ flex: 1, textAlign: "center", color: "gray", fontWeight: "bold" }}>
        {team.intDraw}
      </div>
      <div style={{ flex: 1, textAlign: "center", color: "red", fontWeight: "bold" }}>
        {team.intLoss}</div>
      <div style={{ flex: 1, textAlign: "center" }}>{team.intPoints}</div>
    </li>
  );
};

export default StandingsItem;
