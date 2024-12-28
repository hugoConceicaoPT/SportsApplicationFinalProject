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
    idHomeTeam: string,
    idAwayTeam: string,
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
    intLoss: string,
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
    idHomeTeam: string,
    idAwayTeam: string,
    strHomeTeamBadge: string,
    strAwayTeamBadge: string,
    intRound?: string,
    intHomeScore: string,
    intAwayScore: string,
    strStatus: string,
    strLeague?: string
}

export interface IGameLineup {
    _id?: number,
    strHome: string,
    strSubstitute: string,
    intSquadNumber: string,
    strPlayer: string
}

export interface IGameStatistics {
    _id?: number,
    strStat: string,
    intHome: string,
    intAway: string
}

export interface IGameTimeline {
    _id?: number,
    strTimeline: string,
    strTimelineDetail: string,
    strHome: string,
    strPlayer: string,
    strAssist: string,
    intTime: string
}

const leagueEndpoints: Record<string, string> = {
    [leagueIds.premierLeague]: `${config.serverAddress}/inglaterra/premier-league`,
    [leagueIds.primeiraLiga]: `${config.serverAddress}/portugal/liga-portugal-betclic`,
    [leagueIds.laLiga]: `${config.serverAddress}/espanha/la-liga`,
    [leagueIds.ligue1]: `${config.serverAddress}/franca/ligue-1`,
    [leagueIds.bundesliga]: `${config.serverAddress}/alemanha/bundesliga`,
    [leagueIds.serieA]: `${config.serverAddress}/italia/serie-a`
};

// The worker that will perform contact operations.
export class Worker {

    public async getListNextLeagueEvents(leagueId: string, currentDate: Date): Promise<INextLeagueEvents[]> {

        let endpoint = leagueEndpoints[leagueId];
        endpoint += "/lista";
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

    public async getPastLeagueResults(leagueId: string, currentDate: Date): Promise<IPastLeagueResults[]> {
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


    public async getPastLeagueResultsByRound(leagueId: string, round?: string): Promise<IPastLeagueResults[]> {
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

    public async getLineup(idEvent : string): Promise<IGameLineup[]> {
        const endpoint = `${config.serverAddress}/jogo/formacao/${idEvent}`;
        try {
            const response: AxiosResponse = await axios.get(endpoint);
            return response.data;
        } catch (error) {
            console.error(`Failed to fetch past league results for ID event: ${idEvent}`, error);
            throw new Error("Unable to retrieve past league results. Please try again later.");
        }
    }

    public async getGameStatistics(idEvent: string): Promise<IGameStatistics[]> {
        const endpoint = `${config.serverAddress}/jogo/estatisticas/${idEvent}`;
        if (!endpoint) {
            throw new Error(`No endpoint found for league ID: ${idEvent}`);
        }

        try {
            const response: AxiosResponse = await axios.get(endpoint);
            return response.data;
        } catch (error) {
            console.error(`Failed to fetch league standings for league ID: ${idEvent}`, error);
            throw new Error("Unable to retrieve league standings. Please try again later.");
        }
    }

    public async getNextLeagueList(leagueId: string): Promise<INextLeagueEvents[]> {
        let endpoint = leagueEndpoints[leagueId];
        endpoint += "/lista";
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

    public async getGameTimeline(idEvent: string): Promise<IGameTimeline[]> {
        const endpoint = `${config.serverAddress}/jogo/timeline/${idEvent}`;
        if (!endpoint) {
            throw new Error(`No endpoint found for league ID: ${idEvent}`);
        }

        try {
            const response: AxiosResponse = await axios.get(endpoint);
            return response.data;
        } catch (error) {
            console.error(`Failed to fetch league standings for league ID: ${idEvent}`, error);
            throw new Error("Unable to retrieve league standings. Please try again later.");
        }
    }

}
