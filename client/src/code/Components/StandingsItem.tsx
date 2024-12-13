import React from "react";
import { ILeagueStandings } from "../leagueStandings";
import { AppProps } from "../main";

interface IStandingsItemProps extends AppProps {
    team: ILeagueStandings;
    index: number;
}

const StandingsItem: React.FC<IStandingsItemProps> = ({ team, index }) => {
    return (
        <li key={index} className="list-group-item d-flex justify-content-between align-items-center">
            <div className="d-flex align-items-center">
                <span className="me-3">{team.intRank}</span>
                <img src={team.strBadge} alt={team.strTeam} width="30" className="me-2" />
                {team.strTeam}
            </div>
            <div>
                <span>{team.intPoints} pts</span>
                <span className="ms-3">({team.intPlayed} J, {team.intWin}-{team.intDraw}-{team.intLoss})</span>
            </div>
        </li>
    );
};

export default StandingsItem;
