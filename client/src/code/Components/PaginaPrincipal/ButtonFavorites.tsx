import React, { useState } from "react";
import { AppProps } from "../../main";
import Button from 'react-bootstrap/Button';
import { StarFill } from 'react-bootstrap-icons';


const ButtonFavorites: React.FC<AppProps> = ({ setState }) => {
    const [textColor, setTextColor] = useState(false);
    const toggleTextColor = () => {
        setTextColor(!textColor);
    };
    const handleClick = () => {
        setState({view:"favorites"});
    };
    return (
        <>
            <Button variant="outline-dark" onClick={handleClick} style={{color: textColor ? "white" : "darkgray" }} onMouseOver={toggleTextColor} onMouseOut={toggleTextColor} className="favoritesButton ps-2">
                <StarFill size={22} className="ps-0 pb-1 me-1 ms-0"/>Favoritos
            </Button>
        </>
    );
}

export default ButtonFavorites;