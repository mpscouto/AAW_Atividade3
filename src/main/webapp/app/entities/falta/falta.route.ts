import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { FaltaComponent } from './falta.component';
import { FaltaDetailComponent } from './falta-detail.component';
import { FaltaPopupComponent } from './falta-dialog.component';
import { FaltaDeletePopupComponent } from './falta-delete-dialog.component';

export const faltaRoute: Routes = [
    {
        path: 'falta',
        component: FaltaComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'aawAtividade3App.falta.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'falta/:id',
        component: FaltaDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'aawAtividade3App.falta.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const faltaPopupRoute: Routes = [
    {
        path: 'falta-new',
        component: FaltaPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'aawAtividade3App.falta.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'falta/:id/edit',
        component: FaltaPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'aawAtividade3App.falta.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'falta/:id/delete',
        component: FaltaDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'aawAtividade3App.falta.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
