import React, { useState } from "react";
import { AppProps } from "../../main";
import { ILiveEvents, INextPastLeagueEvents } from "../../league";
import ButtonEventFinished from "./ButtonEventFinished";
import ButtonEventLive from "./ButtonEventLive";
import ButtonEventScheluded from "./ButtonEventScheluded";


interface INextEventButton extends AppProps {
  event: INextPastLeagueEvents | ILiveEvents,
  index: number
  leagueId: string,
  leagueName: string,
  imageSrc: string
}

const NextEventButton: React.FC<INextEventButton> = ({ setState, event, index, leagueId, leagueName, imageSrc }) => {

  const gameProgress = "strProgress" in event ? event.strProgress : null;
  const isGameFinished = event.strStatus === "Match Finished";
  const isGameScheluded = event.strStatus === "Not Started";
  const isGameLive = gameProgress !== null;
  return (
      <li key={index} className="list-group-item-event">
        {isGameFinished ? (
          <ButtonEventFinished setState={setState} event={event} leagueId={leagueId} leagueName={leagueName} imageSrc={imageSrc} />
        ) : isGameScheluded ? (
          <ButtonEventScheluded event={event} />
        ) : isGameLive ? (
          <ButtonEventLive setState={setState} event={event} leagueId={leagueId} leagueName={leagueName} imageSrc={imageSrc} />
        ): (
          <>
          </>
        )}
      </li>
  );
}

export default NextEventButton;