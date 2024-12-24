import React, { useState } from "react";
// Importações necessárias para o componente, incluindo React, hooks e bibliotecas como Bootstrap, Axios e ícones.

import Card from 'react-bootstrap/Card';
import { AppProps } from "../../main";
import LeagueEvents from "../Eventos/LeagueEvents";
import { leagueIds } from "../../../../../server/src/leagueIds";
import { Container } from "react-bootstrap";
import DateButton from "../Eventos/DateButton";
import FilterAllButton from "../Eventos/FilterAllButton";
import FilterFinishButton from "../Eventos/FilterFinishButton";
import FilterOnLiveButton from "../Eventos/FilterOnLiveButton";
import FilterScheduledButton from "../Eventos/FilterScheduledButton";


const CardListLeague: React.FC<AppProps> = ({ setState }) => {
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [filter, setFilter] = useState<"all" | "finished" | "scheduled" | "live">("all");
    return (
        <Container className="d-flex justify-content-center mt-4">
            <Card style={{ width: "46rem", backgroundColor: "#0b2129" }} className="d-flex justify-content-center">
                <Card.Body>
                    <div className="d-flex justify-content-between mb-4">
                        <div className="d-flex">
                            <FilterAllButton filter={filter} setFilter={setFilter} setState={setState} />
                            <FilterOnLiveButton filter={filter} setFilter={setFilter} setState={setState} />
                            <FilterScheduledButton filter={filter} setFilter={setFilter} setState={setState} />
                            <FilterFinishButton filter={filter} setState={setState} setFilter={setFilter} />
                        </div>
                        <div className="ms-auto">
                            <DateButton setState={setState} date={selectedDate} setDate={setSelectedDate} />
                        </div>
                    </div>
                    <LeagueEvents filter={filter} selectedDate={selectedDate} setState={setState} leagueId={leagueIds.premierLeague} leagueName="Inglaterra: Premier League" imageSrc="icons/Inglaterra.png" />
                    <LeagueEvents filter={filter} selectedDate={selectedDate} setState={setState} leagueId={leagueIds.bundesliga} leagueName="Alemanha : Bundesliga" imageSrc="icons/Alemanha.png" />
                    <LeagueEvents filter={filter} selectedDate={selectedDate} setState={setState} leagueId={leagueIds.laLiga} leagueName="Espanha: La Liga" imageSrc="icons/Espanha.png" />
                    <LeagueEvents filter={filter} selectedDate={selectedDate} setState={setState} leagueId={leagueIds.primeiraLiga} leagueName="Portugal: Liga Portugal Betclic" imageSrc="icons/Portugal.png" />
                    <LeagueEvents filter={filter} selectedDate={selectedDate} setState={setState} leagueId={leagueIds.ligue1} leagueName="França: Ligue 1" imageSrc="icons/França.png" />
                    <LeagueEvents filter={filter} selectedDate={selectedDate} setState={setState} leagueId={leagueIds.serieA} leagueName="Itália: Serie A" imageSrc="icons/Italia.png" />
                </Card.Body>
            </Card>
        </Container>
    );
}

export default CardListLeague;