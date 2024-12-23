import React from 'react';
import { Button } from 'react-bootstrap';

interface AppProps {
  setState: (state: { view: string }) => void;
  leagueId: string,
  imageSrc: string; 
  label: string; 
  isSubmitting?: boolean; 
}

const ButtonLeague: React.FC<AppProps> = ({ setState, imageSrc, label, leagueId }) => {
  const redirectToLeague = () => {
    setState({ view: "LeaguePage" });
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
        onClick={redirectToLeague}
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

export default ButtonLeague;
