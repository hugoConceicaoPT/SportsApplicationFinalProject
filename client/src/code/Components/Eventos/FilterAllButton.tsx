import React, { useState } from "react";
import { AppProps } from "../../main";
import CardListLeague from "../PaginaPrincipal/CardListLeagues";
import { Button } from "react-bootstrap";


const FilterAllButton: React.FC<AppProps> = ({ setState }) => {
    const [isSelected, setIsSelected] = useState(false);

    // Função que alterna o estado de seleção ao clicar no botão
    const handleClick = () => {
        setIsSelected(!isSelected);
    };

    return (
        <div>
            {/* Botão que alterna o estado isSelected */}
            <Button variant="secondary" onClick={handleClick} style={{ backgroundColor: isSelected ? 'red' : '#0F2D37', borderColor: isSelected ? 'red' : '#0F2D37' }}>
                Filter All
            </Button>
        </div>
    );
}

export default FilterAllButton;