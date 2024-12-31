import React, { useState } from "react";
import { AppProps } from "../../main";
import Button from 'react-bootstrap/Button';
import { IoFootballOutline } from "react-icons/io5";

// Componente funcional para representar o botão de resultados
const ButtonResults: React.FC<AppProps> = ({ setState }) => {
    const [textColor, setTextColor] = useState(false); // Estado para alternar a cor do texto do botão
    // Função que alterna a cor do texto ao passar o mouse sobre o botão
    const toggleTextColor = () => {
        setTextColor(!textColor);
    };
    // Função para redirecionar para a página inicial de resultado
    const handleClick = () => {
        // Atualiza o estado global para exibir a página de resultados
        setState({view:"home"});
    };
    return (
        <>
            <Button variant="outline-dark" onClick={handleClick} style={{color: textColor ? "white" : "darkgray" }} onMouseOver={toggleTextColor} onMouseOut={toggleTextColor} className="favoritesButton ps-2">
                <IoFootballOutline size={22} className="ps-0 pb-1 me-1 ms-0"/>Resultados
            </Button>
        </>
    );
}

export default ButtonResults;