import axios, { AxiosResponse } from "axios";

// App imports.
import { config } from "./config";
import { leagueIds } from "../../../server/src/leagueIds";

// Define interface to describe a contact.  Note that we'll only have an _id field when retrieving or adding, so
// it has to be optional.
export interface INextLeagueEvents {
    _id?: number,
    idEvent?: string,
    strHomeTeam: string,
    strAwayTeam: string,
    dateEvent: string,
    strTime: string,
    strHomeTeamBadge: string,
    strAwayTeamBadge: string,
    intRound?: string,
    intHomeScore: string,
    intAwayScore: string,
    strStatus?: string,
    strProgress?: string,
    strLeague?: string
}

export interface ILiveEvents {
    _id?: number,
    idEvent: string,
    strHomeTeam: string,
    strAwayTeam: string,
    strHomeTeamBadge: string,
    strAwayTeamBadge: string,
    idHomeTeam: string,
    idAwayTeam: string,
    intHomeScore: string,
    intAwayScore: string,
    strStatus: string,
    strProgress: string
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
    intDefeat: string,
    intGoalsFor: string,
    intGoalsAgainst: string,
    intGoalDifference: string,
    intPoints: string
}

// Define interface to describe past league results.
export interface IPastLeagueResults {
    _id?: number,
    idEvent: string,
    strHomeTeam: string,
    strAwayTeam: string,
    dateEvent: string,
    strTime: string,
    strHomeTeamBadge: string,
    strAwayTeamBadge: string,
    intRound?: string,
    intHomeScore: string,
    intAwayScore: string,
    strStatus: string,
    strLeague?: string
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
const leaguePastResultsEndpoints: Record<string, string> = {
    [leagueIds.premierLeague]: `${config.serverAddress}/inglaterra/premier-league/resultados`,
    [leagueIds.primeiraLiga]: `${config.serverAddress}/portugal/liga-portugal-betclic/resultados`,
    [leagueIds.laLiga]: `${config.serverAddress}/espanha/la-liga/resultados`,
    [leagueIds.ligue1]: `${config.serverAddress}/franca/ligue-1/resultados`,
    [leagueIds.bundesliga]: `${config.serverAddress}/alemanha/bundesliga/resultados`,
    [leagueIds.serieA]: `${config.serverAddress}/italia/serie-a/resultados`
};
// The worker that will perform contact operations.
export class Worker {

    public async getListNextLeagueEvents(leagueId: string, currentDate: Date): Promise<INextLeagueEvents[]> {

        const endpoint = leagueNextEventEndpoints[leagueId];
        if (!endpoint) {
            throw new Error(`No endpoint found for league ID: ${leagueId}`);
        }

        try {
            const response: AxiosResponse = await axios.get(endpoint, {
                params: {
                    date: currentDate.toISOString().split('T')[0], // Formata a data para o formato YYYY-MM-DD
                },
            });
            return response.data;
        } catch (error) {
            console.error(`Failed to fetch league events for league ID: ${leagueId}`, error);
            throw new Error("Unable to retrieve league events. Please try again later.");
        }

    }

    public async getLeagueStanding(leagueId: string): Promise<ILeagueStandings[]> {
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

    public async getPastLeagueResults(leagueId: string, currentDate: Date): Promise<IPastLeagueResults[]> {
        const endpoint = leaguePastResultsEndpoints[leagueId];
        if (!endpoint) {
            throw new Error(`No endpoint found for league ID: ${leagueId}`);
        }

        try {
            const response: AxiosResponse = await axios.get(endpoint, {
                params: {
                    date: currentDate.toISOString().split('T')[0]
                }
            });
            return response.data;
        } catch (error) {
            console.error(`Failed to fetch past league results for league ID: ${leagueId}`, error);
            throw new Error("Unable to retrieve past league results. Please try again later.");
        }
    }


    public async getPastLeagueResultsLeague(leagueId: string, round?: string): Promise<IPastLeagueResults[]> {
        const endpoint = leaguePastResultsEndpoints[leagueId];
        if (!endpoint) {
            throw new Error(`No endpoint found for league ID: ${leagueId}`);
        }
    
        try {
            const params: any = {};
            if (round) {
                params.round = round;
            }
    
            const response: AxiosResponse = await axios.get(endpoint, { params });
            return response.data;
        } catch (error) {
            console.error(`Failed to fetch past league results for league ID: ${leagueId}`, error);
            throw new Error("Unable to retrieve past league results. Please try again later.");
        }
    }
    

}
