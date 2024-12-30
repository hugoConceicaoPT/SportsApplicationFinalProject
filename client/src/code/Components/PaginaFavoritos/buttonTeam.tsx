import React from "react";
import { Button } from "react-bootstrap";
import { useTeamContext } from "../Context/TeamContext";
import { AppProps } from "../../main";
import { useLeagueContext } from "../Context/LeagueContext";

interface ButtonTeamProps extends AppProps {
  teamId: string;
  imageSrc: string;
  label: string;
  leagueId: string; 
  leagueName: string; 
}

const ButtonTeam: React.FC<ButtonTeamProps> = ({ setState, imageSrc, label, teamId, leagueId, leagueName }) => {
  const { setTeam } = useTeamContext();
  const { setLeague } = useLeagueContext();

  const redirectToTeam = () => {
    // Atualiza o estado global e redireciona para a página do time
    setState({ view: "teampage" });
    setTeam({
      teamId,
      teamName: label,
      imageSrc,
    });
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
