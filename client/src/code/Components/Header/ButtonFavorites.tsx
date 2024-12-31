import React, { useState } from "react";
import { AppProps } from "../../main";
import Button from 'react-bootstrap/Button';
import { StarFill } from 'react-bootstrap-icons';

// Componente funcional para representar o botão de favoritos
const ButtonFavorites: React.FC<AppProps> = ({ setState }) => {
    const [textColor, setTextColor] = useState(false);  // Estado para alternar a cor do texto
   // Função que alterna a cor do texto ao passar o mouse sobre o botão
    const toggleTextColor = () => {
        setTextColor(!textColor);
    };
       // Função para alterar a visão para a página de favoritos
    const handleClick = () => {
        setState({view:"favorites"}); // Atualiza o estado global para exibir a página de favoritos
    };
    return (
        <>
            <Button variant="outline-dark" onClick={handleClick} style={{color: textColor ? "white" : "darkgray" }} onMouseOver={toggleTextColor} onMouseOut={toggleTextColor} className="favoritesButton ps-2">
                <StarFill size={22} className="ps-0 pb-1 me-1 ms-0"/>Favoritos
            </Button>
        </>
    );
}

export default ButtonFavorites;