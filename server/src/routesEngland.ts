import express, { Request, Response, NextFunction, Router } from "express";
import { leagueIds } from "./leagueIds";
import { transformLeagueStandings, transformNextLastLeagueEvent } from "./transformData";

const router: Router = express.Router();
import cache from "./cachingRoutes";

// Rota para obter as classificações da Premier League
router.get('/premier-league/classificacoes', cache(120), async (req: Request, res: Response, next: NextFunction) => {
    try {
        // Faz requisição à API para obter as classificações da liga
        const response = await fetch(`https://www.thesportsdb.com/api/v1/json/${process.env.API_KEY}/lookuptable.php?l=${leagueIds.premierLeague}&s=2024-2025`);
        const responseData = await response.json();

        // Transforma os dados recebidos para o formato esperado
        const arr = Object.entries(responseData.table).map(transformLeagueStandings);

        // Retorna os dados transformados como JSON
        res.json(arr);
    } catch (err) {
        // Encaminha erros para o middleware de tratamento de erros
        next(err);
    }
});

// Rota para obter os próximos eventos da Premier League
router.get('/premier-league/lista', cache(120), async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { date } = req.query; // Extrai o filtro de data dos parâmetros da requisição

        // Faz requisição à API para obter os próximos eventos da liga
        const response = await fetch(`https://www.thesportsdb.com/api/v1/json/${process.env.API_KEY}/eventsnextleague.php?id=${leagueIds.premierLeague}`);
        const responseData = await response.json();

        // Transforma os dados recebidos para o formato esperado
        const arr = Object.entries(responseData.events).map(transformNextLastLeagueEvent);

        // Filtra os eventos pela data especificada, se fornecida
        const filteredResults = date ? arr.filter(event => event.dateEvent === date) : arr;

        // Retorna os dados filtrados como JSON
        res.json(filteredResults);
    } catch (err) {
        // Encaminha erros para o middleware de tratamento de erros
        next(err);
    }
});

// Rota para obter os resultados passados da Premier League
router.get('/premier-league/resultados', cache(120), async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { date } = req.query; // Extrai o filtro de data dos parâmetros da requisição

        // Faz requisição à API para obter os eventos passados da liga
        const response = await fetch(`https://www.thesportsdb.com/api/v1/json/${process.env.API_KEY}/eventspastleague.php?id=${leagueIds.premierLeague}`);
        const responseData = await response.json();

        // Transforma os dados recebidos para o formato esperado
        const arr = Object.entries(responseData.events).map(transformNextLastLeagueEvent);

        // Filtra os eventos pela data especificada, se fornecida
        if (date) {
            const filteredResults = arr.filter(event => event.dateEvent === date);
            res.json(filteredResults);
        } else {
            res.json(arr); // Retorna todos os eventos caso nenhum filtro de data seja aplicado
        }
    } catch (err) {
        // Encaminha erros para o middleware de tratamento de erros
        next(err);
    }
});

// Exporta o router para ser usado em outras partes da aplicação
export default router;
