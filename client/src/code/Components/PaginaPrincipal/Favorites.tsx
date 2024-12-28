import React from "react";
import { AppProps } from "../../main";
import Header from "./Header";
import LeagueFavorites from "../PaginaFavoritos/LeagueFavorites";
import TeamFavorites from "../PaginaFavoritos/TeamFavorites";
import CardListFavorites from "../PaginaFavoritos/CardListFavorites";

const Favorites: React.FC<AppProps> = ({setState}) => {
    return (
        <>
            <Header setState={setState}/>
            <LeagueFavorites setState={setState}/>
            <TeamFavorites setState={setState}/>
            <CardListFavorites setState={setState}/>
        </>
    );
}

export default Favorites;