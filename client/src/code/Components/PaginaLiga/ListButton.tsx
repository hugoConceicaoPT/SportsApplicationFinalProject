import React from "react"
import { INextLeagueEvents } from "../../league"
import { AppProps } from "../../main"
import { useTeamContext } from "../Context/TeamContext"

interface ListButtonProps extends AppProps {
    event: INextLeagueEvents,
    index: number
}

const ListButton: React.FC<ListButtonProps> = ({ setState, event, index}) => {

    const { setTeam } = useTeamContext();

    const redirectToTeamHomePage = () => {
        setState({ view: "teampage" });
        setTeam({
            teamId: event.idHomeTeam,
            teamName: event.strHomeTeam,
            imageSrc: event.strHomeTeamBadge
        })
    }

    const redirectToTeamAwayPage = () => {
        setState({ view: "teampage" });
        setTeam({
            teamId: event.idAwayTeam,
            teamName: event.strAwayTeam,
            imageSrc: event.strAwayTeamBadge
        })
    }

    return (
        <li key={index} className="list-group-item d-flex align-items-center justify-content-between">
            <div className="d-flex align-items-center">
                <img
                    src={event.strHomeTeamBadge}
                    alt={event.strHomeTeam}
                    style={{ width: "24px", height: "24px", marginRight: "10px", cursor: "pointer" }}
                    onClick={redirectToTeamHomePage}
                />
                <span>{event.strHomeTeam}</span>
            </div>
            <div>
                <span className="list-vs">vs</span>
            </div>
            <div className="d-flex align-items-center">
                <span>{event.strAwayTeam}</span>
                <img
                    src={event.strAwayTeamBadge}
                    alt={event.strAwayTeam}
                    style={{ width: "24px", height: "24px", marginLeft: "10px", cursor: "pointer" }}
                    onClick={redirectToTeamAwayPage}
                />
            </div>
            <div>
                <span>{event.dateEvent} {event.strTime}</span>
            </div>
        </li>
    )
}

export default ListButton;
