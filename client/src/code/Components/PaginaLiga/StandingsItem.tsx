import React from "react";
import { ILeagueStandings } from "../../league";

interface StandingsItemProps {
  team: ILeagueStandings;
  index: number;
}

const StandingsItem: React.FC<StandingsItemProps> = ({ team, index }) => {
  return (
    <li className="list-group-item">
      <div>
        <span>
          {index + 1}. {team.strTeam}
        </span>
      </div>
      <span>Jogos: {team.intPlayed}</span>
      <span>Vitórias: {team.intWin}</span>
      <span>Empates: {team.intDraw}</span>
      <span>Derrotas: {team.intDefeat}</span>
      <div>
        <span>Golos Marcados: {team.intGoalsFor}</span>
        <span>Golos Sofridos: {team.intGoalsAgainst}</span>
        <span>Diferença de Golos: {team.intGoalDifference}</span>
      </div>
      <div>
        <span>Pontos: {team.intPoints}</span>
      </div>
    </li>
  );
};

export default StandingsItem;
