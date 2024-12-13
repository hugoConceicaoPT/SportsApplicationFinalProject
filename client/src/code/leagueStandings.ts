import axios, { AxiosResponse } from "axios";

// App imports.
import { config } from "./config";
import { leagueIds } from "../../../server/src/leagueIds";

// Define interface to describe team standings.
export interface ILeagueStandings {
    _id?: number,
    idStanding: string;
    intRank: string;
    idTeam: string;
    strTeam: string;
    strBadge: string;
    strLeague: string;
    intPlayed: string;
    intWin: string;
    intLoss: string;
    intDraw: string;
    intGoalsFor: string;
    intGoalsAgainst: string;
    intGoalDifference: string;
    intPoints: string;
    strForm: string;
}

const leagueStandingsEndpoints: Record<string, string> = {
    [leagueIds.premierLeague]: `${config.serverAddress}/inglaterra/premier-league/classificacoes`,
    [leagueIds.primeiraLiga]: `${config.serverAddress}/portugal/liga-portugal-betclic/classificacoes`,
    [leagueIds.laLiga]: `${config.serverAddress}/espanha/la-liga/classificacoes`,
    [leagueIds.ligue1]: `${config.serverAddress}/franca/ligue-1/classificacoes`,
    [leagueIds.bundesliga]: `${config.serverAddress}/alemanha/bundesliga/classificacoes`,
    [leagueIds.serieA]: `${config.serverAddress}/italia/serie-a/classificacoes`,
};

// The worker that will perform standings operations.
export class StandingsWorker {
    public async getLeagueStandings(leagueId: string): Promise<ILeagueStandings[]> {
        const endpoint = leagueStandingsEndpoints[leagueId];
        if (!endpoint) {
            throw new Error(`No endpoint found for league ID: ${leagueId}`);
        }

        try {
            const response: AxiosResponse = await axios.get(endpoint);
            return response.data.table;
        } catch (error) {
            console.error(`Failed to fetch standings for league ID: ${leagueId}`, error);
            throw new Error("Unable to retrieve league standings. Please try again later.");
        }
    }
}
