import { NextFunction, Request, Response } from "express";
import ColecaoUsuario from "../core/usuario/ColecaoUsuario";
import ProvedorToken from "../core/usuario/ProvedorToken";
import Usuario from "../core/usuario/Usuario";

export default function UsuarioMiddleware(
  bancoDados: ColecaoUsuario,
  provedorToken: ProvedorToken
) {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const token = req.headers.authorization?.replace("Bearer ", "");
      if (!token) {
        res.status(401).send("Usuário não está logado");
        return;
      }

      const usuarioToken = provedorToken.validar(token) as Usuario;
      const usuario = await bancoDados.buscarPorEmail(usuarioToken.email);
      if (!usuario) {
        res.status(403).send("Usuário Inválido");
        return;
      }

      (req as any).user = usuario;
      next();
    } catch (error) {
      res.status(500).send(`Erro ao verificar o token: ${error}`);
    }
  };
}
