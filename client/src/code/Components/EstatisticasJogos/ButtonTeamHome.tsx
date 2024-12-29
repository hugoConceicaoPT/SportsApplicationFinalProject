import React, { useEffect, useState } from "react";
import { Button, Image } from "react-bootstrap";
import { Star, StarFill } from "react-bootstrap-icons";
import { useTeamContext } from "../Context/TeamContext";
import axios from "axios";
import { config } from "../../config";
import { ButtonTeamProps } from "./ButtonTeamAway";

const ButtonTeamHome: React.FC<ButtonTeamProps> = ({ setState, teamId, teamBadge, teamName }) => {

  const [favorite, setFavorite] = useState(false);
  const { setTeam } = useTeamContext();

  const toggleFavorite = () => {
    const togFavorite = async () => {
      try {
        const response = await axios.post(`${config.serverAddress}/favorites`, {
          id: teamId,
          badge: teamBadge,
          name: teamName,
        });
      }
      catch (error) {
        console.error("Erro ao adicionar favorito:", error);
      }
    }
    togFavorite();

    setFavorite(!favorite);
  };

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const response = await axios.get(`${config.serverAddress}/favorites`, {
          withCredentials: true,
        });
        if (response.status === 200) {
          const { teamIds } = response.data;
          setFavorite(teamIds.includes(teamId));
        }
      } catch (error) {
        console.error("Erro ao buscar favoritos:", error);
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
      <Button
        style={{
          color: favorite ? "#FFCD00" : "white",
          backgroundColor: "black",
          borderColor: "black",
        }}
        className="leagueEvents-favorite me-4"
        onClick={toggleFavorite}
      >
        {favorite ? <StarFill size={25} /> : <Star size={25} />}
      </Button>
      <Button onClick={redirectToTeamPage} variant="secondary" className="bg-white" style={{ position: "relative" }}>
        <Image src={teamBadge} alt={teamName} width="100px" height="100px" />
        <span className="team-span text-center d-flex">{teamName}</span>
      </Button>
    </div>
  );
}

export default ButtonTeamHome;