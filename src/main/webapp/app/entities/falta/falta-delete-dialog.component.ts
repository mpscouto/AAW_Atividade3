import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { Falta } from './falta.model';
import { FaltaPopupService } from './falta-popup.service';
import { FaltaService } from './falta.service';

@Component({
    selector: 'jhi-falta-delete-dialog',
    templateUrl: './falta-delete-dialog.component.html'
})
export class FaltaDeleteDialogComponent {

    falta: Falta;

    constructor(
        private faltaService: FaltaService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.faltaService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'faltaListModification',
                content: 'Deleted an falta'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-falta-delete-popup',
    template: ''
})
export class FaltaDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private faltaPopupService: FaltaPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.faltaPopupService
                .open(FaltaDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
