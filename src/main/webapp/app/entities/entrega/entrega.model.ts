import { BaseEntity } from './../../shared';

export class Entrega implements BaseEntity {
    constructor(
        public id?: number,
        public codigo?: number,
        public dataPrevista?: string,
        public dataEntrega?: string,
        public aluno?: BaseEntity,
        public atividade?: BaseEntity,
    ) {
    }
}
