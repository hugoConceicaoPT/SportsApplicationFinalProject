import React, { createContext, ReactNode, useContext, useState } from "react";

// Define a interface para os dados da liga
interface League {
  leagueId: string;
  leagueName: string;
  imageSrc: string;
}

// Criação do contexto
const LeagueContext = createContext<{
  league: League | undefined;
  setLeague: React.Dispatch<React.SetStateAction<League | undefined>>;
} | undefined>(undefined);

// Hook personalizado para acessar o contexto
export function useLeagueContext() {
  const leagueContext = useContext(LeagueContext);

  if (leagueContext === undefined) {
    throw new Error("useLeagueContext must be used within a LeagueProvider");
  }

  return leagueContext;
}

// Define as props do Provider
interface LeagueProviderProps {
  children: ReactNode;
}

// Componente Provider
const LeagueProvider: React.FC<LeagueProviderProps> = ({ children }) => {
  const [league, setLeague] = useState<League | undefined>(undefined);

  return (
    <LeagueContext.Provider value={{ league, setLeague }}>
      {children}
    </LeagueContext.Provider>
  );
};

export default LeagueProvider;
