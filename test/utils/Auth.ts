import axios from "axios";
import Usuario from "../../src/core/usuario/Usuario";

const baseUrl = process.env.API_URL;

const usuario: Usuario = {
  id: "1d34844d-4802-459e-b63f-6d5b1e3c6a9e",
  nome: "João Paulo",
  email: "jp@zmail.com",
  senha: "123abc",
};

export async function getAutorizationHeader() {
  const response = await axios.post(`${baseUrl}/login`, usuario);
  return {
    headers: {
      Authorization: `Bearer ${response.data.token}`,
    },
  };
}
