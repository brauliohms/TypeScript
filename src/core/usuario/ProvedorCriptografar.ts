export default interface Criptografar {
  criptografar(senha: string): string;
  comparar(senha: string, senhaCriptografada: string): boolean;
}
