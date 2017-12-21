import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Falta } from './falta.model';
import { FaltaPopupService } from './falta-popup.service';
import { FaltaService } from './falta.service';
import { Aluno, AlunoService } from '../aluno';
import { Aula, AulaService } from '../aula';
import { PeriodoLetivo, PeriodoLetivoService } from '../periodo-letivo';
import { ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-falta-dialog',
    templateUrl: './falta-dialog.component.html'
})
export class FaltaDialogComponent implements OnInit {

    falta: Falta;
    isSaving: boolean;

    alunos: Aluno[];

    aulas: Aula[];

    periodoletivos: PeriodoLetivo[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private faltaService: FaltaService,
        private alunoService: AlunoService,
        private aulaService: AulaService,
        private periodoLetivoService: PeriodoLetivoService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.alunoService.query()
            .subscribe((res: ResponseWrapper) => { this.alunos = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
        this.aulaService.query()
            .subscribe((res: ResponseWrapper) => { this.aulas = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
        this.periodoLetivoService.query()
            .subscribe((res: ResponseWrapper) => { this.periodoletivos = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.falta.id !== undefined) {
            this.subscribeToSaveResponse(
                this.faltaService.update(this.falta));
        } else {
            this.subscribeToSaveResponse(
                this.faltaService.create(this.falta));
        }
    }

    private subscribeToSaveResponse(result: Observable<Falta>) {
        result.subscribe((res: Falta) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: Falta) {
        this.eventManager.broadcast({ name: 'faltaListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackAlunoById(index: number, item: Aluno) {
        return item.id;
    }

    trackAulaById(index: number, item: Aula) {
        return item.id;
    }

    trackPeriodoLetivoById(index: number, item: PeriodoLetivo) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-falta-popup',
    template: ''
})
export class FaltaPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private faltaPopupService: FaltaPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.faltaPopupService
                    .open(FaltaDialogComponent as Component, params['id']);
            } else {
                this.faltaPopupService
                    .open(FaltaDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
