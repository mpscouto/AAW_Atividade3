import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { PeriodoLetivo } from './periodo-letivo.model';
import { PeriodoLetivoPopupService } from './periodo-letivo-popup.service';
import { PeriodoLetivoService } from './periodo-letivo.service';

@Component({
    selector: 'jhi-periodo-letivo-dialog',
    templateUrl: './periodo-letivo-dialog.component.html'
})
export class PeriodoLetivoDialogComponent implements OnInit {

    periodoLetivo: PeriodoLetivo;
    isSaving: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private periodoLetivoService: PeriodoLetivoService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.periodoLetivo.id !== undefined) {
            this.subscribeToSaveResponse(
                this.periodoLetivoService.update(this.periodoLetivo));
        } else {
            this.subscribeToSaveResponse(
                this.periodoLetivoService.create(this.periodoLetivo));
        }
    }

    private subscribeToSaveResponse(result: Observable<PeriodoLetivo>) {
        result.subscribe((res: PeriodoLetivo) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: PeriodoLetivo) {
        this.eventManager.broadcast({ name: 'periodoLetivoListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }
}

@Component({
    selector: 'jhi-periodo-letivo-popup',
    template: ''
})
export class PeriodoLetivoPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private periodoLetivoPopupService: PeriodoLetivoPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.periodoLetivoPopupService
                    .open(PeriodoLetivoDialogComponent as Component, params['id']);
            } else {
                this.periodoLetivoPopupService
                    .open(PeriodoLetivoDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
