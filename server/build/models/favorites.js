"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
// Esquema do Mongoose para armazenar favoritos
// Define os campos e suas propriedades no banco de dados
const favoritesSchema = new mongoose_1.Schema({
    username: {
        type: String, // O campo será do tipo string
        ref: "User", // Referência ao modelo "User", vinculando os favoritos a um usuário específico
        required: true, // Campo obrigatório, deve estar sempre presente
    },
    leagueIds: {
        type: [String], // Lista de IDs de ligas
        default: [], // Inicialmente, será uma lista vazia caso nenhum dado seja fornecido
    },
    leagueName: {
        type: [String], // Lista de nomes de ligas favoritas
        default: [], // Valor padrão: lista vazia
    },
    leagueBadge: {
        type: [String], // Lista de URLs dos badges das ligas
        default: [], // Valor padrão: lista vazia
    },
    teamIds: {
        type: [String], // Lista de IDs dos times favoritos
        default: [], // Valor padrão: lista vazia
    },
    teamName: {
        type: [String], // Lista de nomes dos times favoritos
        default: [], // Valor padrão: lista vazia
    },
    teamBadge: {
        type: [String], // Lista de URLs dos badges dos times
        default: [], // Valor padrão: lista vazia
    },
});
// Exporta o modelo Favorites baseado no esquema definido
// Permite interagir com a coleção "Favorites" no banco de dados
module.exports = (0, mongoose_1.model)("Favorites", favoritesSchema);
