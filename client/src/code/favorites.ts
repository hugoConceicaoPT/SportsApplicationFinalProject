import axios, { AxiosResponse } from "axios";
import { config } from "./config";

// Interface para representar os favoritos
export interface IFavorites {
    _id?: number,
    leagueIds: string[],
    leagueName: string[],
    leagueBadge: string[],
    teamIds: string[],
    teamName: string[],
    teamBadge: string[]
}
// Classe responsável por gerir favoritos
export class WorkerFavorites {
    // Método para buscar a lista de favoritos
    public async getFavorites(): Promise<IFavorites> {
        try{
            // Realiza uma requisição GET para obter os favoritos
            const response : AxiosResponse = await axios.get(`${config.serverAddress}/favorites`);
            return response.data; // Retorna os dados da resposta
        } catch (error) {
            console.error("Erro ao buscar favoritos:", error);
            throw new Error("Unable to favorites. Please try again later.");
        }
    }   
// Método para adicionar ou remover um item dos favoritos
    public async toggleFavorite(id: string, name: string, badge: string): Promise<AxiosResponse> {
        try{
            // Realiza uma requisição POST para adicionar ou remover um favorito
            const response : AxiosResponse = await axios.post(`${config.serverAddress}/favorites`, {
                id: id,
                badge: badge,
                name: name,
            });
            return response.data; // Retorna os dados da resposta
        } catch (error) {
            console.error("Erro ao adicionar favorito:", error);
            throw new Error("Unable to add or remove favorite. Please try again later.");
        }
    }
}

export default WorkerFavorites;