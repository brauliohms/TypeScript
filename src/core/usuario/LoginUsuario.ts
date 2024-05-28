import CasoDeUso from "../shared/CasoDeUso";
import ColecaoUsuario from "./ColecaoUsuario";
import Criptografar from "./ProvedorCriptografar";
import ProvedorToken from "./ProvedorToken";
import Usuario from "./Usuario";

type Entrada = { email: string; senha: string };
type Saida = { usuario: Usuario; token: string };

export default class LoginUsuario implements CasoDeUso<Entrada, Saida> {
  constructor(
    private bancoDados: ColecaoUsuario,
    private provedorCriptografia: Criptografar,
    private provedorToken: ProvedorToken
  ) {}
  async executar(dto: Entrada): Promise<Saida> {
    const usuarioExistente = await this.bancoDados.buscarPorEmail(dto.email);
    if (!usuarioExistente) throw new Error("Usuário não existe");

    const mesmaSenha = this.provedorCriptografia.comparar(
      dto.senha,
      usuarioExistente.senha!
    );
    if (!mesmaSenha) throw new Error("Senha incorreta");

    return {
      usuario: { ...usuarioExistente, senha: undefined },
      token: this.provedorToken.gerar({
        id: usuarioExistente.id,
        nome: usuarioExistente.nome,
        email: usuarioExistente.email,
      }),
    };
  }
}
