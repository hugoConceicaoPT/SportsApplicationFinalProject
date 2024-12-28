import React from "react";
import { AppProps } from "../../main";
import { Container } from "react-bootstrap";
import { Dash } from "react-bootstrap-icons";
import { useEvent } from "../Context/EventContext";
import ButtonTeamHome from "./ButtonTeamHome";
import ButtonTeamAway from "./ButtonTeamAway";


const TeamVsContainer: React.FC<AppProps> = ({ setState }) => {
    const { selectedEvent } = useEvent();

    if (!selectedEvent) {
        return <div>Evento não encontrado</div>; // Tratamento para casos onde o evento não foi definido
    }

    return (
        <Container className="d-flex justify-content-between">
            <ButtonTeamHome setState={setState} teamId={selectedEvent.idHomeTeam} teamBadge={selectedEvent.strHomeTeamBadge} teamName={selectedEvent.strHomeTeam} />
            <div className="d-flex">
                <span className="fs-1 fw-bold align-self-center text-white">{selectedEvent.intHomeScore}</span>
                <span className="align-self-center fw-bold"><Dash className="text-white"  size={30}/></span>
                <span className="fs-1 fw-bold align-self-center text-white">{selectedEvent.intAwayScore}</span>
            </div>
            <ButtonTeamAway setState={setState} teamId={selectedEvent.idAwayTeam} teamBadge={selectedEvent.strAwayTeamBadge} teamName={selectedEvent.strAwayTeam} />
        </Container>
    );
}

export default TeamVsContainer;