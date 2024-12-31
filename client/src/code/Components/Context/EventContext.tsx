// Importações necessárias
import React, { createContext, useContext, useState } from "react";
import { ILiveEvents, INextPastLeagueEvents } from "../../league"; // Interfaces para eventos ao vivo e eventos futuros/passados

// Interface do contexto para definir o tipo do estado e função de atualização
interface EventContextType {
  selectedEvent: ILiveEvents | INextPastLeagueEvents | null; // Evento selecionado, ou null se nenhum for selecionado
  setSelectedEvent: (event: ILiveEvents | INextPastLeagueEvents | null) => void; // Função para atualizar o evento selecionado
}

// Criação do contexto com um valor inicial indefinido
const EventContext = createContext<EventContextType | undefined>(undefined);

// Provedor do contexto
export const EventProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Estado para armazenar o evento selecionado
  const [selectedEvent, setSelectedEvent] = useState<ILiveEvents | INextPastLeagueEvents | null>(null);

  return (
    // Provedor do contexto que passa o estado e a função de atualização
    <EventContext.Provider value={{ selectedEvent, setSelectedEvent }}>
      {children} {/* Renderiza os componentes filhos */}
    </EventContext.Provider>
  );
};

// Hook personalizado para acessar o contexto
export const useEvent = () => {
  const context = useContext(EventContext); // Obtém o contexto

  // Verifica se o contexto foi usado corretamente
  if (!context) {
    throw new Error("useEvent must be used within an EventProvider"); // Lança erro se usado fora do provedor
  }

  return context; // Retorna o contexto
};
