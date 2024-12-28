import React, { useState } from "react";
import { Button } from "react-bootstrap";
import { FilterAllButtonProps } from "./FilterAllButton";

const FilterScheduledButton: React.FC<FilterAllButtonProps> = ({setFilter, filter }) => {

    // Função que alterna o estado de seleção ao clicar no botão
    const handleClick = () => {
        setFilter("scheduled");
    };

    return (
        <div className="me-3">
            {/* Botão que alterna o estado isSelected */}
            <Button variant="secondary" onClick={handleClick} style={{ backgroundColor: filter === "scheduled" ? 'red' : '#0F2D37', borderColor: filter === "scheduled" ? 'red' : '#0F2D37' }}>
                Agendados
            </Button>
        </div>
    );
}

export default FilterScheduledButton;