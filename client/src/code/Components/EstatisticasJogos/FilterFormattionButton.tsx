import React from "react";
import { Button } from "react-bootstrap";
import { FilterAllButtonProps } from "./FilterClassificationButton";

// Define o componente funcional para o botão de filtro de "Formações".
const FilterFormationButton: React.FC<FilterAllButtonProps> = ({ setFilter, filter }) => {

    // Função que alterna o estado de seleção ao clicar no botão
    const handleClick = () => {
        setFilter("formation");
    };

    return (
        <div className="me-4">
            {/* Botão que alterna o estado isSelected */}
            <Button variant="secondary" onClick={handleClick} style={{ backgroundColor: filter === "formation" ? 'red' : '#0F2D37', borderColor: filter === "formation" ? 'red' : '#0F2D37' }}>
                Formações
            </Button>
        </div>
    );
}

export default FilterFormationButton;