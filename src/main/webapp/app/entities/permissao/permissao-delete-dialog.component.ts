import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { Permissao } from './permissao.model';
import { PermissaoPopupService } from './permissao-popup.service';
import { PermissaoService } from './permissao.service';

@Component({
    selector: 'jhi-permissao-delete-dialog',
    templateUrl: './permissao-delete-dialog.component.html'
})
export class PermissaoDeleteDialogComponent {

    permissao: Permissao;

    constructor(
        private permissaoService: PermissaoService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.permissaoService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'permissaoListModification',
                content: 'Deleted an permissao'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-permissao-delete-popup',
    template: ''
})
export class PermissaoDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private permissaoPopupService: PermissaoPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.permissaoPopupService
                .open(PermissaoDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
