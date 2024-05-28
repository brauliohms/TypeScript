import CriptoBcrypt from "../../src/adapters/auth/CriptoBcrypt";
import InverterSenha from "../../src/adapters/auth/InverterSenha";
import BancoEmMemoria from "../../src/adapters/db/UsuarioEmMemoria";
import ColecaoUsuarioDB from "../../src/adapters/db/knex/ColecaoUsuarioDB";
import RegistrarUsuario from "../../src/core/usuario/RegistrarUsuario";

test("Deve registrar um usuario", async () => {
  // os objetos podem ser instaciados fora igual linha abaixou ou direto como o BancoEmMemoria
  const provedorCripto = new InverterSenha();

  const registrarUsuario = new RegistrarUsuario(
    new BancoEmMemoria(),
    provedorCripto
  );
  const user1 = await registrarUsuario.executar(
    "Ana Maria",
    "anamaria@zmail.com",
    "123abc"
  );
  console.log(user1);
  expect(user1).toHaveProperty("id");
  expect(user1?.nome).toBe("Ana Maria");
  expect(user1?.email).toBe("anamaria@zmail.com");
  expect(user1?.senha).toBe("cba321");
});

test("Deve registrar um usuario com senha real", async () => {
  // os objetos podem ser instaciados fora igual linha abaixou ou direto como o BancoEmMemoria
  const provedorCripto = new CriptoBcrypt();

  const registrarUsuario = new RegistrarUsuario(
    new BancoEmMemoria(),
    provedorCripto
  );
  const user1 = await registrarUsuario.executar(
    "Ana Maria",
    "anamaria@zmail.com",
    "123abc"
  );
  console.log(user1);
  expect(user1).toHaveProperty("id");
  expect(user1?.nome).toBe("Ana Maria");
  expect(user1?.email).toBe("anamaria@zmail.com");
  expect(provedorCripto.comparar("123abc", user1?.senha!)).toBeTruthy();
  expect(provedorCripto.comparar("cba321", user1?.senha!)).toBeFalsy();
});
test("Deve registrar um usuario com senha real SQLite", async () => {
  // os objetos podem ser instaciados fora igual linha abaixou ou direto como o BancoEmMemoria
  const provedorCripto = new CriptoBcrypt();

  const registrarUsuario = new RegistrarUsuario(
    new ColecaoUsuarioDB(),
    provedorCripto
  );
  const user1 = await registrarUsuario.executar(
    "Ana Maria",
    "anamaria@zmail.com",
    "123abc"
  );
  console.log(user1);
  expect(user1).toHaveProperty("id");
  expect(user1?.nome).toBe("Ana Maria");
  expect(user1?.email).toBe("anamaria@zmail.com");
  expect(provedorCripto.comparar("123abc", user1?.senha!)).toBeTruthy();
  expect(provedorCripto.comparar("cba321", user1?.senha!)).toBeFalsy();
});
