import React, { useEffect, useState } from "react";
import { useEvent } from "../Context/EventContext";
import { Container } from "react-bootstrap";
import { IGameLineup, WorkerGame } from "../../game";

// Componente funcional que exibe as formações de uma partida.
const FormationPage: React.FC = () => {
    // Obtém o evento selecionado do contexto de eventos.
    const { selectedEvent } = useEvent();
    // Estado para armazenar a formação inicial das equipas.
    const [gameLineupEvent, setGameLineupEvent] = useState<IGameLineup[]>([]);
    // Instancia um worker para buscar dados relacionados à lineup dos jogos.
    const workerGame = new WorkerGame();

    // Exibe uma mensagem de erro caso nenhum evento tenha sido selecionado.
    if (!selectedEvent) {
        return <div>Evento não encontrado</div>;
    }

     // Hook para buscar a formação inicial do evento selecionado ao montar o componente.
    useEffect(() => {
        const fetchGameLineup = async () => {
            try {
                 // Verifica se há um ID de evento para buscar os dados.
                if (selectedEvent.idEvent) {
                   
                    const data = await workerGame.getLineup(selectedEvent.idEvent);
                     // Verifica se os dados retornados são válidos e define o estado.
                    if (Array.isArray(data)) {
                        setGameLineupEvent(data);
                    } else {
                        setGameLineupEvent([]); // Evita erros no render
                    }
                }
            } catch (error) {
                console.error("Erro ao buscar lineup:", error);
                setGameLineupEvent([]); // Define um valor padrão em caso de erro
            }
        };
        

        fetchGameLineup();
    }, [selectedEvent.idEvent]); // Atualiza os dados sempre que o ID do evento mudar.

    // Filtra os jogadores da equipa inicial da casa e do visitante.
    const initialTeamHome = gameLineupEvent.filter(player => player.strSubstitute === "No" && player.strHome === "Yes");
    const initialTeamAway = gameLineupEvent.filter(player => player.strSubstitute === "No" && player.strHome === "No");


     // Renderiza uma linha para exibir informações de jogadores das duas equipas.
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
 // Renderiza todas as linhas dos jogadores das duas equipas.
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
