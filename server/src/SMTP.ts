// Importações para o envio de emails
import * as nodemailer from "nodemailer";
import { SendMailOptions, SentMessageInfo } from "nodemailer";
import Mail from "nodemailer/lib/mailer";
import { IServerInfo } from "./serverInfo";

// Classe para trabalhar com o envio de emails
export class Worker {
    private static serverInfo: IServerInfo;
    constructor(inServerInfo: IServerInfo) {
        Worker.serverInfo = inServerInfo;
    }

    // Método para enviar uma mensagem
    public sendMessage(inOptions: SendMailOptions): Promise<void> {
        return new Promise((inResolve, inReject) => {
            const transport: Mail = nodemailer.createTransport(Worker.serverInfo.smtp); // Cria o transportador de SMTP
            transport.sendMail(inOptions, (inError: Error | null, inInfo: SentMessageInfo) => {
                if (inError) {
                    inReject(inError); // Rejeita a promessa em caso de erro
                } else {
                    inResolve(); // Resolve a promessa em caso de sucesso
                }
            });
        });
    }
}