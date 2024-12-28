import { Button } from "react-bootstrap";
import { ILiveEvents, INextLeagueEvents } from "../../league"
import { AppProps } from "../../main"
import { useEvent } from "../Context/EventContext";
import { useLeagueContext } from "../Context/LeagueContext";
import React from "react";
import { IButtonEventType } from "./ButtonEventFinished";


const ButtonEventLive: React.FC<IButtonEventType> = ({ setState, event, leagueId, leagueName, imageSrc }) => {

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

    const gameProgress = "strProgress" in event ? event.strProgress : null;
    const formattedProgress = gameProgress ? `${gameProgress}'` : gameProgress;
    let gameStatus = "strStatus" in event ? event.strStatus : null;
    if (gameStatus == "1H")
        gameStatus = "HT";
    return (
        <Button variant="secondary" onClick={handleClick}>
            <span className="time-event-live">{formattedProgress === "45'" ? gameStatus : formattedProgress}</span>
            <div>
                <img
                    src={event.strHomeTeamBadge}
                    alt={event.strHomeTeam}
                    width="22"
                    className="me-2"
                />
                <span className="team-name">{event.strHomeTeam}</span>
                <span className="score-live">
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
                <span className="score-live">
                    {event.intAwayScore}
                </span>
            </div>
        </Button>
    )
}

export default ButtonEventLive;