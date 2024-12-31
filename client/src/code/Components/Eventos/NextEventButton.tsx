// Importações necessárias para o componente
import React from "react";
import { AppProps } from "../../main"; // Props principais da aplicação
import { ILiveEvents, INextPastLeagueEvents } from "../../league"; // Tipos para eventos
import ButtonEventFinished from "./ButtonEventFinished"; // Botão para eventos finalizados
import ButtonEventLive from "./ButtonEventLive"; // Botão para eventos ao vivo
import ButtonEventScheluded from "./ButtonEventScheluded"; // Botão para eventos agendados

// Interface que define as props esperadas pelo componente NextEventButton
interface INextEventButton extends AppProps {
  event: INextPastLeagueEvents | ILiveEvents, // Evento pode ser do tipo INextPastLeagueEvents ou ILiveEvents
  index: number, // Índice do evento
  leagueId: string, // ID da liga
  leagueName: string, // Nome da liga
  imageSrc: string // URL da imagem associada ao evento ou liga
}

// Componente funcional que renderiza um botão baseado no status do evento
const NextEventButton: React.FC<INextEventButton> = ({ setState, event, index, leagueId, leagueName, imageSrc }) => {
  
  // Determina o progresso do jogo (se disponível)
  const gameProgress = "strProgress" in event ? event.strProgress : null;

  // Flags para identificar o status do jogo
  const isGameFinished = event.strStatus === "Match Finished"; // Jogo finalizado
  const isGameScheluded = event.strStatus === "Not Started"; // Jogo agendado, ainda não iniciado
  const isGameLive = gameProgress !== null; // Jogo ao vivo (progresso não é nulo)

  return (
      <li key={index} className="list-group-item-event">
        {isGameFinished ? ( 
          // Renderiza botão para jogos finalizados
          <ButtonEventFinished 
            setState={setState} 
            event={event} 
            leagueId={leagueId} 
            leagueName={leagueName} 
            imageSrc={imageSrc} 
          />
        ) : isGameScheluded ? (
          // Renderiza botão para jogos agendados
          <ButtonEventScheluded event={event} />
        ) : isGameLive ? (
          // Renderiza botão para jogos ao vivo
          <ButtonEventLive 
            setState={setState} 
            event={event} 
            leagueId={leagueId} 
            leagueName={leagueName} 
            imageSrc={imageSrc} 
          />
        ) : (
          // Caso nenhuma das condições seja atendida, não renderiza nada
          <>
          </>
        )}
      </li>
  );
}

// Exporta o componente para ser usado em outros arquivos
export default NextEventButton;
