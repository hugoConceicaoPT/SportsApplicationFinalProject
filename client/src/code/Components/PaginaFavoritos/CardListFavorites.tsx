import React, { useEffect, useState } from "react";
import Card from 'react-bootstrap/Card';
import { AppProps } from "../../main";
import LeagueEvents from "../Eventos/LeagueEvents";
import { leagueIds } from "../../../../../server/src/leagueIds";
import { Container } from "react-bootstrap";
import DateButton from "../Eventos/DateButton";
import FilterAllButton from "../Eventos/FilterAllButton";
import FilterFinishButton from "../Eventos/FilterFinishButton";
import FilterOnLiveButton from "../Eventos/FilterOnLiveButton";
import FilterScheduledButton from "../Eventos/FilterScheduledButton";
import axios from "axios";
import { config } from "../../config";
import { WorkerFavorites, IFavorites } from "../../favorites";

// Componente funcional para exibir a lista de favoritos
const CardListFavorites: React.FC<AppProps> = ({ setState }) => {
  // Estado para armazenar a data selecionada
  const [selectedDate, setSelectedDate] = useState(new Date());
  // Estado para armazenar o filtro selecionado
  const [filter, setFilter] = useState<"all" | "finished" | "scheduled" | "live">("all");
   // Estado para armazenar os favoritos do usuário
  const [favorites, setFavorites] = useState<IFavorites>();
   // Instância do worker para gerenciar favoritos
  const workerFavorites = new WorkerFavorites();

// Efeito para buscar os favoritos do usuário ao montar o componente
  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const response = await workerFavorites.getFavorites(); // Obtém os favoritos do usuário
        setFavorites(response); // Atualiza o estado com os favoritos recebidos
      } catch (error) {
        console.error("Erro ao buscar favoritos:", error);
      }
    };

    fetchFavorites(); // Chama a função para buscar os favoritos
  }, []);

  // Função para renderizar os eventos de uma liga específica
  const renderLeagueEvents = (leagueId: string, leagueName: string, imageSrc: string) => {
    return (
      <LeagueEvents
        key={leagueId}
        filter={filter}
        selectedDate={selectedDate}
        setState={setState}
        leagueId={leagueId}
        leagueName={leagueName}
        imageSrc={imageSrc}
      />
    );
  };

  return (
    <Container className="d-flex justify-content-center mt-4">
      <Card style={{ width: "46rem", backgroundColor: "#0b2129" }} className="d-flex justify-content-center">
        <Card.Body>
          <div className="d-flex justify-content-between mb-4">
            <div className="d-flex">
              <FilterAllButton filter={filter} setFilter={setFilter} />
              <FilterOnLiveButton filter={filter} setFilter={setFilter} />
              <FilterScheduledButton filter={filter} setFilter={setFilter} />
              <FilterFinishButton filter={filter} setFilter={setFilter} />
            </div>
            <div className="ms-auto">
              <DateButton date={selectedDate} setDate={setSelectedDate} />
            </div>
          </div>
          {favorites?.leagueIds.map((leagueId, index) =>
            renderLeagueEvents(leagueId, favorites.leagueName[index], favorites.leagueBadge[index])
          )}
        </Card.Body>
      </Card>
    </Container>
  );
}

export default CardListFavorites;