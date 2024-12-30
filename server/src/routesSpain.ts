import express, { Request, Response, NextFunction, Router } from "express";
import { leagueIds } from "./leagueIds";
import { transformLeagueStandings, transformNextLastLeagueEvent } from "./transformData";
import cache from "./cachingRoutes";

const router: Router = express.Router();

// Rota para obter as classificações da La Liga
router.get('/la-liga/classificacoes', cache(120), async (req: Request, res: Response, next: NextFunction) => {
    try {
        // Faz requisição à API para obter as classificações da liga
        const response = await fetch(`https://www.thesportsdb.com/api/v1/json/${process.env.API_KEY}/lookuptable.php?l=${leagueIds.laLiga}&s=2024-2025`);
        const responseData = await response.json();

        // Transforma os dados recebidos no formato necessário
        const arr = Object.entries(responseData.table).map(transformLeagueStandings);

        // Retorna os dados transformados como JSON
        res.json(arr);
    } catch (err) {
        // Encaminha erros ao middleware de tratamento
        next(err);
    }
});

// Rota para obter os próximos eventos da La Liga
router.get('/la-liga/lista', cache(120), async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { date } = req.query; // Obtém o parâmetro de data, se fornecido

        // Faz requisição à API para obter os próximos eventos da liga
        const response = await fetch(`https://www.thesportsdb.com/api/v1/json/${process.env.API_KEY}/eventsnextleague.php?id=${leagueIds.laLiga}`);
        const responseData = await response.json();

        // Transforma os dados recebidos no formato necessário
        const arr = Object.entries(responseData.events).map(transformNextLastLeagueEvent);

        // Filtra os eventos pela data, se fornecida, ou retorna todos
        if (date) {
            const filteredResults = arr.filter(event => event.dateEvent === date);
            res.json(filteredResults);
        } else {
            res.json(arr);
        }
    } catch (err) {
        // Encaminha erros ao middleware de tratamento
        next(err);
    }
});

// Rota para obter os resultados passados da La Liga
router.get('/la-liga/resultados', cache(120), async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { date } = req.query; // Obtém o parâmetro de data, se fornecido

        // Faz requisição à API para obter os resultados passados da liga
        const response = await fetch(`https://www.thesportsdb.com/api/v1/json/${process.env.API_KEY}/eventspastleague.php?id=${leagueIds.laLiga}`);
        const responseData = await response.json();

        // Transforma os dados recebidos no formato necessário
        const arr = Object.entries(responseData.events).map(transformNextLastLeagueEvent);

        // Filtra os eventos pela data, se fornecida, ou retorna todos
        const filteredResults = date ? arr.filter(event => event.dateEvent === date) : arr;
        res.json(filteredResults);
    } catch (err) {
        // Encaminha erros ao middleware de tratamento
        next(err);
    }
});

// Exporta o roteador para ser usado em outras partes da aplicação
export default router;
