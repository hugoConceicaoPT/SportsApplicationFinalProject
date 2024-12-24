import React from "react";
import ButtonLeague from "./buttonLeague";
import { AppProps } from "../../main";
import { leagueIds } from "../../../../../server/src/leagueIds"; // Importa os IDs das ligas

const LeagueBlock: React.FC<AppProps> = ({ setState }) => {
  return (
      <div className="league-block-container">
        {/* Botões configurados com leagueIds */}
        <ButtonLeague
          setState={setState}
          imageSrc="icons/Inglaterra.png"
          label="Premier League"
          leagueId={leagueIds.premierLeague}
        />
        <ButtonLeague
          setState={setState}
          imageSrc="icons/Portugal.png"
          label="Liga Portugal"
          leagueId={leagueIds.primeiraLiga}
        />
        <ButtonLeague
          setState={setState}
          imageSrc="icons/Alemanha.png"
          label="Bundesliga"
          leagueId={leagueIds.bundesliga}
        />
        <ButtonLeague
          setState={setState}
          imageSrc="icons/Espanha.png"
          label="La Liga"
          leagueId={leagueIds.laLiga}
        />
        <ButtonLeague
          setState={setState}
          imageSrc="icons/França.png"
          label="Ligue 1"
          leagueId={leagueIds.ligue1}
        />
        <ButtonLeague
          setState={setState}
          imageSrc="icons/Italia.png"
          label="Serie A"
          leagueId={leagueIds.serieA}
        />
      </div>
  );
};

export default LeagueBlock;
