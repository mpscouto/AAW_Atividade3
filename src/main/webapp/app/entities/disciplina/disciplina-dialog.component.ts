import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Disciplina } from './disciplina.model';
import { DisciplinaPopupService } from './disciplina-popup.service';
import { DisciplinaService } from './disciplina.service';
import { Professor, ProfessorService } from '../professor';
import { ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-disciplina-dialog',
    templateUrl: './disciplina-dialog.component.html'
})
export class DisciplinaDialogComponent implements OnInit {

    disciplina: Disciplina;
    isSaving: boolean;

    professors: Professor[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private disciplinaService: DisciplinaService,
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
        if (this.disciplina.id !== undefined) {
            this.subscribeToSaveResponse(
                this.disciplinaService.update(this.disciplina));
        } else {
            this.subscribeToSaveResponse(
                this.disciplinaService.create(this.disciplina));
        }
    }

    private subscribeToSaveResponse(result: Observable<Disciplina>) {
        result.subscribe((res: Disciplina) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: Disciplina) {
        this.eventManager.broadcast({ name: 'disciplinaListModification', content: 'OK'});
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

    getSelected(selectedVals: Array<any>, option: any) {
        if (selectedVals) {
            for (let i = 0; i < selectedVals.length; i++) {
                if (option.id === selectedVals[i].id) {
                    return selectedVals[i];
                }
            }
        }
        return option;
    }
}

@Component({
    selector: 'jhi-disciplina-popup',
    template: ''
})
export class DisciplinaPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private disciplinaPopupService: DisciplinaPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.disciplinaPopupService
                    .open(DisciplinaDialogComponent as Component, params['id']);
            } else {
                this.disciplinaPopupService
                    .open(DisciplinaDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
