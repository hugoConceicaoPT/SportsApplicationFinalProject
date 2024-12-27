import React, { createContext, useContext, useState, ReactNode } from "react";

// Define o tipo para os dados da equipe
export interface Team {
  teamId: string;
  teamName: string;
  imageSrc: string;
}

// Define o tipo para o contexto
interface TeamContextProps {
  team: Team | null;
  setTeam: (team: Team) => void;
}

// Cria o contexto com valores iniciais
const TeamContext = createContext<TeamContextProps>({
  team: null,
  setTeam: () => {},
});

// Provider para encapsular a aplicação
export const TeamProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [team, setTeam] = useState<Team | null>(null);

  return (
    <TeamContext.Provider value={{ team, setTeam }}>
      {children}
    </TeamContext.Provider>
  );
};

// Hook para consumir o contexto
export const useTeamContext = () => {
  const context = useContext(TeamContext);
  if (!context) {
    throw new Error("useTeamContext must be used within a TeamProvider");
  }
  return context;
};

// Exporta o contexto
export default TeamContext;
