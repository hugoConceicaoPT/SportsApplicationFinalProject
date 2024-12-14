import axios, { AxiosResponse } from "axios";

// App imports.
import { config } from "./config";
import { leagueIds } from "../../../server/src/leagueIds";

// Define interface to describe a contact.  Note that we'll only have an _id field when retrieving or adding, so
// it has to be optional.
export interface INextPastLeagueEvents {
    _id?: number, 
    strHomeTeam: string,
    strAwayTeam: string,
    dateEvent: string,
    strTime: string,
    strHomeTeamBadge: string,
    strAwayTeamBadge: string,
    intHomeScore: string,
    intAwayScore: string
}

export interface ILeagueStandings {
    _id?: number, 
    intRank: string,
    idTeam: string,
    strTeam: string,
    strBadge: string,
    strForm: string,
    intPlayed: string,
    intWin: string,
    intDraw: string,
    intGoalsFor: string,
    intGoalsAgainst: string,
    intGoalDifference: string,
    intPoints: string
}

const leagueNextEventEndpoints: Record<string, string> = {
    [leagueIds.premierLeague]: `${config.serverAddress}/inglaterra/premier-league/lista`,
    [leagueIds.primeiraLiga]: `${config.serverAddress}/portugal/liga-portugal-betclic/lista`,
    [leagueIds.laLiga]: `${config.serverAddress}/espanha/la-liga/lista`,
    [leagueIds.ligue1]: `${config.serverAddress}/franca/ligue-1/lista`,
    [leagueIds.bundesliga]: `${config.serverAddress}/alemanha/bundesliga/lista`,
    [leagueIds.serieA]: `${config.serverAddress}/italia/serie-a/lista`
};

const leagueStandingsEndpoints: Record<string, string> = {
    [leagueIds.premierLeague]: `${config.serverAddress}/inglaterra/premier-league/classificacoes`,
    [leagueIds.primeiraLiga]: `${config.serverAddress}/portugal/liga-portugal-betclic/classificacoes`,
    [leagueIds.laLiga]: `${config.serverAddress}/espanha/la-liga/classificacoes`,
    [leagueIds.ligue1]: `${config.serverAddress}/franca/ligue-1/classificacoes`,
    [leagueIds.bundesliga]: `${config.serverAddress}/alemanha/bundesliga/classificacoes`,
    [leagueIds.serieA]: `${config.serverAddress}/italia/serie-a/classificacoes`
};

// The worker that will perform contact operations.
export class Worker {
    public async listNextLeagueEvents(leagueId:string): Promise<INextPastLeagueEvents[]> {

        const endpoint = leagueNextEventEndpoints[leagueId];
        if (!endpoint) {
            throw new Error(`No endpoint found for league ID: ${leagueId}`);
        }

        try {
            const response: AxiosResponse = await axios.get(endpoint);
            return response.data;
        } catch (error) {
            console.error(`Failed to fetch league events for league ID: ${leagueId}`, error);
            throw new Error("Unable to retrieve league events. Please try again later.");
        }
        
    }
    
    public async leagueStanding(leagueId: string) : Promise<ILeagueStandings[]> {
        const endpoint = leagueStandingsEndpoints[leagueId];
        if (!endpoint) {
            throw new Error(`No endpoint found for league ID: ${leagueId}`);
        }

        try {
            const response: AxiosResponse = await axios.get(endpoint);
            return response.data;
        } catch (error) {
            console.error(`Failed to fetch league standings for league ID: ${leagueId}`, error);
            throw new Error("Unable to retrieve league standings. Please try again later.");
        }
    }
}
