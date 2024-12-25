import React from "react";
import { Button } from "react-bootstrap";

interface FilterAllButtonProps {
    setFilter: (filter: "formation" | "game" | "statistic" | "classification") => void;
    filter: string
}

const FilterClassificationButton: React.FC<FilterAllButtonProps> = ({ setFilter, filter }) => {

    // Função que alterna o estado de seleção ao clicar no botão
    const handleClick = () => {
        setFilter("classification");
    };

    return (
        <div>
            {/* Botão que alterna o estado isSelected */}
            <Button variant="secondary" onClick={handleClick} style={{ backgroundColor: filter === "classification" ? 'red' : '#0F2D37', borderColor: filter === "classification" ? 'red' : '#0F2D37' }}>
                Classificação
            </Button>
        </div>
    );
}

export default FilterClassificationButton;