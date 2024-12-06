import React from 'react';
import { Button } from 'react-bootstrap';

interface AppProps {
  setState: (state: { view: string }) => void;
  imageSrc: string; 
  label: string; 
  isSubmitting?: boolean; 
}

const ButtonLeague: React.FC<AppProps> = ({ setState, imageSrc, label }) => {
  const redirectToLeague = () => {
    setState({ view: "register" });
  };

  return (
    <div>
      <Button
        type="submit"
        className="custom-button"
        onClick={redirectToLeague}
      >
        <img
          src={imageSrc} // A imagem agora vem da propriedade
          alt="icon"
          className="custom-button-icon"
        />
        {label}
      </Button>
    </div>
  );
}
  

export default ButtonLeague;
