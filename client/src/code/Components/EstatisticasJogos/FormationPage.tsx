import React, { useEffect, useState } from "react";
import { AppProps } from "../../main";
import { useEvent } from "../Context/EventContext";
import { Container } from "react-bootstrap";
import { IGameLineup, WorkerGame } from "../../game";

const FormationPage: React.FC<AppProps> = ({ setState }) => {
    const { selectedEvent } = useEvent();
    const [gameLineupEvent, setGameLineupEvent] = useState<IGameLineup[]>([]);
    const workerGame = new WorkerGame();

    if (!selectedEvent) {
        return <div>Evento não encontrado</div>;
    }

    useEffect(() => {
        const fetchGameLineup = async () => {
            try {
                if (selectedEvent.idEvent) {
                    const data = await workerGame.getLineup(selectedEvent.idEvent);
                    setGameLineupEvent(data);
                }
            } catch (error) {
                console.error("Error fetching league results:", error);
            }
        };

        fetchGameLineup();
    }, [selectedEvent.idEvent]);

    const initialTeamHome = gameLineupEvent.filter(player => player.strSubstitute === "No" && player.strHome === "Yes");
    const initialTeamAway = gameLineupEvent.filter(player => player.strSubstitute === "No" && player.strHome === "No");

    const renderPlayerRow = (
        homePlayer: IGameLineup | undefined,
        awayPlayer: IGameLineup | undefined,
        index: number
    ): JSX.Element => (
        <div key={index} className={"d-flex justify-content-between align-items-center mb-2 p-2"} style={index % 2 === 0 ? {backgroundColor: "black"} : {backgroundColor: "#0b2129"}}>
            {homePlayer && (
                <div className="text-start">
                    <span className="fw-bold text-white me-2">{homePlayer.intSquadNumber}</span>
                    <span className="text-white">{homePlayer.strPlayer}</span>
                </div>
            )}
            {awayPlayer && (
                <div className="text-end">
                    <span className="text-white me-2">{awayPlayer.strPlayer}</span>
                    <span className="fw-bold text-white">{awayPlayer.intSquadNumber}</span>
                </div>
            )}
        </div>
    );

    const renderPlayers = (homeTeam: IGameLineup[], awayTeam: IGameLineup[]): JSX.Element[] => {
        const maxLength = Math.max(homeTeam.length, awayTeam.length);
        const rows: JSX.Element[] = [];

        for (let i = 0; i < maxLength; i++) {
            rows.push(renderPlayerRow(homeTeam[i], awayTeam[i], i));
        }

        return rows;
    };

    return (
        <Container className="mt-0" fluid>
            <h6 className="text-center formation-page mb-4 p-2">Equipa Inicial</h6>
            {renderPlayers(initialTeamHome, initialTeamAway)}
        </Container>
    );
};

export default FormationPage;
