import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { AtividadeComponent } from './atividade.component';
import { AtividadeDetailComponent } from './atividade-detail.component';
import { AtividadePopupComponent } from './atividade-dialog.component';
import { AtividadeDeletePopupComponent } from './atividade-delete-dialog.component';

export const atividadeRoute: Routes = [
    {
        path: 'atividade',
        component: AtividadeComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'aawAtividade3App.atividade.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'atividade/:id',
        component: AtividadeDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'aawAtividade3App.atividade.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const atividadePopupRoute: Routes = [
    {
        path: 'atividade-new',
        component: AtividadePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'aawAtividade3App.atividade.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'atividade/:id/edit',
        component: AtividadePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'aawAtividade3App.atividade.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'atividade/:id/delete',
        component: AtividadeDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'aawAtividade3App.atividade.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
