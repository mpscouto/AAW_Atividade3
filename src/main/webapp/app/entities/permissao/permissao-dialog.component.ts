import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { Permissao } from './permissao.model';
import { PermissaoPopupService } from './permissao-popup.service';
import { PermissaoService } from './permissao.service';

@Component({
    selector: 'jhi-permissao-dialog',
    templateUrl: './permissao-dialog.component.html'
})
export class PermissaoDialogComponent implements OnInit {

    permissao: Permissao;
    isSaving: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private permissaoService: PermissaoService,
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
        if (this.permissao.id !== undefined) {
            this.subscribeToSaveResponse(
                this.permissaoService.update(this.permissao));
        } else {
            this.subscribeToSaveResponse(
                this.permissaoService.create(this.permissao));
        }
    }

    private subscribeToSaveResponse(result: Observable<Permissao>) {
        result.subscribe((res: Permissao) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: Permissao) {
        this.eventManager.broadcast({ name: 'permissaoListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }
}

@Component({
    selector: 'jhi-permissao-popup',
    template: ''
})
export class PermissaoPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private permissaoPopupService: PermissaoPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.permissaoPopupService
                    .open(PermissaoDialogComponent as Component, params['id']);
            } else {
                this.permissaoPopupService
                    .open(PermissaoDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
