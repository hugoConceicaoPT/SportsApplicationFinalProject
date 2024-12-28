import React from "react";
import { Button } from "react-bootstrap";
import { FilterButtonProps } from "./FilterClassificationButton";

const FilterListButton: React.FC<FilterButtonProps> = ({ view, setView }) => {

    return (
        <Button
            style={{
                backgroundColor: view === "list" ? "red" : "gray",
                color: "white",
                borderColor: view === "list" ? "red" : "gray",
            }}
            onClick={() => setView("list")}
        >
            Lista
        </Button>
    )
}

export default FilterListButton;