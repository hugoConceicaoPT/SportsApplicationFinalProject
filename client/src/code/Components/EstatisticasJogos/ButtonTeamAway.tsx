import React, { useEffect, useState } from "react";
import { AppProps } from "../../main";
import { Button, Image } from "react-bootstrap";
import { Star, StarFill } from "react-bootstrap-icons";
import { useTeamContext } from "../Context/TeamContext";
import axios from "axios";
import { config } from "../../config";
import { WorkerFavorites, IFavorites } from "../../favorites";


// Define as propriedades esperadas pelo componente
export interface ButtonTeamProps extends AppProps {
  teamId: string,
  teamBadge: string,
  teamName: string
}

// Componente funcional para exibir informações da equipa visitante
const ButtonTeamAway: React.FC<ButtonTeamProps> = ({ setState, teamId, teamBadge, teamName }) => {

  const [favorite, setFavorite] = useState(false);// Estado para verificar se a equipa é favorito
  const { setTeam } = useTeamContext(); // Contexto para definir informações da equipa
  const workerFavorites = new WorkerFavorites();// Instância do WorkerFavorites para gerenciar favoritos

  // Função para adicionar ou remover o equipa dos favoritos
  const toggleFavorite = () => {
    workerFavorites.toggleFavorite(teamId, teamName, teamBadge); // Atualiza os favoritos no back-end
    setFavorite(!favorite); // Alterna o estado local
  };

 // UseEffect para buscar favoritos ao carregar o componente
  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const response = await workerFavorites.getFavorites(); // Obtém os favoritos do usuário
        setFavorite(response.teamIds.includes(teamId));// Verifica se a equipa atual está nos favoritos
      } catch (error) {
        console.error("Erro ao buscar favoritos:", error);
        setFavorite(false);// Define como não favorito em caso de erro
      }
    };
    fetchFavorites(); // Chama a função de busca
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