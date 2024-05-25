abstract class Animal {
  abstract emitirSom(): string;
}

class Gato extends Animal {
  emitirSom(): string {
    return "miau, miau, ...";
  }
}

class Cachorro extends Animal {
  emitirSom(): string {
    return "au, au, ...";
  }
}

function exibir(animal: Animal): void {
  console.log(animal.emitirSom());
}

let a1: Animal = new Gato();
exibir(a1);

a1 = new Cachorro();
exibir(a1);

export {};
