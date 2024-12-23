// Importa o módulo NodeCache para gerenciamento de cache na memória
import NodeCache = require("node-cache");
import { Request, Response, NextFunction } from "express";

// Cria uma instância de cache com NodeCache
const cache = new NodeCache();

// Define uma interface CustomResponse estendendo Response para incluir a propriedade `originalSend`
// A propriedade `originalSend` será usada para armazenar a função `send` original do Express
interface CustomResponse extends Response {
    originalSend?: any;
}

// Exporta uma função que cria o middleware com uma duração específica de cache
export default (duration: number) => (req: Request, res: CustomResponse, next: NextFunction) => {
    
    // Verifica se o método da requisição é GET. Apenas GETs serão cacheados
    if (req.method !== "GET") {
        console.log("Cannot cache non-GET methods|"); // Loga uma mensagem para requisições não-cacheáveis
        return next(); // Passa para o próximo middleware se não for GET
    }

    // Usa a URL original da requisição como chave para armazenar a resposta no cache
    const key = req.originalUrl;
    
    // Tenta obter uma resposta em cache usando a chave
    const cachedResponse = cache.get(key);

    // Se a resposta foi encontrada no cache
    if (cachedResponse) {
        console.error(`Cache hit for ${key}`); // Loga que a resposta foi encontrada no cache
        res.send(cachedResponse); // Envia a resposta em cache diretamente
    } else {
        // Armazena a função original `send` na propriedade `originalSend`
        res.originalSend = res.send;
        
        // Sobrescreve a função `send` para interceptar a resposta antes de enviá-la
        res.send = body => {
            res.originalSend(body); // Chama a função original para enviar a resposta
            cache.set(key, body, duration); // Armazena a resposta no cache com a duração definida
            return res; // Retorna o objeto de resposta
        };
        
        next(); // Passa para o próximo middleware se a resposta não estava em cache
    }
};
