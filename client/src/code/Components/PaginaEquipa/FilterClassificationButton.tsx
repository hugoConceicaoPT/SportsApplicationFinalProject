import React from "react";
import { Button } from "react-bootstrap";



// Interface que define as propriedades aceitas pelo componente
export interface FilterButtonProps {
  // Função para alterar a view atual
    setView: (view: "standings" | "results" | "list") => void;
    view: string // Estado atual da view
}

// Componente funcional para exibir o botão de filtro de classificações
const FilterClassificationButton: React.FC<FilterButtonProps> = ({ view, setView }) => {
    return (
        <Button
            style={{
              backgroundColor: view === "standings" ? "red" : "gray",
              color: "white",
              borderColor: view === "standings" ? "red" : "gray",
            }}
            onClick={() => setView("standings")}
          >
            Classificações
          </Button>
    )
}

export default FilterClassificationButton;