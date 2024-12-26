import React, { useEffect, useState } from "react";
import { Container, ProgressBar } from "react-bootstrap";
import { AppProps } from "../../main";
import { useEvent } from "../../eventContext";
import { IGameStatistics, Worker } from "../../league";

const StatisticsPage: React.FC<AppProps> = () => {
    const { selectedEvent } = useEvent();
    const [gameStatistics, setGameStatistics] = useState<IGameStatistics[]>([]);
    const worker = new Worker();

    if (!selectedEvent) {
        return <div>Evento não encontrado</div>; // Tratamento para casos onde o evento não foi definido
    }

    useEffect(() => {
        const fetchGameStatistics = async () => {
            try {
                if (selectedEvent.idEvent) {
                    const data = await worker.getGameStatistics(selectedEvent.idEvent);
                    setGameStatistics(data);
                }
            } catch (error) {
                console.error("Error fetching league results:", error);
            }
        };

        fetchGameStatistics();
    }, [selectedEvent.idEvent]);

    const calculatePercentage = (home: number, away: number) => {
        const total = home + away;
        return total === 0 ? { homePercentage: 50, awayPercentage: 50 } : {
            homePercentage: (home / total) * 100,
            awayPercentage: (away / total) * 100
        };
    };

    return (
        <Container>
            {gameStatistics.map((stat) => {
                const { homePercentage, awayPercentage } = calculatePercentage(
                    parseInt(stat.intHome),
                    parseInt(stat.intAway)
                );

                const homeVariant = homePercentage >= awayPercentage ? "danger" : "light";
                const awayVariant = awayPercentage > homePercentage ? "danger" : "light";
                return (
                    <div key={stat._id} className="mb-3">
                        <div className="d-flex justify-content-between">
                            <span className="text-start fw-bold text-white">{stat.intHome}</span>
                            <span className="text-center fw-bold text-white">{stat.strStat}</span>
                            <span className="text-end fw-bold text-white">{stat.intAway}</span>
                        </div>
                        <ProgressBar>
                            <ProgressBar
                                now={homePercentage}
                                variant={homeVariant}
                                key={1}
                            />
                            <ProgressBar
                                now={awayPercentage}    
                                variant={awayVariant}
                                key={2}
                            />
                        </ProgressBar>
                    </div>
                );
            })}
        </Container>
    );
};

export default StatisticsPage;
