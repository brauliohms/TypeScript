interface Entidade {
  id: number;
}

interface Vendavel {
  nome: string;
  preco: number;
  desconto: number;
}

class Produto implements Entidade, Vendavel {
  constructor(
    readonly id: number,
    readonly nome: string,
    readonly preco: number,
    readonly desconto: number
  ) {}

  get precoFinal() {
    return this.preco * (1 - this.desconto);
  }
}

class Servico implements Entidade, Vendavel {
  constructor(
    readonly id: number,
    readonly nome: string,
    readonly preco: number,
    readonly desconto: number
  ) {}
}

let v1: Vendavel = new Produto(12, "Caneta", 8, 0.01);

console.log(v1);

v1 = new Servico(1, "instalar sistema", 200, 0);
console.log(v1);

export {};
