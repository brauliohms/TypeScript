import axios from "axios";
import CriptoBcrypt from "../../src/adapters/auth/CriptoBcrypt";
import ColecaoUsuarioDB from "../../src/adapters/db/knex/ColecaoUsuarioDB";
import Usuario from "../../src/core/usuario/Usuario";
const baseUrl = process.env.API_URL;

test.skip("Deve registrar um usuario se nao existir", async () => {
  const usuario: Partial<Usuario> = {
    nome: "João Paulo",
    email: "jp@zmail.com",
    senha: "123abc",
  };
  try {
    const resp = await axios.post(`${baseUrl}/registrar`, usuario);
    expect(resp.status).toBe(201);
  } catch (error: any) {
    expect(error.response.status).toBe(400);
    expect(error.response.data).toBe("Usuário já existe");
  }
});

test("Deve Logar e retornar um usuario se existir testando o controller (completo)", async () => {
  const usuario: Partial<Usuario> = {
    email: "jp@zmail.com",
    senha: "123abc",
  };
  const resp = await axios.post(`${baseUrl}/login`, usuario);
  console.log(resp.data);
  expect(resp.status).toBe(200);
  expect(resp.data.usuario.nome).toBe("João Paulo");
  expect(resp.data.usuario.email).toBe("jp@zmail.com");
  expect(resp.data).toHaveProperty("token");
});

test.skip("Deve comparar a senha com a salva testanto caso de uso", async () => {
  const usuario: Partial<Usuario> = {
    email: "jp@zmail.com",
    senha: "123abc",
  };
  const cripto = new CriptoBcrypt();
  const bancoDados = new ColecaoUsuarioDB();
  const userBanco = await bancoDados.buscarPorEmail(usuario.email!);
  const is_senha_correta = cripto.comparar(usuario.senha!, userBanco?.senha!);
  expect(is_senha_correta).toBeTruthy();
});
