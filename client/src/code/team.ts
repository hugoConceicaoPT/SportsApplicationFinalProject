import axios, { AxiosResponse } from "axios";
import { config } from "./config";
import { leagueIds } from "../../../server/src/leagueIds";
import { INextPastLeagueEvents } from "./league";

export interface ITeamDetails {
    idLeague: string,
    strLeague: string
}

export class WorkerTeam {

    // Obtém a lista de próximos eventos de uma equipe
    public async getNextTeamList(teamId: string): Promise<INextPastLeagueEvents[]> {

        // Define o endpoint para buscar os próximos eventos
        let endpoint = `${config.serverAddress}/equipa/${teamId}/lista`;
        if (!endpoint) {
            throw new Error(`No endpoint found for league ID: ${teamId}`);
        }

        try {
            // Faz a requisição ao endpoint
            const response: AxiosResponse = await axios.get(endpoint);
            return response.data;
        } catch (error) {
            // Loga o erro e lança uma exceção com mensagem genérica
            console.error(`Failed to fetch league events for league ID: ${teamId}`, error);
            throw new Error("Unable to retrieve league events. Please try again later.");
        }

    }

    // Obtém os resultados passados de uma equipe
    public async getPastTeamResults(teamId: string): Promise<INextPastLeagueEvents[]> {

        // Define o endpoint para buscar resultados passados
        let endpoint = `${config.serverAddress}/equipa/${teamId}/resultados`;
        if (!endpoint) {
            throw new Error(`No endpoint found for league ID: ${teamId}`);
        }

        try {
            // Faz a requisição ao endpoint
            const response: AxiosResponse = await axios.get(endpoint);
            return response.data;
        } catch (error) {
            // Loga o erro e lança uma exceção com mensagem genérica
            console.error(`Failed to fetch league events for league ID: ${teamId}`, error);
            throw new Error("Unable to retrieve league events. Please try again later.");
        }

    }

    // Obtém os detalhes de uma equipe
    public async getTeamDetails(teamId: string): Promise<ITeamDetails[]> {

        // Define o endpoint para buscar os detalhes da equipe
        let endpoint = `${config.serverAddress}/equipa/${teamId}/detalhes`;
        if (!endpoint) {
            throw new Error(`No endpoint found for league ID: ${teamId}`);
        }

        try {
            // Faz a requisição ao endpoint
            const response: AxiosResponse = await axios.get(endpoint);
            return response.data;
        } catch (error) {
            // Loga o erro e lança uma exceção com mensagem genérica
            console.error(`Failed to fetch league events for league ID: ${teamId}`, error);
            throw new Error("Unable to retrieve league events. Please try again later.");
        }

    }

}
