import React, { useState } from "react";
import { AppProps } from "../main";
import Button from 'react-bootstrap/Button';
import { INextPastLeagueEvents } from "../league";
import { Dash } from "react-bootstrap-icons";

interface INextEventButton extends AppProps {
  event: INextPastLeagueEvents,
  index: number
}

const ButtonResults: React.FC<INextEventButton> = ({ setState, event, index }) => {
  const [textColor, setTextColor] = useState(false);
  const toggleTextColor = () => {
    setTextColor(!textColor);
  };
  const handleClick = () => {
    setState({ view: "home" });
  };

  const formattedTime = event.strTime.split(":").slice(0, 2).join(":");
  return (
    <>
      <li key={index} className="list-group-item-event">
        <Button variant="secondary">
          <span className="time-event">
          {formattedTime}
          </span>
          <div>
            <img
              src={event.strHomeTeamBadge}
              alt={event.strHomeTeam}
              width="20"
              className="me-2"
            />
            {event.strHomeTeam}
            <span className="score">
            {event.intHomeScore ? (
              event.intHomeScore
            ) : (
              <Dash/>
            )}
            </span>
          </div>
          <div>
            <img
              src={event.strAwayTeamBadge}
              alt={event.strAwayTeam}
              width="20"
              className="me-2"
            />
            {event.strAwayTeam}
            <span className="score">
            {event.intAwayScore ? (
              event.intAwayScore
            ) : (
              <Dash/>
            )}
            </span>
          </div>
        </Button>
      </li>
    </>
  );
}

export default ButtonResults;