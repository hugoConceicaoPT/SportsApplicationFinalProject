import React, { useState } from "react";
import { AppProps } from "../../main";
import { Button } from "react-bootstrap";

interface FilterAllButtonProps {
    setFilter: (filter: "all" | "finished" | "scheduled" | "live") => void;
    filter: string
}

const FilterAllButton: React.FC<FilterAllButtonProps> = ({ setFilter, filter }) => {

    // Função que alterna o estado de seleção ao clicar no botão
    const handleClick = () => {
        setFilter("all");
    };

    return (
        <div className="me-3">
            {/* Botão que alterna o estado isSelected */}
            <Button variant="secondary" onClick={handleClick} style={{ backgroundColor: filter === "all" ? 'red' : '#0F2D37', borderColor: filter === "all" ? 'red' : '#0F2D37' }}>
                Todos
            </Button>
        </div>
    );
}

export default FilterAllButton;