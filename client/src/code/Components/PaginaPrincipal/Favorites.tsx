import React from "react";
import { AppProps } from "../../main";
import Header from "./Header";
import LeagueFavorites from "../PaginaFavoritos/LeagueFavorites";
import TeamFavorites from "../PaginaFavoritos/TeamFavorites";
import CardListFavorites from "../PaginaFavoritos/CardListFavorites";

// Componente principal da página de favoritos
const Favorites: React.FC<AppProps> = ({ setState }) => {
    return (
        <>
            {/* Cabeçalho da página com funcionalidade de navegação */}
            <Header setState={setState} />

            {/* Seção para exibir ligas favoritas */}
            <LeagueFavorites setState={setState} />

            {/* Seção para exibir equipes favoritas */}
            <TeamFavorites setState={setState} />

            {/* Exibe uma lista consolidada de favoritos */}
            <CardListFavorites setState={setState} />
        </>
    );
};

export default Favorites;
