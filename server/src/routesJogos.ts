import express, { Request, Response, NextFunction, Router } from "express";

const router: Router = express.Router();
import cache from "./cachingRoutes";
import { transformEventLineup, transformEventStatistics, transformEventTimeline } from "./transformData";

// Rota para obter estatísticas de um evento pelo ID
router.get("/estatisticas/:id", cache(120), async (req: Request, res: Response, next: NextFunction) => {
    try {
        // Faz a requisição à API para obter estatísticas do evento
        const response = await fetch(`https://www.thesportsdb.com/api/v1/json/${process.env.API_KEY}/lookupeventstats.php?id=${req.params.id}`);
        const responseData = await response.json();

        // Verifica se as estatísticas foram encontradas
        if (!responseData.eventstats) {
            res.status(404).json({ message: "Estatísticas não encontradas." });
            return;
        }

        // Transforma os dados recebidos no formato necessário
        const arr = Object.entries(responseData.eventstats).map(transformEventStatistics);
        res.json(arr);
    } catch (err) {
        // Encaminha erros ao middleware de tratamento
        next(err);
    }
});

// Rota para obter a formação de um evento pelo ID
router.get("/formacao/:id", cache(120), async (req: Request, res: Response, next: NextFunction) => {
    try {
        // Faz a requisição à API para obter a formação do evento
        const response = await fetch(`https://www.thesportsdb.com/api/v1/json/${process.env.API_KEY}/lookuplineup.php?id=${req.params.id}`);
        const responseData = await response.json();

        // Verifica se a formação foi encontrada
        if (!responseData.lineup) {
            res.status(404).json({ message: "Formação não encontrada." });
            return;
        }

        // Transforma os dados recebidos no formato necessário
        const arr = Object.entries(responseData.lineup).map(transformEventLineup);
        res.json(arr);
    } catch (err) {
        // Encaminha erros ao middleware de tratamento
        next(err);
    }
});

// Rota para obter o timeline de um evento pelo ID
router.get("/timeline/:id", cache(120), async (req: Request, res: Response, next: NextFunction) => {
    try {
        // Faz a requisição à API para obter o timeline do evento
        const response = await fetch(`https://www.thesportsdb.com/api/v1/json/${process.env.API_KEY}/lookuptimeline.php?id=${req.params.id}`);
        const responseData = await response.json();

        // Verifica se o timeline foi encontrado
        if (!responseData.timeline) {
            res.status(404).json({ message: "Timeline não encontrada." });
            return;
        }

        // Transforma os dados recebidos no formato necessário
        const arr = Object.entries(responseData.timeline).map(transformEventTimeline);
        res.json(arr);
    } catch (err) {
        // Encaminha erros ao middleware de tratamento
        next(err);
    }
});

export default router;
