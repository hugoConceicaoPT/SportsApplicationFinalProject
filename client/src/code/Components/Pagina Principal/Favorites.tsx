import React from "react";
import { AppProps } from "../main";
import Header from "./Header";


const Favorites: React.FC<AppProps> = ({setState}) => {
    return (
        <>
            <Header setState={setState}/>
        </>
    );
}

export default Favorites;