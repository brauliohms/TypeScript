import ColecaoUsuario from "../../core/usuario/ColecaoUsuario";
import Usuario from "../../core/usuario/Usuario";

export default class UsuarioEmMemoria implements ColecaoUsuario {
  private static dados: Usuario[] = [];

  async inserir(usuario: Usuario): Promise<void> {
    UsuarioEmMemoria.dados.push(usuario);
  }

  async buscarPorEmail(email: string): Promise<Usuario | null> {
    const usuario = UsuarioEmMemoria.dados.find((u) => u.email === email);
    return usuario ?? null;
  }
}
