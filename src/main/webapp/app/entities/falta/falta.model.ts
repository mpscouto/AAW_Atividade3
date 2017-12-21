import { BaseEntity } from './../../shared';

export class Falta implements BaseEntity {
    constructor(
        public id?: number,
        public codigo?: number,
        public numFaltas?: number,
        public aluno?: BaseEntity,
        public aula?: BaseEntity,
        public periodoLetivo?: BaseEntity,
    ) {
    }
}
