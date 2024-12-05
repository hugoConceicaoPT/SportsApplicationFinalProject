"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const ws_1 = require("ws");
const main_1 = require("./main");
const leagueIds_1 = require("./leagueIds");
const websocket = new ws_1.WebSocketServer({ server: main_1.server });
websocket.on("connection", (ws) => {
    console.log("New WebSocket connection");
    // Intervalo para fazer requisições e enviar dados
    const interval = setInterval(() => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const results = {};
            for (const [leagueName, leagueId] of Object.entries(leagueIds_1.leagueIds)) {
                try {
                    const responseData = yield fetch(`https://www.thesportsdb.com/api/v2/json/livescore/${leagueId}`, {
                        headers: {
                            "X-API-KEY": process.env.API_KEY,
                        },
                        method: 'GET',
                    });
                    if (!responseData.ok) {
                        throw new Error(`Error fetching data for ${leagueName}: ${responseData.status}`);
                    }
                    const responseDataJson = yield responseData.json();
                    results[leagueName] = responseDataJson;
                }
                catch (err) {
                    console.error(err);
                }
            }
            // Verifica se a conexão ainda está ativa antes de enviar
            if (ws.readyState === ws.OPEN) {
                ws.send(JSON.stringify(results)); // Envia os dados como string
            }
        }
        catch (error) {
            console.error("Error fetching live score data:", error);
        }
    }), 60000); // Requisição a cada 1 minuto
    // Limpa o intervalo ao desconectar
    ws.on("close", () => {
        console.log("WebSocket connection closed");
        clearInterval(interval);
    });
});
