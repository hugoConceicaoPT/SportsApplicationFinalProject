import React, { useEffect, useState } from "react";
import ButtonLeague from "../PaginaPrincipal/buttonLeague";
import { config } from "../../config"; // Importa a configuração geral, incluindo o endereço do servidor
import { AppProps } from "../../main";
import { leagueIds } from "../../../../../server/src/leagueIds"; // Importa os IDs das ligas
import axios from "axios"; // Usaremos axios para buscar os favoritos do utilizador
import { WorkerFavorites, IFavorites } from "../../favorites";

// Componente funcional para exibir as ligas favoritas
const LeagueFavorites: React.FC<AppProps> = ({ setState }) => {
  // Declara um estado local `ids` com `useState`.
  // O estado inicial é um array vazio.
  const [ids, setIds ] = useState<string[]>([]);
  const workerFavorites = new WorkerFavorites();
  // Função para buscar os favoritos do utilizador
  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        // Faz uma requisição para obter os favoritos do usuário
        const response = await workerFavorites.getFavorites(); 
        // Extrai os IDs das ligas favoritas
        const { leagueIds } = response; // Supomos que a API retorna um array `leagueIds`
        setIds(leagueIds || []); // Atualiza o estado com os IDs retornados
      } catch (error) {
        console.error("Erro ao buscar favoritos:", error);
      }
    };

    fetchFavorites();// Chama a função para buscar os favoritos
  }, []); // Executa o efeito apenas uma vez ao montar o componente

  // Lista de todas as ligas disponíveis
  const allLeagues = [
    {
      id: leagueIds.premierLeague,
      imageSrc: "icons/Inglaterra.png",
      label: "Premier League",
    },
    {
      id: leagueIds.primeiraLiga,
      imageSrc: "icons/Portugal.png",
      label: "Liga Portugal",
    },
    {
      id: leagueIds.bundesliga,
      imageSrc: "icons/Alemanha.png",
      label: "Bundesliga",
    },
    {
      id: leagueIds.laLiga,
      imageSrc: "icons/Espanha.png",
      label: "La Liga",
    },
    {
      id: leagueIds.ligue1,
      imageSrc: "icons/França.png",
      label: "Ligue 1",
    },
    {
      id: leagueIds.serieA,
      imageSrc: "icons/Italia.png",
      label: "Serie A",
    },
  ];

  // Filtra as ligas favoritas
  const filteredLeagues = allLeagues.filter((league) => ids.includes(league.id));

  return (
    <div className="favorite-league-block-container">
      {/* Verifica se há favoritos */}
      {filteredLeagues.length === 0 ? (
        <div>Você não possui ligas favoritas.</div>
      ) : (
        filteredLeagues.map((league) => (
          <ButtonLeague
            key={league.id}
            setState={setState}
            imageSrc={league.imageSrc}
            label={league.label}
            leagueId={league.id}
          />
        ))
      )}
    </div>
  );
};

export default LeagueFavorites;
