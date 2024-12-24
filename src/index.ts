import { Carro } from "./Carro";

const carro1 = new Carro("Fusca", 80);
const carro2 = new Carro("Ferrari", 320);

console.log(carro1.nome, carro1.velocidade);
carro1.acelerar(10);
carro1.acelerar(10);
carro1.acelerar(10);
carro1.acelerar(10);
carro1.acelerar(10);
carro1.acelerar(10);
carro1.acelerar(10);
carro1.acelerar(10);
carro1.acelerar(10);
carro1.acelerar(10);
console.log(carro1.nome, carro1.velocidade);
carro1.acelerar(-20);
console.log(carro1.nome, carro1.velocidade);
// console.log(carro2);
// console.log(carro1.nome);
console.log(carro2.nome, carro2.velocidade);
carro2.acelerar(80);
carro2.acelerar(80);
carro2.acelerar(80);
console.log(carro2.nome, carro2.velocidade);
