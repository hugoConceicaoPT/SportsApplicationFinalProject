import React from "react";
import { ILeagueStandings } from "../../league";

interface StandingsItemProps {
  team: ILeagueStandings;
  index: number;
}

const StandingsItem: React.FC<StandingsItemProps> = ({ team, index }) => {
  return (
    <li className="list-group-item">
      <div className="d-flex justify-content-between align-items-center">
        <span>
          {index + 1}. {team.strTeam}
        </span>
        <span>Pontos: {team.intPoints}</span>
      </div>
      <div className="d-flex justify-content-between mt-1">
        <span>Jogos: {team.intPlayed}</span>
        <span>Vitórias: {team.intWin}</span>
        <span>Empates: {team.intDraw}</span>
      </div>
      <div className="d-flex justify-content-between mt-1">
        <span>Gols Marcados: {team.intGoalsFor}</span>
        <span>Gols Sofridos: {team.intGoalsAgainst}</span>
        <span>Diferença de Gols: {team.intGoalDifference}</span>
      </div>
    </li>
  );
};

export default StandingsItem;
