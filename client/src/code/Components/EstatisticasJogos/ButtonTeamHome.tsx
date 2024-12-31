import React, { useEffect, useState } from "react";
import { Button, Image } from "react-bootstrap";
import { Star, StarFill } from "react-bootstrap-icons";
import { useTeamContext } from "../Context/TeamContext";
import axios from "axios";
import { config } from "../../config";
import { ButtonTeamProps } from "./ButtonTeamAway";
import { WorkerFavorites, IFavorites } from "../../favorites";

// Componente para exibir informações da equipa da casa
const ButtonTeamHome: React.FC<ButtonTeamProps> = ({ setState, teamId, teamBadge, teamName }) => {
// Estado para verificar se a equipa é favorita
  const [favorite, setFavorite] = useState(false);
  // Contexto para gerenciar informações da equipa
  const { setTeam } = useTeamContext();
  // Instância do WorkerFavorites para gerenciar favoritos
  const workerFavorites = new WorkerFavorites();

  // Função para alternar o estado de favorito
  const toggleFavorite = () => {
    // Atualiza os favoritos no back-end
      workerFavorites.toggleFavorite(teamId, teamName, teamBadge);
      // Alterna o estado local de favorito
      setFavorite(!favorite);
    };
  
  // Função para buscar os favoritos do utilizador ao carregar o componente
    useEffect(() => {
      const fetchFavorites = async () => {
        try {
          // Obtém os favoritos do utilizador
          const response = await workerFavorites.getFavorites();
          // Verifica se a equipa atual está nos favoritos
          setFavorite(response.teamIds.includes(teamId));
        } catch (error) {
          console.error("Erro ao buscar favoritos:", error);
          setFavorite(false);
        }
      };
      fetchFavorites();// Executa a função de busca
    }, [teamId]); // Atualiza sempre que o ID da equipa mudar

// Função para redirecionar para a página da equipa
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