import React, { useState } from "react";
// Importações necessárias para o componente, incluindo React, hooks e bibliotecas como Bootstrap, Axios e ícones.

import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { AppProps } from "../main";
import LeagueEvents from "./LeagueEvents";
import { leagueIds } from "../../../../server/src/leagueIds";
import { Container } from "react-bootstrap";
import DateButton from "./DateButton";


const CardListLeague: React.FC<AppProps> = ({ setState }) => {
    const [selectedDate, setSelectedDate] = useState(new Date());
    return (
        <Container className="d-flex justify-content-center mt-4">
            <Card style={{ width: "46rem", backgroundColor: "#0b2129" }} className="d-flex justify-content-center">
                <Card.Body>
                    <div className="d-flex justify-content-end mb-4">
                        <DateButton setState={setState} date={selectedDate} setDate={setSelectedDate} />
                    </div>
                    <LeagueEvents selectedDate={selectedDate} setState={setState} leagueId={leagueIds.premierLeague} leagueName="Inglaterra: Premier League" imageSrc="icons/Inglaterra.png" />
                    <LeagueEvents selectedDate={selectedDate} setState={setState} leagueId={leagueIds.bundesliga} leagueName="Alemanha : Bundesliga" imageSrc="icons/Alemanha.png" />
                    <LeagueEvents selectedDate={selectedDate} setState={setState} leagueId={leagueIds.laLiga} leagueName="Espanha: La Liga" imageSrc="icons/Espanha.png" />
                    <LeagueEvents selectedDate={selectedDate} setState={setState} leagueId={leagueIds.primeiraLiga} leagueName="Portugal: Liga Portugal Betclic" imageSrc="icons/Portugal.png" />
                    <LeagueEvents selectedDate={selectedDate} setState={setState} leagueId={leagueIds.ligue1} leagueName="França: Ligue 1" imageSrc="icons/França.png" />
                    <LeagueEvents selectedDate={selectedDate} setState={setState} leagueId={leagueIds.serieA} leagueName="Itália: Serie A" imageSrc="icons/Italia.png" />
                </Card.Body>
            </Card>
        </Container>
    );
}

export default CardListLeague;