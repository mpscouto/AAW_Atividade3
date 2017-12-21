import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AawAtividade3SharedModule } from '../../shared';
import {
    PeriodoLetivoService,
    PeriodoLetivoPopupService,
    PeriodoLetivoComponent,
    PeriodoLetivoDetailComponent,
    PeriodoLetivoDialogComponent,
    PeriodoLetivoPopupComponent,
    PeriodoLetivoDeletePopupComponent,
    PeriodoLetivoDeleteDialogComponent,
    periodoLetivoRoute,
    periodoLetivoPopupRoute,
} from './';

const ENTITY_STATES = [
    ...periodoLetivoRoute,
    ...periodoLetivoPopupRoute,
];

@NgModule({
    imports: [
        AawAtividade3SharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        PeriodoLetivoComponent,
        PeriodoLetivoDetailComponent,
        PeriodoLetivoDialogComponent,
        PeriodoLetivoDeleteDialogComponent,
        PeriodoLetivoPopupComponent,
        PeriodoLetivoDeletePopupComponent,
    ],
    entryComponents: [
        PeriodoLetivoComponent,
        PeriodoLetivoDialogComponent,
        PeriodoLetivoPopupComponent,
        PeriodoLetivoDeleteDialogComponent,
        PeriodoLetivoDeletePopupComponent,
    ],
    providers: [
        PeriodoLetivoService,
        PeriodoLetivoPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AawAtividade3PeriodoLetivoModule {}
