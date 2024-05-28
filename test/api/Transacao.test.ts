import axios from "axios";
import ColecaoTransacaoDB from "../../src/adapters/db/knex/ColecaoTransacaoDB";
import Transacao from "../../src/core/transacao/Transacao";
import { getAutorizationHeader } from "../utils/Auth";
const baseUrl = process.env.API_URL;

const transacaoSemId: Transacao = {
  descricao: "Conta de Luz",
  valor: 351.0,
  vencimento: new Date("2024-06-15"),
  idUsuario: "1d34844d-4802-459e-b63f-6d5b1e3c6a9e",
};

test("Deve salvar uma transação no SQLite", async () => {
  // const usuario: Partial<Usuario> = {
  //   nome: "João Paulo",
  //   email: "jp@zmail.com",
  //   senha: "123abc",
  // };

  // Obtem o token no objeto headers.authorization, semelhante ao Auth no postman
  try {
    const headers = await getAutorizationHeader();

    const resp = await axios.post(
      `${baseUrl}/transacao`,
      transacaoSemId,
      headers
    );
    expect(resp.status).toBe(200);
  } catch (error: any) {
    console.log(error.response.data);
  }
});

test("Deve atualizar uma transação no SQLite", async () => {
  // const usuario: Partial<Usuario> = {
  //   nome: "João Paulo",
  //   email: "jp@zmail.com",
  //   senha: "123abc",
  // };

  // Obtem o token no objeto headers.authorization, semelhante ao Auth no postman
  try {
    const headers = await getAutorizationHeader();

    const resp = await axios.post(
      `${baseUrl}/transacao/dfc3fccb-d71d-4fb3-8908-00ce3b794580`,
      { ...transacaoSemId, valor: 366.5 },
      headers
    );
    expect(resp.status).toBe(200);
  } catch (error: any) {
    console.log(error.response.data);
  }
});

test("Deve retornar as transacoes baseado no idUsuario, ano e mes", async () => {
  const colecaoTransacoes = new ColecaoTransacaoDB();
  const transacoes = await colecaoTransacoes.buscarPorMes(
    "1d34844d-4802-459e-b63f-6d5b1e3c6a9e",
    2024,
    11
  );
  console.log(transacoes);
  expect(transacoes).toBeTruthy();
});
