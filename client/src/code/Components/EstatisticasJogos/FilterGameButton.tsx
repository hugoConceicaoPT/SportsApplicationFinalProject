import React, { useState } from "react";
import { Button } from "react-bootstrap";

interface FilterAllButtonProps {
    setFilter: (filter: "formation" | "game" | "statistic" | "classification") => void;
    filter: string
}

const FilterGameButton: React.FC<FilterAllButtonProps> = ({ setFilter, filter }) => {

    // Função que alterna o estado de seleção ao clicar no botão
    const handleClick = () => {
        setFilter("game");
    };

    return (
        <div className="me-4">
            {/* Botão que alterna o estado isSelected */}
            <Button variant="secondary" onClick={handleClick} style={{ backgroundColor: filter === "game" ? 'red' : '#0F2D37', borderColor: filter === "game" ? 'red' : '#0F2D37' }}>
                Jogo
            </Button>
        </div>
    );
}

export default FilterGameButton;