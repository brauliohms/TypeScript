import Saldo from "../../src/core/transacao/Saldo";
import Transacao from "../../src/core/transacao/Transacao";

const transacaoSemId: Transacao = {
  descricao: "Conta de Luz",
  valor: 351.0,
  vencimento: new Date("2024-06-15"),
  idUsuario: "1d34844d-4802-459e-b63f-6d5b1e3c6a9e",
};

const lista = [
  { ...transacaoSemId, valor: 5000 },
  { ...transacaoSemId, valor: -300 },
  { ...transacaoSemId, valor: -700 },
  { ...transacaoSemId, valor: -1500 },
];
test("Deve somar total pela class Somar", () => {
  expect(new Saldo(lista).total).toBe(2500);
});
test("Deve somar receitas pela class Somar", () => {
  expect(new Saldo(lista).receitas).toBe(5000);
});
test("Deve somar despesas pela class Somar", () => {
  expect(new Saldo(lista).despesas).toBe(-2500);
});
test("Deve retornar objeto SaldoDTO", () => {
  const saldo = new Saldo(lista).dto;
  console.log(saldo);
  expect(saldo).toHaveProperty("total");
  expect(saldo).toHaveProperty("despesas");
  expect(saldo).toHaveProperty("receitas");
});
