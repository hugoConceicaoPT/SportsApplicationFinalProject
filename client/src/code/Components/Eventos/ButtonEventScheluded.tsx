import { Button } from "react-bootstrap";
import { ILiveEvents, INextPastLeagueEvents } from "../../league"
import React from "react";
import { Dash } from "react-bootstrap-icons";

interface IButtonEventScheluded  {
    event: INextPastLeagueEvents | ILiveEvents,
}

const ButtonEventScheluded: React.FC<IButtonEventScheluded> = ({ event }) => {

   const formattedTime = "strTime" in event ? event.strTime.split(":").slice(0, 2).join(":") : null;
    return (
        <Button variant="secondary">
            <span  className="time-event">{formattedTime}</span>
            <div>
              <img
                src={event.strHomeTeamBadge}
                alt={event.strHomeTeam}
                width="22"
                className="me-2"
              />
              <span className="team-name">{event.strHomeTeam}</span>
              <span className="score">
                <Dash />
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
              <span className="score">
                <Dash />
              </span>
            </div>
          </Button>
    )
}

export default ButtonEventScheluded;