import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Usuario } from './usuario.model';
import { UsuarioPopupService } from './usuario-popup.service';
import { UsuarioService } from './usuario.service';
import { Permissao, PermissaoService } from '../permissao';
import { Aluno, AlunoService } from '../aluno';
import { Professor, ProfessorService } from '../professor';
import { ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-usuario-dialog',
    templateUrl: './usuario-dialog.component.html'
})
export class UsuarioDialogComponent implements OnInit {

    usuario: Usuario;
    isSaving: boolean;

    permissaos: Permissao[];

    alunos: Aluno[];

    professors: Professor[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private usuarioService: UsuarioService,
        private permissaoService: PermissaoService,
        private alunoService: AlunoService,
        private professorService: ProfessorService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.permissaoService.query()
            .subscribe((res: ResponseWrapper) => { this.permissaos = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
        this.alunoService
            .query({filter: 'usuario-is-null'})
            .subscribe((res: ResponseWrapper) => {
                if (!this.usuario.aluno || !this.usuario.aluno.id) {
                    this.alunos = res.json;
                } else {
                    this.alunoService
                        .find(this.usuario.aluno.id)
                        .subscribe((subRes: Aluno) => {
                            this.alunos = [subRes].concat(res.json);
                        }, (subRes: ResponseWrapper) => this.onError(subRes.json));
                }
            }, (res: ResponseWrapper) => this.onError(res.json));
        this.professorService
            .query({filter: 'usuario-is-null'})
            .subscribe((res: ResponseWrapper) => {
                if (!this.usuario.professor || !this.usuario.professor.id) {
                    this.professors = res.json;
                } else {
                    this.professorService
                        .find(this.usuario.professor.id)
                        .subscribe((subRes: Professor) => {
                            this.professors = [subRes].concat(res.json);
                        }, (subRes: ResponseWrapper) => this.onError(subRes.json));
                }
            }, (res: ResponseWrapper) => this.onError(res.json));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.usuario.id !== undefined) {
            this.subscribeToSaveResponse(
                this.usuarioService.update(this.usuario));
        } else {
            this.subscribeToSaveResponse(
                this.usuarioService.create(this.usuario));
        }
    }

    private subscribeToSaveResponse(result: Observable<Usuario>) {
        result.subscribe((res: Usuario) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: Usuario) {
        this.eventManager.broadcast({ name: 'usuarioListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackPermissaoById(index: number, item: Permissao) {
        return item.id;
    }

    trackAlunoById(index: number, item: Aluno) {
        return item.id;
    }

    trackProfessorById(index: number, item: Professor) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-usuario-popup',
    template: ''
})
export class UsuarioPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private usuarioPopupService: UsuarioPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.usuarioPopupService
                    .open(UsuarioDialogComponent as Component, params['id']);
            } else {
                this.usuarioPopupService
                    .open(UsuarioDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
