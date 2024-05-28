import ColecaoUsuario from "../../../core/usuario/ColecaoUsuario";
import Usuario from "../../../core/usuario/Usuario";
import conexao from "./conexao";

export default class ColecaoUsuarioDB implements ColecaoUsuario {
  async inserir(usuario: Usuario): Promise<void> {
    await conexao.table("usuario").insert(usuario);
  }

  async buscarPorEmail(email: string): Promise<Usuario | null> {
    return await conexao.table("usuario").where("email", email).first();
  }
}
