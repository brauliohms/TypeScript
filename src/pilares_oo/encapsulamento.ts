class Carro {
  private velocidade_atual: number = 0;
  protected readonly VELOCIDADE_MAXIMA: number = 200;

  constructor(public nome: string) {}

  get velocidade() {
    return this.velocidade_atual;
  }

  protected alterar_velocidade(delta: number) {
    const novaVelocidade = this.velocidade_atual + delta;
    if (novaVelocidade >= 0 && novaVelocidade <= this.VELOCIDADE_MAXIMA) {
      this.velocidade_atual = novaVelocidade;
    }
  }

  public acelerar() {
    this.alterar_velocidade(5);
  }
}

const c1 = new Carro("Fusca");
console.log(c1.nome, c1.velocidade);
c1.acelerar();

console.log(c1.nome, c1.velocidade);
export {};
