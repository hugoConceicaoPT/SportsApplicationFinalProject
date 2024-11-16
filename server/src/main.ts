import dotenv from "dotenv";
import path from "path";
import express, { Express, NextFunction, Request, Response } from "express";
import routerPortugal from "./routesPortugal";
import routerEngland from "./routesEngland";
import routesEquipas from "./routesEquipas";
import routesItaly from "./routesItaly";
import routesGermany from "./routesGermany";
import routesFrance from "./routesFrance";
import routesSpain from "./routesSpain";
const app: Express = express();
dotenv.config();
app.use(express.json()); 
app.use("/",
    express.static(path.join(__dirname, "../../client/build"))
);

app.use(function (inRequest: Request, inResponse: Response, inNext: NextFunction) {
    inResponse.header("Access-Control-Allow-Origin", "*"); 
    inResponse.header("Access-Control-Allow-Methods", "GET,POST,DELETE,OPTIONS"); 
    inResponse.header("Access-Control-Allow-Headers", "Origin,X-Requested-With,Content-Type,Accept");
    inNext();
});

app.use('/portugal',routerPortugal);
app.use('/inglaterra', routerEngland);
app.use('/equipa', routesEquipas);
app.use('/italia',routesItaly);
app.use('/alemanha', routesGermany);
app.use('/franca', routesFrance);
app.use('/espanha', routesSpain);

app.listen(8080);