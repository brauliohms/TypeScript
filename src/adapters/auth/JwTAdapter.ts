import jwt from "jsonwebtoken";
import ProvedorToken from "../../core/usuario/ProvedorToken";

export default class JwTAdapter implements ProvedorToken {
  constructor(private segredo: string) {}

  gerar(payload: string | object): string {
    return jwt.sign(payload, this.segredo, { expiresIn: "1d" });
  }

  validar(token: string): string | object {
    return jwt.verify(token, this.segredo);
  }
}
