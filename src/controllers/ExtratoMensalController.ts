import { Express, Request, Response } from "express";
import ExtratoMensal from "../core/transacao/ExtratoMensal";

export default class ExtratoMensalController {
  constructor(
    private servidor: Express,
    private casoDeUso: ExtratoMensal,
    ...middleware: any[]
  ) {
    const fn = async (req: Request, res: Response) => {
      try {
        const extrato = await casoDeUso.executar({
          usuario: (req as any).user,
          ano: +req.params.ano,
          mes: +req.params.mes,
        });
        res.status(200).json(extrato);
      } catch (error: any) {
        res.status(400).send(error.message);
      }
    };

    servidor.get("/extrato/:ano/:mes", middleware, fn);
  }
}
