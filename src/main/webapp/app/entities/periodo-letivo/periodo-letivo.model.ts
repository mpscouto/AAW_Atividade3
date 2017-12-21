import { BaseEntity } from './../../shared';

export class PeriodoLetivo implements BaseEntity {
    constructor(
        public id?: number,
        public codigo?: number,
        public mes?: number,
        public ano?: number,
        public faltas?: BaseEntity[],
        public aulas?: BaseEntity[],
    ) {
    }
}
