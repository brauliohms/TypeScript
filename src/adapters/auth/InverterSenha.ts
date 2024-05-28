import Criptografar from "../../core/usuario/ProvedorCriptografar";

export default class InverterSenha implements Criptografar {
  criptografar(senha: string): string {
    return senha.split("").reverse().join("");
  }
  comparar(senha: string, senhaCriptografada: string): boolean {
    const senhaFornecida = this.criptografar(senha);
    return senhaFornecida === senhaCriptografada;
  }
}
