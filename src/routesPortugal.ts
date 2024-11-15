import express, { Request, Response, NextFunction, Router } from "express";

const router: Router = express.Router();

router.get('/liga-portugal-betclic/classificacoes', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const responseData = await fetch("https://www.thesportsdb.com/api/v1/json/3/lookuptable.php?l=4344&s=2024-2025");
        const responseDataJson = await responseData.json();
        res.json(responseDataJson);
    }
    catch(err) {
        next(err);
    }
});

router.get('/liga-portugal-betclic/lista', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const url : string = `https://www.thesportsdb.com/api/v1/json/${process.env.API_KEY}/eventsnextleague.php?id=4344`;
        console.log(url);
        const responseData = await fetch(url);
        const responseDataJson = await responseData.json();
        res.json(responseDataJson);
    }
    catch(err) {
        next(err);
    }
});

export default router;