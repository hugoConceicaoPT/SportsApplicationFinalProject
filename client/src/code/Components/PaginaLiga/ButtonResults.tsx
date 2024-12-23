import React, { useState } from "react";
import { AppProps } from "../../main";
import Button from 'react-bootstrap/Button';
import { IoFootballOutline } from "react-icons/io5";


const ButtonResults: React.FC<AppProps> = ({ setState }) => {
    const [textColor, setTextColor] = useState(false);
    const toggleTextColor = () => {
        setTextColor(!textColor);
    };
    const handleClick = () => {
        setState({view:"home"});
    };
    return (
        <>
            <Button variant="outline-dark" onClick={handleClick} style={{color: textColor ? "white" : "darkgray" }} onMouseOver={toggleTextColor} onMouseOut={toggleTextColor} className="favoritesButton ps-2">
                <IoFootballOutline size={22} className="ps-0 pb-1 me-1 ms-0"/>Resultados
            </Button>
        </>
    );
}

export default ButtonResults;