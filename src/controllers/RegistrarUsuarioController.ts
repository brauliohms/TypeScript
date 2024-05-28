import { Express } from "express";
import RegistrarUsuario from "../core/usuario/RegistrarUsuario";

export default class RegistrarUsuarioController {
  constructor(private servidor: Express, private casoDeUso: RegistrarUsuario) {
    servidor.post("/registrar", async (req, res) => {
      try {
        await casoDeUso.executar({
          nome: req.body.nome,
          email: req.body.email,
          senha: req.body.senha,
        });
        res.status(201).send();
      } catch (error: any) {
        res.status(400).send(error.message);
      }
    });
  }
}
