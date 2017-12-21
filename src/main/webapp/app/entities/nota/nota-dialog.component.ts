import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Nota } from './nota.model';
import { NotaPopupService } from './nota-popup.service';
import { NotaService } from './nota.service';
import { Aluno, AlunoService } from '../aluno';
import { Atividade, AtividadeService } from '../atividade';
import { ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-nota-dialog',
    templateUrl: './nota-dialog.component.html'
})
export class NotaDialogComponent implements OnInit {

    nota: Nota;
    isSaving: boolean;

    alunos: Aluno[];

    atividades: Atividade[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private notaService: NotaService,
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
        if (this.nota.id !== undefined) {
            this.subscribeToSaveResponse(
                this.notaService.update(this.nota));
        } else {
            this.subscribeToSaveResponse(
                this.notaService.create(this.nota));
        }
    }

    private subscribeToSaveResponse(result: Observable<Nota>) {
        result.subscribe((res: Nota) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: Nota) {
        this.eventManager.broadcast({ name: 'notaListModification', content: 'OK'});
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
    selector: 'jhi-nota-popup',
    template: ''
})
export class NotaPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private notaPopupService: NotaPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.notaPopupService
                    .open(NotaDialogComponent as Component, params['id']);
            } else {
                this.notaPopupService
                    .open(NotaDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
