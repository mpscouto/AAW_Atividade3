import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { AulaComponent } from './aula.component';
import { AulaDetailComponent } from './aula-detail.component';
import { AulaPopupComponent } from './aula-dialog.component';
import { AulaDeletePopupComponent } from './aula-delete-dialog.component';

export const aulaRoute: Routes = [
    {
        path: 'aula',
        component: AulaComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'aawAtividade3App.aula.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'aula/:id',
        component: AulaDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'aawAtividade3App.aula.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const aulaPopupRoute: Routes = [
    {
        path: 'aula-new',
        component: AulaPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'aawAtividade3App.aula.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'aula/:id/edit',
        component: AulaPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'aawAtividade3App.aula.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'aula/:id/delete',
        component: AulaDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'aawAtividade3App.aula.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
