import { BaseEntity } from './../../shared';

export class Atividade implements BaseEntity {
    constructor(
        public id?: number,
        public codigo?: number,
        public roteiro?: string,
        public professor?: BaseEntity,
        public disciplina?: BaseEntity,
        public notas?: BaseEntity[],
        public entregas?: BaseEntity[],
    ) {
    }
}
