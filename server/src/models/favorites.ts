import mongoose, { Schema, Document, model } from "mongoose";

interface IFavorites extends Document {
    username: string; 
    leagueIds: string[];
    leagueName: string[];
    leagueBadge: string[];
    teamIds: string[];
    teamName: string[];
    teamBadge: string[];
}

const favoritesSchema = new Schema<IFavorites>({
    username: {
        type: String, // O campo passa a ser uma string que armazena o nome de utilizador
        ref: "User", // Referência ao modelo User, mas agora pelo username
        required: true,
    },
    leagueIds: {
        type: [String],
        default: [],
    },
    leagueName: {
        type: [String],
        default: [],
    },
    leagueBadge: {
        type: [String],
        default: [],
    },
    teamIds: {
        type: [String],
        default: [],
    },
    teamName: {
        type: [String],
        default: [],
    },
    teamBadge: {
        type: [String],
        default: [],
    },
});

module.exports = model("Favorites", favoritesSchema);
