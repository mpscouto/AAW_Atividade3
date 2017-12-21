import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Entrega } from './entrega.model';
import { EntregaPopupService } from './entrega-popup.service';
import { EntregaService } from './entrega.service';
import { Aluno, AlunoService } from '../aluno';
import { Atividade, AtividadeService } from '../atividade';
import { ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-entrega-dialog',
    templateUrl: './entrega-dialog.component.html'
})
export class EntregaDialogComponent implements OnInit {

    entrega: Entrega;
    isSaving: boolean;

    alunos: Aluno[];

    atividades: Atividade[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private entregaService: EntregaService,
        private alunoService: AlunoService,
        private atividadeService: AtividadeService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.alunoService.query()
            .subscribe((res: ResponseWrapper) => { this.alunos = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
        this.atividadeService.query()
            .subscribe((res: ResponseWrapper) => { this.atividades = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.entrega.id !== undefined) {
            this.subscribeToSaveResponse(
                this.entregaService.update(this.entrega));
        } else {
            this.subscribeToSaveResponse(
                this.entregaService.create(this.entrega));
        }
    }

    private subscribeToSaveResponse(result: Observable<Entrega>) {
        result.subscribe((res: Entrega) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: Entrega) {
        this.eventManager.broadcast({ name: 'entregaListModification', content: 'OK'});
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

    trackAtividadeById(index: number, item: Atividade) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-entrega-popup',
    template: ''
})
export class EntregaPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private entregaPopupService: EntregaPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.entregaPopupService
                    .open(EntregaDialogComponent as Component, params['id']);
            } else {
                this.entregaPopupService
                    .open(EntregaDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
