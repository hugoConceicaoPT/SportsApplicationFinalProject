import React, { useEffect, useState } from "react";
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
import axios from "axios";
import { config } from "../../config";
import TeamEvents from "./Teamevents";

const CardListFavorites: React.FC<AppProps> = ({ setState }) => {
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [filter, setFilter] = useState<"all" | "finished" | "scheduled" | "live">("all");
    const [favorites, setFavorites] = useState({
        leagueIds: [],
        leagueName: [],
        leagueBadge: [],
        teamIds: [],
        teamName: [],
        teamBadge: [],
      });
    
      useEffect(() => {
        const fetchFavorites = async () => {
          try {
            const response = await axios.get(`${config.serverAddress}/favorites`, {
              withCredentials: true, // Inclui cookies na requisição para autenticação
            });
              const { leagueIds, leagueName, leagueBadge, teamIds, teamName, teamBadge } = response.data;
              setFavorites({
                leagueIds,
                leagueName,
                leagueBadge,
                teamIds,
                teamName,
                teamBadge,
              });
            
          } catch (error) {
            console.error("Erro ao buscar favoritos:", error);
          }
        };
      
        fetchFavorites();
      }, []);

    const renderLeagueEvents = (leagueId: string, leagueName: string, imageSrc: string) => {
        return (
          <LeagueEvents
            key={leagueId}
            filter={filter}
            selectedDate={selectedDate}
            setState={setState}
            leagueId={leagueId}
            leagueName={leagueName}
            imageSrc={imageSrc}
          />
        );
      };

    const renderTeamEvents = (teamId: string, teamName: string, imageSrc: string) => {
        return (
          <TeamEvents
            key={teamId}
            filter={filter}
            selectedDate={selectedDate}
            setState={setState}
            teamId={teamId}
            teamName={teamName}
            imageSrc={imageSrc}
          />
        );
    };

    return (
        <Container className="d-flex justify-content-center mt-4">
            <Card style={{ width: "46rem", backgroundColor: "#0b2129" }} className="d-flex justify-content-center">
                <Card.Body>
                    <div className="d-flex justify-content-between mb-4">
                        <div className="d-flex">
                            <FilterAllButton filter={filter} setFilter={setFilter} />
                            <FilterOnLiveButton filter={filter} setFilter={setFilter} />
                            <FilterScheduledButton filter={filter} setFilter={setFilter} />
                            <FilterFinishButton filter={filter} setFilter={setFilter} />
                        </div>
                        <div className="ms-auto">
                            <DateButton date={selectedDate} setDate={setSelectedDate} />
                        </div>
                    </div>
                    
                    {favorites.teamIds.map((teamId, index) =>
                        renderTeamEvents(teamId, favorites.teamName[index], favorites.teamBadge[index])
                    )}
                </Card.Body>
            </Card>
        </Container>
    );
}

export default CardListFavorites;