import { WebSocketServer } from "ws";
import { server } from "./main";
import { leagueIds } from "./leagueIds";

const websocket = new WebSocketServer({ server });
websocket.on("connection", (ws) => {
    console.log("New WebSocket connection");

    // Intervalo para fazer requisições e enviar dados
    const interval = setInterval(async () => {
        try {
            const results : Record<string,any> = {};
            for(const [leagueName, leagueId] of Object.entries(leagueIds)) {
                try {
                    const responseData = await fetch(`https://www.thesportsdb.com/api/v2/json/livescore/${leagueId}`, {
                        headers: {
                            "X-API-KEY": process.env.API_KEY!,
                        },
                        method: 'GET',
                    });
                    if (!responseData.ok) {
                        throw new Error(`Error fetching data for ${leagueName}: ${responseData.status}`);
                    }   
                    const responseDataJson = await responseData.json();
                    results[leagueName] = responseDataJson;
                }
                catch(err) {
                    console.error(err);
                }
            }

            // Verifica se a conexão ainda está ativa antes de enviar
            if (ws.readyState === ws.OPEN) {
                ws.send(JSON.stringify(results)); // Envia os dados como string
            }
        } catch (error) {
            console.error("Error fetching live score data:", error);
        }
    }, 60000); // Requisição a cada 1 minuto

    // Limpa o intervalo ao desconectar
    ws.on("close", () => {
        console.log("WebSocket connection closed");
        clearInterval(interval);
    });
});