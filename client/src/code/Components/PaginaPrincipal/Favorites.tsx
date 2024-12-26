import React from "react";
import { AppProps } from "../../main";
import Header from "./Header";
import LeagueFavorites from "../PaginaFavoritos/LeagueFavorites";


const Favorites: React.FC<AppProps> = ({setState}) => {
    return (
        <>
            
            <LeagueFavorites setState={setState}/>
            <Header setState={setState}/>
        </>
    );
}

export default Favorites;