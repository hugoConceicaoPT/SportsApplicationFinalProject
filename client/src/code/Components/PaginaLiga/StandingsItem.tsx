import React from "react";
import { ILeagueStandings } from "../../league";

interface StandingsItemProps {
  team: ILeagueStandings;
  index: number;
}

const StandingsItem: React.FC<StandingsItemProps> = ({ team, index }) => {
  return (
    <li className="list-group-item d-flex align-items-center">
      {/* Exibe a posição e o nome do time */}
      <div style={{ flex: 2, display: "flex", alignItems: "center" }}>
        <img
          src={team.strBadge}
          alt={`${team.strTeam} badge`}
          style={{ width: "30px", height: "30px", marginRight: "10px" }}
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
        {team.intLoss}
      </div>
      <div style={{ flex: 1, textAlign: "center" }}>{team.intPoints}</div>
    </li>
  );
};

export default StandingsItem;
