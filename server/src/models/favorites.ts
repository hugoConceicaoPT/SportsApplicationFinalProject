import mongoose, { Schema, Document, model } from "mongoose";

interface IFavorites extends Document {
    username: string; 
    leagueIds: string[];
    teamIds: string[];
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
    teamIds: {
        type: [String],
        default: [],
    },
});

module.exports = model("Favorites", favoritesSchema);
