"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.serverInfo = void 0;
// Importações de módulos para configuração do servidor
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
// Lê e carrega as informações do servidor SMTP a partir de um arquivo JSON
const rawInfo = fs_1.default.readFileSync(path_1.default.join(__dirname, "../auth/serverInfo.json"), 'utf8');
exports.serverInfo = JSON.parse(rawInfo);
