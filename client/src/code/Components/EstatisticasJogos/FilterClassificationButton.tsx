import React from "react";
import { Button } from "react-bootstrap";

// Define a interface `FilterAllButtonProps` que especifica as propriedades esperadas pelo componente.
// - `setFilter`: Função para atualizar o estado do filtro.
// - `filter`: String que indica qual filtro está atualmente ativo.
export interface FilterAllButtonProps {
    setFilter: (filter: "formation" | "game" | "statistic" | "classification") => void;
    filter: string
}

// Componente funcional para o botão de filtro de "Classificação".
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