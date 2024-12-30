import express, { Request, Response, NextFunction, Router } from "express";

const router: Router = express.Router();
import cache from "./cachingRoutes";
import { transformNextLastLeagueEvent, transformTeamDetails } from "./transformData";

// Rota para obter os próximos eventos de uma equipe por ID
router.get('/:id/lista', cache(120), async (req: Request, res: Response, next: NextFunction) => {
    try {
        // Faz a requisição à API para obter os próximos eventos
        const response = await fetch(`https://www.thesportsdb.com/api/v1/json/${process.env.API_KEY}/eventsnext.php?id=${req.params.id}`);
        const responseData = await response.json();

        // Transforma os dados recebidos no formato necessário
        const arr = Object.entries(responseData.events).map(transformNextLastLeagueEvent);

        // Retorna os dados transformados como resposta
        res.json(arr);
    } catch (err) {
        // Encaminha erros ao middleware de tratamento
        next(err);
    }
});

// Rota para obter os resultados passados de uma equipe por ID
router.get('/:id/resultados', cache(120), async (req: Request, res: Response, next: NextFunction) => {
    try {
        // Faz a requisição à API para obter os resultados passados
        const response = await fetch(`https://www.thesportsdb.com/api/v1/json/${process.env.API_KEY}/eventslast.php?id=${req.params.id}`);
        const responseData = await response.json();

        // Transforma os dados recebidos no formato necessário
        const arr = Object.entries(responseData.results).map(transformNextLastLeagueEvent);

        // Retorna os dados transformados como resposta
        res.json(arr);
    } catch (err) {
        // Encaminha erros ao middleware de tratamento
        next(err);
    }
});

// Rota para obter os detalhes de uma equipe por ID
router.get('/:id/detalhes', cache(120), async (req: Request, res: Response, next: NextFunction) => {
    try {
        // Faz a requisição à API para obter os detalhes da equipe
        const response = await fetch(`https://www.thesportsdb.com/api/v1/json/${process.env.API_KEY}/lookupteam.php?id=${req.params.id}`);
        const responseData = await response.json();

        // Transforma os dados recebidos no formato necessário
        const arr = Object.entries(responseData.teams).map(transformTeamDetails);

        // Retorna os dados transformados como resposta
        res.json(arr);
    } catch (err) {
        // Encaminha erros ao middleware de tratamento
        next(err);
    }
});

// Exporta o roteador para uso em outras partes da aplicação
export default router;
