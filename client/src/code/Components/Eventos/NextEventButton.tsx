import React, { useState } from "react";
import { AppProps } from "../../main";
import Button from 'react-bootstrap/Button';
import { ILiveEvents, INextLeagueEvents } from "../../league";
import { Dash } from "react-bootstrap-icons";
import EventStatisticsPage from "../EstatisticasJogos/EventStatisticsPage";


interface INextEventButton extends AppProps {
  event: INextLeagueEvents | ILiveEvents,
  index: number
}

const NextEventButton: React.FC<INextEventButton> = ({ setState, event, index }) => {
  const [textColor, setTextColor] = useState(false);
  const toggleTextColor = () => {
    setTextColor(!textColor);
  };
  const handleClick = () => {
    <EventStatisticsPage setState={setState} event={event}/>
    setState({view: "statitics"});
  };

  const formattedTime = "strTime" in event ? event.strTime.split(":").slice(0, 2).join(":") : null;

  
  const gameProgress = "strProgress" in event ? event.strProgress : null;
  const isGameFinished = event.strStatus === "Match Finished" || (gameProgress === null && event.strStatus !== "Not Started");
  const isGameScheluded = event.strStatus === "Not Started";
  const formattedProgress = gameProgress ? `${gameProgress}'` : gameProgress;
  const gameStatus = "strStatus" in event ? event.strStatus : null;
  return (
    <>
      <li key={index} className="list-group-item-event">
        {isGameFinished ? (
          // Botão para jogos terminados
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
        ) : isGameScheluded ? (
          // Botão para jogos em andamento
          <Button variant="secondary" onClick={handleClick}>
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
        ) : (
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
        )}
      </li>
    </>
  );
}

export default NextEventButton;