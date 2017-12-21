import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Turma } from './turma.model';
import { TurmaPopupService } from './turma-popup.service';
import { TurmaService } from './turma.service';
import { Professor, ProfessorService } from '../professor';
import { ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-turma-dialog',
    templateUrl: './turma-dialog.component.html'
})
export class TurmaDialogComponent implements OnInit {

    turma: Turma;
    isSaving: boolean;

    professors: Professor[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private turmaService: TurmaService,
        private professorService: ProfessorService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.professorService.query()
            .subscribe((res: ResponseWrapper) => { this.professors = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.turma.id !== undefined) {
            this.subscribeToSaveResponse(
                this.turmaService.update(this.turma));
        } else {
            this.subscribeToSaveResponse(
                this.turmaService.create(this.turma));
        }
    }

    private subscribeToSaveResponse(result: Observable<Turma>) {
        result.subscribe((res: Turma) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: Turma) {
        this.eventManager.broadcast({ name: 'turmaListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackProfessorById(index: number, item: Professor) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-turma-popup',
    template: ''
})
export class TurmaPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private turmaPopupService: TurmaPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.turmaPopupService
                    .open(TurmaDialogComponent as Component, params['id']);
            } else {
                this.turmaPopupService
                    .open(TurmaDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
