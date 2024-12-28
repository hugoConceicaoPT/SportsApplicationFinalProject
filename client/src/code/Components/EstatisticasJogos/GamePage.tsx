import React, { useEffect, useState } from "react";
import { AppProps } from "../../main";
import { useEvent } from "../Context/EventContext";
import { TbRectangleVerticalFilled } from "react-icons/tb";
import { MdSportsSoccer } from "react-icons/md";
import { ArrowRepeat } from "react-bootstrap-icons";
import { Container, Row } from "react-bootstrap";
import { IGameTimeline, Worker } from "../../league";

const GamePage: React.FC<AppProps> = () => {
    const { selectedEvent } = useEvent();
    const worker = new Worker();
    const [gameTimeline, setGameTimeline] = useState<IGameTimeline[]>([]);

    if (!selectedEvent) {
        return <div>Evento não encontrado</div>;
    }

    useEffect(() => {
        const fetchGameTimeline = async () => {
            try {
                if (selectedEvent.idEvent) {
                    const data = await worker.getGameTimeline(selectedEvent.idEvent);
                    setGameTimeline(data);
                    console.log(selectedEvent.idEvent);
                }
            } catch (error) {
                console.error("Error fetching league timeline:", error);
            }
        };

        fetchGameTimeline();
    }, [selectedEvent.idEvent]);

    // Função para renderizar os ícones baseados no tipo de evento
    const renderIcon = (type: string, detail: string) => {
        if (type === "Goal") {
            return <MdSportsSoccer color="white" />;
        } else if (type === "Card") {
            if (detail === "Yellow Card") {
                return <TbRectangleVerticalFilled color="yellow" />;
            } else if (detail === "Red Card") {
                return <TbRectangleVerticalFilled color="red" />;
            }
        } else if (type === "subst") {
            return <ArrowRepeat color="white" />;
        }
        return null;
    };

    // Dividir eventos entre 1ª e 2ª partes
    const firstHalf = gameTimeline.filter(event => parseInt(event.intTime) <= 45);
    const secondHalf = gameTimeline.filter(event => parseInt(event.intTime) > 45);

    const renderEventRow = (event: IGameTimeline, index: number) => {

        if (event.strTimeline === "Var") {
            return null;
        }

        if(event.strTimelineDetail === "Penalty") {
            event.strAssist += "Penalidade";
        }

        const isHomeTeam = event.strHome === "Yes";
        return (
            <Row key={index} className="mb-3">
                {isHomeTeam ? (
                    <div className="d-flex justify-content-start align-items-center text-white ms-3">
                        <strong className="me-2">{event.intTime}’</strong>
                        {renderIcon(event.strTimeline, event.strTimelineDetail)}
                        <strong className="ms-2">{event.strPlayer}</strong>
                        {event.strAssist && (
                            <span className="ms-2">{`(${event.strAssist})`}</span>
                        )}
                    </div>
                ) : (
                    <div className="d-flex justify-content-end align-items-center text-white pe-4">
                        <strong className="me-2">{event.strPlayer}</strong>
                        {event.strAssist && (
                            <span className="me-2">{`(${event.strAssist})`}</span>
                        )}
                        {renderIcon(event.strTimeline, event.strTimelineDetail)}
                        <strong className="ms-2">{event.intTime}’</strong>
                    </div>
                )}
            </Row>
        );
    };

    return (
        <Container fluid className="px-0">
            <h6 style={{ backgroundColor: "#0b2129" }} className="text-white p-2">1ª Parte</h6>
            {firstHalf.length === 0 ? (
                <></>
            ) : (
                firstHalf.map(renderEventRow)
            )}

            <h6 style={{ backgroundColor: "#0b2129" }} className="text-white p-2">2ª Parte</h6>
            {secondHalf.length === 0 ? (
                <></>
            ) : (
                secondHalf.map(renderEventRow)
            )}
        </Container>
    );
};

export default GamePage;
