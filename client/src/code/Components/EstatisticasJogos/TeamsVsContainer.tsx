import React, { useState } from "react";
import { AppProps } from "../../main";
import { Container } from "react-bootstrap";
import { Dash} from "react-bootstrap-icons";
import { useEvent } from "../../eventContext";
import ButtonTeamHome from "./ButtonTeamHome";
import ButtonTeamAway from "./ButtonTeamAway";

interface TeamVsContainerProps extends AppProps {
    teamBadge: string,
    teamName: string
}

const TeamVsContainer: React.FC<TeamVsContainerProps> = ({ setState, teamBadge, teamName }) => {
    const { selectedEvent } = useEvent();

    if (!selectedEvent) {
        return <div>Evento não encontrado</div>; // Tratamento para casos onde o evento não foi definido
    }

    return (
        <Container className="d-flex justify-content-between">
            <ButtonTeamHome setState={setState} teamBadge={selectedEvent.strHomeTeamBadge} teamName={selectedEvent.strHomeTeam}/>
            <Dash className="aling-self-center text-white" size={30} height={100} />
            <ButtonTeamAway setState={setState} teamBadge={selectedEvent.strAwayTeamBadge} teamName={selectedEvent.strAwayTeam}/>
        </Container>
    );
}

export default TeamVsContainer;