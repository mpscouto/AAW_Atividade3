import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Aula } from './aula.model';
import { AulaPopupService } from './aula-popup.service';
import { AulaService } from './aula.service';
import { Turma, TurmaService } from '../turma';
import { PeriodoLetivo, PeriodoLetivoService } from '../periodo-letivo';
import { ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-aula-dialog',
    templateUrl: './aula-dialog.component.html'
})
export class AulaDialogComponent implements OnInit {

    aula: Aula;
    isSaving: boolean;

    turmas: Turma[];

    periodoletivos: PeriodoLetivo[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private aulaService: AulaService,
        private turmaService: TurmaService,
        private periodoLetivoService: PeriodoLetivoService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.turmaService.query()
            .subscribe((res: ResponseWrapper) => { this.turmas = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
        this.periodoLetivoService.query()
            .subscribe((res: ResponseWrapper) => { this.periodoletivos = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.aula.id !== undefined) {
            this.subscribeToSaveResponse(
                this.aulaService.update(this.aula));
        } else {
            this.subscribeToSaveResponse(
                this.aulaService.create(this.aula));
        }
    }

    private subscribeToSaveResponse(result: Observable<Aula>) {
        result.subscribe((res: Aula) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: Aula) {
        this.eventManager.broadcast({ name: 'aulaListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackTurmaById(index: number, item: Turma) {
        return item.id;
    }

    trackPeriodoLetivoById(index: number, item: PeriodoLetivo) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-aula-popup',
    template: ''
})
export class AulaPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private aulaPopupService: AulaPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.aulaPopupService
                    .open(AulaDialogComponent as Component, params['id']);
            } else {
                this.aulaPopupService
                    .open(AulaDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
