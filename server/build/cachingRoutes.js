"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Importa o módulo NodeCache para gerenciamento de cache na memória
const NodeCache = require("node-cache");
// Cria uma instância de cache com NodeCache
const cache = new NodeCache();
// Exporta uma função que cria o middleware com uma duração específica de cache
exports.default = (duration) => (req, res, next) => {
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
    }
    else {
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
