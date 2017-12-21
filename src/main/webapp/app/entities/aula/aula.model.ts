import { BaseEntity } from './../../shared';

export class Aula implements BaseEntity {
    constructor(
        public id?: number,
        public codigo?: number,
        public horarioInicio?: string,
        public horarioTermino?: string,
        public turma?: BaseEntity,
        public faltas?: BaseEntity[],
        public periodoLetivo?: BaseEntity,
    ) {
    }
}
