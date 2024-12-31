import React from "react";
import { Button } from "react-bootstrap";
import { useTeamContext } from "../Context/TeamContext";
import { AppProps } from "../../main";
import { useLeagueContext } from "../Context/LeagueContext";

// Interface que define as propriedades aceitas pelo componente
interface ButtonTeamProps extends AppProps {
  teamId: string; // ID único da equipa
  imageSrc: string;// imagem da equipa
  label: string;  // Nome da equipa a ser exibido no botão
  leagueId: string;   // ID da liga associada á quipa
  leagueName: string; // Nome da liga associada ao time
}

// Componente funcional para representar um botão de redirecionamento para a página do time
const ButtonTeam: React.FC<ButtonTeamProps> = ({ setState, imageSrc, label, teamId, leagueId, leagueName }) => {
  const { setTeam } = useTeamContext();// Hook para atualizar o contexto da equipa
  const { setLeague } = useLeagueContext(); // Hook para atualizar o contexto da liga

  // Função para redirecionar para a página da equipa
  const redirectToTeam = () => {
    // Atualiza o estado global e redireciona para a página da equipa
    setState({ view: "teampage" });
    // Atualiza o contexto com as informações da equi+a selecionada
    setTeam({
      teamId,
      teamName: label,
      imageSrc,
    });
    // Atualiza o contexto da liga associada a equipa
    setLeague({
      leagueId,
      leagueName,
      imageSrc: ''
    })
  };

  return (
    <Button
      type="button"
      className="custom-button"
      style={{
        backgroundColor: "black",
        color: "white",
        fontSize: "0.9em",
        display: "flex",
        alignItems: "center",
        padding: "5px 10px",
        borderRadius: "5px",
        border: "none",
        textDecoration: "none",
      }}
      onClick={redirectToTeam}
    >
      <img
        src={imageSrc}
        alt={`${label} icon`}
        className="custom-button-icon"
        style={{ marginRight: "8px", width: "24px", height: "24px" }}
      />
      {label}
    </Button>
  );
};

export default ButtonTeam;
