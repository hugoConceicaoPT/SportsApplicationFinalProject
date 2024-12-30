import axios, { AxiosResponse } from "axios";

// App imports.
import { config } from "./config";
import { leagueIds } from "../../../server/src/leagueIds";

// Interfaces para definir a estrutura dos dados
export interface INextPastLeagueEvents {
    _id?: number,
    idEvent: string,
    strHomeTeam: string,
    strAwayTeam: string,
    dateEvent: string,
    strTime: string,
    strHomeTeamBadge: string,
    strAwayTeamBadge: string,
    intRound?: string,
    idHomeTeam: string,
    idAwayTeam: string,
    intHomeScore: string,
    intAwayScore: string,
    strStatus?: string,
    strProgress?: string,
    strLeague?: string,
    idLeague: string
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
    intLoss: string,
    intGoalsFor: string,
    intGoalsAgainst: string,
    intGoalDifference: string,
    intPoints: string
}

// Endpoints específicos para cada liga
const leagueEndpoints: Record<string, string> = {
    [leagueIds.premierLeague]: `${config.serverAddress}/inglaterra/premier-league`,
    [leagueIds.primeiraLiga]: `${config.serverAddress}/portugal/liga-portugal-betclic`,
    [leagueIds.laLiga]: `${config.serverAddress}/espanha/la-liga`,
    [leagueIds.ligue1]: `${config.serverAddress}/franca/ligue-1`,
    [leagueIds.bundesliga]: `${config.serverAddress}/alemanha/bundesliga`,
    [leagueIds.serieA]: `${config.serverAddress}/italia/serie-a`
};

// Worker responsável por operações relacionadas às ligas
export class Worker {

    // Obtém a lista de próximos eventos de uma liga
    public async getListNextLeagueEvents(leagueId: string, currentDate?: Date): Promise<INextPastLeagueEvents[]> {

        let endpoint = leagueEndpoints[leagueId];
        endpoint += "/lista";
        if (!endpoint) {
            throw new Error(`No endpoint found for league ID: ${leagueId}`);
        }

        try {
            if (currentDate) {
                const response: AxiosResponse = await axios.get(endpoint, {
                    params: {
                        date: currentDate.toISOString().split('T')[0], // Formata a data para YYYY-MM-DD
                    },
                });
                return response.data;
            } else {
                const response: AxiosResponse = await axios.get(endpoint);
                return response.data;
            }
        } catch (error) {
            console.error(`Failed to fetch league events for league ID: ${leagueId}`, error);
            throw new Error("Unable to retrieve league events. Please try again later.");
        }

    }

    // Obtém as classificações de uma liga
    public async getLeagueStanding(leagueId: string): Promise<ILeagueStandings[]> {
        let endpoint = leagueEndpoints[leagueId];
        endpoint += "/classificacoes";
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

    // Obtém os resultados passados de uma liga
    public async getPastLeagueResults(leagueId: string, currentDate: Date): Promise<INextPastLeagueEvents[]> {
        let endpoint = leagueEndpoints[leagueId];
        endpoint += "/resultados";
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

    // Obtém os resultados passados de uma liga por rodada
    public async getPastLeagueResultsByRound(leagueId: string, round?: string): Promise<INextPastLeagueEvents[]> {
        let endpoint = leagueEndpoints[leagueId];
        endpoint += "/resultados";
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
