import bcrypt from "bcrypt";
import Criptografar from "../../core/usuario/ProvedorCriptografar";

// npm i bcrypt
// npm i -D @types/bcrypt

export default class CriptoBcrypt implements Criptografar {
  criptografar(senha: string): string {
    const salt = bcrypt.genSaltSync(10);
    return bcrypt.hashSync(senha, salt);
  }

  comparar(senha: string, senhaCriptografada: string): boolean {
    return bcrypt.compareSync(senha, senhaCriptografada);
  }
}
