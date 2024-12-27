import React, { useEffect, useState } from "react";
import ButtonLeague from "../PaginaPrincipal/buttonLeague";
import { config } from "../../config"; // Importa a configuração geral, incluindo o endereço do servidor
import { AppProps } from "../../main";
import axios from "axios"; // Usaremos axios para buscar os favoritos do utilizador
import ButtonTeam from "./buttonTeam";
import { Team } from "../PaginaEquipa/teamContext";

const LeagueFavorites: React.FC<AppProps> = ({ setState }) => {
  // Declara um estado local `ids` com `useState`.
  // O estado inicial é um array vazio.
  const [ids, setIds ] = useState<string[]>([]);
  const [teams, setTeams] = useState<string[]>([]);
  const [badge, setBadge] = useState<string[]>([]);

  // Função para buscar os favoritos do utilizador
  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const response = await axios.get(`${config.serverAddress}/favorites`); // API para buscar favoritos do utilizador
        const { teamIds } = response.data; // Supomos que a API retorna um array `leagueIds`
        const { teamBadges } = response.data;
        const { teamNames } = response.data;
        setTeams(teamNames || []);
        setBadge(teamBadges || []);
        setIds(teamIds || []); // Atualiza o estado com os IDs retornados
      } catch (error) {
        console.error("Erro ao buscar favoritos:", error);
      }
    };

    fetchFavorites();
  }, []);

  // Lista de todas as ligas disponíveis
  const filteredTeams = ids.filter(id => id.length === 6);

  return (
    <div className="favorite-team-block-container">
      {/* Verifica se há favoritos */}
      {filteredTeams.length === 0 ? (
        <div>Você não possui equipes favoritas.</div>
      ) : (
        filteredTeams.map((teamId, index) => (
          <ButtonTeam
            key={teamId}
            teamId={ids[index]}
            label={teams[index]}
            imageSrc={badge[index]}
            setState={setState}
          />
        ))
      )}
    </div>
  );
};

export default LeagueFavorites;
