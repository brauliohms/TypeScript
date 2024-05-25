// Classe abstrata
abstract class Celular {
  public ligar() {
    console.log("Em ligação...");
  }

  abstract acessarRedeMovel(): void;
}

// Classe concreta
class IPhone23Pro extends Celular {
  acessarRedeMovel(): void {
    console.log("acessando rede 5G+...");
  }
}

class GalxyS57 extends Celular {
  acessarRedeMovel(): void {
    console.log("acessando rede 7.5G...");
  }
}

let c1 = new IPhone23Pro();

c1.ligar();
c1.acessarRedeMovel();

c1 = new GalxyS57();
c1.ligar();
c1.acessarRedeMovel();

export {};
