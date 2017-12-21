import { BaseEntity } from './../../shared';

export class Professor implements BaseEntity {
    constructor(
        public id?: number,
        public codigo?: number,
        public grau?: string,
        public salario?: number,
        public turmas?: BaseEntity[],
        public atividades?: BaseEntity[],
        public disciplinas?: BaseEntity[],
    ) {
    }
}
