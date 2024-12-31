import React from 'react';
import { Button } from 'react-bootstrap';
import { useLeagueContext } from '../Context/LeagueContext';
import { AppProps } from '../../main';


// Interface para as propriedades do componente
interface ButtonLeagueProps extends AppProps {
  leagueId: string,
  imageSrc: string; 
  label: string; 
  isSubmitting?: boolean; 
}

// Componente funcional para representar um botão de liga
const ButtonLeague: React.FC<ButtonLeagueProps> = ({ setState, imageSrc, label, leagueId }) => {
  const { setLeague } = useLeagueContext();

  // Função para redirecionar para a página da liga
  const redirectToLeague = () => {
    // Atualiza o estado para exibir a página da liga
    setState({ view: "LeaguePage" });

    // Define os detalhes da liga no contexto
    setLeague({
      leagueId,
      leagueName: label,
      imageSrc
    });
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
        onClick={redirectToLeague} // Aciona o redirecionamento ao clicar
      >
        {/* Exibe a imagem do ícone */}
        <img
          src={imageSrc}
          alt="icon"
          className="custom-button-icon"
          style={{ marginRight: "8px" }}
        />
        {label} {/* Exibe o texto do botão */}
      </Button>
    </div>
  );
};

export default ButtonLeague;
