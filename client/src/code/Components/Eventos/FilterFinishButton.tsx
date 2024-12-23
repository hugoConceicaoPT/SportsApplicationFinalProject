import React, { useState } from "react";
import { AppProps } from "../../main";
import { Button } from "react-bootstrap";

interface FilterFinishButtonsProps extends AppProps {
    setFilter: (filter: "all" | "finished" | "scheduled") => void;
    filter: string;
}

const FilterFinishButtons: React.FC<FilterFinishButtonsProps> = ({ setState, setFilter, filter }) => {
    const [isSelected, setIsSelected] = useState(false);

    // Função que alterna o estado de seleção ao clicar no botão
    const handleClick = () => {
        setIsSelected(!isSelected);
        setFilter('finished');
    };

    return (
        <div>
            {/* Botão que alterna o estado isSelected */}
            <Button variant="secondary" onClick={handleClick} style={{ backgroundColor: filter === "finished" ? 'red' : '#0F2D37', borderColor: filter === "finished" ? 'red' : '#0F2D37' }}>
                Terminados
            </Button>
        </div>
    );
}

export default FilterFinishButtons;