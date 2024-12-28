import React, { useEffect, useState } from "react";
import ButtonLeague from "../PaginaPrincipal/buttonLeague";
import { config } from "../../config"; // Importa a configuração geral, incluindo o endereço do servidor
import { AppProps } from "../../main";
import axios from "axios"; // Usaremos axios para buscar os favoritos do utilizador
import ButtonTeam from "./buttonTeam";

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
        const { teamIds, teamName, teamBadge } = response.data; // Supomos que a API retorna arrays `teamIds`, `teamNames` e `teamBadges`
        setTeams(teamName || []);
        setBadge(teamBadge || []);
        setIds(teamIds || []); // Atualiza o estado com os IDs retornados
      } catch (error) {
        console.error("Erro ao buscar favoritos:", error);
      }
    };

    fetchFavorites();
  }, []);

  return (
    <div className="favorite-team-block-container">
      {/* Verifica se há favoritos */}
      {ids.length === 0 ? (
        <div>Você não possui equipes favoritas.</div>
      ) : (
        ids.map((teamId, index) => (
          <ButtonTeam
            key={teamId}
            setState={setState}
            teamId={teamId}
            label={teams[index]}
            imageSrc={badge[index]}
          />
        ))
      )}
    </div>
  );
};

export default LeagueFavorites;
