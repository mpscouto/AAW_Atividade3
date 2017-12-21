import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AawAtividade3SharedModule } from '../../shared';
import {
    AtividadeService,
    AtividadePopupService,
    AtividadeComponent,
    AtividadeDetailComponent,
    AtividadeDialogComponent,
    AtividadePopupComponent,
    AtividadeDeletePopupComponent,
    AtividadeDeleteDialogComponent,
    atividadeRoute,
    atividadePopupRoute,
} from './';

const ENTITY_STATES = [
    ...atividadeRoute,
    ...atividadePopupRoute,
];

@NgModule({
    imports: [
        AawAtividade3SharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        AtividadeComponent,
        AtividadeDetailComponent,
        AtividadeDialogComponent,
        AtividadeDeleteDialogComponent,
        AtividadePopupComponent,
        AtividadeDeletePopupComponent,
    ],
    entryComponents: [
        AtividadeComponent,
        AtividadeDialogComponent,
        AtividadePopupComponent,
        AtividadeDeleteDialogComponent,
        AtividadeDeletePopupComponent,
    ],
    providers: [
        AtividadeService,
        AtividadePopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AawAtividade3AtividadeModule {}
