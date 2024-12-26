import mongoose, { Schema, Document, model } from "mongoose";

interface IFavorites extends Document {
    username: string; 
    leagueIds: number[];
    teamIds: number[];
}

const favoritesSchema = new Schema<IFavorites>({
    username: {
        type: String, // O campo passa a ser uma string que armazena o nome de utilizador
        ref: "User", // Referência ao modelo User, mas agora pelo username
        required: true,
    },
    leagueIds: {
        type: [Number],
        default: [],
    },
    teamIds: {
        type: [Number],
        default: [],
    },
});

module.exports = model("Favorites", favoritesSchema);
