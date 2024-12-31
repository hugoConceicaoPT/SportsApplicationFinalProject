import React from "react";
import { INextPastLeagueEvents } from "../../league";
import { Button, ListGroup } from "react-bootstrap";
import Image from "react-bootstrap/Image";
import { useTeamContext } from "../Context/TeamContext";
import { useEvent } from "../Context/EventContext";


// Propriedades aceitas pelo componente
interface ResultEventButtonProps {
  result: INextPastLeagueEvents;// Dados do evento
  index: number; // Índice do evento na lista
  setState: (state: any) => void; // Função para alterar o estado global
}

// Componente para exibir um botão de evento de resultado
const ResultEventButton: React.FC<ResultEventButtonProps> = ({ result, index, setState }) => {

  const { setTeam } = useTeamContext(); // Contexto para definir informações do time
  const { setSelectedEvent } = useEvent(); // Contexto para definir o evento selecionado

  // Ação ao clicar no botão de detalhes
  const handleClick = () => {
    setState({ view: "statistics" }); // Altera a visão para estatísticas
    setSelectedEvent(result); // Define o evento selecionado
  };

  // Redireciona para a página do time da casa
  const redirectToHomeTeamPage = () => {
    setState({ view: "teampage" });
    setTeam({
      teamId: result.idHomeTeam,
      teamName: result.strHomeTeam,
      imageSrc: result.strHomeTeamBadge
    });
  };

  // Redireciona para a página do time visitante
  const redirectToAwayTeamPage = () => {
    setState({ view: "teampage" });
    setTeam({
      teamId: result.idAwayTeam,
      teamName: result.strAwayTeam,
      imageSrc: result.strAwayTeamBadge
    });
  };

  return (
    <ListGroup.Item
      key={index}
      className="resultados"
    >
      {/* Badge e nome do time da casa */}
      <Image
        src={result.strHomeTeamBadge}
        alt="Home Team Badge"
        className="me-2"
        style={{ width: "24px", height: "24px", cursor: "pointer" }}
        onClick={redirectToHomeTeamPage}
      />
      <span className="me-2">{result.strHomeTeam}</span>
      <span className="results-vs">vs</span>

      {/* Badge e nome do time visitante */}
      <Image
        src={result.strAwayTeamBadge}
        alt="Away Team Badge"
        className="me-2"
        style={{ width: "24px", height: "24px", cursor: "pointer", marginLeft: "8px" }}
        onClick={redirectToAwayTeamPage}
      />
      <span>{result.strAwayTeam}</span>

      {/* Placar do jogo */}
      <span className="me-2 fw-bold">
        {result.intHomeScore} - {result.intAwayScore}
      </span>

      {/* Data do evento */}
      <span className="me-auto">
        {new Date(result.dateEvent).toLocaleDateString()}
      </span>

      {/* Botão para visualizar detalhes */}
      <Button variant="primary" size="sm" onClick={handleClick} className="ms-2">
        View Details
      </Button>
    </ListGroup.Item>
  );
};

export default ResultEventButton;
