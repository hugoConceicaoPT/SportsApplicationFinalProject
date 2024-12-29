import React from "react";
import { Button } from "react-bootstrap";

export interface FilterButtonProps {
    setView: (view: "standings" | "results" | "list") => void;
    view: string
}


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