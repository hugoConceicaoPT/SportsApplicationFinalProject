import React, { useState } from "react";
import { AppProps } from "../../main";
import Button from 'react-bootstrap/Button';
import { INextPastLeagueEvents } from "../../league";
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

  const isGameFinished = event.intHomeScore !== null && event.intAwayScore !== null;
  return (
    <>
      <li key={index} className="list-group-item-event">
      {isGameFinished ? (
          // Botão para jogos terminados
          <Button variant="secondary">
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
        ) : (
          // Botão para jogos em andamento
          <Button variant="secondary">
            <span className="time-event">{formattedTime}</span>
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
        )}
      </li>
    </>
  );
}

export default ButtonResults;