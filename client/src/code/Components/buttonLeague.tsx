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
        size="sm"
        variant="link"
        type="submit"
        style={{
          backgroundColor: "black",
          color: "white",
          fontSize: "0.9em",
          display: "flex",
          alignItems: "center",
          padding: "5px 10px",
          borderRadius: "5px",
          border: "none"
        }}
        className="w-30 pb-2"
        disabled={false} // Substitua `false` por `isSubmitting` se necessário
        onClick={redirectToLeague}
      >
        <img
          src={imageSrc} // A imagem agora vem da propriedade
          alt="icon"
          style={{ marginRight: "5px", width: "16px", height: "16px" }}
        />
        {label}
      </Button>
    </div>
  );
};

export default ButtonLeague;
