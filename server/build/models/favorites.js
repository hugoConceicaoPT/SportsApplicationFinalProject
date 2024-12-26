"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const favoritesSchema = new mongoose_1.Schema({
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
module.exports = (0, mongoose_1.model)("Favorites", favoritesSchema);
