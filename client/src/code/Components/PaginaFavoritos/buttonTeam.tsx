import React from 'react';
import { Button } from 'react-bootstrap';
import { useTeamContext } from '../PaginaEquipa/teamContext';

interface AppProps {
  setState: (state: { view: string }) => void;
  teamId: string,
  imageSrc: string; 
  label: string; 
  isSubmitting?: boolean; 
}

const ButtonTeam: React.FC<AppProps> = ({ setState, imageSrc, label, teamId }) => {
  const { setTeam } = useTeamContext();
  const redirectToTeam = () => {
    setState({ view: "teampage" });
    setTeam({
      teamId,
      teamName: label,
      imageSrc
    })
  };

  return (
    <div>
      <Button
        type="submit"
        className="custom-button w-30 pb-2"
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
          alt="icon"
          className="custom-button-icon"
          style={{ marginRight: "8px" }}
        />
        {label}
      </Button>
    </div>
  );
};

export default ButtonTeam;
