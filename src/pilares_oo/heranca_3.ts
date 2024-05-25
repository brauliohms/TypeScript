interface Usuario {
  id: number;
  nome: string;
  email: string;
}

interface CasoDeUso {
  executar(entrada: any): any;
}

class RegistrarUsuario implements CasoDeUso {
  executar(usuario: Usuario) {
    console.log("Registrando usuario");
    console.log(usuario);
  }
}

const u1: Usuario = {
  id: 123,
  nome: "Ana",
  email: "ana@email.com",
};

const casoUso: CasoDeUso = new RegistrarUsuario();

casoUso.executar(u1);

export {};
