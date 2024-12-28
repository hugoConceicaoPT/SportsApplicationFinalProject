import React, { createContext, useContext, useState, ReactNode } from "react";

// Define o tipo para os dados da equipe
interface Team {
  teamId: string;
  teamName: string;
  imageSrc: string;
}

// Cria o contexto com valores iniciais
const TeamContext = createContext<{
  team: Team | undefined,
  setTeam:  React.Dispatch<React.SetStateAction<Team | undefined>>,
} | undefined>(undefined);

// Hook para consumir o contexto
export const useTeamContext = () => {
  const teamContext = useContext(TeamContext);
  if (teamContext === undefined) {
    throw new Error("useTeamContext must be used within a TeamProvider");
  }
  return teamContext;
};

interface TeamProviderProps {
  children: ReactNode;
}


// Provider para encapsular a aplicação
export const TeamProvider: React.FC<TeamProviderProps> = ({ children }) => {
  const [team, setTeam] = useState<Team | undefined>(undefined);

  return (
    <TeamContext.Provider value={{ team, setTeam }}>
      {children}
    </TeamContext.Provider>
  );
};

// Exporta o contexto
export default TeamContext;
