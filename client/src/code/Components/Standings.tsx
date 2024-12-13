import React, { useState, useEffect } from "react";
import { StandingsWorker, ILeagueStandings } from "../leagueStandings";
import { AppProps } from "../main";
import Button from 'react-bootstrap/Button';
import { ArrowUp, ArrowDown } from "react-bootstrap-icons";
import { Container } from "react-bootstrap";
import StandingsItem from "./StandingsItem";

interface LeagueStandingsProps extends AppProps {
    leagueId: string;
    leagueName: string;
    imageSrc: string;
}

const LeagueStandings: React.FC<LeagueStandingsProps> = ({ setState, leagueId, leagueName, imageSrc }) => {
    const [standings, setStandings] = useState<ILeagueStandings[]>([]);
    const [isOpen, setIsOpen] = useState(true);

    const worker = new StandingsWorker();

    useEffect(() => {
        const fetchStandings = async () => {
            try {
                const data = await worker.getLeagueStandings(leagueId);
                setStandings(data);
            } catch (error) {
                console.error("Error fetching league standings:", error);
            }
        };

        fetchStandings();
    }, [leagueId]);

    const toggleVisibility = () => {
        setIsOpen(!isOpen);
    };

    return (
        <Container className="leagueStandings rounded">
            <div className="d-flex justify-content-between align-items-center">
                <h5>
                    <img src={imageSrc} alt="league-icon" className="me-2" style={{ width: "30px" }} />
                    {leagueName}
                </h5>
                <Button variant="secondary" size="sm" onClick={toggleVisibility}>
                    {isOpen ? <ArrowUp /> : <ArrowDown />}
                </Button>
            </div>
            {isOpen && (
                <ul className="list-group mt-3">
                    {standings.length > 0 ? (
                        standings.map((team, index) => (
                            <StandingsItem key={index} team={team} index={index} setState={function (value: React.SetStateAction<{ view: string; }>): void {
                                throw new Error("Function not implemented.");
                            } } />
                        ))
                    ) : (
                        <div className="text-center">Sem classificações disponíveis</div>
                    )}
                </ul>
            )}
        </Container>
    );
};

export default LeagueStandings;
