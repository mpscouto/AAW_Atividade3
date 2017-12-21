import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { ProfessorComponent } from './professor.component';
import { ProfessorDetailComponent } from './professor-detail.component';
import { ProfessorPopupComponent } from './professor-dialog.component';
import { ProfessorDeletePopupComponent } from './professor-delete-dialog.component';

export const professorRoute: Routes = [
    {
        path: 'professor',
        component: ProfessorComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'aawAtividade3App.professor.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'professor/:id',
        component: ProfessorDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'aawAtividade3App.professor.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const professorPopupRoute: Routes = [
    {
        path: 'professor-new',
        component: ProfessorPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'aawAtividade3App.professor.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'professor/:id/edit',
        component: ProfessorPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'aawAtividade3App.professor.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'professor/:id/delete',
        component: ProfessorDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'aawAtividade3App.professor.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
