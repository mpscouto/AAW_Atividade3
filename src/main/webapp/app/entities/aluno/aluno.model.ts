import { BaseEntity } from './../../shared';

export class Aluno implements BaseEntity {
    constructor(
        public id?: number,
        public codigo?: number,
        public matricula?: string,
        public faltas?: BaseEntity[],
        public notas?: BaseEntity[],
        public entregas?: BaseEntity[],
        public turma?: BaseEntity,
    ) {
    }
}
