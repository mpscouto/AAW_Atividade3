import { BaseEntity } from './../../shared';

export class Disciplina implements BaseEntity {
    constructor(
        public id?: number,
        public codigo?: number,
        public nome?: string,
        public atividades?: BaseEntity[],
        public professors?: BaseEntity[],
    ) {
    }
}
