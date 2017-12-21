import { BaseEntity } from './../../shared';

export class Usuario implements BaseEntity {
    constructor(
        public id?: number,
        public codigo?: number,
        public login?: string,
        public senha?: string,
        public nome?: string,
        public email?: string,
        public rg?: string,
        public cpf?: string,
        public telefone?: string,
        public dataNasc?: string,
        public idade?: number,
        public permissao?: BaseEntity,
        public aluno?: BaseEntity,
        public professor?: BaseEntity,
    ) {
    }
}
