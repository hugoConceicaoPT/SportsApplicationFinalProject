import express, { Request, Response, NextFunction, Router } from "express";

const router: Router = express.Router();

router.get('/la-liga/classificacoes', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const responseData = await fetch("https://www.thesportsdb.com/api/v1/json/3/lookuptable.php?l=4335&s=2024-2025");
        const responseDataJson = await responseData.json();
        res.json(responseDataJson);
    }
    catch(err) {
        next(err);
    }
});

router.get('/la-liga/lista', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const responseData = await fetch(`https://www.thesportsdb.com/api/v1/json/${process.env.API_KEY}/eventsnextleague.php?id=4335`);
        const responseDataJson = await responseData.json();
        res.json(responseDataJson);
    }
    catch(err) {
        next(err);
    }
});

router.get('/la-liga/resultados', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const responseData = await fetch(`https://www.thesportsdb.com/api/v1/json/${process.env.API_KEY}/eventspastleague.php?id=4335`);
        const responseDataJson = await responseData.json();
        res.json(responseDataJson);
    }
    catch(err) {
        next(err);
    }
});

export default router;