import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { PermissaoComponent } from './permissao.component';
import { PermissaoDetailComponent } from './permissao-detail.component';
import { PermissaoPopupComponent } from './permissao-dialog.component';
import { PermissaoDeletePopupComponent } from './permissao-delete-dialog.component';

export const permissaoRoute: Routes = [
    {
        path: 'permissao',
        component: PermissaoComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'aawAtividade3App.permissao.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'permissao/:id',
        component: PermissaoDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'aawAtividade3App.permissao.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const permissaoPopupRoute: Routes = [
    {
        path: 'permissao-new',
        component: PermissaoPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'aawAtividade3App.permissao.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'permissao/:id/edit',
        component: PermissaoPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'aawAtividade3App.permissao.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'permissao/:id/delete',
        component: PermissaoDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'aawAtividade3App.permissao.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
