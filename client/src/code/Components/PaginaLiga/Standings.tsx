import React, { useState, useEffect } from "react";
import { Worker, ILeagueStandings } from "../../league";
import Button from "react-bootstrap/Button";
import { ArrowUp, ArrowDown, Star, StarFill } from "react-bootstrap-icons";
import { Container } from "react-bootstrap";
import Image from "react-bootstrap/Image";
import StandingsItem from "./StandingsItem";

interface LeagueStandingsProps {
  leagueId: string;
  leagueName: string;
  imageSrc: string;
}

const LeagueStandings: React.FC<LeagueStandingsProps> = ({
  leagueId,
  leagueName,
  imageSrc,
}) => {
  const [standings, setStandings] = useState<ILeagueStandings[]>([]);
  const [isOpen, setIsOpen] = useState(true);
  const [favorite, setFavorite] = useState(false);

  useEffect(() => {
    const worker = new Worker();
    const fetchStandings = async () => {
      try {
        const rawData = await worker.getLeagueStanding(leagueId);

        const formattedData: ILeagueStandings[] = rawData.map((item: ILeagueStandings) => ({
          _id: parseInt(item.intRank, 10) || 0,
          intRank: item.intRank || "0",
          idTeam: item.idTeam || "",
          strTeam: item.strTeam || "Equipa não identificada",
          strBadge: item.strBadge || "",
          strForm: item.strForm || "-",
          intPlayed: item.intPlayed || "0",
          intWin: item.intWin || "0",
          intDraw: item.intDraw || "0",
          intLoss: item.intLoss || "0",
          intGoalsFor: item.intGoalsFor || "0",
          intGoalsAgainst: item.intGoalsAgainst || "0",
          intGoalDifference: item.intGoalDifference || "0",
          intPoints: item.intPoints || "0",
        }));

        setStandings(formattedData);
      } catch (error) {
        console.error("Erro ao buscar classificações:", error);
      }
    };

    fetchStandings();
  }, [leagueId]);

  const toggleVisibility = () => {
    setIsOpen(!isOpen);
  };

  const toggleFavorite = () => {
    setFavorite(!favorite);
  };

  return (
    <Container className="leagueStandings rounded">
      <div className="d-flex justify-content-between align-items-center">
        <div className="d-flex align-items-center">
          <Button
            style={{
              color: favorite ? "#FFCD00" : "white",
              backgroundColor: "#01203E",
              borderColor: "#01203E",
            }}
            className="ps-0 ms-0 mb-3 mt-2"
            onClick={toggleFavorite}
          >
            {favorite ? <StarFill /> : <Star />}
          </Button>
          <Image
            className="me-2"
            src={imageSrc}
            alt="icon"
            style={{ marginRight: "15px", width: "16px", height: "16px" }}
          />
          <h5 style={{ margin: "0" }}>{leagueName}</h5>
        </div>
        <Button variant="secondary" size="sm" onClick={toggleVisibility}>
          {isOpen ? <ArrowUp /> : <ArrowDown />}
        </Button>
      </div>

      {isOpen && (
        <div className="mt-3">
          {/* Cabeçalho fixo das colunas */}
          <div className="d-flex list-group-item" style={{ fontWeight: "bold" }}>
            <div style={{ flex: 2 }}>Equipa</div>
            <div style={{ flex: 1, textAlign: "left" }}>Jogos</div>
            <div style={{ flex: 1, textAlign: "left" }}>Vitórias</div>
            <div style={{ flex: 1, textAlign: "left" }}>Empates</div>
            <div style={{ flex: 1, textAlign: "left" }}>Derrotas</div>
            <div style={{ flex: 1, textAlign: "left" }}>Pontos</div>
          </div>
          {/* Linhas de classificação */}
          <ul className="list-group">
            {standings.map((team, index) => (
              <StandingsItem key={index} team={team} index={index} />
            ))}
          </ul>
        </div>
      )}
    </Container>
  );
};

export default LeagueStandings;
