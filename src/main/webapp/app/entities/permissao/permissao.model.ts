import { BaseEntity } from './../../shared';

export class Permissao implements BaseEntity {
    constructor(
        public id?: number,
        public codigo?: number,
        public tipo?: string,
        public usuarios?: BaseEntity[],
    ) {
    }
}
