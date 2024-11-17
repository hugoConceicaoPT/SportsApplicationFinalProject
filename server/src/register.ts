import express, { Router, Request, Response } from "express";
import mongoose, { Schema, Document, Model } from "mongoose";

// Interface para o modelo do usuário
interface IUser extends Document {
  name: string;
  email: string;
  password: string;
}

// Esquema do MongoDB
const userSchema: Schema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

// Modelo do MongoDB
const User: Model<IUser> = mongoose.model<IUser>("User", userSchema);

// Roteador do Express
const router: Router = express.Router();

router.post("/register", (req: Request, res: Response): void => {
  // Usando uma promessa explícita
  new Promise(async (resolve, reject) => {
    try {
      const { name, email, password } = req.body;

      // Verifica se os campos obrigatórios estão presentes
      if (!name || !email || !password) {
        res.status(400).json({ message: "Todos os campos são obrigatórios" });
        resolve(undefined); // Resolva explicitamente a promessa
        return;
      }

      // Verifica se o e-mail já existe
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        res.status(400).json({ message: "O email já está registado" });
        resolve(undefined); // Resolva explicitamente a promessa
        return;
      }

      // Cria um novo usuário e salva no banco
      const newUser = new User({ name, email, password });
      await newUser.save();

      res.status(201).json({ message: "Utilizador registado com sucesso", user: newUser });
      resolve(undefined); // Resolva explicitamente a promessa
    } catch (err) {
      res.status(500).json({ message: "Erro no servidor. Tente novamente mais tarde." });
      reject(err); // Rejeite a promessa em caso de erro
    }
  });
});

export default router;
