import React, { useState } from "react";
import { AppProps } from "../main";
import Button from 'react-bootstrap/Button';
import { IoFootballOutline } from "react-icons/io5";
import { INextPastLeagueEvents } from "../league";

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
        setState({view:"home"});
    };
    return (
        <>
            <li key={index} className="list-group-item d-flex justify-content-between align-items-center">
                  <div>
                    <img
                      src={event.strHomeTeamBadge}
                      alt={event.strHomeTeam}
                      width="30"
                      className="me-2"
                    />
                    {event.strHomeTeam} vs {event.strAwayTeam}
                    <img
                      src={event.strAwayTeamBadge}
                      alt={event.strAwayTeam}
                      width="30"
                      className="ms-2"
                    />
                  </div>
                  <div>
                    {event.dateEvent} às {event.strTime}
                  </div>
                </li>
        </>
    );
}

export default ButtonResults;