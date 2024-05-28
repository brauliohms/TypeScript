import CasoDeUso from "../shared/CasoDeUso";
import Id from "../shared/Id";
import ColecaoUsuario from "./ColecaoUsuario";
import Criptografar from "./ProvedorCriptografar";
import Usuario from "./Usuario";

export type Entrada = { nome: string; email: string; senha: string };

export default class RegistrarUsuario implements CasoDeUso<Entrada, Usuario> {
  constructor(
    // injecao de dependencia para ser idependente qual é o banco apenas ser do tipo que a porta define
    private bancoDados: ColecaoUsuario,
    private provedorCriptografia: Criptografar
  ) {}

  async executar(dto: Entrada): Promise<Usuario> {
    const usuarioExiste = await this.bancoDados.buscarPorEmail(dto.email);
    if (usuarioExiste) throw new Error("Usuário já existe");

    const usuario: Usuario = {
      id: Id.gerar(),
      nome: dto.nome,
      email: dto.email,
      senha: this.provedorCriptografia.criptografar(dto.senha),
    };
    this.bancoDados.inserir(usuario);
    return usuario;
  }
}
