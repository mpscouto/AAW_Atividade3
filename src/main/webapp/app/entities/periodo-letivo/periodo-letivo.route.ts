import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { PeriodoLetivoComponent } from './periodo-letivo.component';
import { PeriodoLetivoDetailComponent } from './periodo-letivo-detail.component';
import { PeriodoLetivoPopupComponent } from './periodo-letivo-dialog.component';
import { PeriodoLetivoDeletePopupComponent } from './periodo-letivo-delete-dialog.component';

export const periodoLetivoRoute: Routes = [
    {
        path: 'periodo-letivo',
        component: PeriodoLetivoComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'aawAtividade3App.periodoLetivo.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'periodo-letivo/:id',
        component: PeriodoLetivoDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'aawAtividade3App.periodoLetivo.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const periodoLetivoPopupRoute: Routes = [
    {
        path: 'periodo-letivo-new',
        component: PeriodoLetivoPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'aawAtividade3App.periodoLetivo.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'periodo-letivo/:id/edit',
        component: PeriodoLetivoPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'aawAtividade3App.periodoLetivo.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'periodo-letivo/:id/delete',
        component: PeriodoLetivoDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'aawAtividade3App.periodoLetivo.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
