import React, { useState } from "react";
import { Button } from "react-bootstrap";
import { FilterAllButtonProps } from "./FilterAllButton";

const FilterFinishButtons: React.FC<FilterAllButtonProps> = ({ setFilter, filter }) => {
    const [isSelected, setIsSelected] = useState(false);

    // Função que alterna o estado de seleção ao clicar no botão
    const handleClick = () => {
        setIsSelected(!isSelected);
        setFilter('finished');
    };

    return (
        <div>
            {/* Botão que alterna o estado isSelected */}
            <Button  variant="secondary" onClick={handleClick} style={{ backgroundColor: filter === "finished" ? 'red' : '#0F2D37', borderColor: filter === "finished" ? 'red' : '#0F2D37' }}>
                Terminados
            </Button>
        </div>
    );
}

export default FilterFinishButtons;