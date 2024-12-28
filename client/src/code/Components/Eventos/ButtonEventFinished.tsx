import { Button } from "react-bootstrap";
import { ILiveEvents, INextLeagueEvents } from "../../league"
import { AppProps } from "../../main"
import { useEvent } from "../Context/EventContext";
import { useLeagueContext } from "../Context/LeagueContext";
import React from "react";

export interface IButtonEventType extends AppProps {
    event: INextLeagueEvents | ILiveEvents,
    leagueId: string,
    leagueName: string,
    imageSrc: string
}

const ButtonEventFinished: React.FC<IButtonEventType> = ({ setState, event, leagueId, leagueName, imageSrc }) => {

    const { setSelectedEvent } = useEvent();
    const { setLeague } = useLeagueContext();
    const handleClick = () => {
        setSelectedEvent(event);
        setState({ view: "statistics" });
        setLeague({
            leagueId,
            leagueName,
            imageSrc
        })
    };
    return (
        <Button variant="secondary" onClick={handleClick}>
            <span className="time-event-end">Terminado</span>
            <div>
                <img
                    src={event.strHomeTeamBadge}
                    alt={event.strHomeTeam}
                    width="22"
                    className="me-2"
                />
                <span className="team-name">{event.strHomeTeam}</span>
                <span className="score-end">
                    {event.intHomeScore}
                </span>
            </div>
            <div>
                <img
                    src={event.strAwayTeamBadge}
                    alt={event.strAwayTeam}
                    width="22"
                    className="me-2"
                />
                <span className="team-name">{event.strAwayTeam}</span>
                <span className="score-end">
                    {event.intAwayScore}
                </span>
            </div>
        </Button>
    )
}

export default ButtonEventFinished;