interface Entidade {
  id: string;
}

interface EntidadeComDatas extends Entidade {
  criadoEm: Date;
  atualizadoEm: Date;
  excluidoEm?: Date;
}

interface Usuario extends EntidadeComDatas {
  nome: string;
  email: string;
}

const u1: Usuario = {
  id: "aa-123",
  nome: "Ana",
  email: "ana@email.com",
  criadoEm: new Date(),
  atualizadoEm: new Date(),
};

console.log(u1);

// Exemplo de Produto

interface Vendavel {
  preco: number;
  desconto: number;
}

interface Produto extends EntidadeComDatas, Vendavel {
  nome: string;
}

const p1: Produto = {
  id: "bb-456",
  nome: "tablet",
  preco: 1000,
  desconto: 0.05,
  criadoEm: new Date(),
  atualizadoEm: new Date(),
};

console.log(p1);
