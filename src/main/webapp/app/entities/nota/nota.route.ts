import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { NotaComponent } from './nota.component';
import { NotaDetailComponent } from './nota-detail.component';
import { NotaPopupComponent } from './nota-dialog.component';
import { NotaDeletePopupComponent } from './nota-delete-dialog.component';

export const notaRoute: Routes = [
    {
        path: 'nota',
        component: NotaComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'aawAtividade3App.nota.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'nota/:id',
        component: NotaDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'aawAtividade3App.nota.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const notaPopupRoute: Routes = [
    {
        path: 'nota-new',
        component: NotaPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'aawAtividade3App.nota.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'nota/:id/edit',
        component: NotaPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'aawAtividade3App.nota.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'nota/:id/delete',
        component: NotaDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'aawAtividade3App.nota.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
