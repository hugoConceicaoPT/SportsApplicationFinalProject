import express, { Request, Response, NextFunction, Router } from "express";

const router: Router = express.Router();
import cache from "./cachingRoutes";

router.get("/:id/lista", cache(120), async (req: Request, res: Response, next: NextFunction) => {
    try {
        const responseData = await fetch(`https://www.thesportsdb.com/api/v1/json/${process.env.API_KEY}/eventsnext.php?id=${req.params.id}`);
        const responseDataJson = await responseData.json();
        res.json(responseDataJson);
    }
    catch(err) {
        next(err);
    }
})

router.get("/:id/resultados", cache(120), async (req: Request, res: Response, next: NextFunction) => {
    try {
        const responseData = await fetch(`https://www.thesportsdb.com/api/v1/json/${process.env.API_KEY}/eventsnext.php?id=${req.params.id}`);
        const responseDataJson = await responseData.json();
        res.json(responseDataJson);
    }
    catch(err) {
        next(err);
    }
})

export default router;