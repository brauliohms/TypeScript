import { Express, Request, Response } from "express";
import SalvarTransacao from "../core/transacao/SalvarTransacao";

export default class SalvarTransacaoController {
  constructor(
    private servidor: Express,
    private casoDeUso: SalvarTransacao,
    ...middleware: any[]
  ) {
    const fn = async (req: Request, res: Response) => {
      try {
        const transacao = {
          descricao: req.body.descricao,
          valor: +req.body.valor,
          vencimento: new Date(req.body.vencimento),
          idUsuario: req.body.idUsuario,
        };
        await casoDeUso.executar({
          transacao,
          id: req.params.id,
          usuario: (req as any).user,
        });
        res.sendStatus(200);
      } catch (error: any) {
        res.status(400).send(error.message);
      }
    };

    servidor.post("/transacao", middleware, fn);
    servidor.post("/transacao/:id", middleware, fn);
  }
}
