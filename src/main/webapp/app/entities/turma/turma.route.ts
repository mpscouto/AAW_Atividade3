import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { TurmaComponent } from './turma.component';
import { TurmaDetailComponent } from './turma-detail.component';
import { TurmaPopupComponent } from './turma-dialog.component';
import { TurmaDeletePopupComponent } from './turma-delete-dialog.component';

export const turmaRoute: Routes = [
    {
        path: 'turma',
        component: TurmaComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'aawAtividade3App.turma.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'turma/:id',
        component: TurmaDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'aawAtividade3App.turma.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const turmaPopupRoute: Routes = [
    {
        path: 'turma-new',
        component: TurmaPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'aawAtividade3App.turma.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'turma/:id/edit',
        component: TurmaPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'aawAtividade3App.turma.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'turma/:id/delete',
        component: TurmaDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'aawAtividade3App.turma.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
