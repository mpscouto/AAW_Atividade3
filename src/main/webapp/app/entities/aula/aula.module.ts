import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AawAtividade3SharedModule } from '../../shared';
import {
    AulaService,
    AulaPopupService,
    AulaComponent,
    AulaDetailComponent,
    AulaDialogComponent,
    AulaPopupComponent,
    AulaDeletePopupComponent,
    AulaDeleteDialogComponent,
    aulaRoute,
    aulaPopupRoute,
} from './';

const ENTITY_STATES = [
    ...aulaRoute,
    ...aulaPopupRoute,
];

@NgModule({
    imports: [
        AawAtividade3SharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        AulaComponent,
        AulaDetailComponent,
        AulaDialogComponent,
        AulaDeleteDialogComponent,
        AulaPopupComponent,
        AulaDeletePopupComponent,
    ],
    entryComponents: [
        AulaComponent,
        AulaDialogComponent,
        AulaPopupComponent,
        AulaDeleteDialogComponent,
        AulaDeletePopupComponent,
    ],
    providers: [
        AulaService,
        AulaPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AawAtividade3AulaModule {}
