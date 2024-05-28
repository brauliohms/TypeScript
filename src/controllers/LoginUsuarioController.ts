import { Express } from "express";
import LoginUsuario from "../core/usuario/LoginUsuario";

export default class LoginUsuarioController {
  constructor(private servidor: Express, private casoDeUso: LoginUsuario) {
    servidor.post("/login", async (req, res) => {
      try {
        const response = await casoDeUso.executar({
          email: req.body.email,
          senha: req.body.senha,
        });
        res.status(200).json(response);
      } catch (error: any) {
        res.status(403).send(error.message);
      }
    });
  }
}
