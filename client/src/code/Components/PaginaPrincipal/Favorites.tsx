import React from "react";
import { AppProps } from "../../main";
import Header from "./Header";
import LeagueFavorites from "../PaginaFavoritos/LeagueFavorites";


const Favorites: React.FC<AppProps> = ({setState}) => {
    return (
        <>
            <Header setState={setState}/>
            <LeagueFavorites setState={setState}/>
        </>
    );
}

export default Favorites;