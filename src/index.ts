// npm install express jsonwebtoken
// npm i -D @types/express @types/jsonwebtoken axios @types/axios
import "dotenv/config";
import express from "express";
import CriptoBcrypt from "./adapters/auth/CriptoBcrypt";
import JwTAdapter from "./adapters/auth/JwTAdapter";
import ColecaoTransacaoDB from "./adapters/db/knex/ColecaoTransacaoDB";
import ColecaoUsuarioDB from "./adapters/db/knex/ColecaoUsuarioDB";
import ExtratoMensalController from "./controllers/ExtratoMensalController";
import LoginUsuarioController from "./controllers/LoginUsuarioController";
import RegistrarUsuarioController from "./controllers/RegistrarUsuarioController";
import SalvarTransacaoController from "./controllers/SalvarTransacaoController";
import UsuarioMiddleware from "./controllers/UsuarioMiddleware";
import ExtratoMensal from "./core/transacao/ExtratoMensal";
import SalvarTransacao from "./core/transacao/SalvarTransacao";
import LoginUsuario from "./core/usuario/LoginUsuario";
import RegistrarUsuario from "./core/usuario/RegistrarUsuario";

const port = process.env.PORT || 3000;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.listen(port, () => console.log(`Server is running on port ${port}`));

// ------------------------------------ PAGINAS PUBLICAS
// ADAPTADORES (faz a conexao com o externo do meu core ou aplicação)
const bancoDados = new ColecaoUsuarioDB();
const provedorCriptografia = new CriptoBcrypt();
const provedorToken = new JwTAdapter(process.env.JWT_SECRET!);

// CASOS DE USO (fluxos do meu core ou aplicação)
const registrarUsuario = new RegistrarUsuario(bancoDados, provedorCriptografia);
const loginusuario = new LoginUsuario(
  bancoDados,
  provedorCriptografia,
  provedorToken
);

// CONTROLLERS (fica entre o mais externo e meu core fazendo a junção de um com outro)
new RegistrarUsuarioController(app, registrarUsuario);
new LoginUsuarioController(app, loginusuario);

// ------------------------------------ PAGINAS PRIVADAS
const usuarioMiddleware = UsuarioMiddleware(bancoDados, provedorToken);
const transacaoDB = new ColecaoTransacaoDB();

const salvarTransacao = new SalvarTransacao(transacaoDB);
const extratoMensal = new ExtratoMensal(transacaoDB);

new SalvarTransacaoController(app, salvarTransacao, usuarioMiddleware);
new ExtratoMensalController(app, extratoMensal, usuarioMiddleware);
