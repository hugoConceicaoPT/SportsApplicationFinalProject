import React, { useEffect, useState } from "react";
import { Container, ProgressBar } from "react-bootstrap";
import { useEvent } from "../Context/EventContext";
import { IGameStatistics, WorkerGame } from "../../game";

// Componente funcional para exibir as estatísticas de um jogo.
const StatisticsPage: React.FC = () => {
    // Obtém o evento selecionado do contexto.
    const { selectedEvent } = useEvent();
    // Estado para armazenar as estatísticas do jogo.
    const [gameStatistics, setGameStatistics] = useState<IGameStatistics[]>([]);
    // Instancia o worker para buscar estatísticas do jogo.
    const workerGame = new WorkerGame();

    // Caso nenhum evento tenha sido selecionado, exibe uma mensagem de erro.
    if (!selectedEvent) {
        return <div>Evento não encontrado</div>; // Tratamento para casos onde o evento não foi definido
    }
 // Efeito para buscar estatísticas do jogo ao montar o componente ou quando o ID do evento muda.
    useEffect(() => {
        const fetchGameStatistics = async () => {
            try {
                if (selectedEvent.idEvent) {
                    const data = await workerGame.getStatistics(selectedEvent.idEvent);
                    if (Array.isArray(data)) {
                        setGameStatistics(data);
                    } else {
                        setGameStatistics([]); // Define um valor padrão para evitar erros
                    }
                }
            } catch (error) {
                console.error("Erro ao buscar estatísticas:", error);
                setGameStatistics([]); // Define um valor padrão em caso de erro
            }
        };


        fetchGameStatistics();
    }, [selectedEvent.idEvent]);


     // Calcula a porcentagem para os valores da equipa da casa e da equipa visitante.
    const calculatePercentage = (home: number, away: number) => {
        const total = home + away;
        return total === 0 ? { homePercentage: 50, awayPercentage: 50 } : {
            homePercentage: (home / total) * 100,
            awayPercentage: (away / total) * 100
        };
    };

    return (
        <Container>
            {Array.isArray(gameStatistics) && gameStatistics.length > 0 ? (
                gameStatistics.map((stat) => {
                    const homeValue = parseInt(stat.intHome) || 0;
                    const awayValue = parseInt(stat.intAway) || 0;
                    const { homePercentage, awayPercentage } = calculatePercentage(homeValue, awayValue);

                    const homeVariant = homePercentage >= awayPercentage ? "danger" : "light";
                    const awayVariant = awayPercentage > homePercentage ? "danger" : "light";

                    return (
                        <div key={stat._id} className="mb-3">
                            <div className="d-flex justify-content-between">
                                <span className="text-start fw-bold text-white">{homeValue}</span>
                                <span className="text-center fw-bold text-white">{stat.strStat}</span>
                                <span className="text-end fw-bold text-white">{awayValue}</span>
                            </div>
                            <ProgressBar>
                                <ProgressBar
                                    now={homePercentage}
                                    variant={homeVariant}
                                    key="home"
                                    aria-label={`Home: ${homePercentage.toFixed(1)}%`}
                                />
                                <ProgressBar
                                    now={awayPercentage}
                                    variant={awayVariant}
                                    key="away"
                                    aria-label={`Away: ${awayPercentage.toFixed(1)}%`}
                                />
                            </ProgressBar>
                        </div>
                    );
                })
            ) : (
                <></>
            )}
        </Container>
    );

};

export default StatisticsPage;
