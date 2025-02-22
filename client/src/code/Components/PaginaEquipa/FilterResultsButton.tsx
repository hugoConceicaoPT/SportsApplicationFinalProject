import React from "react";
import { Button } from "react-bootstrap";
import { FilterButtonProps } from "./FilterClassificationButton";

// Componente funcional para o botão que altera a visão para "results"
const FilterResultsButton: React.FC<FilterButtonProps> = ({ view, setView }) => {
    return (
        <Button
            style={{
                backgroundColor: view === "results" ? "red" : "gray",
                color: "white",
                borderColor: view === "results" ? "red" : "gray",
            }}
            onClick={() => setView("results")}
        >
            Resultados
        </Button>
    )
}

export default FilterResultsButton;