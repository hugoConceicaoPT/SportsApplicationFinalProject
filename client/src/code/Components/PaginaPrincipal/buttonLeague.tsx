import React from 'react';
import { Button } from 'react-bootstrap';
import { useLeagueContext } from '../Context/LeagueContext';
import { AppProps } from '../../main';

interface ButtonLeagueProps extends AppProps {
  leagueId: string,
  imageSrc: string; 
  label: string; 
  isSubmitting?: boolean; 
}

const ButtonLeague: React.FC<ButtonLeagueProps> = ({ setState, imageSrc, label, leagueId }) => {
  const { setLeague } = useLeagueContext();
  const redirectToLeague = () => {
    setState({ view: "LeaguePage" });
    setLeague({
      leagueId,
      leagueName: label,
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
