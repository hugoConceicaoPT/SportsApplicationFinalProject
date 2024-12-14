// Importações de módulos para configuração do servidor
import path from "path";
import fs from "fs";

// Interface que define a estrutura de informações do servidor SMTP
export interface IServerInfo {
    smtp: {
        host: string, port: number,
        auth: { user: string, pass: string }
    }
}
export let serverInfo: IServerInfo;

// Lê e carrega as informações do servidor SMTP a partir de um arquivo JSON
const rawInfo: string = fs.readFileSync(path.join(__dirname, "../auth/serverInfo.json") ,'utf8');
serverInfo = JSON.parse(rawInfo);