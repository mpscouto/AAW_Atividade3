import { BaseEntity } from './../../shared';

export class Turma implements BaseEntity {
    constructor(
        public id?: number,
        public codigo?: number,
        public sala?: string,
        public professor?: BaseEntity,
        public alunos?: BaseEntity[],
        public aulas?: BaseEntity[],
    ) {
    }
}
