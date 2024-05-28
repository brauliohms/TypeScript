import ColecaoTransacao from "../../../core/transacao/ColecaoTransacao";
import Transacao from "../../../core/transacao/Transacao";
import conexao from "./conexao";

export default class ColecaoTransacaoDB implements ColecaoTransacao {
  async adicionar(transacao: Transacao): Promise<void> {
    await conexao.table("transacao").insert(this._praTabela(transacao));
  }

  async atualizar(transacao: Transacao): Promise<void> {
    await conexao
      .table("transacao")
      .where("id", transacao.id)
      .update(this._praTabela(transacao));
  }

  async buscarPorId(idUsuario: string, id: string): Promise<Transacao | null> {
    const transacao = await conexao
      .table("transacao")
      .where("usuario_id", idUsuario)
      .where("id", id)
      .first();

    if (!transacao) return null;

    return this._daTabela(transacao);
  }

  async buscarPorMes(
    idUsuario: string,
    ano: number,
    mes: number
  ): Promise<Transacao[]> {
    const transacoes = await conexao
      .table("transacao")
      .where("usuario_id", idUsuario)
      .whereRaw("strftime('%Y', vencimento) = ?", ano.toString())
      .whereRaw(
        "strftime('%m', vencimento) = ?",
        mes.toString().padStart(2, "0")
      ); // Ensuring month is two digits
    // .whereRaw("extract(year from vencimento) = ?", ano)
    // .whereRaw("extract(month from vencimento) = ?", mes);

    return transacoes.map(this._daTabela);
  }

  private _praTabela(transacao: Transacao): any {
    return {
      id: transacao.id,
      descricao: transacao.descricao,
      valor: transacao.valor,
      vencimento: transacao.vencimento.toISOString(),
      usuario_id: transacao.idUsuario,
    };
  }

  private _daTabela(transacao: any): Transacao {
    return {
      id: transacao.id,
      descricao: transacao.descricao,
      valor: transacao.valor,
      vencimento: transacao.vencimento,
      idUsuario: transacao.usuario_id,
    };
  }
}
