import React from "react";
import { Button } from "react-bootstrap";
import { FilterAllButtonProps } from "./FilterAllButton";

const FilterOnLiveButton: React.FC<FilterAllButtonProps> = ({ setFilter, filter }) => {

    // Função que alterna o estado de seleção ao clicar no botão
    const handleClick = () => {
        setFilter("live");
    };

    return (
        <div className="me-3">
            {/* Botão que alterna o estado isSelected */}
            <Button variant="secondary" onClick={handleClick} style={{ backgroundColor: filter === "live" ? 'red' : '#0F2D37', borderColor: filter === "live" ? 'red' : '#0F2D37' }}>
                Ao Vivo
            </Button>
        </div>
    );
}

export default FilterOnLiveButton;