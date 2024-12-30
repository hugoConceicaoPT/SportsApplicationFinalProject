import React, { useEffect, useState } from "react";
import { AppProps } from "../../main";
import { Button, Image } from "react-bootstrap";
import { Star, StarFill } from "react-bootstrap-icons";
import { useTeamContext } from "../Context/TeamContext";
import axios from "axios";
import { config } from "../../config";
import { WorkerFavorites, IFavorites } from "../../favorites";

export interface ButtonTeamProps extends AppProps {
  teamId: string,
  teamBadge: string,
  teamName: string
}

const ButtonTeamAway: React.FC<ButtonTeamProps> = ({ setState, teamId, teamBadge, teamName }) => {

  const [favorite, setFavorite] = useState(false);
  const { setTeam } = useTeamContext();
  const workerFavorites = new WorkerFavorites();

  const toggleFavorite = () => {
    workerFavorites.toggleFavorite(teamId, teamName, teamBadge);
    setFavorite(!favorite);
  };


  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const response = await workerFavorites.getFavorites();
        setFavorite(response.teamIds.includes(teamId));
      } catch (error) {
        console.error("Erro ao buscar favoritos:", error);
        setFavorite(false);
      }
    };
    fetchFavorites();
  }, [teamId]);


  const redirectToTeamPage = () => {
    setState({ view: "teampage" });
    setTeam({
      teamId,
      teamName,
      imageSrc: teamBadge
    })
  }

  return (
    <div className="text-center">
      <Button onClick={redirectToTeamPage} variant="secondary" className="bg-white" style={{ position: "relative" }}>
        <Image src={teamBadge} alt={teamName} width="100px" height="100px" />
        <span className="team-span text-center d-flex">{teamName}</span>
      </Button>
      <Button
        style={{
          color: favorite ? "#FFCD00" : "white",
          backgroundColor: "black",
          borderColor: "black",
        }}
        className="leagueEvents-favorite ms-4"
        onClick={toggleFavorite}
      >
        {favorite ? <StarFill size={25} /> : <Star size={25} />}
      </Button>
    </div>
  );
}

export default ButtonTeamAway;