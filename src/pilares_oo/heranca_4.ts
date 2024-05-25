class Carro {
  private _velocidade: number = 0;

  constructor(readonly VELOCIDADE_MAXIMA: number = 200) {}

  public get velocidade() {
    return this._velocidade;
  }

  public acelerar() {
    this.alterar_velocidade(5);
  }

  public frear() {
    this.alterar_velocidade(-5);
  }

  protected alterar_velocidade(delta: number) {
    const novaVelocidade = this._velocidade + delta;
    if (novaVelocidade >= 0 && novaVelocidade <= this.VELOCIDADE_MAXIMA) {
      this._velocidade = novaVelocidade;
    } else if (novaVelocidade > this.VELOCIDADE_MAXIMA) {
      this._velocidade = this.VELOCIDADE_MAXIMA;
    } else {
      this._velocidade = 0;
    }
  }
}

class Fusca extends Carro {
  constructor() {
    super(140);
  }
}

class Ferrari extends Carro {
  constructor() {
    super(355);
  }

  public acelerar(): void {
    this.alterar_velocidade(35);
  }
}

let c1: Carro = new Fusca();

c1.acelerar();
c1.acelerar();
console.log(c1.velocidade);
console.log(c1.VELOCIDADE_MAXIMA);

c1 = new Ferrari();
c1.acelerar();
c1.acelerar();
console.log(c1.velocidade);
console.log(c1.VELOCIDADE_MAXIMA);

export {};
